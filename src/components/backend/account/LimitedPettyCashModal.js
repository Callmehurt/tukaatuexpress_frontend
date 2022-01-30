import React, {useEffect, useState} from 'react';
import {Modal, Button,Form} from 'react-bootstrap';
import axios from "axios";
import {useHistory} from "react-router-dom";
import setAuthorizationToken from "./../../../utils/setAuthorizationToken";
import {useDispatch, useSelector} from "react-redux";
import showNotification from "./../includes/notification";
import {AccountPettyCashApproved, AccountPettyCashPending} from "../../../redux/actions/AccountAdmin";

const LimitedPettyCashModal=(props)=>{
     const dispatch = useDispatch();
     const toggle = props.toggle;
     const [formField,setFormField]=useState({
        provided_cash:'',
        record_id:''
     })
    // const setRecordId=(record)=>{
    //      const newField = {...formField}
    //         newField.record_id = record;
    //         setFormField(newField);
    // }
    useEffect(()=>{
        console.log(props.record);
        // setRecordId(props.record);
        console.log('record id');
    },[])
      const FindFormErrors = () =>{
     console.log(formerrors);
     // let pattern = /^(\d*)([,.]\d{0,2})?$/;
     const {provided_cash} = formField
     const newErrors = {}
     // packet name validate
     if ( !provided_cash|| provided_cash === '' ) newErrors.provided_cash = 'Petty Cash is empty!'
     // else if ( remarks.length > 30 ) newErrors.remarks = 'Remarks is too long!'

     return newErrors
    }
     const [formerrors, setFormerrors ] = useState({});
     const handleLoginForm = event => {
            const newField = {...formField}
            newField.record_id = props.record;
            newField[event.target.name] = event.target.value;
            setFormField(newField);
             if ( !!formerrors[event.target.name] ) setFormerrors({
              ...formerrors,
              [event.target.name]: null
            })
        }
        const submitForm = async(event)=>{
          event.preventDefault();
          let AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
          if(AccountStorage){
            setAuthorizationToken(AccountStorage.token);
          }
          const newErrors = FindFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
          // We got errors!
           setFormerrors(newErrors);
        } else {
            console.log(formField);
            await axios.post('/account/approve/limited/petty-cash', formField)
                .then((res) => {
                    console.log(res);
                    if(res.data.status===true)
                    {
                        getPettyCashPendingList();
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
    const getPettyCashPendingList=()=>{
            axios.get('/account/view/petty-cash/requests')
                    .then((res) => {
                        console.log(res);
                        dispatch(AccountPettyCashPending(res.data.pending_requests));
                         dispatch(AccountPettyCashApproved(res.data.approved_requests));

                    })
                    .catch((err) => {
                        console.log(err.response)
                    })
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
                        <Modal.Title style={{fontSize:'17px'}}>
                            Petty Cash for Provided
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{width:'400px'}}>
                        <Form onSubmit={(event) => submitForm(event)}>
                          <Form.Group className="mb-3" >
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" placeholder="Amount..." name="provided_cash" onChange={(event) => handleLoginForm(event)} isInvalid={ !!formerrors.expense_amount } />
                              <Form.Control.Feedback type='invalid'>
                                {formerrors.provided_cash}
                            </Form.Control.Feedback>
                          </Form.Group>
                            <div className="d-flex justify-content-center">
                                  <Button variant="primary" type="submit" onClick={() => toggle(false)} >
                                    Submit
                                  </Button>
                                 <Button className="customBtn" style={{float:'right', marginRight: '10px'}} onClick={() => toggle(false)}>Close</Button>
                            </div>
                        </Form>

                    </Modal.Body>
              </Modal>

        </>
    )
}

export default LimitedPettyCashModal