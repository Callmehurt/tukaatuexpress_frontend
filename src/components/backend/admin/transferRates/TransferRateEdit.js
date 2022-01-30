import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import axios from "axios";
import {transferRateList} from "../../../../redux/actions/MainAdmin";
import showNotification from "../../includes/notification";
// import BranchesEdit from "../branches/BranchesEdit";

const TransferRateEdit=(props)=>{
     const toggle = props.toggle;
     const dispatch = useDispatch();
      const mainAdmin= useSelector((state) => state.mainAdmin);
      const editTransferRate=mainAdmin.editTransferRate;
      let formRef = null;
       const { register, handleSubmit, errors } = useForm();
       const [transferRateUpdate, setTransferRateUpdate] = useState({
        rate_id:'',
        transfer_count:'',
        rate:'',
     });
       useEffect(()=>{
            let mainAdmin = JSON.parse(localStorage.getItem('main_admin'));
            console.log(mainAdmin.token);
            if(mainAdmin){
              setAuthorizationToken(mainAdmin.token);
            }
            // getTransferRate();
       })
    // const getTransferRate=()=>{
    //        axios.get(`/mainadmin/get/transfer/rates/${}`)
    //         .then((res) => {
    //             console.log(res.data);
    //             // dispatch(transferRateList(res.data));
    //             // dispatch(AdminBranches(res.data));
    //         })
    //         .catch((err) => {
    //             console.log(err.response.data);
    //         })
    // }
       const onSubmit=()=>{
           if(transferRateUpdate.rate_id){
                console.log(transferRateUpdate);
                axios.post('/mainadmin/update/transfer/rate',transferRateUpdate)
                .then((res) => {
                    console.log(res.data);
                    if(res.data.status === false) {
                        showNotification('danger', res.data.message);
                        toggle(false);
                    }else{
                        showNotification('success', res.data.message);
                        toggle(false);
                        getTransferRateList();
                    }
                    // dispatch(transferRateList(res.data));
                    // dispatch(AdminBranches(res.data));
                })
                .catch((err) => {
                    console.log(err.response.data);
                })
           }
           else{
               toggle(false);
               // notification No update is done
           }


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
       const handleForm = event => {
        const newField = {...transferRateUpdate}
           newField.transfer_count=editTransferRate.transfer_count;
           newField.rate_id=editTransferRate.id;
        newField[event.target.name] = event.target.value;
        setTransferRateUpdate(newField);
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
                         <Form onSubmit={handleSubmit(onSubmit)} ref={form => formRef = form}>
                             <Form.Group className="mb-3" >
                                    <Form.Label>Transfer Count:</Form.Label>
                                    <Form.Control type="text" name="transfer_count"  Value="2" onChange={(event) => handleForm(event)} readOnly />

                               </Form.Group>
                               <Form.Group className="mb-3" >
                                    <Form.Label>Base Rate:</Form.Label>
                                    <Form.Control type="number" name="rate" defaultValue={editTransferRate.rate} onChange={(event) => handleForm(event)} placeholder="Enter Base rate" />

                               </Form.Group>
                         <Row>
                             <Col lg={6}>
                                <Form.Group className="mt-4">
                                      <Button type="submit" variant="primary" style={{marginTop:'35px',width:'100%'}}>Update</Button>
                                </Form.Group>
                             </Col>
                             <Col lg={6}>
                                 <Form.Group className="mt-4">
                                      <Button variant="danger" style={{marginTop:'35px',width:'100%'}} onClick={(event)=>toggle(false)}>Cancel</Button>
                                </Form.Group>
                             </Col>
                         </Row>

                    </Form>

                        {/*<h1>{props.updata.data.id}</h1>*/}
                    {/*<BranchesEdit  toggle={props.onHide} />*/}

                    </Modal.Body>
              </Modal>
        </>
    );
}

export default TransferRateEdit