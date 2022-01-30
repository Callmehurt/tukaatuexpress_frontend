import React, {useEffect, useState} from "react";
import {Container, Row, Col, Form, Button, Image, Spinner} from "react-bootstrap";
import ganeshPic from '../../../assets/ganesh.png';
import axios from "axios";
import {branchAuthenticate} from "../../../redux/actions/branchAuthenticate";
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
import Loginimage from "../../../assets/hanuman.png";
import showNotification from "../includes/notification";


const BranchLoginPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [loadingcom,setLoadingcom]=useState(false);

    useEffect(() => {
        const branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
        if(branch_detail){
            dispatch(branchAuthenticate(branch_detail.user));
            history.push('/branch/dashboard');
        }else {
            setLoadingFuncFalse();
            history.push('/branch/login');
        }
    },[]);

  const setLoadingFuncFalse=()=>{
        setLoadingcom(false);
    }
    const [formField, setFormField] = useState({
        email: '',
        password:''
    });

    const handleLoginForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
    }

    const handleBranchLogin = async (event) => {
        event.preventDefault();
          setLoadingcom(true);
        await axios.post('/branch/login', formField)
            .then((res) => {
                 if(res.data.status=true) {
                     dispatch(branchAuthenticate(res.data.user));
                     const branch_detail = {
                         user: res.data.user,
                         token: res.data.access_token
                     }
                     localStorage.setItem('branch_detail', JSON.stringify(branch_detail));
                     history.push('/branch/dashboard');
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
            });
    }


    return (
        <>
             <section className="staffLogin">
                 <Container className="staffLogin_cont">
                    <Row className="justify-content-center">
                        <Col lg={6} className="loginimg_part">
                            {/*<div className="branch_login_area">*/}
                            {/*    <div className="loginFlex">*/}
                            {/*        <div className="childFlex">*/}
                            {/*            <img src={ganeshPic} alt=""/>*/}
                            {/*        </div>*/}
                            {/*        <div className="childFlex">*/}
                            {/*            <p>Login</p>*/}
                            {/*            <div className="input_field">*/}
                            {/*                <Form onSubmit={(event) => handleBranchLogin(event)}>*/}
                            {/*                    <Form.Group>*/}
                            {/*                        <Form.Control type="email" name="email" onInput={(event) => handleLoginForm(event)} placeholder="Phone number" />*/}
                            {/*                    </Form.Group>*/}
                            {/*                    <Form.Group className="mt-3">*/}
                            {/*                        <Form.Control type="password" name="password" onInput={(event) => handleLoginForm(event)} placeholder="Enter your password" />*/}
                            {/*                    </Form.Group>*/}
                            {/*                    <Form.Group className="mt-3">*/}
                            {/*                        <Button type="submit">Login</Button>*/}
                            {/*                    </Form.Group>*/}
                            {/*                </Form>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="image_holder"><Image src={ganeshPic} className="img-fluid" rounded /></div>
                        </Col>
                        <Col lg={6} className="loginform_part">
                             <div className="staff_login_form_wrapper">
                                 <div>
                                    <h6>Log Into Your Account</h6>
                                     <p>Welcome Back, Have a nice day </p>
                                 </div>
                                 <Form onSubmit={(event) => handleBranchLogin(event)}>
                                        <Form.Group>
                                            <Form.Control type="email" name="email" onInput={(event) => handleLoginForm(event)} placeholder="Phone number" />
                                        </Form.Group>
                                        <Form.Group className="mt-3">
                                            <Form.Control type="password" name="password" onInput={(event) => handleLoginForm(event)} placeholder="Enter your password" />
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

export default BranchLoginPage;