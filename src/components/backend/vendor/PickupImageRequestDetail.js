import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {Row, Col, Image, Card,Button} from 'react-bootstrap';
import {AiFillDelete} from 'react-icons/ai';
import {getMessageDetail,getRequestImageDetail,getRequestEntryDetail} from "../../../redux/actions/vendor";
import logoImage from "../../../logo.svg";
import { SRLWrapper } from "simple-react-lightbox";
import useWindowSize from "../../../use-window-size";

const PickupImageRequestDetail = () =>{

     const history = useHistory();
     const dispatch = useDispatch();
     const location = useLocation();
      const vendor = useSelector((state) => state.vendor);
     const requestImageDetail=vendor.requestImageDetail;
      const requestEntryDetails=vendor.requestEntryDetail;
     const[pickupRequestID,setPickupRequestID]=useState(location.state?.PickupRequestID);
     useEffect(()=>{
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        // console.log(staff_admin);
        if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }
        getAllImageDetail();

    },[0]);
    const getRequestDetail=(id)=>{
      history.push({
           pathname: '/vendor/pickup_detail',
           state: {pickupID: id }
       });
    }
    const deleteImagePickup=(img_id)=>{
        axios.delete(`/partner/remove/request/image/${img_id}`)
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data);
                      getAllImageDetail();
                    })
            .catch((err)=>{
               console.log(err.response);
               console.log('image Error');
            })
    }
    const getAllImageDetail=()=>{
        let id = location.state.PickupRequestID;
        axios.get(`/partner/my/pickup/request/detail/${id}`)
                    .then((res)=>{
                        dispatch(getRequestImageDetail(res.data.pickup_by_image));
                        dispatch(getRequestEntryDetail(res.data.pickup))
                    })
            .catch((err)=>{
               console.log(err.response);
               console.log('image Error');
            })
    }
    const windowsSize = useWindowSize();
  const isMobile=576;
  console.log(windowsSize);
   if (windowsSize.width<=isMobile) {
       return (
           <>
               <SRLWrapper>
                   {
                       requestEntryDetails.length ?
                           <>
                               {
                                   requestImageDetail.length ?
                                       <>
                                           <Row className="pt-0 pb-2 mb-2 pl-2 pr-2" style={{
                                               maxHeight: '42vh',
                                               overflowY: 'auto',
                                               overflowX: 'hidden',
                                               paddingLeft: '10px',
                                               paddingRight: '10px'
                                           }}>
                                               {
                                                   requestImageDetail.map((items, index) => (
                                                       <>
                                                           <Col xs={4} className="pt-2">
                                                               <div style={{
                                                                   borderStyle: 'dashed',
                                                                   border: '1px dashed #000'
                                                               }}>
                                                                   {/*<div style={{position:'relative',display:'flex',width:'100%'}}>*/}
                                                                   <Button variant="outline-danger" style={{padding:'0px',fontSize:'15px',color:'transparent',zIndex:'99'}} onClick={(event)=>deleteImagePickup(items.id)}><AiFillDelete style={{color:'red'}} /></Button>

                                                                   <a href={items.img_url}
                                                                      style={{display: 'flex', position: 'relative'}}>
                                                                       <img src={items.img_url}
                                                                            className="img-fluid"/>
                                                                       <div style={{
                                                                           position: 'absolute',
                                                                           top: '0px',
                                                                           width: '50px',
                                                                           backgroundColor: '#ffd125',
                                                                           display: 'grid',
                                                                           placeContent: 'center',
                                                                           borderRadius: '15px'
                                                                       }}>
                                                                           01
                                                                       </div>
                                                                       {/*<div style={{position:'absolute',display:'flex',top:'10px',right:'10px',width:'100%'}}>*/}
                                                                       {/*    <Button variant="danger" onClick={()=>deleteImagePickup()}>delete</Button>*/}
                                                                       {/*</div>*/}
                                                                   </a>

                                                                   {/*</div>*/}
                                                               </div>
                                                           </Col>
                                                       </>
                                                   ))

                                               }
                                           </Row>


                                       </> :
                                       <>

                                       </>
                               }
                           </> :
                           <>
                               {
                                   requestImageDetail.length ?
                                       <>
                                           <Row className="pt-0 pb-2 mb-2 pl-2 pr-2" style={{
                                               maxHeight: '81vh',
                                               overflowY: 'auto',
                                               overflowX: 'hidden',
                                               paddingLeft: '10px',
                                               paddingRight: '10px'
                                           }}>
                                               {
                                                   requestImageDetail.map((items, index) => (
                                                       <>
                                                           <Col xs={4} className="pt-2">
                                                               <div style={{
                                                                   borderStyle: 'dashed',
                                                                   border: '1px dashed #000'
                                                               }}>
                                                                   <Button variant="outline-danger" style={{padding:'0px',fontSize:'15px',color:'transparent',zIndex:'99'}} onClick={(event)=>deleteImagePickup(items.id)}><AiFillDelete style={{color:'red'}} /></Button>
                                                                   <a href={items.img_url}
                                                                      style={{display: 'flex', position: 'relative'}}>
                                                                       <img src={items.img_url}
                                                                            className="img-fluid"/>
                                                                       <div style={{
                                                                           position: 'absolute',
                                                                           top: '0px',
                                                                           width: '50px',
                                                                           backgroundColor: '#ffd125',
                                                                           display: 'grid',
                                                                           placeContent: 'center',
                                                                           borderRadius: '15px'
                                                                       }}>
                                                                           01
                                                                       </div>
                                                                        <div style={{position:'absolute',display:'flex',top:'10px',left:'76px',width:'100%',}}>
                                                                       </div>
                                                                   </a>
                                                               </div>
                                                           </Col>
                                                       </>
                                                   ))

                                               }
                                           </Row>


                                       </> :
                                       <>
                                           <div style={{
                                               height: '30vh',
                                               display: 'grid',
                                               placeContent: 'center',
                                               fontSize: '16px',
                                               fontWeight: '500'
                                           }}>No Orders Here...
                                           </div>

                                       </>
                               }
                           </>

                   }


               </SRLWrapper>
               {
                   requestImageDetail.length ?
                       <>
                           <Row style={{
                               height: '37vh',
                               overflowY: 'auto',
                               overflowX: 'hidden',
                               paddingLeft: '7px',
                               paddingRight: '7px'
                           }}>
                               <Col xs={12}>
                                   {requestEntryDetails.length ?
                                       <>

                                           {requestEntryDetails.map((items) => (
                                               <>
                                                   <Card onClick={(e) => {
                                                       e.preventDefault();
                                                       getRequestDetail(items.id)
                                                   }}>
                                                       <Card.Body className="p-0">
                                                           <Row>
                                                               <Col xs={3} className="pl-0 pr-0">
                                                                   <Image src={logoImage} roundedCircle/>
                                                               </Col>
                                                               <Col xs={9}
                                                                    style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                                   <Row>
                                                                       <Col xs={12}>
                                                                           <div style={{
                                                                               display: 'grid',
                                                                               height: '32px',
                                                                               alignContent: 'center'
                                                                           }}>
                                                                               <h6 className="mb-0">{items.tex_code}<span
                                                                                   style={{
                                                                                       fontSize: '15px',
                                                                                       fontWeight: '500',
                                                                                       paddingLeft: '5px'
                                                                                   }}>(COD Rs.{items.cod})</span></h6>
                                                                           </div>
                                                                           <div>
                                                                               <Row>
                                                                                   <Col xs={6}>
                                                                                       <span
                                                                                           style={{fontSize: '15px'}}>{items.customer?.length > 13 ? <>
                                                                                           <span>{items.customer.substring(0, 13)}...</span></> : <>
                                                                                           <span>{items.customer}</span></>}</span>
                                                                                   </Col>
                                                                                   <Col xs={6}>
                                                                                       <span
                                                                                           style={{fontSize: '14px'}}>Status: {items.status}</span>
                                                                                   </Col>
                                                                               </Row>

                                                                           </div>
                                                                       </Col>

                                                                   </Row>
                                                                   <div className="pt-2">
                                                                       {/*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*/}

                                                                   </div>
                                                                   <div>
                                                                       {/*<p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                                                                   </div>
                                                                   {/*<div>*/}
                                                                   {/*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*/}

                                                                   {/*</div>*/}
                                                                   {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                                               </Col>
                                                           </Row>
                                                       </Card.Body>
                                                   </Card>
                                               </>
                                           ))}

                                       </> :
                                       <>
                                       </>
                                   }
                               </Col>

                           </Row>

                       </> :
                       <>
                           <Row style={{
                               height: '81vh',
                               overflowY: 'auto',
                               overflowX: 'hidden',
                               paddingLeft: '7px',
                               paddingRight: '7px'
                           }}>
                               <Col xs={12}>
                                   {requestEntryDetails.length ?
                                       <>

                                           {requestEntryDetails.map((items) => (
                                               <>
                                                   <Card onClick={(e) => {
                                                       e.preventDefault();
                                                       getRequestDetail(items.id)
                                                   }}>
                                                       <Card.Body className="p-0">
                                                           <Row>
                                                               <Col xs={3} className="pl-0 pr-0">
                                                                   <Image src={logoImage} roundedCircle/>
                                                               </Col>
                                                               <Col xs={9}
                                                                    style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                                   <Row>
                                                                       <Col xs={12}>
                                                                           <div style={{
                                                                               display: 'grid',
                                                                               height: '32px',
                                                                               alignContent: 'center'
                                                                           }}>
                                                                               <h6 className="mb-0">{items.tex_code}<span
                                                                                   style={{
                                                                                       fontSize: '15px',
                                                                                       fontWeight: '500',
                                                                                       paddingLeft: '5px'
                                                                                   }}>(COD Rs.{items.cod})</span></h6>
                                                                           </div>
                                                                           <div>
                                                                               <Row>
                                                                                   <Col xs={6}>
                                                                                       <span
                                                                                           style={{fontSize: '15px'}}>{items.customer?.length > 13 ? <>
                                                                                           <span>{items.customer.substring(0, 13)}...</span></> : <>
                                                                                           <span>{items.customer}</span></>}</span>
                                                                                   </Col>
                                                                                   <Col xs={6}>
                                                                                       <span
                                                                                           style={{fontSize: '14px'}}>Status: {items.status}</span>
                                                                                   </Col>
                                                                               </Row>

                                                                           </div>
                                                                       </Col>

                                                                   </Row>
                                                                   <div className="pt-2">
                                                                       {/*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*/}

                                                                   </div>
                                                                   <div>
                                                                       {/*<p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                                                                   </div>
                                                                   {/*<div>*/}
                                                                   {/*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*/}

                                                                   {/*</div>*/}
                                                                   {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                                               </Col>
                                                           </Row>
                                                       </Card.Body>
                                                   </Card>
                                               </>
                                           ))}

                                       </> :
                                       <>
                                       </>
                                   }
                               </Col>

                           </Row>

                       </>
               }
               {/*<Card onClick={(e)=>{e.preventDefault(); getRequestDetail(2)}}>*/}
               {/*     <Card.Body className="p-0">*/}
               {/*         <Row>*/}
               {/*             <Col xs={3} className="pl-0 pr-0">*/}
               {/*                 <Image src={logoImage} roundedCircle />*/}
               {/*             </Col>*/}
               {/*             <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
               {/*                 <Row>*/}
               {/*                     <Col xs={8}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <h6 className="mb-1">Product Name<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>(Tex Code)</span></h6>*/}
               {/*                         </div>*/}
               {/*                     </Col>*/}
               {/*                     <Col xs={4}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <div onClick={(event)=>getRequestDetail(2)}>*/}
               {/*                                   <GrView size={25} />*/}
               {/*                             </div>*/}

               {/*                         </div>*/}
               {/*                         /!*<h6>view Button</h6>*!/*/}
               {/*                     </Col>*/}
               {/*                 </Row>*/}
               {/*                 <div className="pt-2">*/}
               {/*                     /!*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*!/*/}

               {/*                 </div>*/}
               {/*                  <div>*/}
               {/*                      /!*<p style={{fontSize:'15px'}}>Recent Message Show</p>*!/*/}

               {/*                 </div>*/}
               {/*                 /!*<div>*!/*/}
               {/*                 /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

               {/*                 /!*</div>*!/*/}
               {/*                 /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
               {/*             </Col>*/}
               {/*         </Row>*/}
               {/*     </Card.Body>*/}
               {/*  </Card>*/}
               {/*<Card onClick={(e)=>{e.preventDefault(); getRequestDetail(2)}}>*/}
               {/*     <Card.Body className="p-0">*/}
               {/*         <Row>*/}
               {/*             <Col xs={3} className="pl-0 pr-0">*/}
               {/*                 <Image src={logoImage} roundedCircle />*/}
               {/*             </Col>*/}
               {/*             <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
               {/*                 <Row>*/}
               {/*                     <Col xs={8}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <h6 className="mb-1">Product Name<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>(Tex Code)</span></h6>*/}
               {/*                         </div>*/}
               {/*                     </Col>*/}
               {/*                     <Col xs={4}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <div onClick={(event)=>getRequestDetail(2)}>*/}
               {/*                                   <GrView size={25} />*/}
               {/*                             </div>*/}

               {/*                         </div>*/}
               {/*                         /!*<h6>view Button</h6>*!/*/}
               {/*                     </Col>*/}
               {/*                 </Row>*/}
               {/*                 <div className="pt-2">*/}
               {/*                     /!*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*!/*/}

               {/*                 </div>*/}
               {/*                  <div>*/}
               {/*                      /!*<p style={{fontSize:'15px'}}>Recent Message Show</p>*!/*/}

               {/*                 </div>*/}
               {/*                 /!*<div>*!/*/}
               {/*                 /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

               {/*                 /!*</div>*!/*/}
               {/*                 /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
               {/*             </Col>*/}
               {/*         </Row>*/}
               {/*     </Card.Body>*/}
               {/*  </Card>*/}
               {/* <Card onClick={(e)=>{e.preventDefault(); getRequestDetail(2)}}>*/}
               {/*     <Card.Body className="p-0">*/}
               {/*         <Row>*/}
               {/*             <Col xs={3} className="pl-0 pr-0">*/}
               {/*                 <Image src={logoImage} roundedCircle />*/}
               {/*             </Col>*/}
               {/*             <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
               {/*                 <Row>*/}
               {/*                     <Col xs={8}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <h6 className="mb-1">Product Name<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>(Tex Code)</span></h6>*/}
               {/*                         </div>*/}
               {/*                     </Col>*/}
               {/*                     <Col xs={4}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <div onClick={(event)=>getRequestDetail(2)}>*/}
               {/*                                   <GrView size={25} />*/}
               {/*                             </div>*/}

               {/*                         </div>*/}
               {/*                         /!*<h6>view Button</h6>*!/*/}
               {/*                     </Col>*/}
               {/*                 </Row>*/}
               {/*                 <div className="pt-2">*/}
               {/*                     /!*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*!/*/}

               {/*                 </div>*/}
               {/*                  <div>*/}
               {/*                      /!*<p style={{fontSize:'15px'}}>Recent Message Show</p>*!/*/}

               {/*                 </div>*/}
               {/*                 /!*<div>*!/*/}
               {/*                 /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

               {/*                 /!*</div>*!/*/}
               {/*                 /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
               {/*             </Col>*/}
               {/*         </Row>*/}
               {/*     </Card.Body>*/}
               {/*  </Card>*/}
               {/* <Card onClick={(e)=>{e.preventDefault(); getRequestDetail(2)}}>*/}
               {/*     <Card.Body className="p-0">*/}
               {/*         <Row>*/}
               {/*             <Col xs={3} className="pl-0 pr-0">*/}
               {/*                 <Image src={logoImage} roundedCircle />*/}
               {/*             </Col>*/}
               {/*             <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
               {/*                 <Row>*/}
               {/*                     <Col xs={8}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <h6 className="mb-1">Product Name<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>(Tex Code)</span></h6>*/}
               {/*                         </div>*/}
               {/*                     </Col>*/}
               {/*                     <Col xs={4}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <div onClick={(event)=>getRequestDetail(2)}>*/}
               {/*                                   <GrView size={25} />*/}
               {/*                             </div>*/}

               {/*                         </div>*/}
               {/*                         /!*<h6>view Button</h6>*!/*/}
               {/*                     </Col>*/}
               {/*                 </Row>*/}
               {/*                 <div className="pt-2">*/}
               {/*                     /!*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*!/*/}

               {/*                 </div>*/}
               {/*                  <div>*/}
               {/*                      /!*<p style={{fontSize:'15px'}}>Recent Message Show</p>*!/*/}

               {/*                 </div>*/}
               {/*                 /!*<div>*!/*/}
               {/*                 /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

               {/*                 /!*</div>*!/*/}
               {/*                 /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
               {/*             </Col>*/}
               {/*         </Row>*/}
               {/*     </Card.Body>*/}
               {/*  </Card>*/}
               {/* <Card onClick={(e)=>{e.preventDefault(); getRequestDetail(2)}}>*/}
               {/*     <Card.Body className="p-0">*/}
               {/*         <Row>*/}
               {/*             <Col xs={3} className="pl-0 pr-0">*/}
               {/*                 <Image src={logoImage} roundedCircle />*/}
               {/*             </Col>*/}
               {/*             <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
               {/*                 <Row>*/}
               {/*                     <Col xs={8}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <h6 className="mb-1">Product Name<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>(Tex Code)</span></h6>*/}
               {/*                         </div>*/}
               {/*                     </Col>*/}
               {/*                     <Col xs={4}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <div onClick={(event)=>getRequestDetail(2)}>*/}
               {/*                                   <GrView size={25} />*/}
               {/*                             </div>*/}

               {/*                         </div>*/}
               {/*                         /!*<h6>view Button</h6>*!/*/}
               {/*                     </Col>*/}
               {/*                 </Row>*/}
               {/*                 <div className="pt-2">*/}
               {/*                     /!*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*!/*/}

               {/*                 </div>*/}
               {/*                  <div>*/}
               {/*                      /!*<p style={{fontSize:'15px'}}>Recent Message Show</p>*!/*/}

               {/*                 </div>*/}
               {/*                 /!*<div>*!/*/}
               {/*                 /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

               {/*                 /!*</div>*!/*/}
               {/*                 /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
               {/*             </Col>*/}
               {/*         </Row>*/}
               {/*     </Card.Body>*/}
               {/*  </Card>*/}


           </>
       );
   }else{
       return (
           <>
               <SRLWrapper>
                   {
                       requestEntryDetails.length ?
                           <>
                               {
                                   requestImageDetail.length ?
                                       <>
                                           <Row className="pt-0 pb-2 mb-2 pl-2 pr-2" style={{
                                               maxHeight: '42vh',
                                               overflowY: 'auto',
                                               overflowX: 'hidden',
                                               paddingLeft: '10px',
                                               paddingRight: '10px'
                                           }}>
                                               {
                                                   requestImageDetail.map((items, index) => (
                                                       <>
                                                           <Col xs={4} className="pt-2">
                                                               <div style={{
                                                                   borderStyle: 'dashed',
                                                                   border: '1px dashed #000'
                                                               }}>
                                                                   <Button variant="outline-danger" style={{padding:'0px',fontSize:'15px',color:'transparent',zIndex:'99'}} onClick={(event)=>deleteImagePickup(items.id)}><AiFillDelete style={{color:'red'}} /></Button>

                                                                   <a href={items.img_url}
                                                                      style={{display: 'flex', position: 'relative'}}>
                                                                       <img src={items.img_url}
                                                                            className="img-fluid"/>
                                                                       <div style={{
                                                                           position: 'absolute',
                                                                           top: '0px',
                                                                           width: '50px',
                                                                           backgroundColor: '#ffd125',
                                                                           display: 'grid',
                                                                           placeContent: 'center',
                                                                           borderRadius: '15px'
                                                                       }}>
                                                                           01
                                                                       </div>
                                                                   </a>
                                                               </div>
                                                           </Col>
                                                       </>
                                                   ))

                                               }
                                           </Row>


                                       </> :
                                       <>

                                       </>
                               }
                           </> :
                           <>
                               {
                                   requestImageDetail.length ?
                                       <>
                                           <Row className="pt-0 pb-2 mb-2 pl-2 pr-2" style={{
                                               maxHeight: '81vh',
                                               overflowY: 'auto',
                                               overflowX: 'hidden',
                                               paddingLeft: '10px',
                                               paddingRight: '10px'
                                           }}>
                                               {
                                                   requestImageDetail.map((items, index) => (
                                                       <>
                                                           <Col xs={4} className="pt-2">
                                                               <div style={{
                                                                   borderStyle: 'dashed',
                                                                   border: '1px dashed #000'
                                                               }}>
                                                                   <Button variant="outline-danger" style={{padding:'0px',fontSize:'15px',color:'transparent',zIndex:'99'}} onClick={(event)=>deleteImagePickup(items.id)}><AiFillDelete style={{color:'red'}} /></Button>
                                                                   <a href={items.img_url}
                                                                      style={{display: 'flex', position: 'relative'}}>
                                                                       <img src={items.img_url}
                                                                            className="img-fluid"/>
                                                                       <div style={{
                                                                           position: 'absolute',
                                                                           top: '0px',
                                                                           width: '50px',
                                                                           backgroundColor: '#ffd125',
                                                                           display: 'grid',
                                                                           placeContent: 'center',
                                                                           borderRadius: '15px'
                                                                       }}>
                                                                           01
                                                                       </div>
                                                                   </a>
                                                               </div>
                                                           </Col>
                                                       </>
                                                   ))

                                               }
                                           </Row>


                                       </> :
                                       <>
                                           <div style={{
                                               height: '30vh',
                                               display: 'grid',
                                               placeContent: 'center',
                                               fontSize: '16px',
                                               fontWeight: '500'
                                           }}>No Orders Here...
                                           </div>

                                       </>
                               }
                           </>

                   }


               </SRLWrapper>
               {
                   requestImageDetail.length ?
                       <>
                           <Row style={{
                               height: '37vh',
                               overflowY: 'auto',
                               overflowX: 'hidden',
                               paddingLeft: '7px',
                               paddingRight: '7px'
                           }}>
                               <Col xs={12}>
                                   {requestEntryDetails.length ?
                                       <>

                                           {requestEntryDetails.map((items) => (
                                               <>
                                                   <Card onClick={(e) => {
                                                       e.preventDefault();
                                                       getRequestDetail(items.id)
                                                   }}>
                                                       <Card.Body className="p-0">
                                                           <Row>
                                                               <Col lg={2} className="pl-0 pr-0">
                                                                   <Image src={logoImage} roundedCircle className="img-fluid" style={{height:'60px'}}/>
                                                               </Col>
                                                               <Col lg={10}
                                                                    style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                                   <Row>
                                                                       <Col xs={12}>
                                                                           <div style={{
                                                                               display: 'grid',
                                                                               height: '32px',
                                                                               alignContent: 'center'
                                                                           }}>
                                                                               <h6 className="mb-0">{items.tex_code}<span
                                                                                   style={{
                                                                                       fontSize: '15px',
                                                                                       fontWeight: '500',
                                                                                       paddingLeft: '5px'
                                                                                   }}>(COD Rs.{items.cod})</span></h6>
                                                                           </div>
                                                                           <div>
                                                                               <Row>
                                                                                   <Col xs={6}>
                                                                                       <span
                                                                                           style={{fontSize: '15px'}}>{items.customer?.length > 13 ? <>
                                                                                           <span>{items.customer.substring(0, 13)}...</span></> : <>
                                                                                           <span>{items.customer}</span></>}</span>
                                                                                   </Col>
                                                                                   <Col xs={6}>
                                                                                       <span
                                                                                           style={{fontSize: '14px'}}>Status: {items.status}</span>
                                                                                   </Col>
                                                                               </Row>

                                                                           </div>
                                                                       </Col>

                                                                   </Row>
                                                                   <div className="pt-2">
                                                                       {/*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*/}

                                                                   </div>
                                                                   <div>
                                                                       {/*<p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                                                                   </div>
                                                                   {/*<div>*/}
                                                                   {/*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*/}

                                                                   {/*</div>*/}
                                                                   {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                                               </Col>
                                                           </Row>
                                                       </Card.Body>
                                                   </Card>
                                               </>
                                           ))}

                                       </> :
                                       <>
                                       </>
                                   }
                               </Col>

                           </Row>

                       </> :
                       <>
                           <Row style={{
                               height: '81vh',
                               overflowY: 'auto',
                               overflowX: 'hidden',
                               paddingLeft: '7px',
                               paddingRight: '7px'
                           }}>
                               <Col xs={12}>
                                   {requestEntryDetails.length ?
                                       <>

                                           {requestEntryDetails.map((items) => (
                                               <>
                                                   <Card onClick={(e) => {
                                                       e.preventDefault();
                                                       getRequestDetail(items.id)
                                                   }}>
                                                       <Card.Body className="p-0">
                                                           <Row>
                                                               <Col xs={2} className="pl-0 pr-0">
                                                                   <Image src={logoImage} roundedCircle className="img-fluid" style={{height:'60px'}}/>
                                                               </Col>
                                                               <Col xs={10}
                                                                    style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                                   <Row>
                                                                       <Col xs={12}>
                                                                           <div style={{
                                                                               display: 'grid',
                                                                               height: '32px',
                                                                               alignContent: 'center'
                                                                           }}>
                                                                               <h6 className="mb-0">{items.tex_code}<span
                                                                                   style={{
                                                                                       fontSize: '15px',
                                                                                       fontWeight: '500',
                                                                                       paddingLeft: '5px'
                                                                                   }}>(COD Rs.{items.cod})</span></h6>
                                                                           </div>
                                                                           <div>
                                                                               <Row>
                                                                                   <Col xs={6}>
                                                                                       <span
                                                                                           style={{fontSize: '15px'}}>{items.customer?.length > 13 ? <>
                                                                                           <span>{items.customer.substring(0, 13)}...</span></> : <>
                                                                                           <span>{items.customer}</span></>}</span>
                                                                                   </Col>
                                                                                   <Col xs={6}>
                                                                                       <span
                                                                                           style={{fontSize: '14px'}}>Status: {items.status}</span>
                                                                                   </Col>
                                                                               </Row>

                                                                           </div>
                                                                       </Col>

                                                                   </Row>
                                                                   <div className="pt-2">
                                                                       {/*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*/}

                                                                   </div>
                                                                   <div>
                                                                       {/*<p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                                                                   </div>
                                                                   {/*<div>*/}
                                                                   {/*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*/}

                                                                   {/*</div>*/}
                                                                   {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                                               </Col>
                                                           </Row>
                                                       </Card.Body>
                                                   </Card>
                                               </>
                                           ))}

                                       </> :
                                       <>
                                       </>
                                   }
                               </Col>

                           </Row>

                       </>
               }
               {/*<Card onClick={(e)=>{e.preventDefault(); getRequestDetail(2)}}>*/}
               {/*     <Card.Body className="p-0">*/}
               {/*         <Row>*/}
               {/*             <Col xs={3} className="pl-0 pr-0">*/}
               {/*                 <Image src={logoImage} roundedCircle />*/}
               {/*             </Col>*/}
               {/*             <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
               {/*                 <Row>*/}
               {/*                     <Col xs={8}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <h6 className="mb-1">Product Name<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>(Tex Code)</span></h6>*/}
               {/*                         </div>*/}
               {/*                     </Col>*/}
               {/*                     <Col xs={4}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <div onClick={(event)=>getRequestDetail(2)}>*/}
               {/*                                   <GrView size={25} />*/}
               {/*                             </div>*/}

               {/*                         </div>*/}
               {/*                         /!*<h6>view Button</h6>*!/*/}
               {/*                     </Col>*/}
               {/*                 </Row>*/}
               {/*                 <div className="pt-2">*/}
               {/*                     /!*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*!/*/}

               {/*                 </div>*/}
               {/*                  <div>*/}
               {/*                      /!*<p style={{fontSize:'15px'}}>Recent Message Show</p>*!/*/}

               {/*                 </div>*/}
               {/*                 /!*<div>*!/*/}
               {/*                 /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

               {/*                 /!*</div>*!/*/}
               {/*                 /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
               {/*             </Col>*/}
               {/*         </Row>*/}
               {/*     </Card.Body>*/}
               {/*  </Card>*/}
               {/*<Card onClick={(e)=>{e.preventDefault(); getRequestDetail(2)}}>*/}
               {/*     <Card.Body className="p-0">*/}
               {/*         <Row>*/}
               {/*             <Col xs={3} className="pl-0 pr-0">*/}
               {/*                 <Image src={logoImage} roundedCircle />*/}
               {/*             </Col>*/}
               {/*             <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
               {/*                 <Row>*/}
               {/*                     <Col xs={8}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <h6 className="mb-1">Product Name<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>(Tex Code)</span></h6>*/}
               {/*                         </div>*/}
               {/*                     </Col>*/}
               {/*                     <Col xs={4}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <div onClick={(event)=>getRequestDetail(2)}>*/}
               {/*                                   <GrView size={25} />*/}
               {/*                             </div>*/}

               {/*                         </div>*/}
               {/*                         /!*<h6>view Button</h6>*!/*/}
               {/*                     </Col>*/}
               {/*                 </Row>*/}
               {/*                 <div className="pt-2">*/}
               {/*                     /!*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*!/*/}

               {/*                 </div>*/}
               {/*                  <div>*/}
               {/*                      /!*<p style={{fontSize:'15px'}}>Recent Message Show</p>*!/*/}

               {/*                 </div>*/}
               {/*                 /!*<div>*!/*/}
               {/*                 /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

               {/*                 /!*</div>*!/*/}
               {/*                 /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
               {/*             </Col>*/}
               {/*         </Row>*/}
               {/*     </Card.Body>*/}
               {/*  </Card>*/}
               {/* <Card onClick={(e)=>{e.preventDefault(); getRequestDetail(2)}}>*/}
               {/*     <Card.Body className="p-0">*/}
               {/*         <Row>*/}
               {/*             <Col xs={3} className="pl-0 pr-0">*/}
               {/*                 <Image src={logoImage} roundedCircle />*/}
               {/*             </Col>*/}
               {/*             <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
               {/*                 <Row>*/}
               {/*                     <Col xs={8}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <h6 className="mb-1">Product Name<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>(Tex Code)</span></h6>*/}
               {/*                         </div>*/}
               {/*                     </Col>*/}
               {/*                     <Col xs={4}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <div onClick={(event)=>getRequestDetail(2)}>*/}
               {/*                                   <GrView size={25} />*/}
               {/*                             </div>*/}

               {/*                         </div>*/}
               {/*                         /!*<h6>view Button</h6>*!/*/}
               {/*                     </Col>*/}
               {/*                 </Row>*/}
               {/*                 <div className="pt-2">*/}
               {/*                     /!*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*!/*/}

               {/*                 </div>*/}
               {/*                  <div>*/}
               {/*                      /!*<p style={{fontSize:'15px'}}>Recent Message Show</p>*!/*/}

               {/*                 </div>*/}
               {/*                 /!*<div>*!/*/}
               {/*                 /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

               {/*                 /!*</div>*!/*/}
               {/*                 /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
               {/*             </Col>*/}
               {/*         </Row>*/}
               {/*     </Card.Body>*/}
               {/*  </Card>*/}
               {/* <Card onClick={(e)=>{e.preventDefault(); getRequestDetail(2)}}>*/}
               {/*     <Card.Body className="p-0">*/}
               {/*         <Row>*/}
               {/*             <Col xs={3} className="pl-0 pr-0">*/}
               {/*                 <Image src={logoImage} roundedCircle />*/}
               {/*             </Col>*/}
               {/*             <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
               {/*                 <Row>*/}
               {/*                     <Col xs={8}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <h6 className="mb-1">Product Name<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>(Tex Code)</span></h6>*/}
               {/*                         </div>*/}
               {/*                     </Col>*/}
               {/*                     <Col xs={4}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <div onClick={(event)=>getRequestDetail(2)}>*/}
               {/*                                   <GrView size={25} />*/}
               {/*                             </div>*/}

               {/*                         </div>*/}
               {/*                         /!*<h6>view Button</h6>*!/*/}
               {/*                     </Col>*/}
               {/*                 </Row>*/}
               {/*                 <div className="pt-2">*/}
               {/*                     /!*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*!/*/}

               {/*                 </div>*/}
               {/*                  <div>*/}
               {/*                      /!*<p style={{fontSize:'15px'}}>Recent Message Show</p>*!/*/}

               {/*                 </div>*/}
               {/*                 /!*<div>*!/*/}
               {/*                 /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

               {/*                 /!*</div>*!/*/}
               {/*                 /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
               {/*             </Col>*/}
               {/*         </Row>*/}
               {/*     </Card.Body>*/}
               {/*  </Card>*/}
               {/* <Card onClick={(e)=>{e.preventDefault(); getRequestDetail(2)}}>*/}
               {/*     <Card.Body className="p-0">*/}
               {/*         <Row>*/}
               {/*             <Col xs={3} className="pl-0 pr-0">*/}
               {/*                 <Image src={logoImage} roundedCircle />*/}
               {/*             </Col>*/}
               {/*             <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
               {/*                 <Row>*/}
               {/*                     <Col xs={8}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <h6 className="mb-1">Product Name<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>(Tex Code)</span></h6>*/}
               {/*                         </div>*/}
               {/*                     </Col>*/}
               {/*                     <Col xs={4}>*/}
               {/*                         <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
               {/*                             <div onClick={(event)=>getRequestDetail(2)}>*/}
               {/*                                   <GrView size={25} />*/}
               {/*                             </div>*/}

               {/*                         </div>*/}
               {/*                         /!*<h6>view Button</h6>*!/*/}
               {/*                     </Col>*/}
               {/*                 </Row>*/}
               {/*                 <div className="pt-2">*/}
               {/*                     /!*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*!/*/}

               {/*                 </div>*/}
               {/*                  <div>*/}
               {/*                      /!*<p style={{fontSize:'15px'}}>Recent Message Show</p>*!/*/}

               {/*                 </div>*/}
               {/*                 /!*<div>*!/*/}
               {/*                 /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

               {/*                 /!*</div>*!/*/}
               {/*                 /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
               {/*             </Col>*/}
               {/*         </Row>*/}
               {/*     </Card.Body>*/}
               {/*  </Card>*/}


           </>
       );
   }
}
export default PickupImageRequestDetail