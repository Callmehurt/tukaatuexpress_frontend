import React, {useEffect, useState} from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import AssignDelivery from "./AssignDelivery";
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from "react-select";
import axios from "axios";
import showNotification from "../../../../includes/notification";
import wareHouseLists from "../../../../../../redux/actions/wareHouseList";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {wareHouseListCount} from "../../../../../../redux/actions/wareHouseListCount";
import setAuthorizationToken from "../../../../../../utils/setAuthorizationToken";
import {allHoldList, allHoldListSameDay} from "../../../../../../redux/actions/BranchOperation";

const HoldToCancelModal=(props)=>{
    const toggle = props.toggle;
     const dispatch = useDispatch();
     // const thisState = useSelector((state) => state.warehouseList);
     // const deliveryPersonForAssign = thisState.deliveryPersonForAssign;
     let formRef = null;
     const { register, handleSubmit, errors } = useForm();
     const[holdToCancelPickupId,setHoldToCancelPickupId]=useState('');
     const [holdToCancelData, setHoldToCancelData] = useState({
         pickup_id:'',
         remarks:''
     });

     useEffect( ()=>{
        let staffAdmin = JSON.parse(localStorage.getItem('staff_admin'));
         if(staffAdmin){
          setAuthorizationToken(staffAdmin.token);
         }
         getHoldToCancelPacketId(props.packetId);

    },[props.packetId]);

      const getHoldToCancelPacketId=(data)=>{
        setHoldToCancelPickupId(data);
    }

   const selectChange = event => {
       if(event){
            const field = {...holdToCancelData};
            field.remarks = event.target.value;
             field.pickup_id = holdToCancelPickupId;
            setHoldToCancelData(field);

        }
    }
    const  getAllHolds=()=>{
        axios.get('/admin/pickup/hold/list')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 dispatch(allHoldList(res.data));
             })
             .catch((err) => {
                 console.log(err.response);
             });
    }
    const  getAllHoldSameDay=()=>{
        axios.get('/admin/pickup/sameday/hold/list')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 dispatch(allHoldListSameDay(res.data));
             })
             .catch((err) => {
                 console.log(err.response);
             });
    }

     const onSubmit = async (event) => {
         axios.post('/admin/pickup/move/to/cancel',holdToCancelData)
             .then((res) => {
                 console.log(res)
                 if(res.data.status === false){
                     showNotification('danger', res.data.message);
                 }else{
                     toggle(false);
                     getAllHolds();
                     getAllHoldSameDay();
                     showNotification('success', res.data.message);
                 }
             })
             .catch((err) => {
                 console.log(err.response);
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
                          {/*Assign for Delivery*/}
                        </Modal.Title>
                 </Modal.Header>
                 <Modal.Body style={{width:'400px'}}>
                        {/*<h1>{props.updata.data.id}</h1>*/}
                     <Form onSubmit={handleSubmit(onSubmit)} ref={form => formRef = form}>
                          <Form.Group className="mt-0">
                               <Form.Label>Remarks</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  name="remarks"
                                  placeholder="Leave a comment here"
                                  style={{ height: '100px' }}
                                  onChange={(event)=>selectChange(event)}
                                />
                          </Form.Group>
                          <Row>
                             <Col lg={6}>
                                <Form.Group className="mt-0">
                                      <Button type="submit" variant="primary" style={{marginTop:'35px',width:'100%'}}>Cancel Order</Button>
                                </Form.Group>
                             </Col>
                             <Col lg={6}>
                                 <Form.Group className="mt-0">
                                      <Button variant="danger" style={{marginTop:'35px',width:'100%'}} onClick={(event)=>toggle(false)}>Cancel</Button>
                                </Form.Group>
                             </Col>
                         </Row>
                    </Form>

                 </Modal.Body>
             </Modal>


        </>
    )

}

export default HoldToCancelModal