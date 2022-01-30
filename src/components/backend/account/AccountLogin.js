import React, {useState,useEffect} from "react";
import {Container, Row, Col, Button, Form,Image,Spinner} from "react-bootstrap";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {accountAuthenticate} from './../../../redux/actions/accountAuthenticate'
import Loginimage from "../../../assets/hanuman.png";

const AccountLogin = () =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const [loadingcom,setLoadingcom]=useState(false);

     useEffect(() => {
            checkAccount();
    },[]);

     const checkAccount=()=>{
          const AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
          if(AccountStorage){
            dispatch(accountAuthenticate(AccountStorage.user));
            switch(AccountStorage.user.name) {
                case 'Accounts Department':
                      history.push('/account/dashboard');
                    break;
                default:
                    history.push('/account/login');
          }
        }
        else{
            setLoadingFuncFalse();
        }
     }

     const setLoadingFuncFalse =()=>{
        setLoadingcom(false);
    }
    const [formField, setFormField] = useState({
       phone: '',
       password:''
    });

   const handleLoginForm = event => {
        // setLoadingcom(true);
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
   }
   const submitLoginForm = async (event) => {
        event.preventDefault();
        console.log(formField);
        setLoadingcom(true);
        const data = await axios.post('/accountant/login', formField)
            .then((res) => {
                console.log(res);
                const Account = {
                    token: res.data.access_token,
                    user: res.data.account,
                }
                switch(Account.user.name) {
                    case 'Accounts Department':
                        dispatch(accountAuthenticate(Account.user));
                        localStorage.setItem('Account_storage', JSON.stringify(Account));
                        history.push('/account/dashboard');
                        break;

                    default:
                        history.push('/account/login');
                  }

                console.log(Account);

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
export default AccountLogin