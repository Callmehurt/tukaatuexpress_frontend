import React, {useEffect, useState} from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import AssignDelivery from "./AssignDelivery";
import Select from "react-select";
import axios from "axios";
import showNotification from "../../../../includes/notification";
import wareHouseLists from "../../../../../../redux/actions/wareHouseList";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {assignDeliveryPerson, wareHouseListCount} from "../../../../../../redux/actions/wareHouseListCount";
import setAuthorizationToken from "../../../../../../utils/setAuthorizationToken";
import {warehouseListSameDay} from "../../../../../../redux/actions/BranchOperation";
import {useHistory} from "react-router-dom";

const AssignDeliveryModal=(props)=>{
     const history = useHistory();
    const toggle = props.toggle;
     const dispatch = useDispatch();
     const thisState = useSelector((state) => state.warehouseList);
     const deliveryPersonForAssign = thisState.deliveryPersonForAssign;
     let formRef = null;
     const { register, handleSubmit, errors } = useForm();
     const [packetAssign, setPacketAssign] = useState({
        delivery_person: '',
         pickup_id:'',
     });

    const [assignPacketId,setAssignPickupId]=useState('');

    // const assignpacketfunc = () =>{
    //        // setAssignPickupId(data);
    //     const field = {...packetAssign};
    //         field.pickup_id =assignPacketId;
    //         setPacketAssign(field);
    // }
    const getAssignPacketId=(data)=>{
        setAssignPickupId(data);
    }
     useEffect( ()=>{
        console.log('props assign modal');
        let staffAdmin = JSON.parse(localStorage.getItem('staff_admin'));
         if(staffAdmin?.token){
          setAuthorizationToken(staffAdmin.token);
        }else{
             history.push('/admin/login');
        }
         getAssignPacketId(props.packetId);
        getDeliveryPerson();


    },[props.packetId]);
     const getDeliveryPerson=()=>{
        axios.get('/admin/get/delivery/staff/list')
             .then((res) => {
                let deliveryPerson = res.data;
                let deliveryPersonList = [];
                deliveryPerson.forEach((items,index)=>{
                    console.log('ok list')
                    if(items.isBan === 0){
                        console.log(items.name)
                     let arrayObject = {
                    value: items.id,
                    label: items.name + '(' + items.phone + ')',

                };
                deliveryPersonList.push(arrayObject);
                    }
                })

                  dispatch(assignDeliveryPerson(deliveryPersonList));

             })
             .catch((err) => {
                 console.log(err.response);
             });
    }

   const selectChange = event => {
       console.log(assignPacketId);
        console.log(event);
        console.log(assignPacketId+'id');
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        if(event){
            const field = {...packetAssign};
            field.pickup_id=assignPacketId;
            field.delivery_person = event.value;
            setPacketAssign(field);

        }
    }
     const onSubmit = async (event) => {
         console.log('event submit');
         console.log(packetAssign);
         axios.post('/admin/pickup/assign' ,packetAssign)
             .then((res) => {
                 console.log(res);
                 if(res.data.status === false){
                     showNotification('danger', res.data.message);
                 }else{
                     toggle(false);
                     refreshWareHouseList();
                     getWarehousesameDayList();
                     showNotification('success', res.data.message);
                 }
             })
             .catch((err) => {
                 console.log(err.response);
             });

     }
     const deliveryPerson=[
         {value:'1',label:'saroj sardar',name:'delivery_person'},
          {value:'2',label:'Dhurba chaudhary',name:'delivery_person'}
     ];
     const getWarehousesameDayList = () =>{
         axios.get('admin/pickup/sameday/warehouse/list')
            .then((res) => {
                console.log(res);
                dispatch(warehouseListSameDay(res.data));
            })
            .catch((err) => {
                console.log(err.response);
            })
     }

     const refreshWareHouseList=()=>{
         axios.get('admin/pickup/warehouse/list')
             .then((res) => {
                 console.log(res);
                 dispatch(wareHouseLists(res.data));
                 dispatch(wareHouseListCount(res.data.length));

             })
             .catch((err) => {
                 console.log(err.response.data);
             });

     }
    return(
        <>

             <Modal
                  {...props}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  className="modal_size_assign"
                  // style={{maxWidth:'500px',}}

                >
                 <Modal.Header>
                        <Modal.Title>
                          Assign for Delivery
                        </Modal.Title>
                 </Modal.Header>
                 <Modal.Body style={{width:'400px'}}>

                        {/*<h1>{props.updata.data.id}</h1>*/}
                     <Form onSubmit={handleSubmit(onSubmit)} ref={form => formRef = form}>
                        <Form.Group>
                            <Form.Label>Delivery Person:</Form.Label>

                                <Row>
                                    <Col md={12}>

                                        <Select
                                              className="basic-single"
                                              classNamePrefix="select"
                                              defaultValue=""
                                              isDisabled={false}
                                              isLoading={true}
                                              isClearable={false}
                                              isRtl={false}
                                              isSearchable={true}
                                              name="delivery_person"
                                              placeholder="== Delivery person =="
                                              options={deliveryPersonForAssign}
                                              onChange={(event) => selectChange(event)}
                                              style={{width:'100%'}}

                                            />

                                    </Col>
                                </Row>


                        </Form.Group>
                         <Row>
                             <Col lg={6}>
                                <Form.Group className="mt-4">
                                      <Button type="submit" variant="primary" style={{marginTop:'35px',width:'100%'}}>Assign</Button>
                                </Form.Group>
                             </Col>
                             <Col lg={6}>
                                 <Form.Group className="mt-4">
                                      <Button variant="danger" style={{marginTop:'35px',width:'100%'}} onClick={(event)=>toggle(false)}>Cancel</Button>
                                </Form.Group>
                             </Col>
                         </Row>

                    </Form>
                    {/*<AssignDelivery assignPacketId={assignPacketId}  toggle={props.onHide} />*/}

                 </Modal.Body>
             </Modal>


        </>
    )

}

export default AssignDeliveryModal