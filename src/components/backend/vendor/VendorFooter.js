import React from 'react';
import useWindowSize from './../../../use-window-size';
import {Container,Row,Col} from 'react-bootstrap';
import {Link, useHistory, useLocation} from "react-router-dom";
import {IoMdAddCircleOutline,IoMdAddCircle} from 'react-icons/io';
import{BsCollection,BsCollectionFill} from 'react-icons/bs';
import {AiOutlineCheckCircle,AiOutlineMessage,AiOutlineDashboard,AiFillDashboard,AiFillMessage} from 'react-icons/ai';
import {MdAccountBalanceWallet,} from 'react-icons/md';
import {VscBellDot} from 'react-icons/vsc'
const VendorFooter=()=>{
     const location=useLocation();
    const windowsSize = useWindowSize();
     const isMobile=576;
     console.log(windowsSize);
    if(windowsSize.width<=isMobile){
    return (
      <>
          <section style={{height:'50px',backgroundColor:'#377196',position:'fixed',bottom:'0',width:'100%'}}>
             <Container >
                 <Row>
                     <Col style={{width:'20%',}}>
                          <div className="" style={{display:'grid',placeContent:'center',height:'50px'}}>
                               {location.pathname==='/vendor/dashboard'?
                               <>
                                   <Link to="/vendor/dashboard"> <AiFillDashboard size={30} style={{color:'#ffd125'}} /></Link>

                               </>:
                               <>
                                   <Link to="/vendor/dashboard"> <AiOutlineDashboard size={30} style={{color:'#ffd125'}} /></Link>

                               </>
                               }

                          </div>
                     </Col>


                      <Col style={{width:'20%',}}>
                          <div className="" style={{display:'grid',placeContent:'center',height:'50px'}}>

                             <Link to="/vendor/pickup_area">
                                 {/*<AiOutlineCheckCircle size={30} style={{color:'#fff'}} />*/}
                                 { location.pathname === '/vendor/pickup_area' ?
                                     <>
                                         <BsCollectionFill size={25} style={{color:'#ffd125'}} />
                                     </> :
                                     <>
                                         <BsCollection size={25} style={{color:'#ffd125'}} />
                                     </>
                                 }

                             </Link>
                          </div>
                     </Col>
                      <Col style={{width:'20%',}}>
                          <div className="" style={{display:'grid',placeContent:'center',height:'50px'}}>
                               <Link to="/vendor/Pickup_request_area">

                                   { location.pathname === '/vendor/Pickup_request_area' ?
                                     <>
                                         <IoMdAddCircle size={40} style={{color:'#ffd125'}} />
                                     </> :
                                     <>
                                          <IoMdAddCircleOutline size={40} style={{color:'#ffd125'}} />

                                     </>
                                 }
                              {/*<IoMdAddCircleOutline size={40} style={{color:'#fff'}} />*/}
                               </Link>
                          </div>
                     </Col>
                     <Col style={{width:'20IoMdAddCircle%',}}>
                          <div className="" style={{display:'grid',placeContent:'center',height:'50px'}}>
                              <Link to="/vendor/account">
                                  <MdAccountBalanceWallet size={28} style={{color:'#ffd125'}} />
                                  {/*<MdOutlineAccountBalanceWallet />*/}
                                  {/*<IoMdAddCircleOutline size={40} style={{color:'#fff'}} />*/}

                              </Link>
                          </div>
                     </Col>
                      <Col style={{width:'20%'}}>
                          <div className="" style={{display:'grid',placeContent:'center',height:'50px'}}>
                              <Link to="/vendor/message_list">
                                  {location.pathname === '/vendor/message_list' ?
                                      <>
                                          <AiFillMessage size={30} style={{color:'#ffd125'}} />
                                          {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'#f2c010',bottom:'15px',right:'9px',alignItems:'center',zIndex:'3'}}>*/}
                                          {/*  <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                          {/*</div>*/}
                                      </> :
                                      <>
                                          <AiOutlineMessage size={30} style={{color:'#ffd125'}} />
                                          {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'#f2c010',bottom:'15px',right:'9px',alignItems:'center',zIndex:'3'}}>*/}
                                          {/*  <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                          {/*</div>*/}
                                      </>
                                  }
                              </Link>
                          </div>
                     </Col>
                 </Row>
             </Container>
          </section>
      </>
    );
  }
    else{
      return (
          <>
               <Container>
                   <Row>
                       <Col md={3} style={{width:'27%',backgroundColor:'red'}}>

                       </Col>
                        <Col md={6} style={{width:'46%'}}>
                            <div style={{display:'flex',placeContent:'center'}}>
                               <section style={{height:'50px',backgroundColor:'#377196',position:'fixed',bottom:'0',width:'46%'}}>
             <Container >
                 <Row>
                     <Col style={{width:'20%',}}>
                          <div className="" style={{display:'grid',placeContent:'center',height:'50px'}}>
                               {location.pathname==='/vendor/dashboard'?
                               <>
                                   <Link to="/vendor/dashboard"> <AiFillDashboard size={30} style={{color:'#ffd125'}} /></Link>

                               </>:
                               <>
                                   <Link to="/vendor/dashboard"> <AiOutlineDashboard size={30} style={{color:'#ffd125'}} /></Link>

                               </>
                               }

                          </div>
                     </Col>


                      <Col style={{width:'20%',}}>
                          <div className="" style={{display:'grid',placeContent:'center',height:'50px'}}>

                             <Link to="/vendor/pickup_area">
                                 {/*<AiOutlineCheckCircle size={30} style={{color:'#fff'}} />*/}
                                 { location.pathname === '/vendor/pickup_area' ?
                                     <>
                                         <BsCollectionFill size={25} style={{color:'#ffd125'}} />
                                     </> :
                                     <>
                                         <BsCollection size={25} style={{color:'#ffd125'}} />
                                     </>
                                 }

                             </Link>
                          </div>
                     </Col>
                      <Col style={{width:'20%',}}>
                          <div className="" style={{display:'grid',placeContent:'center',height:'50px'}}>
                               <Link to="/vendor/Pickup_request_area">

                                   { location.pathname === '/vendor/Pickup_request_area' ?
                                     <>
                                         <IoMdAddCircle size={40} style={{color:'#ffd125'}} />
                                     </> :
                                     <>
                                          <IoMdAddCircleOutline size={40} style={{color:'#ffd125'}} />

                                     </>
                                 }
                              {/*<IoMdAddCircleOutline size={40} style={{color:'#fff'}} />*/}
                               </Link>
                          </div>
                     </Col>
                     <Col style={{width:'20IoMdAddCircle%',}}>
                          <div className="" style={{display:'grid',placeContent:'center',height:'50px'}}>
                              <Link to="/vendor/account">
                                  <MdAccountBalanceWallet size={28} style={{color:'#ffd125'}} />
                                  {/*<MdOutlineAccountBalanceWallet />*/}
                                  {/*<IoMdAddCircleOutline size={40} style={{color:'#fff'}} />*/}

                              </Link>
                          </div>
                     </Col>
                      <Col style={{width:'20%'}}>
                          <div className="" style={{display:'grid',placeContent:'center',height:'50px',position:'relative'}}>
                              <Link to="/vendor/message_list">
                                  {location.pathname === '/vendor/message_list' ?
                                      <>
                                          <AiFillMessage size={30} style={{color:'#ffd125'}} />
                                          {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'#f2c010',bottom:'15px',left:'50px',alignItems:'center',zIndex:'3'}}>*/}
                                          {/*  <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                          {/*</div>*/}
                                      </> :
                                      <>
                                          <AiOutlineMessage size={30} style={{color:'#ffd125'}} />
                                          {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'#f2c010',bottom:'15px',left:'50px',alignItems:'center',zIndex:'3'}}>*/}
                                          {/*  <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                          {/*</div>*/}
                                      </>
                                  }
                              </Link>


                          </div>
                     </Col>
                 </Row>
             </Container>
          </section>
                            </div>
                        </Col>
                        <Col md={3} style={{width:'27%',backgroundColor:'red'}}>

                       </Col>
                   </Row>
               </Container>
          </>
    );

    }
}
export default VendorFooter