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

const WarehouseToHoldModal=(props)=>{
    const toggle = props.toggle;
     const dispatch = useDispatch();
     // const thisState = useSelector((state) => state.warehouseList);
     // const deliveryPersonForAssign = thisState.deliveryPersonForAssign;
     let formRef = null;
     const { register, handleSubmit, errors } = useForm();
     const[warehouseToHoldPickupId,setWarehouseToHoldPickupId]=useState('');
     const [warehouseToHoldData, setWarehouseToHoldData] = useState({
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
         getWarehouseToHoldPacketId(props.packetId);
         console.log(warehouseToHoldPickupId);

    },[props.packetId]);
      const getWarehouseToHoldPacketId=(data)=>{
        setWarehouseToHoldPickupId(data);
    }

   const selectChange = event => {
       if(event){
            const field = {...warehouseToHoldData};
            field.remarks = event.target.value;
             field.pickup_id = warehouseToHoldPickupId;
            setWarehouseToHoldData(field);

        }
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
         console.log(warehouseToHoldPickupId);
          console.log(warehouseToHoldData);
         axios.post('/admin/pickup/move/to/hold' ,warehouseToHoldData)
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
                                      <Button type="submit" variant="primary" style={{marginTop:'35px',width:'100%'}}>Move to hold</Button>
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

export default WarehouseToHoldModal