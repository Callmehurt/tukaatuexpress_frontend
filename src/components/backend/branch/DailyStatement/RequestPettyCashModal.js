import React, {useState} from 'react';
import {Modal, Button,Form,Row,Col} from 'react-bootstrap';
import axios from "axios";
import {useHistory} from "react-router-dom";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import {useDispatch, useSelector} from "react-redux";
import showNotification from "../../includes/notification";

const RequestPettyCashModal=(props)=>{
     const toggle = props.toggle;
      const [formField, setFormField] = useState({
            petty_cash: '',
        });
      const FindFormErrors = () =>{
     console.log(formerrors);
     // let pattern = /^(\d*)([,.]\d{0,2})?$/;
     const {petty_cash} = formField
     const newErrors = {}
     // packet name validate
     if ( !petty_cash || petty_cash === '' ) newErrors.petty_cash = 'Petty Cash is empty!'
     // else if ( remarks.length > 30 ) newErrors.remarks = 'Remarks is too long!'



     return newErrors
    }
     const [formerrors, setFormerrors ] = useState({});

     const handleLoginForm = event => {
            const newField = {...formField}
            newField[event.target.name] = event.target.value;
            setFormField(newField);
             if ( !!formerrors[event.target.name] ) setFormerrors({
              ...formerrors,
              [event.target.name]: null
            })
        }
        const submitForm = async(event)=>{
          event.preventDefault();
          console.log(formField);
          let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
            if(branch_detail){
              setAuthorizationToken(branch_detail.token);
            }
          const newErrors = FindFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
          // We got errors!
           setFormerrors(newErrors);
        } else {
            await axios.post('/branch/request/petty-cash', formField)
                .then((res) => {
                    console.log(res);
                    if(res.data.status===true)
                    {
                        showNotification('success', res.data.message);
                    }
                    else{
                     toggle(false);
                     showNotification('danger', res.data.message);
                   }
                    console.log(formField);
                })
                .catch((err) => {
                    console.log(err.response)
                })
        }
    }
    return(
        <>
                      <Modal
                  {...props}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  className="modal_size_assign"
                >
                    <Modal.Header>
                        <Modal.Title style={{fontSize:'17px'}}>
                         Request Petty Cash
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{width:'400px'}}>
                        <Form onSubmit={(event) => submitForm(event)}>
                          <Form.Group className="mb-3" >
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" placeholder="Amount..." name="petty_cash" onChange={(event) => handleLoginForm(event)} isInvalid={ !!formerrors.expense_amount } />
                              <Form.Control.Feedback type='invalid'>
                                {formerrors.petty_cash}
                            </Form.Control.Feedback>
                          </Form.Group>
                            <Row>
                                <Col lg={6}>
                                    <div className="d-flex justify-content-center">
                                          <Button className="customBtn" type="submit" onClick={() => toggle(false)} style={{width:'100%',}}>
                                            Submit
                                          </Button>
                                   </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="d-flex justify-content-center">

                                      <Button className="customBtn" style={{float:'right', marginRight: '10px',width:'100%',backgroundColor:'red'}} onClick={() => toggle(false)}>Close</Button>
                                   </div>
                                </Col>
                            </Row>
                        </Form>

                    </Modal.Body>
              </Modal>

        </>
    )
}

export default RequestPettyCashModal