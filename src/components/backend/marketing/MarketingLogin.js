import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Image, Row, Spinner} from "react-bootstrap";
import Loginimage from "../../../assets/hanuman.png";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";
import {marketingAuthenticate} from "./../../../redux/actions/Marketing"

const MarketingLogin=()=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const [loadingCom,setLoadingCom]=useState(false);
    const [formField, setFormField] = useState({
            phone:'',
            password:'',
    });
     useEffect(() => {

     })

 const handleLoginForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
 }
const submitLoginForm = async (event) => {
         console.log(formField);
          event.preventDefault();
          setLoadingCom(true);
          axios.post('/marketing/staff/login', formField)
           .then((res) => {
                  console.log(res);
                  const marketingAdmin = {
                    token: res.data.access_token,
                    user: res.data.user
                  }
                  dispatch(marketingAuthenticate(res.data.user));
                   localStorage.setItem('marketingAdmin', JSON.stringify(marketingAdmin));
                  history.push('/marketing/dashboard');

                 })
           .catch((err) => {
                console.log(err.response);
            })

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
                                <h6>Log Into Your Marketing Account</h6>
                                 <p>Welcome Back, Have a Day. </p>
                            </div>
                            <Form onSubmit={submitLoginForm}>
                                <Form.Group>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="number" onChange={(event) => handleLoginForm(event)} placeholder="Phone Number" name="phone"/>
                                </Form.Group>
                                <Form.Group className="mt-4">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" onChange={(event) => handleLoginForm(event)} placeholder="Password" name="password"/>
                                </Form.Group>
                                <Form.Group className="mt-4 d-flex justify-content-center">
                                  {
                                      loadingCom ? <Button type="submit" className="button_login"><span><Spinner animation="border" variant="dark" style={{width:'0.9rem', height:'0.9rem',paddingLeft:'8px'}} /></span><span>Loading...</span></Button> :<Button type="submit" className="button_login">Login</Button>
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
export default MarketingLogin