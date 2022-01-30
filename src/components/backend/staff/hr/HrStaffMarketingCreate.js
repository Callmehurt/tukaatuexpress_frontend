import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import axios from "axios";
import notification from "../../includes/notification";
import {Button, Col, Form, Row} from "react-bootstrap";
import {getMarketingList} from "../../../../redux/actions/HrAdmin";
import {useDispatch} from "react-redux";

const HrStaffMarketingCreate=()=>{
       const dispatch = useDispatch();
     const history = useHistory();
       useEffect(()=>{
        let hrAdmin = JSON.parse(localStorage.getItem('staff_hrAdmin'));
        // console.log('hello use');
         if(hrAdmin){
          setAuthorizationToken(hrAdmin.token);
        }
    },[]);
       const getMarketingStaffList=()=>{
         axios.get('hr/list/marketing/staff')
            .then((res) => {
                console.log(res);
                dispatch(getMarketingList(res.data));
                // dispatch(wareHouseListCount(res.data.length));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
       const [isLoading, setLoading] = useState(false);
     let formRef = null;
    const[formField,setFormField]=useState({
        staff_name:'',
        staff_phone:'',
        staff_email:'',
        staff_password:'',
        salary:'',
    })
    const handleForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formField);
         await axios.post('/hr/register/marketing/staff', formField)
                 .then((res) => {
                     console.log(res)
                     if (res.data.status === true) {
                         notification('success', res.data.message);
                         setLoading(false);
                         getMarketingStaffList();
                          history.push('/hr/staff/marketing');
                     } else {
                         notification('danger', res.data.message);
                     }
                 })
                 .catch((err) => {
                     console.log(err.response.data)
                 })
    }

    return(
        <>
             <Row>
                <Col lg={12} className="pt-5">
                    <div style={{display:'flex',placeContent:'center'}}>
                         <div className="branch_new_pickup_area mt-3">
                             <Row>
                                <Col lg={12}>
                                    <h6 className="mb-0 text-center" style={{fontSize:'17px',}}>Please Create Marketing Employee !!!</h6>
                                </Col>
                              </Row>
                             <Form style={{width:'600px'}} onSubmit={(event) => handleSubmit(event)} ref={form => formRef = form}>
                              <Form.Group className="mb-3" >
                                <Form.Label className="mb-0">Name</Form.Label>
                                <Form.Control type="text" name="staff_name" onChange={(event) => handleForm(event)} placeholder="Enter name" />
                                {/*<Form.Text className="text-muted">*/}
                                {/*  We'll never share your email with anyone else.*/}
                                {/*</Form.Text>*/}
                              </Form.Group>
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="mb-0" >Email address</Form.Label>
                                <Form.Control type="email" name="staff_email" onChange={(event) => handleForm(event)} placeholder="Enter email" />
                                {/*<Form.Text className="text-muted">*/}
                                {/*  We'll never share your email with anyone else.*/}
                                {/*</Form.Text>*/}
                              </Form.Group>
                              <Form.Group className="mb-3" >
                                <Form.Label className="mb-0">Phone</Form.Label>
                                <Form.Control type="number" name="staff_phone" onChange={(event) => handleForm(event)} placeholder="Enter number" />
                                {/*<Form.Text className="text-muted">*/}
                                {/*  We'll never share your email with anyone else.*/}
                                {/*</Form.Text>*/}
                              </Form.Group>
                              <Form.Group className="mb-3" >
                                <Form.Label className="mb-0">Salary</Form.Label>
                                <Form.Control type="number" name="salary" onChange={(event) => handleForm(event)} placeholder="Enter Salary" />
                                {/*<Form.Text className="text-muted">*/}
                                {/*  We'll never share your email with anyone else.*/}
                                {/*</Form.Text>*/}
                              </Form.Group>

                              {/*<Form.Group className="mb-3" controlId="formBasicPassword">*/}
                              {/*  <Form.Label className="mb-0">Password</Form.Label>*/}
                              {/*  <Form.Control type="password" name="password" onChange={(event) => handleForm(event)} placeholder="Password" />*/}
                              {/*</Form.Group>*/}
                              <div style={{display:'flex',justifyContent:'center'}}>
                                  <Button style={{width:'200px'}} variant="primary" type="submit">
                                    Submit
                                  </Button>
                              </div>

                        </Form>
                         </div>
                    </div>
                </Col>
            </Row>

        </>
    )
}
export default HrStaffMarketingCreate