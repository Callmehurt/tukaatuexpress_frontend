import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {getMessageDetail, getSinglePickupDetail,getSinglePickupLocation,getDeliveryPersonCurrentLocation} from './../../../redux/actions/vendor'
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {Row, Col, Modal, Table, Button, Form} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import VendorPickupDetailMap from "./VendorPickupDetailMap";
import notification from "../includes/notification";



const VendorPickupDetail=()=>{
        const location=useLocation();
        const dispatch = useDispatch();
        const vendor = useSelector((state) => state.vendor);
        const singlePickupDetail = vendor.singlePickupDetail;
        const[pickupID,setPickupID]=useState(location.state?.pickupID);
        useEffect(()=>{
            let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
            // console.log(staff_admin);
            if(vendorDetail){
              setAuthorizationToken(vendorDetail.token);
            }
            getSinglePickup();
            getCurrentDeliveryPersonLocation();

        },[0]);
        const getCurrentDeliveryPersonLocation=()=>{
        axios.get(`partner/delivery/person/active/location/${singlePickupDetail.staff_id}`)
             .then((res)=>{
                 console.log(res.data);
                 console.log('delivery Person Location');
                 let DeliveryPersonDetail = res.data;
                 let deliveryPersonDetailPush =[];

                 DeliveryPersonDetail.map((items,index)=>
                     {
                          let currentActiveLocation=items.current_active_location;

                         let arrayObject = {
                             name: items.id,
                             phone: items.phone,

                             // activeLocation:[currentActiveLocation.],

                         };

                         deliveryPersonDetailPush.push(arrayObject);
                     }

                 )

                 dispatch(getDeliveryPersonCurrentLocation(res.data));

             })
            .catch((err)=>{
               console.log(err.response);
            })

    }
        const getSinglePickup=()=>{
            axios.get(`partner/pickup/details/${pickupID}`)
                    .then((res)=>{
                        if(res.data){
                            let singlePickup=res.data;
                            if(singlePickup.dest_coordinate) {
                                let exactLocation = singlePickup.dest_coordinate;
                                let splitArray1 = exactLocation[0].split(',', 2);
                            }

                        }
                        dispatch(getSinglePickupLocation(res.data.coordinate[0]));
                        dispatch(getSinglePickupDetail(res.data.data));
                    })
            .catch((err)=>{
               console.log(err.response);
            })

        }

        const [customerDetail, setCustomerDetail] = useState({
            customer_id: '',
            customer_name: '',
            customer_address: '',
            customer_phone: ''
        })

       const [openModal, setOpenModal] = useState(false);

        const closeModal = () => {
            setOpenModal(false);
        }

        const handleDetailChange = (event) => {

            const regex = /^[0-9]+$/;
            if(event.target.name === 'customer_phone'){
              if(!event.target.value.match(regex)){
                notification('danger', 'Characters are not allowed!')
                return false;
            }
            }
            const newField = {...customerDetail}
                newField[event.target.name] = event.target.value;
                setCustomerDetail(newField);
        }

        const openCustomerEditModal = () => {
            setCustomerDetail({
                 customer_id: singlePickupDetail.customer_id,
                customer_name: singlePickupDetail.customer,
                customer_address: singlePickupDetail.customer_address,
                customer_phone: singlePickupDetail.customer_phone
            })
            setOpenModal(true)
        }

        const submitCustomerDetail = async () => {
            const regex = /^[0-9]{10}$/;
            if(!customerDetail.customer_phone.match(regex)){
                notification('danger', 'Number should contain 10 digits')
                return false;
            }
            if(singlePickupDetail.status !== 'request'){
                notification('danger', 'Cannot perform action. Packet is on delivery process.')
                return false;
            }
            const res = await axios.post('/partner/update/customer/details', customerDetail).catch((err) => {
                console.log(err)
            })
            if(await res.data.status === true){
                getSinglePickup();
                notification('success', await res.data.message);
                closeModal();
            }else {
                notification('danger', await res.data.message)
            }
        }



    return(
        <>
         <Row style={{height:'80vh',overflowY:'hidden', position: 'relative'}}>
             <Col xs={12}>
                    <div style={{paddingLeft:'15px',paddingTop:'10px',}}>
                             <h5 style={{fontWeight:'600'}}>Order Details:</h5>
                             <h6> TEX Code: {singlePickupDetail.tex_code || <Skeleton />}</h6>
                             <h6> Detail: {singlePickupDetail.packet_name || <Skeleton />}</h6>
                             <h6> Status: {singlePickupDetail.status || <Skeleton />}</h6>
                             <h6> COD: Rs. {singlePickupDetail.cod || <Skeleton />}</h6>
                            <h6> Type: {singlePickupDetail.type || <Skeleton />}</h6>
                            <h6> Weight: {singlePickupDetail.weight || <Skeleton />} KG</h6>
                            <h6> Payment Type: {singlePickupDetail.payment_method || <Skeleton />}</h6>
                            <h6> Payment Status: {singlePickupDetail.payment_status || <Skeleton />}</h6>
                            <h6> Delivery Charge: Rs. {singlePickupDetail.delivery_charge || <Skeleton />}</h6>
                            <hr  style={{width:'93vw',height:'3px',color:'black'}}/>
                            <h5 style={{fontWeight:'600'}}>Customer Details:</h5>
                             <h6> Name: {singlePickupDetail.customer || <Skeleton />}</h6>
                             <h6> Phone: {singlePickupDetail.customer_phone || <Skeleton />}</h6>
                              <h6> Address: {singlePickupDetail.customer_address || <Skeleton />}</h6>
                        <button className={'btn btn-sm btn-primary'} style={{position: 'absolute', right: '2rem', top: '1rem'}} onClick={() => openCustomerEditModal()}>Edit Customer Detail</button>
                    </div>
                    <div style={{height:'43vh',overflowY:'hidden'}}>
                      <VendorPickupDetailMap coordinate={singlePickupDetail.current_location} />
                    </div>
              </Col>
            </Row>


             <Modal show={openModal} onHide={closeModal} size={'md'} centered={true}>
                <Modal.Header >
                  <Modal.Title>Edit Customer Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <Form.Group>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" name="customer_name" value={customerDetail.customer_name} onChange={(event) => handleDetailChange(event)} />
                  </Form.Group>
                   <Form.Group className="mt-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control type="text" name="customer_phone" value={customerDetail.customer_phone} onChange={(event) => handleDetailChange(event)}  />
                  </Form.Group>
                  <Form.Group className="mt-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="text" name="customer_address" value={customerDetail.customer_address} onChange={(event) => handleDetailChange(event)} />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Row style={{width:'100%'}}>
                        <Col lg={6}>
                            <Button variant="primary"  style={{borderRadius:'5px',width:'100%'}} onClick={() => submitCustomerDetail()}>
                             Submit
                          </Button>
                        </Col>
                        <Col lg={6}>
                            <Button variant="secondary"  style={{backgroundColor:'red',border:'1px solid red',borderRadius:'5px',width:'100%'}} onClick={closeModal}>
                             Close
                          </Button>
                        </Col>
                    </Row>

                </Modal.Footer>
        </Modal>

        </>



    );
}

export default VendorPickupDetail