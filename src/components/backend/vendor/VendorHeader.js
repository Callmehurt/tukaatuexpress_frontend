import React, {useEffect} from 'react';
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {vendorAuthenticate} from "../../../redux/actions/vendorAuthenticate";
import {RiDashboard2Fill} from "react-icons/ri";

const VendorHeader=()=>{
     const history = useHistory();
     const dispatch = useDispatch();
     const location = useLocation();
     const vendorAuth = useSelector((state) => state.vendorAuth);
     const vendorUser=vendorAuth.user;
     const logoutVendor=()=>{
         // console.log('logoutVendor');
         let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        if(vendorDetail){
             localStorage.removeItem('vendorDetail');
             dispatch(vendorAuthenticate(''));
             history.push('/');

          }
     }
     const headerData=[
        {url:'/vendor/dashboard',name:'Dashboard'},
         {url:'/vendor/Pickup_request_area',name:'Pickup Request'},
         {url:'/vendor/pickup_area',name:'All Pickup'},
        {url:'/vendor/account',name:'Account'},
         {url:'/vendor/message_list',name:'Message'},




    ];

    return(
        <>
            <section className="staffheader">
                <Container fluid>
                    <Row>
                        <Col md={10}>
                            {/*<div style={{color:'#fff',}}>Tukaatu Services Private Limited.</div>*/}
                        </Col>
                        <Col md={2}>
                            <div className="d-flex justify-content-end">
                                <Dropdown>
                                      <Dropdown.Toggle  id="dropdown-basic" style={{backgroundColor:'transparent',boxShadow:'none',borderColor:'transparent'}}>
                                          { vendorUser.vendor_name.length>13 ? <> Admin:<span>{vendorUser.vendor_name.substring(0,13)}...</span></>: <> Admin:<span>{vendorUser.vendor_name}</span></> }
                                        {/*Admin:<span>{adminStaffName.name.substring(0,13)}</span>*/}
                                          {/*Admin: <span style={{display:''}}>Dhurba Chaudhary</span>*/}
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item style={{fontSize:'14px',letterSpacing:'0px'}}>Profile</Dropdown.Item>
                                        <Dropdown.Item style={{fontSize:'14px',letterSpacing:'0px'}}>Setting</Dropdown.Item>
                                        <Dropdown.Item onClick={(event)=>{ logoutVendor();}} style={{fontSize:'14px',letterSpacing:'0px'}}>Log Out</Dropdown.Item>
                                      </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="control_area">
                <Container fluid>
                    <Row>
                        <Col md={12}>
                             <nav>
                              <ul>
                               {headerData.map((headerData) => (
                              <>
                                   {(location.pathname===headerData.url)?
                              <li style={{backgroundColor:'#ffd125'}}>
                              <Link to={headerData.url}>
                              <div >
                              <div className="d-flex justify-content-center" style={{color:'#377298'}}>
                              <RiDashboard2Fill className="icon_style" size={25} />
                              </div>

                              <div style={{color:'#377298',fontSize:'14px'}}>{headerData.name}</div>
                              </div>

                              </Link>
                              </li>:<li>
                              <Link to={headerData.url}>
                              <div>
                              <div className="d-flex justify-content-center">
                              <RiDashboard2Fill className="icon_style" size={25} />
                              </div>

                              <div className="title_style">{headerData.name}</div>
                              </div>

                              </Link>
                              </li>

                          }
                              </>
                          ))
                          }

                              </ul>
                            </nav>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
export default VendorHeader