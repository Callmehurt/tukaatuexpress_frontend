import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row,Badge,Modal,Card} from "react-bootstrap";
import {BsSearch} from "react-icons/bs";
import {ImStopwatch} from 'react-icons/im';
import moment from 'moment';
import Map from "./map";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import {vendorAuthenticate} from "../../../redux/actions/vendorAuthenticate";
import {useDispatch} from "react-redux";
import showNotification from "../../backend/includes/notification";
import {AiFillNotification} from 'react-icons/ai';
import zIndex from "@material-ui/core/styles/zIndex";
import {allMessageList} from "../../../redux/actions/vendor";
const PageHome = () => {
     const dispatch = useDispatch();
    const history = useHistory();
    const [formField,setFormField]=useState({
        phone:'',
        password:''
    });
    const[noticeList,setNoticeList]=useState('');
    const[noticeDetail,setNoticeDetail]=useState('');
    const[detailActive,setDetailActive]=useState(false);
     const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const[enableButton,setEnableButton]=useState(false);
    useEffect(()=>{
         const vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        if(vendorDetail){
            dispatch(vendorAuthenticate(vendorDetail.user));
            history.push('/vendor/dashboard');
        }else {
            // setLoadingFuncFalse();
            history.push('/');
        }
        getNoticeList();
        console.log(noticeList);
        console.log(noticeDetail);
    },[]);
    const getNoticeDetail=async(id)=>{

        console.log(id);
        await axios.get(`/notice/${id}`)
            .then((res)=>{
                console.log(res);
                 setNoticeDetail(res.data?.data);

            })
            .catch((err)=>{
               console.log(err.response);
            })
        setDetailActive(true);

    }
    const getNoticeList=async()=>{
      await axios.get('/notice/list')
            .then((res)=>{
                console.log(res);
                setNoticeList(res.data?.data);

            })
            .catch((err)=>{
               console.log(err.response);
            })
    }
    const handleLoginForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
    }
    const handleVendorLogin = async (event) => {
        event.preventDefault();
          // setLoadingcom(true);
        await axios.post('vendor/login', formField)
            .then((res) => {
                if(res.data.status=true){
                     dispatch(vendorAuthenticate(res.data.user));
                    const VendorDetail = {
                        user: res.data.user,
                        token: res.data.access_token
                    }
                    localStorage.setItem('vendorDetail', JSON.stringify(VendorDetail));
                    history.push('/Vendor/dashboard');

                }
                else{
                     showNotification('danger', res.data.message);
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
                    }else{
                         showNotification('danger', err.response.data.message);
                    }

                }
                console.log('in valid');

                console.log(err.response);
            });
    }
    const checkTerms=(event)=>{
       console.log(event.target.checked);
       if(event.target.checked){
          setEnableButton(true);
       }
       else{
          setEnableButton(false);
       }
        console.log("clicked");
    }
    return (
          <>
              <Container>
                  <Row>
                      <Col lg={12} className=" d-flex justify-content-md-end pt-3" style={{color:'white'}}><Button variant="outline-primary" style={{zIndex:'9'}} onClick={handleShow} ><AiFillNotification style={{transform:'rotate(180deg)'}} size={20} /></Button><Badge pill style={{color:'red'}} bg="danger">New</Badge></Col>
                      <Col lg={6} style={{marginTop:'-25px'}}>
                          <div className="tracking_section" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                              <div>
                                  <div className="logo_section">
                                      <img src="https://tukaatudeal.com/front/images/logo.png" alt=""/>
                                  </div>
                                  <div className="input_section">
                                      <h5>Track your Order/ Shipment</h5>
                                      <Form>
                                        <Form.Control type="text" name="tex_code" placeholder="Enter your Order/ Tracking ID" />
                                        <Button><BsSearch/></Button>
                                      </Form>
                                </div>
                            </div>
                         </div>
                      </Col>
                      <Col lg={6} style={{marginTop:'-25px'}}>
                          <div className="login_section" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                              <div className="header_wrap">
                                  <div className="section_header">
                                      <h4>Partner Login</h4>
                                      <div className="divider"></div>
                                  </div>
                              </div>
                              <div className="form_wrapper">
                                  <Form onSubmit={(event) => handleVendorLogin(event)} >
                                      <Form.Group>
                                          <Form.Control type="text" name="phone" placeholder="Phone number" onChange={(event)=>handleLoginForm(event)} />
                                      </Form.Group>
                                      <Form.Group className="mt-4">
                                          <Form.Control type="password" name="password" placeholder="Password" onChange={(event)=>handleLoginForm(event)} />
                                      </Form.Group>
                                      <div className="login_agree_section mt-2">
                                          <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox"  onChange={(event)=>checkTerms(event)} label={<div style={{fontSize:'13px'}}>I agree to the Terms and Privacy Policy</div>} />
                                          </Form.Group>
                                          {/*<input type="checkbox" />*/}
                                          {/*<span>I agree to the Terms and Privacy Policy</span>*/}
                                      </div>
                                      <Form.Group className="mt-2">
                                          {enableButton?
                                              <>
                                                  <div className="d-flex justify-content-center">
                                                    <Button type="submit" variant="secondary" style={{padding:'5px 20px',width:'150px',height:'40px'}}>Sign in</Button>
                                                  </div>
                                              </>:
                                              <>
                                                  <div className="d-flex justify-content-center">
                                                     <Button disabled={true} variant="secondary" style={{padding:'5px 20px',width:'150px',height:'40px',opacity:'0.2'}}>Sign in</Button>
                                                  </div>
                                              </>
                                          }

                                      </Form.Group>
                                  </Form>
                              </div>
                          </div>
                      </Col>
                  </Row>
                  <Row>
                      <Col lg={12}>
                          <div className="home_notice_modal">
                            <Modal className="home_notice_modal" show={show} onHide={handleClose} style={{backgroundColor:'#061618'}}>
                            <Modal.Header >
                                <Row>
                                    <Col lg={12}>
                                        <Modal.Title style={{fontSize:'17px',display:'flex',justifyContent:'center',color:'white'}}>Notices ({noticeList.length})</Modal.Title>
                                    </Col>
                                </Row>
                            </Modal.Header>
                            <Modal.Body className="pt-0 pb-0">
                                {detailActive?
                                    <>
                                        {noticeDetail?
                                            <>
                                                <Row style={{backgroundColor:'#f3eeee'}}>
                                                    <Col lg={12}>
                                                        <h6 className="text-center pt-4" style={{textDecoration:'underline'}}>{noticeDetail.title}</h6>
                                                    </Col>
                                                    <Col lg={12} className="pt-3">
                                                        <p> {noticeDetail.notice}</p>
                                                    </Col>
                                                    <Col lg={12} className="pt-3">
                                                        {/*<p> {noticeDetail.notice}</p>*/}
                                                        <p  className="mb-0 text-end" style={{fontSize:'13px'}}>By Tukaatu Express</p>
                                                    </Col>
                                                </Row>

                                            </>:
                                            <>
                                                <p>Oops Error !!!</p>
                                            </>
                                        }

                                    </>:
                                    <>
                                        {noticeList?
                                        <>
                                            {noticeList.map((items,index) => (
                                                    <>
                                                        <Card onClick={(event)=>getNoticeDetail(items.id)} className="mt-2 mb-2" style={{cursor:'pointer'}}>
                                                          <Card.Body style={{padding:"0.4rem 0.7rem"}}>
                                                              <Row>
                                                                  <Col lg={12}>
                                                                     {items?.notice.substring(0,100)}...
                                                                  </Col>
                                                                  <Col lg={4}>
                                                                      <ImStopwatch size={16} /><span style={{fontSize:'13px'}}>{moment(items?.created_at, "YYYYMMDD").fromNow()}</span>
                                                                  </Col>
                                                              </Row>

                                                              {/*{moment("20111031", "YYYYMMDD").fromNow()}*/}
                                                          </Card.Body>
                                                        </Card>
                                                    </>
                                                ))
                                            }
                                        </>
                                        :
                                        <>

                                        </>

                                    }
                                    </>
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                {detailActive?
                                    <>
                                         <Button variant="secondary" onClick={(event)=>{setDetailActive(false)}}>
                                            Back
                                          </Button>
                                    </>:
                                    <>
                                         <Button variant="secondary" onClick={handleClose}>
                                            Close
                                          </Button>
                                    </>

                                }

                              {/*<Button variant="primary" onClick={handleClose}>*/}
                              {/*  Save Changes*/}
                              {/*</Button>*/}
                            </Modal.Footer>
                          </Modal>
                          </div>
                      </Col>
                  </Row>
              </Container>
              <div className="map_section" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                  <Map/>
              </div>

              </>
    )
}

export default PageHome;