import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Image, Row, Spinner} from "react-bootstrap";
import Loginimage from "../../../assets/hanuman.png";

import axios from "axios";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import { hrAuthenticate } from "./../../../redux/actions/hrAuthenticate"

const HrLogin=()=>{
 const history = useHistory();
 const dispatch = useDispatch();
 const [loadingcom,setLoadingcom]=useState(false);
 const [formField, setFormField] = useState({
        email: '',
        password:'',
    });

 useEffect(() => {
      // console.log('useeffect');
         const staff_hrAdmin = JSON.parse(localStorage.getItem('staff_hrAdmin'));
         // console.log(staff_hrAdmin);

        if(staff_hrAdmin){
            dispatch(hrAuthenticate(staff_hrAdmin.user));
            switch(staff_hrAdmin.user.roles[0].name) {
                case 'hr_admin':
                      history.push('/hr/dashboard');
                    break;
                default:
                    history.push('/hr/login');
              }
        }
         else{
            setLoadingFuncFalse();
        }

    });
    const setLoadingFuncFalse=()=>{
        setLoadingcom(false);
    }

   const submitLoginForm = async (event) => {
        event.preventDefault();
        // console.log(formField);
       setLoadingcom(true);
        const data = await axios.post('/hr/login', formField)
            .then((res) => {
                console.log(res);
                const hrAdmin = {
                    token: res.data.access_token,
                    user: res.data.user
                }
                 switch(hrAdmin.user.roles[0].name) {

                    case 'hr_admin':
                        console.log(hrAdmin.user.roles[0].name);
                        dispatch(hrAuthenticate(res.data.user));
                        localStorage.setItem('staff_hrAdmin', JSON.stringify(hrAdmin));
                        history.push('/hr/dashboard');
                        break;
                    default:
                        history.push('/hr/login');
                  }

               console.log(hrAdmin);


            })
            .catch((err) => {
                console.log(err.response);
            })
    }


  const handleLoginForm = event => {
        setLoadingcom(true);
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
    }
    return(
        <>
            <section className="staffLogin">
            <Container className="staffLogin_cont">
                <Row className="justify-content-center">
                    <Col lg={6} className="loginimg_part">
                        <div className="image_holder"><Image src={Loginimage} className="img-fluid" rounded /></div>

                    </Col>
                    <Col lg={6} className="loginform_part">
                       <div className="staff_login_form_wrapper">
                            <div>
                                <h6>Log Into Your Account</h6>
                                 <p>Welcome Back, Have a nice Rides </p>
                            </div>
                            <Form onSubmit={submitLoginForm}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" onChange={(event) => handleLoginForm(event)} placeholder="Email.." name="email"/>
                                </Form.Group>
                                <Form.Group className="mt-4">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" onChange={(event) => handleLoginForm(event)} placeholder="Password" name="password"/>
                                </Form.Group>
                                <Form.Group className="mt-4 d-flex justify-content-center">
                                  {
                                      loadingcom ? <Button type="submit" className="button_login"><span><Spinner animation="border" variant="dark" style={{width:'0.9rem', height:'0.9rem',paddingLeft:'8px'}} /></span><span>Loading...</span></Button> :<Button type="submit" className="button_login">Login</Button>
                                  }

                                </Form.Group>
                            </Form>
                        </div>
                    </Col>

                </Row>
            </Container>
        </section>
        </>
    )

}

export default HrLogin