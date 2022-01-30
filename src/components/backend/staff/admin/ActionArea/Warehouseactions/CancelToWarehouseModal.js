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
import {allReturnList, allReturnListSameDay} from "../../../../../../redux/actions/BranchOperation";
import {useHistory} from "react-router-dom";

const CancelToWarehouseModal=(props)=>{
     const history = useHistory();
    const toggle = props.toggle;
     const dispatch = useDispatch();
     // const thisState = useSelector((state) => state.warehouseList);
     // const deliveryPersonForAssign = thisState.deliveryPersonForAssign;
     let formRef = null;
     const { register, handleSubmit, errors } = useForm();
     const[cancelToWarehousePickupId,setCancelToWarehousePickupId]=useState('');
     const [cancelToWarehouseData, setCancelToWarehouseData] = useState({
         pickup_id:'',
         remarks:''

     });
     useEffect( ()=>{
        console.log('props assign modal');
        let staffAdmin = JSON.parse(localStorage.getItem('staff_admin'));
         if(staffAdmin?.token){
          setAuthorizationToken(staffAdmin.token);
        }else{
             history.push('/admin/login');
        }
        console.log(props);
         getCancelToWarehousePickupId(props.packetId);
         console.log(cancelToWarehousePickupId);

    },[props.packetId]);
      const getCancelToWarehousePickupId=(data)=>{
       setCancelToWarehousePickupId(data);
    }

   const selectChange = event => {
       if(event){
            const field = {...cancelToWarehouseData};
            field.remarks = event.target.value;
             field.pickup_id = cancelToWarehousePickupId;
            setCancelToWarehouseData(field);

        }
    }
    const getAllReturnAndCancel = () => {
        axios.get('/admin/pickup/cancel/list')
            .then((res) => {
                console.log(res);
                console.log(res.data);
                dispatch(allReturnList(res.data));
            })
            .catch((err) => {
                console.log(err.response);
            });
    }
    const getAllReturnAndCancelSameDay=()=>{
        axios.get('/admin/pickup/sameday/cancel/list')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 dispatch(allReturnListSameDay(res.data));
             })
             .catch((err) => {
                 console.log(err.response);
             });
    }
     const onSubmit = (event) => {
         console.log('event submit');
         console.log(cancelToWarehousePickupId);
          console.log(cancelToWarehouseData);
         axios.post('/admin/pickup/move/warehouse' ,cancelToWarehouseData)
             .then((res) => {
                 console.log(res);
                 if(res.data.status === false){
                     showNotification('danger', res.data.message);
                 }else{
                     toggle(false);
                    getAllReturnAndCancel();
                    getAllReturnAndCancelSameDay();
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
                                      <Button type="submit" variant="primary" style={{marginTop:'35px',width:'100%'}}>move to Warehouse</Button>
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

export default CancelToWarehouseModal