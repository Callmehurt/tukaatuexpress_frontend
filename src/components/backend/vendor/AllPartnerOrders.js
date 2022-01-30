import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {getAllPickupOrder} from "../../../redux/actions/vendor";
import {Card, Col, Form, Image, Row} from "react-bootstrap";
import logoImage from "../../../logo.svg";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ReactProductSearch from "./ReactProductSearch";
import Fuse from "fuse.js";
import useWindowSize from "../../../use-window-size";
import Avatar from "react-avatar";
const options = {
      shouldSort: true,
      includeMatches: true,
      threshold: 0.0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      findAllMatches: true,
      keys: ["packet_name", "customer_phone","customer_name", "tex_code","cod","type"],
    };
const AllPartnerOrders=()=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const location=useLocation();
    const vendor = useSelector((state) => state.vendor);
     const allPartnerOrders = vendor.allPickupOrder;
      const searchOrderList = vendor.searchOrderList;
    useEffect(()=>{
      let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        // console.log(staff_admin);
        if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }
       getAllPickupOrders();
    },[0]);
    const [query, setQuery] = useState("");
     const fuse = new Fuse(allPartnerOrders, options);
     const results = fuse.search(query);
     const characterResults = query
        ? results.map((character) => character.item)
        : allPartnerOrders;
      const onSearch = ({ currentTarget })=>{
       setQuery(currentTarget.value);
       console.log(currentTarget.value);
    }
    const getAllPickupOrders=()=>{
        axios.get('/partner/get/all/pickups')
            .then((res) => {
                console.log(res);
                dispatch(getAllPickupOrder(res.data));
            })
            .catch((err) => {
                console.log(err.response);
            })
    }
    const getPickupDetail=(id)=>{
        history.push({
           pathname: '/vendor/pickup_detail',
           state: {pickupID: id }
       });
  }
  const windowsSize = useWindowSize();
  const isMobile=576;
  console.log(windowsSize);
   if (windowsSize.width<=isMobile) {
       return (
           <>
               <Row>
                   <Col xs={12}>
                       <div className="pt-2 ">
                           <Card style={{borderRadius: '30px', border: 'none'}}>
                               <Card.Body className="p-2">
                                   <Form className="search">
                                       <Form.Control type="text" value={query} placeholder="Search all orders ..."
                                                     onChange={onSearch} style={{borderRadius: '15px',}}/>
                                       {/*<input type="text" value={query} onChange={onSearch} />*/}
                                   </Form>
                               </Card.Body>
                           </Card>

                           {/*<ReactDashboardMainSearch />*/}
                       </div>
                   </Col>
               </Row>

               <Row style={{overflowY: 'auto', overflowX: 'hidden', height: '71vh'}}>
                   <div>
                       {
                           query.length > 0 ?
                               <>
                                   <Col lg={12} style={{
                                       paddingLeft: '10px',
                                       paddingRight: '10px',
                                       paddingBottom: '7px',
                                       paddingTop: '5px'
                                   }}>
                                       {
                                           characterResults.length ?
                                               <>
                                                   <div>

                                                       {
                                                           characterResults.map((character) => {

                                                               const {
                                                                   packet_name,
                                                                   type,
                                                                   customer_phone,
                                                                   cod,
                                                                   tex_code,
                                                                   customer_name
                                                               } = character;

                                                               return (
                                                                   <>
                                                                       <Card onClick={(e) => {
                                                                           e.preventDefault();
                                                                           getPickupDetail(character.id)
                                                                       }}>
                                                                           <Card.Body className="p-0">
                                                                               <Row>
                                                                                   <Col xs={3} className="pl-0 pr-0">
                                                                                        <div style={{
                                                                                       display: 'grid',
                                                                                       placeContent: 'center',
                                                                                       alignItems: 'center',
                                                                                       height: '55px'
                                                                                       }}>
                                                                                           <Avatar size="40" name={character.packet_name}
                                                                                                   round={true}/>
                                                                                       </div>
                                                                                   </Col>
                                                                                   <Col xs={9} style={{
                                                                                       paddingLeft: '0px',
                                                                                       paddingRight: '0px'
                                                                                   }}>
                                                                                       <div className="pt-2">
                                                                                           <h6 className="mb-1">{character.tex_code}<span
                                                                                               style={{
                                                                                                   fontSize: '15px',
                                                                                                   fontWeight: '500',
                                                                                                   paddingLeft: '5px'
                                                                                               }}>(COD Rs.{character.cod})</span>
                                                                                           </h6>

                                                                                       </div>
                                                                                       <div>
                                                                                           <Row>
                                                                                               <Col xs={5}>
                                                                                                   <span
                                                                                                       style={{fontSize: '15px'}}>{character.customer_name.length > 13 ? <>
                                                                                                       <span>{character.customer_name.substring(0, 13)}...</span></> : <>
                                                                                                       <span>{character.customer_name}</span></>}</span>
                                                                                               </Col>
                                                                                               <Col xs={7}>
                                                                                                   {/*<span*/}
                                                                                                   {/*    style={{fontSize: '14px'}}>Status: {character.status}</span>*/}
                                                                                                   {
                                                                                                       character.transfer > 0 ?
                                                                                                           <>
                                                                                                               {
                                                                                                                   (() => {

                                                                                                                       switch (character.status) {
                                                                                                                           case 'request':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       Transferring
                                                                                                                                       to {character?.branch_name.substring(0, 4)}...
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                           case 'assigned':
                                                                                                                           return (
                                                                                                                               <>
                                                                                                                                   <span>Assigned for Delivery</span>
                                                                                                                               </>

                                                                                                                           );
                                                                                                                           case 'cancelled':
                                                                                                                           return (
                                                                                                                               <>
                                                                                                                                   <span>Delivery Cancelled</span>
                                                                                                                               </>

                                                                                                                           );
                                                                                                                            case 'delivered':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       <span>Delivered To Customer</span>
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                           case 'warehouse':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       {character?.branch_name} {'Warehouse'.substring(0, 4)}
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                                case 'hold':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                      Hold To {character?.branch_name.substring(0, 6)}...
                                                                                                                                   </>

                                                                                                                               );

                                                                                                                           default:
                                                                                                                                return (
                                                                                                                                   <>
                                                                                                                                       {character?.status}
                                                                                                                                   </>

                                                                                                                               );

                                                                                                                       }
                                                                                                                   })()
                                                                                                               }
                                                                                                           </> :
                                                                                                           <>
                                                                                                               {
                                                                                                                   (() => {

                                                                                                                       switch (character.status) {
                                                                                                                           case 'warehouse':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       {character?.branch_name} Warehouse
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                               case 'delivered':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       <span>Delivered To Customer</span>
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                               case 'assigned':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       <span>Assigned for Delivery</span>
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                               case 'cancelled':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       <span>Delivery Cancelled</span>
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                               case 'request':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       {character?.branch_name} On Process
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                               case 'hold':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                      Hold To {character?.branch_name.substring(0, 6)}...
                                                                                                                                   </>

                                                                                                                               );

                                                                                                                           default:
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       <span>{character?.status}</span>
                                                                                                                                   </>
                                                                                                                               )
                                                                                                                                   ;

                                                                                                                       }
                                                                                                                   })()
                                                                                                               }
                                                                                                           </>
                                                                                                   }
                                                                                               </Col>
                                                                                           </Row>

                                                                                       </div>
                                                                                       {/*<div>*/}
                                                                                       {/*    <p style={{fontSize: '15px'}}>{chatList.message}</p>*/}

                                                                                       {/*</div>*/}
                                                                                       {/*<div>*/}
                                                                                       {/*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*/}

                                                                                       {/*</div>*/}
                                                                                       {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                                                                   </Col>
                                                                               </Row>
                                                                           </Card.Body>
                                                                       </Card>
                                                                   </>
                                                               )
                                                           })
                                                       }
                                                   </div>
                                               </> :
                                               <>
                                                   <Col xs={12}>
                                                       <div style={{
                                                           height: '60vh',
                                                           display: 'grid',
                                                           placeContent: 'center',
                                                           fontSize: '16px',
                                                           fontWeight: '500'
                                                       }}>No Orders Here...
                                                       </div>
                                                   </Col>
                                               </>
                                       }


                                   </Col>

                               </> :
                               <>

                                   {allPartnerOrders.map((pickups, index) => (
                                       <>
                                           <Col lg={12}>
                                               {/*<a onclick={(e)=>{e.preventDefault();getMessageDetail(2);}}>*/}

                                               <div>

                                                   <Card onClick={(e) => {
                                                       e.preventDefault();
                                                       getPickupDetail(pickups.id);
                                                   }}>
                                                       <Card.Body className="p-0">
                                                           <Row>
                                                               <Col xs={3} className="pl-0 pr-0">
                                                                   <div style={{
                                                                   display: 'grid',
                                                                   placeContent: 'center',
                                                                   alignItems: 'center',
                                                                   height: '55px'
                                                                   }}>
                                                                       <Avatar size="40" name={pickups.packet_name}
                                                                               round={true}/>
                                                                   </div>
                                                               </Col>
                                                               <Col xs={9}
                                                                    style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                                   <div className="pt-2">
                                                                       <h6 className="mb-1">{pickups.tex_code}<span
                                                                           style={{
                                                                               fontSize: '15px',
                                                                               fontWeight: '500',
                                                                               paddingLeft: '5px'
                                                                           }}>(COD Rs.{pickups.cod})</span></h6>
                                                                   </div>
                                                                   {/* <div>*/}
                                                                   {/*     <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                                                                   {/*</div>*/}
                                                                   <div>
                                                                       <Row>
                                                                           <Col xs={6}>
                                                                               <span
                                                                                   style={{fontSize: '15px'}}>{pickups.customer_name.length > 13 ? <>
                                                                                   <span>{pickups?.customer_name.substring(0, 13)}...</span></> : <>
                                                                                   <span>{pickups?.customer_name}</span></>}</span>
                                                                           </Col>
                                                                           <Col xs={6}>
                                                                               {/*<span*/}
                                                                               {/*    style={{fontSize: '14px'}}>Status: {pickups.status}</span>*/}
                                                                               {
                                                                                 pickups.transfer > 0 ?
                                                                                   <>
                                                                                       {
                                                                                           (() => {

                                                                                               switch (pickups.status) {
                                                                                                   case 'request':
                                                                                                       return (
                                                                                                           <>
                                                                                                               Transferring
                                                                                                               to {pickups?.branch_name.substring(0, 4)}...
                                                                                                           </>

                                                                                                       );
                                                                                                       case 'cancelled':
                                                                                                       return (
                                                                                                           <>
                                                                                                               <span>Delivery Cancelled</span>
                                                                                                           </>

                                                                                                       );
                                                                                                       case 'delivered':
                                                                                                       return (
                                                                                                           <>
                                                                                                               <span>Delivered To Customer</span>
                                                                                                           </>

                                                                                                       );
                                                                                                   case 'assigned':
                                                                                                       return (
                                                                                                           <>
                                                                                                               <span>Assigned for Delivery</span>
                                                                                                           </>

                                                                                                       );
                                                                                                   case 'warehouse':
                                                                                                       return (
                                                                                                           <>
                                                                                                               {pickups?.branch_name} {'Warehouse'.substring(0, 4)}
                                                                                                           </>

                                                                                                       );
                                                                                                       case 'hold':
                                                                                                       return (
                                                                                                           <>
                                                                                                              Hold To {pickups?.branch_name.substring(0, 6)}...
                                                                                                           </>

                                                                                                       );

                                                                                                   default:
                                                                                                       return (
                                                                                                           <>
                                                                                                               {pickups?.status}
                                                                                                           </>

                                                                                                       );

                                                                                               }
                                                                                           })()
                                                                                       }
                                                                                   </> :
                                                                                   <>
                                                                                       {
                                                                                           (() => {

                                                                                               switch (pickups.status) {
                                                                                                   case 'warehouse':
                                                                                                       return (
                                                                                                           <>
                                                                                                               {pickups?.branch_name} Warehouse
                                                                                                           </>

                                                                                                       );
                                                                                                       case 'assigned':
                                                                                                       return (
                                                                                                           <>
                                                                                                               <span>Assigned for Delivery</span>
                                                                                                           </>

                                                                                                       );
                                                                                                       case 'cancelled':
                                                                                                       return (
                                                                                                           <>
                                                                                                               <span>Delivery Cancelled</span>
                                                                                                           </>

                                                                                                       );
                                                                                                       case 'delivered':
                                                                                                       return (
                                                                                                           <>
                                                                                                               <span>Delivered To Customer</span>
                                                                                                           </>

                                                                                                       );
                                                                                                       case 'request':
                                                                                                       return (
                                                                                                           <>
                                                                                                               {pickups?.branch_name} On Process
                                                                                                           </>

                                                                                                       );
                                                                                                        case 'hold':
                                                                                                       return (
                                                                                                           <>
                                                                                                              Hold To {pickups?.branch_name.substring(0, 6)}...
                                                                                                           </>

                                                                                                       );


                                                                                                   default:
                                                                                                       return (
                                                                                                           <>
                                                                                                               <span>{pickups?.status}</span>
                                                                                                           </>
                                                                                                       )
                                                                                                           ;

                                                                                               }
                                                                                           })()
                                                                                       }
                                                                                   </>
                                                                               }
                                                                           </Col>
                                                                       </Row>

                                                                   </div>
                                                                   {/*<div>*/}
                                                                   {/*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*/}

                                                                   {/*</div>*/}
                                                                   {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                                               </Col>
                                                           </Row>
                                                       </Card.Body>
                                                   </Card>
                                               </div>
                                               {/*</a>*/}
                                           </Col>
                                       </>
                                   ))}
                               </>
                       }
                   </div>


               </Row>

           </>
       )
   }else{
       return (
           <>

               <Row>
                   <Col xs={12}>
                       <div className="pt-2 pb-2">
                           <Card style={{borderRadius: '30px', border: 'none'}}>
                               <Card.Body className="p-2">
                                   <Form className="search">
                                       <Form.Control type="text" value={query} placeholder="Search all orders ..."
                                                     onChange={onSearch} style={{borderRadius: '15px',}}/>
                                       {/*<input type="text" value={query} onChange={onSearch} />*/}
                                   </Form>
                               </Card.Body>
                           </Card>

                           {/*<ReactDashboardMainSearch />*/}
                       </div>
                   </Col>
               </Row>
               <Row style={{overflowY: 'auto', overflowX: 'hidden', height: '71vh'}}>
                   <div>
                       {
                           query.length > 0 ?
                               <>
                                   <Col lg={12} style={{
                                       paddingLeft: '10px',
                                       paddingRight: '10px',
                                       paddingBottom: '7px',
                                       paddingTop: '5px'
                                   }}>
                                       {
                                           characterResults.length ?
                                               <>
                                                   <div>

                                                       {
                                                           characterResults.map((character) => {

                                                               const {
                                                                   packet_name,
                                                                   type,
                                                                   customer_phone,
                                                                   cod,
                                                                   tex_code,
                                                                   customer_name
                                                               } = character;

                                                               return (
                                                                   <>
                                                                       <Card onClick={(e) => {
                                                                           e.preventDefault();
                                                                           getPickupDetail(character.id)
                                                                       }}>
                                                                           <Card.Body className="p-0">
                                                                               <Row>
                                                                                   <Col xs={2} className="pl-0 pr-0">
                                                                                      <div style={{
                                                                                           display: 'grid',
                                                                                           placeContent: 'center',
                                                                                           alignItems: 'center',
                                                                                           height: '55px'
                                                                                       }}>
                                                                                           <Avatar size="40" name={character.packet_name}
                                                                                                   round={true}/>
                                                                                       </div>
                                                                                   </Col>
                                                                                   <Col xs={10} style={{
                                                                                       paddingLeft: '0px',
                                                                                       paddingRight: '0px'
                                                                                   }}>
                                                                                       <div className="pt-2">
                                                                                           <h6 className="mb-1">{character.tex_code}<span
                                                                                               style={{
                                                                                                   fontSize: '15px',
                                                                                                   fontWeight: '500',
                                                                                                   paddingLeft: '5px'
                                                                                               }}>(COD Rs.{character.cod})</span>
                                                                                           </h6>

                                                                                       </div>
                                                                                       <div>
                                                                                           <Row>
                                                                                               <Col xs={6}>
                                                                                                   <span
                                                                                                       style={{fontSize: '15px'}}>{character.customer_name.length > 13 ? <>
                                                                                                       <span>{character.customer_name.substring(0, 13)}...</span></> : <>
                                                                                                       <span>{character.customer_name}</span></>}</span>
                                                                                               </Col>
                                                                                               <Col xs={6}>
                                                                                                   {/*<span*/}
                                                                                                   {/*    style={{fontSize: '14px'}}>Status: {character.status}</span>*/}
                                                                                                   {
                                                                                                       character.transfer > 0 ?
                                                                                                           <>
                                                                                                               {
                                                                                                                   (() => {

                                                                                                                       switch (character.status) {
                                                                                                                           case 'request':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       Transferring
                                                                                                                                       to {character?.branch_name.substring(0, 4)}...
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                               case 'delivered':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       <span>Delivered To Customer</span>
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                               case 'cancelled':
                                                                                                                           return (
                                                                                                                               <>
                                                                                                                                   <span>Delivery Cancelled</span>
                                                                                                                               </>

                                                                                                                           );
                                                                                                                           case 'assigned':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       <span>Assigned for Delivery</span>
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                           case 'warehouse':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       {character?.branch_name} {'Warehouse'.substring(0, 4)}
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                                case 'hold':
                                                                                                                                   return (
                                                                                                                                       <>
                                                                                                                                          Hold To {character?.branch_name.substring(0, 14)}...
                                                                                                                                       </>

                                                                                                                                   );

                                                                                                                           default:
                                                                                                                              return (
                                                                                                                                   <>
                                                                                                                                       {character?.status}
                                                                                                                                   </>

                                                                                                                               );

                                                                                                                       }
                                                                                                                   })()
                                                                                                               }
                                                                                                           </> :
                                                                                                           <>
                                                                                                               {
                                                                                                                   (() => {

                                                                                                                       switch (character.status) {
                                                                                                                           case 'warehouse':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       {character?.branch_name} Warehouse
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                               case 'delivered':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       <span>Delivered To Customer</span>
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                               case 'assigned':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       <span>Assigned for Delivery</span>
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                               case 'request':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       {character?.branch_name} On Process
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                               case 'cancelled':
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       <span>Delivery Cancelled</span>
                                                                                                                                   </>

                                                                                                                               );
                                                                                                                                case 'hold':
                                                                                                                                   return (
                                                                                                                                       <>
                                                                                                                                          Hold To {character?.branch_name.substring(0, 14)}...
                                                                                                                                       </>

                                                                                                                                   );

                                                                                                                           default:
                                                                                                                               return (
                                                                                                                                   <>
                                                                                                                                       <span>{character?.status}</span>
                                                                                                                                   </>
                                                                                                                               )
                                                                                                                                   ;

                                                                                                                       }
                                                                                                                   })()
                                                                                                               }
                                                                                                           </>
                                                                                                   }
                                                                                               </Col>
                                                                                           </Row>

                                                                                       </div>
                                                                                       {/*<div>*/}
                                                                                       {/*    <p style={{fontSize: '15px'}}>{chatList.message}</p>*/}

                                                                                       {/*</div>*/}
                                                                                       {/*<div>*/}
                                                                                       {/*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*/}

                                                                                       {/*</div>*/}
                                                                                       {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                                                                   </Col>
                                                                               </Row>
                                                                           </Card.Body>
                                                                       </Card>
                                                                   </>
                                                               )
                                                           })
                                                       }
                                                   </div>
                                               </> :
                                               <>
                                                   <Col xs={12}>
                                                       <div style={{
                                                           height: '60vh',
                                                           display: 'grid',
                                                           placeContent: 'center',
                                                           fontSize: '16px',
                                                           fontWeight: '500'
                                                       }}>No Orders Here...
                                                       </div>
                                                   </Col>
                                               </>
                                       }


                                   </Col>

                               </> :
                               <>

                                   {allPartnerOrders.map((pickups, index) => (
                                       <>
                                           {
                                               pickups?
                                                   <>
                                                       <Col lg={12}>
                                               {/*<a onclick={(e)=>{e.preventDefault();getMessageDetail(2);}}>*/}

                                               <div>

                                                   <Card onClick={(e) => {
                                                       e.preventDefault();
                                                       getPickupDetail(pickups.id);
                                                   }}>
                                                       <Card.Body className="p-0">
                                                           <Row>
                                                               <Col xs={2} className="pl-0 pr-0">
                                                                   <div style={{
                                                                   display: 'grid',
                                                                   placeContent: 'center',
                                                                   alignItems: 'center',
                                                                   height: '55px'
                                                                   }}>
                                                                       <Avatar size="40" name={pickups.packet_name}
                                                                               round={true}/>
                                                                   </div>
                                                               </Col>
                                                               <Col xs={10}
                                                                    style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                                   <div className="pt-2">
                                                                       <h6 className="mb-1">{pickups.tex_code}<span
                                                                           style={{
                                                                               fontSize: '15px',
                                                                               fontWeight: '500',
                                                                               paddingLeft: '5px'
                                                                           }}>(COD Rs.{pickups.cod})</span></h6>
                                                                   </div>
                                                                   {/* <div>*/}
                                                                   {/*     <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                                                                   {/*</div>*/}
                                                                   <div>
                                                                       <Row>
                                                                           <Col xs={6}>
                                                                               <span
                                                                                   style={{fontSize: '15px'}}>{pickups?.customer_name.length > 13 ? <>
                                                                                   <span>{pickups?.customer_name.substring(0, 13)}...</span></> : <>
                                                                                   <span>{pickups?.customer_name}</span></>}</span>
                                                                           </Col>
                                                                           <Col xs={6}>
                                                                               {/*<span*/}
                                                                               {/*    style={{fontSize: '14px'}}>Status: {pickups.status}</span>*/}
                                                                               {
                                                                                   pickups.transfer > 0 ?
                                                                                       <>
                                                                                           {
                                                                                               (() => {

                                                                                                   switch (pickups.status) {
                                                                                                       case 'request':
                                                                                                           return (
                                                                                                               <>
                                                                                                                   Transferring
                                                                                                                   to {pickups?.branch_name.substring(0, 4)}...
                                                                                                               </>

                                                                                                           );
                                                                                                           case 'delivered':
                                                                                                           return (
                                                                                                               <>
                                                                                                                   <span>Delivered To Customer</span>
                                                                                                               </>

                                                                                                           );
                                                                                                       case 'assigned':
                                                                                                       return (
                                                                                                           <>
                                                                                                               <span>Assigned for Delivery</span>
                                                                                                           </>

                                                                                                       );
                                                                                                       case 'cancelled':
                                                                                                       return (
                                                                                                           <>
                                                                                                               <span>Delivery Cancelled</span>
                                                                                                           </>

                                                                                                       );
                                                                                                       case 'warehouse':
                                                                                                           return (
                                                                                                               <>
                                                                                                                   {pickups?.branch_name} {'Warehouse'.substring(0, 4)}
                                                                                                               </>

                                                                                                           );
                                                                                                            case 'hold':
                                                                                                       return (
                                                                                                           <>
                                                                                                              Hold To {pickups?.branch_name.substring(0, 14)}...
                                                                                                           </>

                                                                                                       );

                                                                                                       default:
                                                                                                         return (
                                                                                                               <>
                                                                                                                   {pickups?.status}
                                                                                                               </>

                                                                                                           );

                                                                                                   }
                                                                                               })()
                                                                                           }
                                                                                       </> :
                                                                                       <>
                                                                                           {
                                                                                               (() => {

                                                                                                   switch (pickups.status) {
                                                                                                       case 'warehouse':
                                                                                                           return (
                                                                                                               <>
                                                                                                                   {pickups?.branch_name} Warehouse
                                                                                                               </>

                                                                                                           );
                                                                                                           case 'delivered':
                                                                                                           return (
                                                                                                               <>
                                                                                                                   <span>Delivered To Customer</span>
                                                                                                               </>

                                                                                                           );
                                                                                                           case 'assigned':
                                                                                                           return (
                                                                                                               <>
                                                                                                                   <span>Assigned for Delivery</span>
                                                                                                               </>

                                                                                                           );
                                                                                                           case 'request':
                                                                                                           return (
                                                                                                               <>
                                                                                                                   {pickups?.branch_name} On Process
                                                                                                               </>

                                                                                                           );
                                                                                                           case 'cancelled':
                                                                                                           return (
                                                                                                               <>
                                                                                                                   <span>Delivery Cancelled</span>
                                                                                                               </>

                                                                                                           );
                                                                                                            case 'hold':
                                                                                                       return (
                                                                                                           <>
                                                                                                              Hold To {pickups?.branch_name.substring(0, 14)}...
                                                                                                           </>

                                                                                                       );

                                                                                                       default:
                                                                                                           return (
                                                                                                               <>
                                                                                                                   <span>{pickups?.status}</span>
                                                                                                               </>
                                                                                                           )
                                                                                                               ;

                                                                                                   }
                                                                                               })()
                                                                                           }
                                                                                       </>
                                                                               }
                                                                           </Col>
                                                                       </Row>

                                                                   </div>
                                                                   {/*<div>*/}
                                                                   {/*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*/}

                                                                   {/*</div>*/}
                                                                   {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                                               </Col>
                                                           </Row>
                                                       </Card.Body>
                                                   </Card>
                                               </div>
                                               {/*</a>*/}
                                           </Col>
                                                   </>:
                                                   <>
                                                       <Skeleton count={5} />
                                                   </>
                                           }

                                       </>
                                   ))}
                               </>
                       }
                   </div>


               </Row>

           </>
       )
   }
}
export default AllPartnerOrders