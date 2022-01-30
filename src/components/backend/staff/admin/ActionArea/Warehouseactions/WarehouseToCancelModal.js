import React, {useEffect, useState} from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import Select from "react-select";
import axios from "axios";
import showNotification from "../../../../includes/notification";
import wareHouseLists from "../../../../../../redux/actions/wareHouseList";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {wareHouseListCount} from "../../../../../../redux/actions/wareHouseListCount";
import setAuthorizationToken from "../../../../../../utils/setAuthorizationToken";
import {warehouseListSameDay} from "../../../../../../redux/actions/BranchOperation";

const WarehouseToCancelModal=(props)=>{
    const toggle = props.toggle;
     const dispatch = useDispatch();
     // const thisState = useSelector((state) => state.warehouseList);
     // const deliveryPersonForAssign = thisState.deliveryPersonForAssign;
     let formRef = null;
     const { register, handleSubmit, errors } = useForm();
     const[warehouseToCancelPickupId,setWarehouseToCancelPickupId]=useState('');
     const [warehouseToCancelData, setWarehouseToCancelData] = useState({
         pickup_id:'',
         remarks:''

     });
     useEffect( ()=>{
        console.log('props assign modal');
        let staffAdmin = JSON.parse(localStorage.getItem('staff_admin'));
         if(staffAdmin){
          setAuthorizationToken(staffAdmin.token);
         }
        console.log(props);
         getWarehouseToCancelPacketId(props.packetId);
         console.log(warehouseToCancelPickupId);

    },[props.packetId]);
      const getWarehouseToCancelPacketId=(data)=>{
        setWarehouseToCancelPickupId(data);
    }

   const selectChange = event => {
       if(event){
            const field = {...warehouseToCancelData};
            field.remarks = event.target.value;
             field.pickup_id = warehouseToCancelPickupId;
            setWarehouseToCancelData(field);

        }
    }
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
     const onSubmit = async (event) => {
         console.log('event submit');
         console.log(warehouseToCancelPickupId);
          console.log(warehouseToCancelData);
         axios.post('/admin/pickup/move/to/cancel' ,warehouseToCancelData)
             .then((res) => {
                 console.log(res);
                 if(res.data.status === false){
                     showNotification('danger', res.data.message);
                 }else{
                     toggle(false);
                     getWarehouseList();
                     getWarehousesameDayList();
                     showNotification('success', res.data.message);
                 }
             })
             .catch((err) => {
                 console.log(err.response);
             });

     }
     const getWarehouseList = () =>{
        axios.get('admin/pickup/warehouse/list')
            .then((res) => {
                console.log(res);
                // console.log('warehouseList');
                // console.log(res.data);
                dispatch(wareHouseLists(res.data))
                // console.log(res.data.length);
                dispatch(wareHouseListCount(res.data.length));
            })
            .catch((err) => {
                console.log(err.response);
            })
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
                                      <Button type="submit" variant="primary" style={{marginTop:'35px',width:'100%'}}>Move to cancel</Button>
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

export default WarehouseToCancelModal