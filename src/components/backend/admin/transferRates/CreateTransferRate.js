import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import {useForm} from "react-hook-form";
import axios from "axios";
import {transferRateList} from "../../../../redux/actions/MainAdmin";
import {useDispatch} from "react-redux";
import showNotification from "../../includes/notification";

const CreateTransferRate=(props)=>{
     const dispatch=useDispatch();
    const toggle=props.toggle;
    const [formField, setFormField] = useState({
        transfer_count:'',
        rate:'',
     });

     const { register, handleSubmit, errors } = useForm();
    useEffect(()=>{
            let mainAdmin = JSON.parse(localStorage.getItem('main_admin'));
            console.log(mainAdmin.token);
            if(mainAdmin){
              setAuthorizationToken(mainAdmin.token);
            }
            // getTransferRate();
       })
    const onSubmit=()=>{
        console.log(formField);
        console.log(formField.rate);
        if(formField.rate && formField.transfer_count){
            // console.log('bhayo rate'+'transfer count pani');
            axios.post('/mainadmin/store/transfer/rate',formField)
                .then((res) => {
                    console.log(res.data);
                     if(res.data.status === false) {
                         showNotification('danger', res.data.message);
                           toggle(false);
                     }
                     else{
                          showNotification('success', res.data.message);
                           getTransferRateList();
                           toggle(false);
                     }
                    // dispatch(transferRateList(res.data));
                    // dispatch(AdminBranches(res.data));
                })
                .catch((err) => {
                    console.log(err.response.data);
                })

        }
        const getTransferRateList=()=>{
        axios.get('/mainadmin/transfer/rates')
            .then((res) => {
                console.log(res.data);
                dispatch(transferRateList(res.data));
                // dispatch(AdminBranches(res.data));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
        // if(formField.rate && formField.transfer_count) {
        //     axios.post('/mainadmin/store/transfer/rate',formField)
        //         .then((res) => {
        //             console.log(res.data);
        //             dispatch(transferRateList(res.data));
        //             // dispatch(AdminBranches(res.data));
        //         })
        //         .catch((err) => {
        //             console.log(err.response.data);
        //         })
        // }
        // else{
        //     console.log('sorry you cannot');
        //
        // }

    }
    const handleForm = event => {
        const newField = {...formField}
           // newField.transfer_count=editTransferRate.transfer_count;
           // newField.rate_id=editTransferRate.id;
        newField[event.target.name] = event.target.value;
        setFormField(newField);
        //  if ( !!formerrors[event.target.name] ) setFormerrors({
        //   ...formerrors,
        //   [event.target.name]: null
        // })
    }
    return(
         <>
            <Modal
                  {...props}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                    <Modal.Header>
                        <Modal.Title>
                        Updates Transfer Rate
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form onSubmit={handleSubmit(onSubmit)}>
                             <Form.Group className="mb-3" >
                                    <Form.Label>Transfer Count:</Form.Label>
                                    <Form.Control type="text" name="transfer_count"  defaultValue="" onChange={(event) => handleForm(event)} />

                               </Form.Group>
                               <Form.Group className="mb-3" >
                                    <Form.Label>Base Rate:</Form.Label>
                                    <Form.Control type="number" name="rate" defaultValue="" onChange={(event) => handleForm(event)} placeholder="Enter Base rate" />

                               </Form.Group>
                         <Row>
                             <Col lg={6}>
                                <Form.Group className="mt-4">
                                      <Button type="submit" variant="primary" style={{marginTop:'35px',width:'100%'}}>Send</Button>
                                </Form.Group>
                             </Col>
                             <Col lg={6}>
                                 <Form.Group className="mt-4">
                                      <Button variant="danger" style={{marginTop:'35px',width:'100%'}} onClick={(event)=>toggle(false)}>Cancel</Button>
                                </Form.Group>
                             </Col>
                         </Row>

                    </Form>



                    </Modal.Body>
              </Modal>
        </>
    );
}
export default CreateTransferRate