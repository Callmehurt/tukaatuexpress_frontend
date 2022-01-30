import React, {useState,useEffect} from "react";
import {Container, Row, Col, Button, Form,Image,Spinner} from "react-bootstrap";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
// import {deliveryStaffAuthenticate} from "../../../redux/actions/deliveryStaffAuthenticate";
import {adminStaffAuthenticate} from "../../../redux/actions/adminStaffAuthenticate";
import Loginimage from '../../../assets/hanuman.png';
import showNotification from "../includes/notification";

const StaffLoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [loadingcom,setLoadingcom]=useState(false);

    useEffect(() => {
         const staff = JSON.parse(localStorage.getItem('staff_admin'));

        if(staff){
            dispatch(adminStaffAuthenticate(staff.user));
            switch(staff.user.roles[0].name) {
            case 'admin':
                  history.push('/staff/admin/dashboard');
                break;
            default:
                history.push('/admin/login');
          }
        }
        else{
            setLoadingFuncFalse();
        }

    });

    const setLoadingFuncFalse=()=>{
        setLoadingcom(false);
    }

    const [formField, setFormField] = useState({
        phone: '',
        password:''
    });
  

    const handleLoginForm = event => {
        setLoadingcom(true);
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
    }

    const submitLoginForm = async (event) => {
        event.preventDefault();
       setLoadingcom(true);
        const data = await axios.post('/staff/login', formField)
            .then((res) => {
                 if(res.data.status=true) {
                     const staff = {
                         token: res.data.access_token,
                         user: res.data.user
                     }
                     switch (staff.user.roles[0].name) {
                         case 'admin':
                             dispatch(adminStaffAuthenticate(res.data.user));
                             localStorage.setItem('staff_admin', JSON.stringify(staff));
                             history.push('/staff/admin/dashboard');

                         default:
                             history.push('/admin/login');
                     }
                 }
                 else{
                      showNotification('danger', res.data.message);
                       setLoadingcom(false);
                 }

            })
            .catch((err) => {
                console.log(err.response);
                if(err.response.status==422){
                    if(err.response.data.message.isArray){
                        let messages=err.response.data.message;
                        console.log(messages);
                        let allMessages=messages.toString();
                         // messages.map((items,index)=>{
                         //     console.log(items);
                         //        // showNotification('danger', items[index]);
                         //     })
                         showNotification('danger', allMessages);
                          setLoadingcom(false);
                    }else{
                         showNotification('danger', err.response.data.message);
                          setLoadingcom(false);
                    }

                }
                if(err.response.status==401){
                    if(err.response.data.message.isArray){
                        let messages=err.response.data.message;
                        console.log(messages);
                        let allMessages=messages.toString();
                         // messages.map((items,index)=>{
                         //     console.log(items);
                         //        // showNotification('danger', items[index]);
                         //     })
                         showNotification('danger', allMessages);
                          setLoadingcom(false);
                    }else{
                         showNotification('danger', err.response.data.message);
                          setLoadingcom(false);
                    }

                }
            })
    }
    
    return (
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
                                 <p>Welcome Back, Have a nice day </p>
                            </div>
                            <Form onSubmit={submitLoginForm}>
                                <Form.Group>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="number" onChange={(event) => handleLoginForm(event)} placeholder="Phone number" name="phone"/>
                                </Form.Group>
                                <Form.Group className="mt-4">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" onChange={(event) => handleLoginForm(event)} placeholder="Password" name="password"/>
                                </Form.Group>
                                <Form.Group className="mt-4 d-flex justify-content-center">
                                  {
                                      loadingcom ? <Button type="submit" className="button_login" style={{cursor:'no-drop'}}><span><Spinner animation="border" variant="dark" style={{width:'0.9rem', height:'0.9rem',paddingLeft:'8px'}} /></span><span>Loading...</span></Button> : <Button type="submit" className="button_login">Login</Button>
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

export default StaffLoginPage;