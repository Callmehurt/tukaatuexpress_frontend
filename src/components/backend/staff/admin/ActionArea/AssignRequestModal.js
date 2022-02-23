import React, {useEffect, useState} from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import Select from "react-select";
import axios from "axios";
import showNotification from "./../../../../backend/includes/notification";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import {getPartnerRequest} from "../../../../../redux/actions/BranchOperation";

const AssignRequestModal=(props)=>{
      const toggle = props.toggle;
      const dispatch = useDispatch();
      let formRef = null;
      const thisState = useSelector((state) => state.warehouseList);
      const deliveryPersonForAssign = thisState.deliveryPersonForAssign;
      const { register, handleSubmit, errors } = useForm();
      const [requestAssign, setRequestAssign] = useState({
        delivery_person: '',
         req_id:'',
     });
       const [requestPropsId,setRequestPropsId]=useState('');
       useEffect( ()=>{
        console.log('props assign modal');
        let staffAdmin = JSON.parse(localStorage.getItem('staff_admin'));
         if(staffAdmin){
          setAuthorizationToken(staffAdmin.token);
         }
        console.log(props);
         setRequestPropsId(props.requestId);
        // setAssignPickupId(props.packetId);
        //  assignpacketfunc();
        // console.log(assignPacketId);
        console.log('assignpacketId');
        console.log(deliveryPersonForAssign);


    },[props.requestId]);

       const selectChange = event => {
        console.log(event);
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        if(event){
            const field = {...requestAssign};
            field.req_id=requestPropsId;
            field.delivery_person = event.value;
            setRequestAssign(field);

        }
    }
    const getNewPickupRequest=()=>{
         axios.get('/admin/partner/requests')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 dispatch(getPartnerRequest(res.data));
             })
             .catch((err) => {
                 console.log(err.response);
             });
     }
    const getRequestId=(data)=>{
        setRequestPropsId(data);
    }
     const onSubmit = async (event) => {
           // console.log(requestAssign);
           axios.post('/admin/assign/partner/pickup/request' ,requestAssign)
             .then((res) => {
                 console.log(res);
                 if(res.data.status === false){
                     showNotification('danger', res.data.message);
                 }else{
                     toggle(false);
                     getNewPickupRequest();

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
export default AssignRequestModal