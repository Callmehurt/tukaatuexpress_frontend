// import React, {useEffect, useState} from 'react'
// import Select from "react-select";
// import {Col, Form, Row,Button} from "react-bootstrap";
// import {useForm} from "react-hook-form";
// import axios from "axios";
// import showNotification from "../../../../includes/notification";
// import {useDispatch} from "react-redux";
// import wareHouseLists  from "../../../../../../redux/actions/wareHouseList";
//
//
// const AssignDelivery = (props) =>{
//       const toggle = props.toggle;
//      const dispatch = useDispatch();
//      let formRef = null;
//      const { register, handleSubmit, errors } = useForm();
//      const [packetAssign, setPacketAssign] = useState({
//         delivery_person: '',
//          pickup_id:'',
//      });
//      const packetAssignFunc=(data)=> {
//          console.log('packetAssignFunc');
//          const updatepacketassign={...packetAssign};
//          updatepacketassign.pickup_id = data;
//          setPacketAssign(updatepacketassign);
//      }
//      useEffect(()=> {
//          console.log('ASSIGN dLEIVERY');
//          console.log(props.assignPacketId);
//          packetAssignFunc(props.assignPacketId);
//
//      },[]);
//      const selectChange = event => {
//         console.log(event)
//         let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
//         if(event){
//             const field = {...packetAssign};
//             field.delivery_person = event.value;
//             setPacketAssign(field);
//
//         }
//     }
//      const onSubmit = async (event) => {
//          console.log('event submit');
//          console.log(packetAssign);
//          axios.post('admin/pickup/assign', packetAssign)
//              .then((res) => {
//                  console.log(res);
//                  if(res.data.status === false){
//                      showNotification('danger', res.data.message);
//                  }else{
//                      toggle(false);
//                      refreshWareHouseList();
//                      showNotification('success', res.data.message);
//                  }
//              })
//              .catch((err) => {
//                  console.log(err.response.data);
//              });
//
//      }
//      const deliveryPerson=[
//          {value:'1',label:'saroj sardar',name:'delivery_person'},
//           {value:'2',label:'Dhurba chaudhary',name:'delivery_person'}
//      ];
//
//      const refreshWareHouseList=()=>{
//          axios.get('admin/pickup/warehouse/list')
//              .then((res) => {
//                  console.log(res);
//                  dispatch(wareHouseLists(res.data));
//              })
//              .catch((err) => {
//                  console.log(err.response.data);
//              });
//
//      }
//
//
//
//     return(
//         <>
//            <div style={{width:'400px',}}>
//                     <Form onSubmit={handleSubmit(onSubmit)} ref={form => formRef = form}>
//                         <Form.Group>
//                             <Form.Label>Delivery Person:</Form.Label>
//
//                                 <Row>
//                                     <Col md={12}>
//
//                                         <Select
//                                               className="basic-single"
//                                               classNamePrefix="select"
//                                               defaultValue=""
//                                               isDisabled={false}
//                                               isLoading={false}
//                                               isClearable={false}
//                                               isRtl={false}
//                                               isSearchable={true}
//                                               name="delivery_person"
//                                               placeholder="== Delivery person =="
//                                               options={deliveryPerson}
//                                               onChange={(event) => selectChange(event)}
//                                               style={{width:'100%'}}
//
//                                             />
//
//                                     </Col>
//                                 </Row>
//
//
//                         </Form.Group>
//                         <Form.Group className="mt-4">
//                               <Button type="submit" variant="primary" style={{marginTop:'35px',width:'100%'}}>Assign</Button>
//                         </Form.Group>
//
//                     </Form>
//                </div>
//
//
//
//         </>
//     )
//
// }
//
// export default AssignDelivery