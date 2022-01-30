import React, {useEffect, useState} from 'react';
import {Form, Button, Row, Col, Spinner} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import axios from "axios";
import notification from "../../includes/notification";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import {getEntryOperatorList} from "../../../../redux/actions/HrAdmin";
import {useDispatch} from "react-redux";

const HrStaffEntryCreate=()=>{
       const history = useHistory();
       const dispatch = useDispatch();

       useEffect(()=>{
        let hrAdmin = JSON.parse(localStorage.getItem('staff_hrAdmin'));
        // console.log('hello use');
         if(hrAdmin){
          setAuthorizationToken(hrAdmin.token);
        }
    },[]);
       const getEntryOperatorStaffList =()=>{
         axios.get('hr/list/entry/operator')
            .then((res) => {
                console.log(res);
                dispatch(getEntryOperatorList(res.data));
                // dispatch(wareHouseListCount(res.data.length));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
       const [isLoading, setLoading] = useState(false);
     let formRef = null;
     const [formerrors, setFormerrors ] = useState({});
    const[formField,setFormField]=useState({
        name:'',
        phone:'',
        email:'',
        salary:'',
        password:'',
    })
    const handleForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
        if ( !!formerrors[event.target.name] ) setFormerrors({
          ...formerrors,
          [event.target.name]: null
        })
    }
    const FindFormErrors = () =>{
     console.log(formerrors);
     let pattern = /^(\d*)([,.]\d{0,2})?$/;
     // let phonePattern = /[^0-9]/g;
     let EmailRegEx = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
     let phoneLength=10;

     const {name,phone,email,salary} = formField
     const newErrors = {}
     // packet name validate
     if ( !name || name === '' ) newErrors.name = 'Name must Required!'
     else if ( name.length > 30 ) newErrors.name = 'Name is too long!'
     if ( !salary || salary === '' ) newErrors.salary = 'Salary must Required!'


     if ( !phone || phone === '' ) newErrors.phone = 'Phone number must Required'
         else if ( phone.length >phoneLength|| phone.length < phoneLength) newErrors.phone = 'Invalid Phone Number'
     // else if (!phone.match(phonePattern) ) newErrors.phone = 'In Valid Number!'


     // price cod validation
     if ( !email || email === ''  ) newErrors.email = 'Email must Required'
     else if(!email.match(EmailRegEx)) newErrors.email = 'In Valid Email!'
     // customer validation

     // if(!address || address ==='') newErrors.address ='Address must Required'
     // if(!weight || weight ==='') newErrors.weight ='Weight must Required'
     // if(!type || type ==='') newErrors.type ='Type must Required'

     return newErrors
    }
     const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formField);
        const newErrors = FindFormErrors();
         if ( Object.keys(newErrors).length > 0 ) {
          // We got errors!
           setFormerrors(newErrors);
        }else {
             setLoading(true);
             await axios.post('/hr/register/entry/operator', formField)
                 .then((res) => {
                     console.log(res)
                     if (res.data.status === true) {
                         notification('success', res.data.message);
                         setLoading(false);
                         getEntryOperatorStaffList();
                         history.push('/hr/staff/entry_operator');
                     } else {
                         notification('danger', res.data.message);
                          setLoading(false);
                     }
                 })
                 .catch((err) => {
                     console.log(err.response.data)
                 })
         }
    }

    return(
        <>
            <Row>
                <Col lg={12} className="pt-5">
                    <div style={{display:'flex',placeContent:'center'}}>
                          <div className="branch_new_pickup_area mt-3">
                              <Row>
                                <Col lg={12}>
                                    <h6 className="mb-0 text-center" style={{fontSize:'17px',}}>Please Create Entry Employee !!!</h6>
                                </Col>
                              </Row>
                              <Form style={{width:'600px'}} onSubmit={(event) => handleSubmit(event)} ref={form => formRef = form}>
                                  <Form.Group className="mb-3" >
                                    <Form.Label className="mb-0">Name</Form.Label>
                                    <Form.Control type="text" name="name" onChange={(event) => handleForm(event)} placeholder="Enter name" isInvalid={ !!formerrors.name } />
                                    <Form.Control.Feedback type='invalid'>
                                                    {formerrors.name}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                  <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Email address</Form.Label>
                                    <Form.Control type="email" name="email" onChange={(event) => handleForm(event)} placeholder="Enter email" isInvalid={ !!formerrors.email } />
                                    <Form.Control.Feedback type='invalid'>
                                                    {formerrors.email}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                  <Form.Group className="mb-3" >
                                    <Form.Label className="mb-0">Phone</Form.Label>
                                    <Form.Control type="number" name="phone" onChange={(event) => handleForm(event)} placeholder="Enter number" isInvalid={ !!formerrors.phone } />
                                    <Form.Control.Feedback type='invalid'>
                                                    {formerrors.phone}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                  <Form.Group className="mb-3" >
                                    <Form.Label className="mb-0">Salary</Form.Label>
                                    <Form.Control type="number" name="salary" onChange={(event) => handleForm(event)} placeholder="Enter Salary" isInvalid={ !!formerrors.salary } />
                                    <Form.Control.Feedback type='invalid'>
                                                    {formerrors.salary}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                  {/*<Form.Group className="mb-3" controlId="formBasicPassword">*/}
                                  {/*  <Form.Label className="mb-0">Password</Form.Label>*/}
                                  {/*  <Form.Control type="password" name="password" onChange={(event) => handleForm(event)} placeholder="Password" />*/}
                                  {/*</Form.Group>*/}
                                   <div style={{display:'flex',justifyContent:'center'}}>
                                     {isLoading ? (
                                            <Button  className="customBtn" style={{width:'100%',}}><Spinner size="sm" animation="border" /><span style={{marginLeft: '7px'}}>Submitting</span></Button>
                                        ) : (
                                        <Button type="submit" className="customBtn" style={{width:'100%',}}>Submit</Button>
                                        )}
                                   </div>
                              </Form>
                          </div>
                    </div>
                </Col>
            </Row>


        </>
    )
}
export default HrStaffEntryCreate