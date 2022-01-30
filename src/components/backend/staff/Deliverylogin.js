import React, {useState,useEffect} from "react";
import {Container, Row, Col, Button, Form,Image,Spinner} from "react-bootstrap";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {deliveryStaffAuthenticate} from "../../../redux/actions/deliveryStaffAuthenticate";

import Loginimage from '../../../assets/hanuman.png';



const Deliverylogin = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loadingcom,setLoadingcom]=useState(false);
    useEffect(() => {
         const staff = JSON.parse(localStorage.getItem('staff_delivery'));
         console.log(staff);
        if(staff){
            dispatch(deliveryStaffAuthenticate(staff.user));
            switch(staff.user.roles[0].name) {

            case 'delivery':

                history.push('/staff/delivery/dashboard');
                break;
            default:
                history.push('/delivery/login');
          }
        }

    }, []);

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
                const staff = {
                    token: res.data.access_token,
                    user: res.data.user
                }
                switch(staff.user.roles[0].name) {

                    case 'delivery':
                        console.log(staff.user.roles[0].name);
                        dispatch(deliveryStaffAuthenticate(res.data.user));
                        localStorage.setItem('staff_delivery', JSON.stringify(staff));
                        history.push('/staff/delivery/dashboard');
                        break;
                    default:
                        history.push('/staff/login');
                  }


            })
            .catch((err) => {
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
                                 <p>Welcome Back, Have a nice Rides </p>
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

export default Deliverylogin;