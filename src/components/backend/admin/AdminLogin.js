import React, {useState,useEffect} from "react";
import {Container, Row, Col, Button, Form,Image,Spinner} from "react-bootstrap";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Loginimage from '../../../assets/hanuman.png';
import {MainAdminAuthenticate} from "../../../redux/actions/MainAdminAuthenticate";

const AdminLogin = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loadingcom,setLoadingcom]=useState(false);
    const [formField, setFormField] = useState({
        email: '',
        password:''
    });
    useEffect(() => {
          const mainAdmin = JSON.parse(localStorage.getItem('main_admin'));
          if(mainAdmin){
            dispatch(MainAdminAuthenticate(mainAdmin.user));
            switch(mainAdmin.user.name) {
            case 'Admin':
                  history.push('/mainadmin/dashboard');
                break;
            default:
                history.push('/main_admin');
          }
        }
        else{
          setLoadingFuncFalse();
        }



    });
    const setLoadingFuncFalse=()=>{
        setLoadingcom(false);
    }
    const handleLoginForm = event => {
        console.log(event.target.name);
        setLoadingcom(true);
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
    }

    const submitLoginForm = async (event) => {
        event.preventDefault();
        setLoadingcom(true);
        console.log(formField);
        const data = await axios.post('/admin/login', formField)
        .then((res) => {
            console.log(res);
            const mainAdmin = {
                    token: res.data.access_token,
                    user: res.data.branch
                }

            if(mainAdmin.user.name==='Admin'){
                 localStorage.setItem('main_admin',JSON.stringify(mainAdmin));
                 dispatch(MainAdminAuthenticate(mainAdmin.user));
                  history.push('/mainadmin/dashboard');



            }else{
                history.push('/main_admin');
            }
        })
        .catch((err) => {
            setLoadingcom(false);
            console.log(err.response);
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
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="text" onChange={(event) => handleLoginForm(event)} placeholder="Email..." name="email"/>
                                    </Form.Group>
                                    <Form.Group className="mt-4">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" onChange={(event) => handleLoginForm(event)} placeholder="Password" name="password"/>
                                    </Form.Group>
                                    <Form.Group className="mt-4 d-flex justify-content-center">
                                      {
                                          loadingcom ? <Button type="submit" className="button_login" style={{cursor:'no-drop'}}><span><Spinner animation="border" variant="dark" style={{width:'0.9rem', height:'0.9rem',paddingLeft:'8px'}} /></span><span>Loading...</span></Button> :<Button type="submit" className="button_login">Login</Button>
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

export default AdminLogin;