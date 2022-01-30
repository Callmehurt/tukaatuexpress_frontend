import React, {useEffect, useState} from 'react';
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {Row, Col, Card, Button} from 'react-bootstrap';
import {DeliveredList, getMessageDetail} from "../../../../../redux/actions/BranchOperation";
import {getSinglePickupDetailOperation,getDetailCoordinate} from './../../../../../redux/actions/BranchOperation';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {AiOutlineLeft} from "react-icons/ai";
import {SiGooglemessages} from 'react-icons/si';
import {FiArrowLeftCircle} from "react-icons/fi";
import SinglePickupMap from "./SinglePickupMap";
import MessageLayout from "../Message/MessageLayout";
const SinglePickupDetail=()=>{
    const thisState = useSelector((state) => state.newpickuplist);
    const singlePickupDetailOperation= thisState.singlePickupDetailOperation;
    const location=useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const[singleDataDisplay,setSingleDataDisplay]=useState('');
     const[messageShow,setMessageShow]=useState('');
   useEffect(()=>{
     let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
        getSingleDetail(location.state?.imageDetail);

   },[]);
    const getSingleDetail=(id)=>{
       console.log(id);
       console.log('Pickup Detail id');
       axios.get(`/admin/pickup/details/${id}`)
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 console.log(res.data.data.packet_name);
                 setSingleDataDisplay(res.data.data);
                  let exactLocation = res.data.coordinate[0];
                  console.log(exactLocation[0]);
                  if(exactLocation[0]===''){
                        console.log('No Location');
                  }
                  else{
                       let splitArray1 = exactLocation[0].split(',', 2);
                       console.log('hello');
                       console.log(splitArray1);
                  }
                  console.log("splitArray1");
                 dispatch(getSinglePickupDetailOperation(res.data.data));
                 dispatch(getDetailCoordinate(res.data.coordinate[0]));
             })
             .catch((err) => {
                 console.log(err.response);
             });
    }
    const getPickupID=(pickup_id)=>{
        console.log(pickup_id);
          console.log("pickup_id");
        // setPickupID(pickupID);
                axios.get(`/admin/get/pickup/comment/${pickup_id}`)
                    .then((res)=>{
                          console.log(res);
                         // showNotification('success', res.data.message);
                          dispatch(getMessageDetail(res.data));
                    })
                .catch((err)=>{
                   console.log(err.response);
                })


       setMessageShow(true);
       // setPickupIdArray(...pickupIdArray, pickupID);
    }
     const onHideMessage=()=>{
          setMessageShow(false);
        }
    return(
        <>
             <MessageLayout  show={messageShow} toggle={onHideMessage} />
            <Row>
                <Col lg={6} className="pt-3">
                    <Button variant="primary" onClick={() => history.goBack()}> <FiArrowLeftCircle size={22} /> Back</Button>
                </Col>
                <Col lg={6} className="pt-3">
                    <div style={{display:'flex',placeContent:'end'}}>
                       <Button variant="primary" onClick={(event)=>getPickupID(singleDataDisplay.id)}> <SiGooglemessages size={22} /> Message</Button>
                    </div>
                </Col>
            </Row>
            <Row className="pl-5 pr-5">
                <Col lg={6}>
                    <Row>
                       <Col lg={12} className="pt-3">
                          <Card>
                        <Card.Header>
                            <div style={{display:'flex',placeContent:'center'}}>
                                <h6 className="mb-0">Product Detail:</h6>
                           </div>
                        </Card.Header>
                       <Card.Body>
                           <div style={{display:'flex',placeContent:'start'}}>
                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Product name:</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.packet_name?<>{singleDataDisplay.packet_name}</>:<></>}</span>
                                   {/*{singlePickupDetailOperation.data.packet_name?*/}
                                   {/*<>*/}
                                   {/*    {singlePickupDetailOperation.data.packet_name}*/}
                                   {/*</>:*/}
                                   {/*<>*/}
                                   {/*</>*/}
                                   {/*}*/}
                               </p>
                           </div>
                           <div style={{display:'flex',placeContent:'start'}}>
                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Product Type:</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.type?<>{singleDataDisplay.type.charAt(0).toUpperCase() + singleDataDisplay.type.slice(1)}</>:<></>}</span>
                                   {/*{singlePickupDetailOperation.data.type?*/}
                                   {/*<>*/}
                                   {/*    {singlePickupDetailOperation.data.type}*/}
                                   {/*</>:*/}
                                   {/*<>*/}
                                   {/*</>*/}
                                   {/*   }*/}
                               </p>
                           </div>
                            <div style={{display:'flex',placeContent:'start'}}>
                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Product Weight:</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.weight?<>{singleDataDisplay.weight} Kg</>:<></>}</span>
                                   {/*{singlePickupDetailOperation.data.weight?*/}
                                   {/*<>*/}
                                   {/*    {singlePickupDetailOperation.data.weight}*/}
                                   {/*</>:*/}
                                   {/*<></>*/}
                                   {/*}*/}
                               </p>
                           </div>
                           <div style={{display:'flex',placeContent:'start'}}>
                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>COD Amount:</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.cod?<>Rs.{singleDataDisplay.cod}</>:<></>}</span>
                               </p>
                          </div>
                            <div style={{display:'flex',placeContent:'start'}}>
                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Delivery Type:</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.weight?<>{singleDataDisplay.weight} Kg</>:<></>}</span>
                               </p>
                          </div>
                           <div style={{display:'flex',placeContent:'start'}}>
                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Product status:</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.status?<>{singleDataDisplay.status.charAt(0).toUpperCase() + singleDataDisplay.status.slice(1)}</>:<></>}</span>
                               </p>
                          </div>


                       </Card.Body>
                    </Card>
                       </Col>
                         <Col lg={12} className="pt-3">
                             <Card>
                               <Card.Header>
                <div style={{display:'flex',placeContent:'center'}}>
                    <h6 className="mb-0">Partner Detail:</h6>
               </div>
            </Card.Header>
                               <Card.Body>
               <div style={{display:'flex',placeContent:'start'}}>
                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Partner Name:</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.vendor_name?<>{singleDataDisplay.vendor_name} </>:<></>}</span>
                               </p>
               </div>
               <div style={{display:'flex',placeContent:'start'}}>
                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Partner Address:</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.vendor_name?<>{singleDataDisplay.vendor_name} </>:<></>}</span>
                               </p>
               </div>
               <div style={{display:'flex',placeContent:'start'}}>
                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Partner Phone:</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.vendor_phone?<>{singleDataDisplay.vendor_phone} </>:<></>}</span>
                               </p>
               </div>


           </Card.Body>
                              </Card>
                          </Col>
                         <Col lg={12} className="pt-3">
                            <Card>
                                 <Card.Header>
                                <div style={{display:'flex',placeContent:'center'}}>
                                    <h6 className="mb-0">Payment Detail:</h6>
                               </div>
                            </Card.Header>
                                   <Card.Body>
                               <div style={{display:'flex',placeContent:'start'}}>
                                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>COD Received
                                                   :</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.payment_status?<>{singleDataDisplay.payment_status.charAt(0).toUpperCase() + singleDataDisplay.payment_status.slice(1)}</>:<></>}</span>
                                               </p>
                               </div>
                               <div style={{display:'flex',placeContent:'start'}}>
                                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Payment Status
                                                   :</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.payment_status?<>{singleDataDisplay.payment_status.charAt(0).toUpperCase() + singleDataDisplay.payment_status.slice(1)}</>:<></>}</span>
                                               </p>
                               </div>
                               <div style={{display:'flex',placeContent:'start'}}>

                                           <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Delivery Charge
                                               :</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.delivery_charge>0?<>{singleDataDisplay.delivery_charge}</>:<>Calculating...</>}</span>
                                               </p>
                               </div>
                               <div style={{display:'flex',placeContent:'start'}}>

                                           <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Delivery Charge From Customer
                                               :</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.dc_receivable_from_customer>0?<>{singleDataDisplay.dc_receivable_from_customer}</>:<>Calculating...</>}</span>
                                               </p>

                               </div>
                               <div style={{display:'flex',placeContent:'start'}}>
                                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Payment Method
                                                   :</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.payment_method?<>{singleDataDisplay.payment_method.charAt(0).toUpperCase() + singleDataDisplay.payment_method.slice(1)}</>:<>Loading...</>}</span>
                                               </p>
                               </div>
                               <div style={{display:'flex',placeContent:'start'}}>
                                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Payment Date
                                                   :</span>
                                                   {/*<span>{singleDataDisplay.payment_method?<>{singleDataDisplay.payment_method}</>:<>Loading...</>}</span>*/}
                                               </p>
                               </div>
                               <div style={{display:'flex',placeContent:'start'}}>
                                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Discount Status
                                                   :</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.discount_status===0?<>None</>:<>Loading...</>}</span>
                                               </p>
                               </div>
                               <div style={{display:'flex',placeContent:'start'}}>
                                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Return Charge
                                                   :</span><span style={{paddingLeft:'10px'}}>{singleDataDisplay.return_charge>0?<>Rs.{singleDataDisplay.return_charge}</>:<>Calculating...</>}</span>
                                               </p>
                               </div>

                           </Card.Body>
                            </Card>
                         </Col>
                    </Row>
                </Col>
                <Col lg={6}>
                    <Row>
                          <Col lg={12} className="pt-3">
                            <Card>
                     <Card.Header>
                            <div style={{display:'flex',placeContent:'center'}}>
                                <h6 className="mb-0">Customer Detail:</h6>
                           </div>
                     </Card.Header>
                     <Card.Body>
                          <div style={{display:'flex',placeContent:'start'}}>
                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Customer name:</span><span>{singleDataDisplay.customer?<>{singleDataDisplay.customer}</>:<></>}</span>
                               </p>
                          </div>
                         <div style={{display:'flex',placeContent:'start'}}>
                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Customer Address:</span><span>{singleDataDisplay.customer_address?<>{singleDataDisplay.customer_address} </>:<></>}</span>
                               </p>
                          </div>
                          <div style={{display:'flex',placeContent:'start'}}>
                               <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Customer Phone:</span><span>{singleDataDisplay.customer_phone?<>{singleDataDisplay.customer_phone} </>:<></>}</span>
                               </p>
                          </div>

                      </Card.Body>
                 </Card>
                          </Col>
                          <Col lg={12} className="pt-3">
                               <Card>
                                <Card.Header>
                    <div style={{display:'flex',placeContent:'center'}}>
                        <h6 className="mb-0">Branch Detail:</h6>

                   </div>
                </Card.Header>
                                <Card.Body>
                   <div style={{display:'flex',placeContent:'start'}}>
                                   <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Branch Name:</span>
                                   </p>
                   </div>

               </Card.Body>
                               </Card>
                          </Col>
                          <Col lg={12} className="pt-3">
                               <Card className="single_pageMap">
                                <Card.Header>
                                    <div style={{display:'flex',placeContent:'center'}}>
                                        <h6 className="mb-0">Exact Location:</h6>

                                   </div>
                                </Card.Header>
                                <Card.Body>
                                   <SinglePickupMap />
                                </Card.Body>
                               </Card>
                          </Col>
                    </Row>
                </Col>
            </Row>
            {/*{ singlePickupDetailOperation.data?*/}
            {/*    <>*/}
            {/*         <Row className="p-5">*/}
            {/*              <Col lg={6} className="pt-3">*/}
            {/*                     <Card>*/}
            {/*            <Card.Header>*/}
            {/*                <div style={{display:'flex',placeContent:'center'}}>*/}
            {/*                    <h6 className="mb-0">Product Detail:</h6>*/}
            {/*               </div>*/}
            {/*            </Card.Header>*/}
            {/*           <Card.Body>*/}
            {/*               <div style={{display:'flex',placeContent:'start'}}>*/}
            {/*                   <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Product name:</span> {singlePickupDetailOperation.data.packet_name}</p>*/}
            {/*               </div>*/}
            {/*               <div style={{display:'flex',placeContent:'start'}}>*/}
            {/*                   <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Product Type:</span> {singlePickupDetailOperation.data.type}</p>*/}
            {/*               </div>*/}
            {/*                <div style={{display:'flex',placeContent:'start'}}>*/}
            {/*                   <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Product Weight:</span> {singlePickupDetailOperation.data.weight}</p>*/}

            {/*               </div>*/}

            {/*           </Card.Body>*/}
            {/*        </Card>*/}
            {/*              </Col>*/}
            {/*              <Col lg={6} className="pt-3">*/}
            {/*                 <Card>*/}
            {/*                     <Card.Header>*/}
            {/*                <div style={{display:'flex',placeContent:'center'}}>*/}
            {/*                    <h6 className="mb-0">Customer Detail:</h6>*/}
            {/*               </div>*/}
            {/*            </Card.Header>*/}
            {/*                     <Card.Body>*/}

            {/*           </Card.Body>*/}
            {/*                 </Card>*/}
            {/*              </Col>*/}
            {/*              <Col lg={6} className="pt-3">*/}
            {/*                <Card>*/}
            {/*            <Card.Header>*/}
            {/*                <div style={{display:'flex',placeContent:'center'}}>*/}
            {/*                    <h6 className="mb-0">Partner Detail:</h6>*/}
            {/*               </div>*/}
            {/*            </Card.Header>*/}
            {/*           <Card.Body>*/}

            {/*           </Card.Body>*/}
            {/*        </Card>*/}
            {/*              </Col>*/}
            {/*              <Col lg={6} className="pt-3">*/}
            {/*                 <Card>*/}
            {/*            <Card.Header>*/}
            {/*                <div style={{display:'flex',placeContent:'center'}}>*/}
            {/*                    <h6 className="mb-0">Branch Detail:</h6>*/}
            {/*               </div>*/}
            {/*            </Card.Header>*/}
            {/*           <Card.Body>*/}

            {/*           </Card.Body>*/}
            {/*        </Card>*/}
            {/*               </Col>*/}
            {/*              <Col lg={6} className="pt-3">*/}
            {/*                <Card>*/}
            {/*            <Card.Header>*/}
            {/*                <div style={{display:'flex',placeContent:'center'}}>*/}
            {/*                    <h6 className="mb-0">Payment Detail:</h6>*/}
            {/*               </div>*/}
            {/*            </Card.Header>*/}
            {/*           <Card.Body>*/}

            {/*           </Card.Body>*/}
            {/*        </Card>*/}
            {/*             </Col>*/}
            {/*           </Row>*/}
            {/*    </>:*/}
            {/*    <>*/}
            {/*        <Row className="p-5">*/}
            {/*              <Col lg={6} className="pt-3">*/}
            {/*                     <Card>*/}
            {/*            <Card.Header>*/}
            {/*                <div style={{display:'flex',placeContent:'center'}}>*/}
            {/*                    <h6 className="mb-0">Product Detail:</h6>*/}
            {/*               </div>*/}
            {/*            </Card.Header>*/}
            {/*           <Card.Body>*/}
            {/*               <div style={{display:'flex',placeContent:'start'}}>*/}
            {/*                   <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Product name:</span> </p>*/}
            {/*               </div>*/}
            {/*               <div style={{display:'flex',placeContent:'start'}}>*/}
            {/*                   <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Product Type:</span> </p>*/}
            {/*               </div>*/}
            {/*                <div style={{display:'flex',placeContent:'start'}}>*/}
            {/*                   <p className="mb-0" style={{fontSize:'15px'}}> <span style={{fontSize:'15px',fontWeight:'500'}}>Product Weight:</span> </p>*/}

            {/*               </div>*/}

            {/*           </Card.Body>*/}
            {/*        </Card>*/}
            {/*              </Col>*/}
            {/*              <Col lg={6} className="pt-3">*/}
            {/*                 <Card>*/}
            {/*                     <Card.Header>*/}
            {/*                <div style={{display:'flex',placeContent:'center'}}>*/}
            {/*                    <h6 className="mb-0">Customer Detail:</h6>*/}
            {/*               </div>*/}
            {/*            </Card.Header>*/}
            {/*                     <Card.Body>*/}

            {/*           </Card.Body>*/}
            {/*                 </Card>*/}
            {/*              </Col>*/}
            {/*              <Col lg={6} className="pt-3">*/}
            {/*                <Card>*/}
            {/*            <Card.Header>*/}
            {/*                <div style={{display:'flex',placeContent:'center'}}>*/}
            {/*                    <h6 className="mb-0">Partner Detail:</h6>*/}
            {/*               </div>*/}
            {/*            </Card.Header>*/}
            {/*           <Card.Body>*/}

            {/*           </Card.Body>*/}
            {/*        </Card>*/}
            {/*              </Col>*/}
            {/*              <Col lg={6} className="pt-3">*/}
            {/*                 <Card>*/}
            {/*            <Card.Header>*/}
            {/*                <div style={{display:'flex',placeContent:'center'}}>*/}
            {/*                    <h6 className="mb-0">Branch Detail:</h6>*/}
            {/*               </div>*/}
            {/*            </Card.Header>*/}
            {/*           <Card.Body>*/}

            {/*           </Card.Body>*/}
            {/*        </Card>*/}
            {/*               </Col>*/}
            {/*              <Col lg={6} className="pt-3">*/}
            {/*                <Card>*/}
            {/*            <Card.Header>*/}
            {/*                <div style={{display:'flex',placeContent:'center'}}>*/}
            {/*                    <h6 className="mb-0">Payment Detail:</h6>*/}
            {/*               </div>*/}
            {/*            </Card.Header>*/}
            {/*           <Card.Body>*/}

            {/*           </Card.Body>*/}
            {/*        </Card>*/}
            {/*             </Col>*/}
            {/*           </Row>*/}
            {/*    </>*/}
            {/*}*/}


        </>
    );
}
export default SinglePickupDetail