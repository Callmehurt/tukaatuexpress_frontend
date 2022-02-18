import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import Select from "react-select";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import showNotification from "../includes/notification";

const PaymentRequestModal=(props)=>{
    const toggle = props.toggle;
     const dispatch = useDispatch();
     let formRef = null;
     const { register, handleSubmit, errors } = useForm();
     const[paymentRequestData,setPaymentRequestData]=useState({
         message:'',
         payment_method:'',

     })
      useEffect( ()=>{
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        // console.log(staff_admin);
        if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }

    },[]);

      const selectChange = event => {
        if(event){
            const field = {...paymentRequestData};
            field.payment_method = event.value;
            setPaymentRequestData(field);
            console.log(paymentRequestData);

        }
    }
    const handleForm=(event)=>{
      const field = {...paymentRequestData};
        field.message=event.target.value;
        setPaymentRequestData(field);
        console.log(paymentRequestData);
    }
    const paymentRequestOption=[
        {value:'e-sewa',label:'e-sewa',name:"payment_method"},
        {value:'khalti',label:'khalti',name:"payment_method"},
        {value:'Connect Ips',label:'Connect Ips',name:"payment_method"},
         {value:'Bank Account',label:'Bank Account',name:"payment_method"}
    ];
    const onSubmit = async () => {
        console.log(paymentRequestData)
        axios.post('/partner/payment/request' ,paymentRequestData)
             .then((res) => {
                 if(res.data.status === false){
                     showNotification('danger', res.data.message);
                 }else{
                     toggle(false);
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
                         <p>Payment Request</p>
                        </Modal.Title>
                 </Modal.Header>
                 <Modal.Body style={{width:'400px'}}>

                        {/*<h1>{props.updata.data.id}</h1>*/}
                     <Form onSubmit={handleSubmit(onSubmit)} ref={form => formRef = form}>
                        <Form.Group>
                            <Form.Label>Payment Type</Form.Label>
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
                                              placeholder="== Payment Type =="
                                              options={paymentRequestOption}
                                              onChange={(event) => selectChange(event)}
                                              style={{width:'100%'}}

                                            />

                                    </Col>
                                    <Col lg={12} className="pt-3 pl-3 pr-3">
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column sm="2">
                                             Message
                                            </Form.Label>
                                             <Form.Control style={{marginLeft:'15px',width:'93%'}}  name="message" onChange={(event)=>handleForm(event)} type="text" placeholder="Message" />
                                          </Form.Group>
                                    </Col>
                                </Row>


                        </Form.Group>
                         <Row>
                             <Col lg={6}>
                                <Form.Group className="mt-0">
                                      <Button type="submit" variant="primary" style={{marginTop:'35px',width:'100%'}}>Send</Button>
                                </Form.Group>
                             </Col>
                             <Col lg={6}>
                                 <Form.Group className="mt-0">
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
export default PaymentRequestModal