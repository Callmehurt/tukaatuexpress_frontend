import React, {useEffect} from 'react';
import {Row,Col,Container,Button} from 'react-bootstrap';
import useWindowSize from './../../../use-window-size';
import {Link, useHistory, useLocation} from "react-router-dom";
import {AiOutlineLeft,AiOutlineMessage} from 'react-icons/ai';
import {BiUserCircle,BiMessageSquareEdit} from 'react-icons/bi';
import {BsInfoCircle} from 'react-icons/bs';
import {AiOutlineHome} from 'react-icons/ai'
import {VscBellDot} from 'react-icons/vsc';
import{FiSave,FiMoreVertical} from 'react-icons/fi';

import {useSelector} from "react-redux";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";


const VendorMobileHeader=()=>{
    const history = useHistory();
     const location=useLocation();
     const windowsSize = useWindowSize();
    const isMobile=576;
     const vendor = useSelector((state) => state.vendor);
     const pickupMessageDetail=vendor.pickupMessageDetail;
     useEffect(()=>{
         let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
         // console.log(vendorDetail);
        // console.log('staff_admin');
        //  console.log('hello use');
         if (vendorDetail) {
            setAuthorizationToken(vendorDetail.token);
         }
         // console.log(location.pathname);
     });
     const singlePickupDetail = vendor.singlePickupDetail;
     const enterMessage=()=>{
        history.push({
           pathname: '/vendor/message_detail',
           state: {messageID: singlePickupDetail.id }
       });
     }
     const getOrderDetail=(id)=>{
        history.push({
           pathname: '/vendor/pickup_detail',
           state: {pickupID: id }
       });

    }
     const getUpdateProfile=(id)=>{
        console.log(id);
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        let VendorUserDetail= vendorDetail.user;
        // console.log(VendorUserDetail);
        // console.log('VendorUserDetail');
        history.push({
           pathname: '/vendor/edit/profile',
           state: {updateProfileUrl:VendorUserDetail }
       });
    }
     if (windowsSize.width<=isMobile) {

         return(
            <>

            <section style={{height:'70px',position:'fixed',top:'0',width:'100%',backgroundColor:'#377196',color:'#fff',borderBottomRightRadius:'35px',borderBottomLeftRadius:'35px',zIndex:'10'}}>
                    <Container>
                        <Row>
                            {/*<Col xs={2}>*/}
                            {/*    <div  style={{display:'grid',placeContent:'center',height:'70px'}}>*/}
                            {/*     <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>*/}
                            {/*    </div>*/}
                            {/*</Col>*/}
                            {/*<Col xs={6}>*/}
                            {/*    <div  style={{display:'grid',placeContent:'center',height:'70px'}}>*/}
                            {location.pathname?
                                <>
                                   {
                                      (()=> {
                                        switch (location.pathname) {
                                          case '/vendor/dashboard': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} > <AiOutlineHome size={25} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                          <h6 className="pt-2">Home</h6>
                                                             </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>
                                              </>
                                          );
                                          case '/vendor/returns_area': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                          <h6 className="pt-2">All Returns</h6>
                                                             </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>
                                              </>
                                          );
                                          case '/vendor/hold_area': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                          <h6 className="pt-2">All Holds</h6>
                                                             </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>
                                              </>
                                          );
                                          case '/vendor/pickup_detail': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                              {/*<h6 className="pt-2">Order Details</h6>*/}
                                                              <h6 className="pt-2">{singlePickupDetail.tex_code}</h6>
                                                             </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                          <a onClick={()=>enterMessage()}><AiOutlineMessage size={30} /></a>
                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                           {/*<BiUserCircle size={30} />*/}
                                                        </div>
                                                    </Col>

                                              </>
                                          );
                                          case '/vendor/pickup_area': return (
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                           <h6 className="pt-2">On Process Orders</h6>
                                                         </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                       <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                          <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>

                                              </>
                                          );
                                          case '/vendor/partner_orders': return (
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                           <h6 className="pt-2">All Orders</h6>
                                                         </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                       <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                          <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>

                                              </>
                                          );
                                          case '/vendor/account': return (
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                            <h6 className="pt-2">Account</h6>
                                                         </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                           <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>

                                              </>
                                          );
                                          case '/vendor/request_image': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <h6 className="pt-2">Pick up request</h6>
                                                         </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>

                                              </>
                                          );
                                          case '/vendor/message_list': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                              <h6 className="pt-2">Message List</h6>
                                                         </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                       <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>

                                              </>
                                          );
                                          case '/vendor/message_detail': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             {/*{pickupMessageDetail ?*/}
                                                             {/*    <>*/}
                                                             {/*         <h6 className="pt-2">{pickupMessageDetail[0].texcode}</h6>*/}
                                                             {/*    </> :*/}
                                                             {/*    <>*/}
                                                             {/*         <h6 className="pt-2">Message Detail</h6>*/}
                                                             {/*    </>*/}
                                                             {/*}*/}
                                                                      <h6 className="pt-2">Message Detail</h6>

                                                         </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             {/*<Link to="/vendor/profile" style={{color:'#fff',}}><FiMoreVertical size={30} /></Link>*/}
                                                            <span onClick={(event)=>{getOrderDetail(pickupMessageDetail[0]?.pickup_id)}} style={{color:'#fff',}}><BsInfoCircle size={26} /></span>

                                                        </div>
                                                    </Col>

                                              </>
                                          );
                                          case '/vendor/profile': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                                <h6 className="pt-2">Profile</h6>
                                                         </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                            <Link  style={{color:'#fff',}} onClick={(event)=>getUpdateProfile()}><BiMessageSquareEdit size={30} /></Link>
                                                        </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>


                                              </>
                                          );
                                          case '/vendor/all_customer': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                                <h6 className="pt-2">Customers</h6>
                                                         </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>

                                                        </div>
                                                    </Col>


                                              </>
                                          );
                                          case '/vendor/edit/profile': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                                <h6 className="pt-2">Profile Edit</h6>
                                                         </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                            {/*<Link to="/vendor/edit/profile" style={{color:'#fff',}}><FiSave size={30} /></Link>*/}
                                                        </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                       <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>


                                              </>
                                          );
                                          case '/vendor/notification': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                                <h6 className="pt-2">Notification</h6>
                                                         </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>


                                              </>
                                          );
                                          case '/vendor/request_pickup': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                                <h6 className="pt-2">Create/ Update Order </h6>

                                                         </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>


                                              </>
                                          );
                                          case '/vendor/add_customer': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                                <h6 className="pt-2">Add Customer</h6>
                                                         </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>


                                              </>
                                          );
                                           case '/vendor/Pickup_request_area': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                                <h6 className="pt-2">All Request List</h6>
                                                         </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>


                                              </>
                                          );
                                           case '/vendor/Pickup_request_images': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                                <h6 className="pt-2">All Image Request</h6>
                                                         </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>


                                              </>
                                          );
                                          default:;
                                        }
                                      })()
                                    }
                                </>:
                                <>

                                    <Col xs={2}>
                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} > <AiOutlineHome size={25} /></Button>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                          <h6 className="pt-2">Home</h6>
                                                             </div>
                                                    </Col>
                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                    <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>
                                </>
                            }

                                   {/*<h6 style={{fontSize:'18px',fontWeight:'500'}}>Dashboard</h6>*/}
                        </Row>
                    </Container>
            </section>
        </>
         )
     }
     else{
        return(
            <>
             <Container>
                <Row>
                     <Col md={3} style={{width:'30%',backgroundColor:'red'}}>

                     </Col>
                     <Col md={6} style={{width:'40%'}}>
                         <div style={{display:'flex',placeContent:'center'}}>
                            <section style={{height:'70px',position:'fixed',width:'46%',top:'0',backgroundColor:'#377196',color:'#fff',borderBottomRightRadius:'35px',borderBottomLeftRadius:'35px',zIndex:'10'}}>
                            <Container>
                              <Row>
                            {/*<Col xs={2}>*/}
                            {/*    <div  style={{display:'grid',placeContent:'center',height:'70px'}}>*/}
                            {/*     <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>*/}
                            {/*    </div>*/}
                            {/*</Col>*/}
                            {/*<Col xs={6}>*/}
                            {/*    <div  style={{display:'grid',placeContent:'center',height:'70px'}}>*/}
                                    {
                                      (()=> {
                                        switch (location.pathname) {
                                          case '/vendor/dashboard': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} > <AiOutlineHome size={25} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                          <h6 className="pt-2">Home</h6>
                                                             </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>
                                              </>
                                          );
                                          case '/vendor/returns_area': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                          <h6 className="pt-2">All Returns</h6>
                                                             </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>
                                              </>
                                          );
                                          case '/vendor/hold_area': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                          <h6 className="pt-2">All Holds</h6>
                                                             </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>
                                              </>
                                          );
                                          case '/vendor/pickup_detail': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                              <h6 className="pt-2">{singlePickupDetail.tex_code}</h6>
                                                             </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                          <a onClick={()=>enterMessage()}><AiOutlineMessage size={30} /></a>
                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                           {/*<BiUserCircle size={30} />*/}
                                                        </div>
                                                    </Col>

                                              </>
                                          );
                                          case '/vendor/pickup_area': return (
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                           <h6 className="pt-2">On Process Orders</h6>
                                                         </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                       <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                          <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>

                                              </>
                                          );
                                          case '/vendor/partner_orders': return (
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                           <h6 className="pt-2">All Orders</h6>
                                                         </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                       <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                          <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>

                                              </>
                                          );
                                          case '/vendor/account': return (
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                            <h6 className="pt-2">Account</h6>
                                                         </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                           <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>

                                              </>
                                          );
                                          case '/vendor/request_image': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <h6 className="pt-2">Pick up request</h6>
                                                         </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>

                                              </>
                                          );
                                          case '/vendor/message_list': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                              <h6 className="pt-2">Message List</h6>
                                                         </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                       <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>

                                              </>
                                          );
                                          case '/vendor/message_detail': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>

                                                             {/*{pickupMessageDetail ?*/}
                                                             {/*    <>*/}
                                                             {/*        {pickupMessageDetail[0].tex_code?*/}
                                                             {/*            <>*/}
                                                             {/*                <h6 className="pt-2">{pickupMessageDetail[0].texcode}</h6>*/}
                                                             {/*            </>:*/}
                                                             {/*            <>*/}
                                                             {/*                <h6 className="pt-2">Error TEX code</h6>*/}
                                                             {/*            </>*/}
                                                             {/*        }*/}

                                                             {/*    </> :*/}
                                                             {/*    <>*/}
                                                             {/*         <h6 className="pt-2">Message Detail</h6>*/}
                                                             {/*    </>*/}
                                                             {/*}*/}
                                                                       <h6 className="pt-2">Message Detail</h6>
                                                         </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>

                                              </>
                                          );
                                          case '/vendor/profile': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                                <h6 className="pt-2">Profile</h6>
                                                         </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                            <Link  style={{color:'#fff',}} onClick={(event)=>getUpdateProfile()}><BiMessageSquareEdit size={30} /></Link>
                                                        </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>


                                              </>
                                          );
                                          case '/vendor/edit/profile': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                                <h6 className="pt-2">Profile Edit</h6>
                                                         </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                            {/*<Link to="/vendor/edit/profile" style={{color:'#fff',}}><FiSave size={30} /></Link>*/}
                                                        </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                       <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>


                                              </>
                                          );
                                          case '/vendor/notification': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                                <h6 className="pt-2">Notification</h6>
                                                         </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>


                                              </>
                                          );
                                          case '/vendor/request_pickup': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                                <h6 className="pt-2">Create/ Update Order </h6>

                                                         </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>


                                              </>
                                          );
                                          case '/vendor/add_customer': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                                <h6 className="pt-2">Add Customer</h6>
                                                         </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>


                                              </>
                                          );
                                           case '/vendor/Pickup_request_area': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                                <h6 className="pt-2">All Request List</h6>
                                                         </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>


                                              </>
                                          );
                                           case '/vendor/Pickup_request_images': return(
                                              <>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                         <Button variant="link" style={{backgroundColor:'transparent',border:'none',textDecoration:'none',color:'#fff'}} onClick={() => history.goBack()}> <AiOutlineLeft size={28} /></Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                         <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                                <h6 className="pt-2">All Image Request</h6>
                                                         </div>
                                                    </Col>
                                                  <Col xs={2}>
                                                        <div  style={{display:'grid',position:'relative',placeContent:'center',height:'70px',}}>
                                                            <Link  style={{color:'#fff',}}> <VscBellDot size={30} /></Link>
                                                            {/*<div style={{display:'grid',position:'absolute',placeContent:'center',height:'30px',width:'30px',borderRadius:'50%',backgroundColor:'red',top:'10px',left:'15px',alignItems:'center'}}>*/}
                                                            {/*      <p style={{fontSize:'14px',display:'grid',placeContent:'center',textAlign:'center',paddingTop:'15px'}}>20</p>*/}
                                                            {/*</div>*/}

                                                        </div>
                                                    </Col>

                                                    <Col xs={2}>
                                                        <div  style={{display:'grid',placeContent:'center',height:'70px'}}>
                                                             <Link to="/vendor/profile" style={{color:'#fff',}}><BiUserCircle size={30} /></Link>
                                                        </div>
                                                    </Col>


                                              </>
                                          );
                                          default:;
                                        }
                                      })()
                                    }
                                   {/*<h6 style={{fontSize:'18px',fontWeight:'500'}}>Dashboard</h6>*/}
                        </Row>
                            </Container>
                         </section>
                         </div>
                     </Col>
                     <Col md={3} style={{width:'30%',backgroundColor:'red'}}>

                     </Col>
                </Row>
            </Container>
            </>
        )
     }


}
export default VendorMobileHeader