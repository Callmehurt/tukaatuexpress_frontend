import React, {useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import {ImBoxRemove} from "react-icons/im";
import axios from 'axios';
import {useHistory, useLocation} from 'react-router-dom';

import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useDispatch, useSelector} from "react-redux";
import {VendorAllDeliveries,getAllProcessPickup} from './../../../redux/actions/vendor';
import {Card, Col, Form, Image, Row} from "react-bootstrap";
import logoImage from "../../../logo.svg";
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
const AllPickupsDatatables=()=>{
     const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const vendor = useSelector((state) => state.vendor);
    const allDeliveries = vendor.allDeliveries;
    const searchOrderList = vendor.searchOrderList;
    const allProcessPickupData = vendor.allProcessPickup;
    useEffect(()=>{
      let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        // console.log(staff_admin);
        if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }
        console.log(allProcessPickupData);
        console.log("allProcessPickupData");
        getAllDeliveries();
        getAllProcessPickupData();
        console.log(characterResults);
        console.log('characterResults');
    },[0]);
     const [query, setQuery] = useState("");
     const fuse = new Fuse(allProcessPickupData, options);
     const results = fuse.search(query);
     const characterResults = query
        ? results.map((character) => character.item)
        : allProcessPickupData;
      const onSearch = ({ currentTarget })=>{
       setQuery(currentTarget.value);
       console.log(currentTarget.value);
    }
    const getAllDeliveries=()=>{
        axios.get('/partner/get/all/deliveries')
            .then((res)=>{
                console.log(res.data);
                dispatch(VendorAllDeliveries(res.data));
            })
            .catch((err)=>{
               console.log(err.response.data);
            })
    }
    const getAllProcessPickupData=()=>{
        axios.get('/partner/pickup/process/list')
            .then((res)=>{
                console.log(res.data);
                dispatch(getAllProcessPickup(res.data));
            })
            .catch((err)=>{
               console.log(err.response.data);
            })
    }
    const columns = [
        {
         name: "tex_code",
         label: "image",
         options: {
              filter:true,
              sort:true,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100px'}}>{value}</div>

                  </>
              )
            }
        },
        {
         name: "tex_code",
         label: "Tracking Id",
         options: {
              filter:true,
              sort:true,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100px'}}>{value}</div>

                  </>
              )
            }
        },
         {
         name: "entry_date",
         label: "Entry Date",
         options: {
              filter:true,
              sort:true,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'115px'}}>{value}</div>

                  </>
              )
            }
        },
        {
         name: "customer_phone",
         label: "Contact info.",
         options: {
              filter:true,
              sort:true,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'105px'}}>{value}</div>

                  </>
              )
            }
        },
        {
         name: "customer_name",
         label: "Reciever Name",
         options: {
              filter:true,
              sort:true,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'130px'}}>{value}</div>

                  </>
              )
            }
        },
       {
         name: "packet_name",
         label: "Product Name",
         options: {
              filter:true,
              sort:true,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'130px'}}>{value}</div>

                  </>
              )
            }
        },
       {
         name: "cod",
         label: "COD Amount",
         options: {
              filter:true,
              sort:true,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'120px'}}>{value}</div>

                  </>
              )
            }
        },
        {
         name: "cod_received",
         label: "COD Received",
         options: {
              filter:true,
              sort:true,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'150px'}}>{value}</div>

                  </>
              )
            }
        },
       {
         name: "delivery_charge",
         label: "Delivery Charge",
         options: {
              filter:true,
              sort:true,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'130px'}}>{value}</div>

                  </>
              )
            }
        },
       {
         name: "customer_address",
         label: "Address",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
            name: 'status',
            label: 'status',
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => {
                 const statusData=statusDisplay(value);
                 return statusData;
               }
            }
        }

       ];
  //   const options = {
  //       searchOpen:false,
  //       filterType:'checkbox',
  //       fixedHeader:false,
  //       selectableRows: 'none',
  //       responsive:'standard',
  //       rowsPerPage:100,
  // }
    const statusDisplay=(value)=>{
     if(value==='delivered')
        {
            return(
             <>
                  <div style={{
                      border: '2px solid green',
                      color: 'green',
                      padding:'5px 7px',
                      borderRadius: '25px',
                      display: 'flex',
                      justifyContent: 'center',
                      paddingTop: '3px',
                      paddingBottom: '3px',
                      fontWeight: '500'
                  }}> Delivered </div>

              </>
            );
        }
        else if(value==='assign'){
             return(
            <>
                  <div style={{
                      border: '2px solid blue',
                      color: 'blue',
                      borderRadius: '25px',
                      display: 'flex',
                      justifyContent: 'center',
                      paddingTop: '3px',
                      paddingBottom: '3px',
                      fontWeight: '500'
                  }}> Assign </div>

              </>
             );
        }
        else if(value==='cancel'){
             return(
            <>
                  <div style={{
                      border: '2px solid red',
                      color: 'red',
                      borderRadius: '25px',
                      display: 'flex',
                      justifyContent: 'center',
                      paddingTop: '3px',
                      paddingBottom: '3px',
                      fontWeight: '500'
                  }}> Cancel </div>

              </>
             );
        }
        else if(value==='hold'){
             return(
            <>
                  <div style={{
                      border: '2px solid yellow',
                      color: 'yellow',
                      borderRadius: '25px',
                      display: 'flex',
                      justifyContent: 'center',
                      paddingTop: '3px',
                      paddingBottom: '3px',
                      fontWeight: '500'
                  }}> Hold </div>

              </>
             );
        }

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
               {/*<h6>All Pickup Datat</h6>*/}
               {/* <MUIDataTable*/}
               {/* data={allDeliveries}*/}
               {/* columns={columns}*/}
               {/* options={options}*/}
               {/*/>*/}
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
                   {
                       query.length > 0 ?
                           <>
                               {
                                   characterResults.length ?
                                       <>
                                           <Col lg={12} style={{
                                               paddingLeft: '10px',
                                               paddingRight: '10px',
                                               paddingBottom: '7px',
                                               paddingTop: '5px'
                                           }}>
                                               <div>
                                                   {characterResults.map((character) => {
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
                                                                                                           to {character?.branchname.substring(0, 4)}...
                                                                                                       </>

                                                                                                   );
                                                                                               case 'warehouse':
                                                                                                   return (
                                                                                                       <>
                                                                                                           {character?.branchname} {'Warehouse'.substring(0, 4)}
                                                                                                       </>

                                                                                                   );

                                                                                               default:
                                                                                                   ;

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
                                                                                                           {character?.branchname} Warehouse
                                                                                                       </>

                                                                                                   );
                                                                                               case 'request':
                                                                                               return (
                                                                                                   <>
                                                                                                       {character?.branchname} On Process
                                                                                                   </>

                                                                                               );

                                                                                               default:
                                                                                                   return (
                                                                                                       <>
                                                                                                           <span>Assigned for Delivery</span>
                                                                                                       </>
                                                                                                   )
                                                                                                       ;

                                                                                           }
                                                                                       })()
                                                                                   }
                                                                               </>
                                                                       }

                                                                       {/*<span*/}
                                                                       {/*    style={{fontSize: '14px'}}>Status: {pickups.status}</span>*/}
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
                                           </Col>
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

                           </> :
                           <>

                           </>
                   }
               </Row>
               {/*{*/}
               {/*    searchOrderList?*/}
               {/*        <>*/}
               {/*            <Row>*/}
               {/*               <Col lg={12}>*/}
               {/*                        <div>*/}
               {/*                           <Card onClick={(e)=>{e.preventDefault();getPickupDetail(searchOrderList.id);}}>*/}
               {/*                              <Card.Body className="p-0">*/}
               {/*                                  <Row>*/}
               {/*                                      <Col xs={3} className="pl-0 pr-0">*/}
               {/*                                          <Image src={logoImage} roundedCircle />*/}
               {/*                                      </Col>*/}
               {/*                                      <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
               {/*                                          <div className="pt-2">*/}
               {/*                                              <h6 className="mb-1">{searchOrderList.tex_code}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}>(COD Rs.{searchOrderList.cod})</span></h6>*/}
               {/*                                          </div>*/}
               {/*                                          /!* <div>*!/*/}
               {/*                                          /!*     <p style={{fontSize:'15px'}}>Recent Message Show</p>*!/*/}

               {/*                                          /!*</div>*!/*/}
               {/*                                          <div>*/}
               {/*                                              <Row>*/}
               {/*                                                  <Col xs={6}>*/}
               {/*                                                     <span style={{fontSize:'15px'}}>{ searchOrderList.customer_name?.length>13 ? <><span>{searchOrderList.customer_name.substring(0,13)}...</span></>: <><span>{searchOrderList.customer_name}</span></> }</span>*/}
               {/*                                                  </Col>*/}
               {/*                                                  <Col xs={6}>*/}
               {/*                                                      <span style={{fontSize:'14px'}}>Status: {searchOrderList.status}</span>*/}
               {/*                                                  </Col>*/}
               {/*                                              </Row>*/}

               {/*                                          </div>*/}
               {/*                                          /!*<div>*!/*/}
               {/*                                          /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

               {/*                                          /!*</div>*!/*/}
               {/*                                          /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
               {/*                                      </Col>*/}
               {/*                                  </Row>*/}
               {/*                              </Card.Body>*/}
               {/*                           </Card>*/}
               {/*                        </div>*/}
               {/*                        /!*</a>*!/*/}
               {/*               </Col>*/}
               {/*                <Col xs={12} className="pt-3">*/}
               {/*                    <h6>All Orders</h6>*/}
               {/*                </Col>*/}
               {/*            </Row>*/}
               {/*        </> :*/}
               {/*        <>*/}
               {/*        </>*/}
               {/*}*/}
               {query.length ?
                   <>

                   </> :
                   <>
                       <Row style={{maxHeight: '67vh', overflowY: 'auto', overflowX: 'hidden', paddingTop: '5px'}}>
                           {allProcessPickupData.map((pickups, index) => (
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
                                                       <Col xs={9} style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                           <div className="pt-2">
                                                               <h6 className="mb-1">{pickups.tex_code}<span style={{
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
                                                                   <Col xs={5}>
                                                                <span
                                                                    style={{fontSize: '15px'}}>{pickups.customer_name.length > 13 ? <>
                                                                    <span>{pickups.customer_name.substring(0, 13)}...</span></> : <>
                                                                    <span>{pickups.customer_name}</span></>}</span>
                                                                   </Col>
                                                                   <Col xs={7}>
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
                                                                                                           to {pickups?.branchname.substring(0, 4)}...
                                                                                                       </>

                                                                                                   );
                                                                                               case 'warehouse':
                                                                                                   return (
                                                                                                       <>
                                                                                                           {pickups?.branchname} {'Warehouse'.substring(0, 4)}
                                                                                                       </>

                                                                                                   );

                                                                                               default:
                                                                                                   ;

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
                                                                                                           {pickups?.branchname} Warehouse
                                                                                                       </>

                                                                                                   );
                                                                                               case 'request':
                                                                                               return (
                                                                                                   <>
                                                                                                       {pickups?.branchname} On Process
                                                                                                   </>

                                                                                               );

                                                                                               default:
                                                                                                   return (
                                                                                                       <>
                                                                                                           <span>Assigned for Delivery</span>
                                                                                                       </>
                                                                                                   )
                                                                                                       ;

                                                                                           }
                                                                                       })()
                                                                                   }
                                                                               </>
                                                                       }

                                                                       {/*<span*/}
                                                                       {/*    style={{fontSize: '14px'}}>Status: {pickups.status}</span>*/}
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

                       </Row>
                   </>
               }
           </>
       )
   }else{
        return (
           <>
               {/*<h6>All Pickup Datat</h6>*/}
               {/* <MUIDataTable*/}
               {/* data={allDeliveries}*/}
               {/* columns={columns}*/}
               {/* options={options}*/}
               {/*/>*/}
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
                   {
                       query.length > 0 ?
                           <>
                               {
                                   characterResults.length ?
                                       <>
                                           <Col lg={12} style={{
                                               paddingLeft: '10px',
                                               paddingRight: '10px',
                                               paddingBottom: '7px',
                                               paddingTop: '5px'
                                           }}>
                                               <div>
                                                   {characterResults.map((character) => {
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
                                                                           <Col lg={2} className="pl-0 pr-0">
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
                                                                                       <Col xs={5}>
                                                                                           <span
                                                                                               style={{fontSize: '15px'}}>{character.customer_name.length > 13 ? <>
                                                                                               <span>{character.customer_name.substring(0, 13)}...</span></> : <>
                                                                                               <span>{character.customer_name}</span></>}</span>
                                                                                       </Col>
                                                                                       <Col xs={7}>
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
                                                                                                           to {character?.branchname.substring(0, 4)}...
                                                                                                       </>

                                                                                                   );
                                                                                               case 'warehouse':
                                                                                                   return (
                                                                                                       <>
                                                                                                           {character?.branchname} {'Warehouse'.substring(0, 4)}
                                                                                                       </>

                                                                                                   );

                                                                                               default:
                                                                                                   ;

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
                                                                                                           {character?.branchname} Warehouse
                                                                                                       </>

                                                                                                   );
                                                                                               case 'request':
                                                                                               return (
                                                                                                   <>
                                                                                                       {character?.branchname} On Process
                                                                                                   </>

                                                                                               );

                                                                                               default:
                                                                                                   return (
                                                                                                       <>
                                                                                                           <span>Assigned for Delivery</span>
                                                                                                       </>
                                                                                                   )
                                                                                                       ;

                                                                                           }
                                                                                       })()
                                                                                   }
                                                                               </>
                                                                       }

                                                                       {/*<span*/}
                                                                       {/*    style={{fontSize: '14px'}}>Status: {pickups.status}</span>*/}
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
                                           </Col>
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

                           </> :
                           <>

                           </>
                   }
               </Row>
               {/*{*/}
               {/*    searchOrderList?*/}
               {/*        <>*/}
               {/*            <Row>*/}
               {/*               <Col lg={12}>*/}
               {/*                        <div>*/}
               {/*                           <Card onClick={(e)=>{e.preventDefault();getPickupDetail(searchOrderList.id);}}>*/}
               {/*                              <Card.Body className="p-0">*/}
               {/*                                  <Row>*/}
               {/*                                      <Col xs={3} className="pl-0 pr-0">*/}
               {/*                                          <Image src={logoImage} roundedCircle />*/}
               {/*                                      </Col>*/}
               {/*                                      <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
               {/*                                          <div className="pt-2">*/}
               {/*                                              <h6 className="mb-1">{searchOrderList.tex_code}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}>(COD Rs.{searchOrderList.cod})</span></h6>*/}
               {/*                                          </div>*/}
               {/*                                          /!* <div>*!/*/}
               {/*                                          /!*     <p style={{fontSize:'15px'}}>Recent Message Show</p>*!/*/}

               {/*                                          /!*</div>*!/*/}
               {/*                                          <div>*/}
               {/*                                              <Row>*/}
               {/*                                                  <Col xs={6}>*/}
               {/*                                                     <span style={{fontSize:'15px'}}>{ searchOrderList.customer_name?.length>13 ? <><span>{searchOrderList.customer_name.substring(0,13)}...</span></>: <><span>{searchOrderList.customer_name}</span></> }</span>*/}
               {/*                                                  </Col>*/}
               {/*                                                  <Col xs={6}>*/}
               {/*                                                      <span style={{fontSize:'14px'}}>Status: {searchOrderList.status}</span>*/}
               {/*                                                  </Col>*/}
               {/*                                              </Row>*/}

               {/*                                          </div>*/}
               {/*                                          /!*<div>*!/*/}
               {/*                                          /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

               {/*                                          /!*</div>*!/*/}
               {/*                                          /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
               {/*                                      </Col>*/}
               {/*                                  </Row>*/}
               {/*                              </Card.Body>*/}
               {/*                           </Card>*/}
               {/*                        </div>*/}
               {/*                        /!*</a>*!/*/}
               {/*               </Col>*/}
               {/*                <Col xs={12} className="pt-3">*/}
               {/*                    <h6>All Orders</h6>*/}
               {/*                </Col>*/}
               {/*            </Row>*/}
               {/*        </> :*/}
               {/*        <>*/}
               {/*        </>*/}
               {/*}*/}
               {query.length ?
                   <>

                   </> :
                   <>
                       <Row style={{maxHeight: '67vh', overflowY: 'auto', overflowX: 'hidden', paddingTop: '5px'}}>
                           {allProcessPickupData.map((pickups, index) => (
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
                                                       <Col lg={2} className="pl-0 pr-0">
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
                                                       <Col lg={10} style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                           <div className="pt-2">
                                                               <h6 className="mb-1">{pickups.tex_code}<span style={{
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
                                                                   <Col xs={5}>
                                                                <span
                                                                    style={{fontSize: '15px'}}>{pickups.customer_name.length > 13 ? <>
                                                                    <span>{pickups.customer_name.substring(0, 13)}...</span></> : <>
                                                                    <span>{pickups.customer_name}</span></>}</span>
                                                                   </Col>
                                                                   <Col xs={7}>
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
                                                                                                           to {pickups?.branchname.substring(0, 4)}...
                                                                                                       </>

                                                                                                   );
                                                                                               case 'warehouse':
                                                                                                   return (
                                                                                                       <>
                                                                                                           {pickups?.branchname} {'Warehouse'.substring(0, 4)}
                                                                                                       </>

                                                                                                   );

                                                                                               default:
                                                                                                   ;

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
                                                                                                           {pickups?.branchname} Warehouse
                                                                                                       </>

                                                                                                   );
                                                                                                   case 'request':
                                                                                               return (
                                                                                                   <>
                                                                                                       {pickups?.branchname} On Process
                                                                                                   </>

                                                                                               );

                                                                                               default:
                                                                                                   return (
                                                                                                       <>
                                                                                                           <span>Assigned for Delivery</span>
                                                                                                       </>
                                                                                                   )
                                                                                                       ;

                                                                                           }
                                                                                       })()
                                                                                   }
                                                                               </>
                                                                       }

                                                                       {/*<span*/}
                                                                       {/*    style={{fontSize: '14px'}}>Status: {pickups.status}</span>*/}
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

                       </Row>
                   </>
               }
           </>
       )
   }
}
export default AllPickupsDatatables