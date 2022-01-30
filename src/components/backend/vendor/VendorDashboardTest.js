import React, {useEffect, useState} from 'react';
import useWindowSize from './../../../use-window-size';
import {BrowserRouter as Router, Link} from "react-router-dom";
import {Image,Row,Col,Card} from 'react-bootstrap';
import vendorBanner from '../../../assets/vendorBanner.png';
import axios from "axios";
import notification from "../includes/notification";
import ReactDashboardMainSearch from "./ReactDashboardMainSearch";
import {
    getAllCustomerList,
    getAllHoldDeliveries,
    getAllReturnsDeliveries,
    VendorAllDeliveries,
    getAllPickupOrder, getAllProcessPickup
} from "../../../redux/actions/vendor";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useDispatch, useSelector} from "react-redux";
import {pendingOrderList} from "../../../redux/actions/vendor";
import { Carousel } from 'react-responsive-carousel';
import {FiSave} from "react-icons/fi";
const VendorDashboardTest=()=>{

     const vendor = useSelector((state) => state.vendor);
     const allDeliveriesList=vendor.allDeliveries;
     const singlePickupDetail=vendor.singlePickupDetail;
     const allHoldDeliveries = vendor.allHoldDeliveries;
     const allReturnsDelivery = vendor.allReturnsDelivery;
      const allCustomerLists = vendor.allCustomerList;
      const pendingOrdersList=vendor.pendingOrdersList;
       const allPickupOrders=vendor.allPickupOrder;
       const allProcessPickup=vendor.allProcessPickup;
      const[totalCod,setTotalCod]=useState('');
      const[onProcessAmount,setOnProcessAmount]=useState('');
       const[onHoldAmount,setOnHoldAmount]=useState('');
        const[onDeliveredAmount,setOnDeliveredAmount]=useState('');
         const[onPickupAmount,setOnPickupAmount]=useState('');
         const[totalDeliveryCharge,setTotalDeliveryCharge]=useState('');

    const dispatch = useDispatch();
    useEffect(()=>{
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        console.log(vendorDetail);
        // console.log('staff_admin');
        console.log('hello use');
        if (vendorDetail) {
            setAuthorizationToken(vendorDetail.token);
        }
        getAllHoldPickups();
        getAllReturnsPickups();
        getAllDeliveries();
        getCustomerList();
        getAllDelivered();
        getAllProcessPickupData();
        getAllPickupOrders();
        console.log(totalCod);

    },[]);
    const getAllDelivered=()=>{
        axios.get('/partner/get/delivered/pickups')
            .then((res) => {
                console.log(res);
                if(res.data){
                        console.log('dispatch data');
                        let allProcessListForCod =res?.data;
                        let totalCodAmount='';
                        let totalDeliveryCharge='';
                        allProcessListForCod.forEach((items,index)=>{
                            console.log('hello list');
                            // let arrayObject={
                                totalDeliveryCharge=items.delivery_charge+0;
                                totalCodAmount=items.cod+0;
                        });
                        setOnDeliveredAmount(totalCodAmount);
                    }
                 dispatch(pendingOrderList(res.data));
            })
            .catch((err) => {
                console.log(err.response);
            })
    }
    const getAllHoldPickups=()=>{
        axios.get('/partner/get/hold/pickups')
            .then((res) => {
                console.log(res);
                if(res.data){
                        console.log('dispatch data');
                        let allPickupListForCod =res?.data;
                        let totalCodAmount='';
                        allPickupListForCod.forEach((items,index)=>{
                            console.log('hello list');
                                totalCodAmount=items.cod+0;
                        })
                        // console.log(allCustomerDataList);
                        // console.log('customer Data');
                        //  dispatch(getAllCustomerList(allCustomerDataList));
                        setOnHoldAmount(totalCodAmount);
                    }
                dispatch(getAllHoldDeliveries(res.data));
            })
            .catch((err) => {
                console.log(err.response);
            })
    }
    const getAllDeliveries=()=>{
        axios.get('/partner/get/all/deliveries')
            .then((res) => {
                console.log(res);
                if(res.data){
                        console.log('dispatch data');
                        let allPickupListForCod =res?.data;
                        let totalCodAmount='';
                        allPickupListForCod.forEach((items,index)=>{
                            console.log('hello list');
                                totalCodAmount=items.cod+0;
                        })
                        // console.log(allCustomerDataList);
                        // console.log('customer Data');
                        //  dispatch(getAllCustomerList(allCustomerDataList));
                        setTotalCod(totalCodAmount);
                    }

                dispatch(VendorAllDeliveries(res.data));
            })
            .catch((err) => {
                console.log(err.response);
            })
    }
    const getAllReturnsPickups=()=>{
        axios.get('/partner/get/cancelled/pickups')
            .then((res) => {
                console.log(res);
                dispatch(getAllReturnsDeliveries(res.data));
            })
            .catch((err) => {
                console.log(err.response);
            })
    }
    const getAllProcessPickupData=()=>{
        axios.get('/partner/pickup/process/list')
            .then((res)=>{
                console.log(res.data);
                if(res.data){
                        console.log('dispatch data');
                        let allProcessListForCod =res?.data;
                        let totalCodAmount='';
                        allProcessListForCod.forEach((items,index)=>{
                            console.log('hello list');
                            // let arrayObject={
                                totalCodAmount=items.cod+0;
                        });
                        setOnProcessAmount(totalCodAmount);
                    }
                dispatch(getAllProcessPickup(res.data));
            })
            .catch((err)=>{
               console.log(err.response.data);
            })
    }
    const getAllPickupOrders=()=>{
        axios.get('/partner/get/all/pickups')
            .then((res) => {
                console.log(res);
                if(res.data){
                        console.log('dispatch data');
                        let allProcessListForCod =res?.data;
                        let totalCodAmount='';
                        allProcessListForCod.forEach((items,index)=>{
                            console.log('hello list');
                            // let arrayObject={
                                totalCodAmount=items.cod+0;
                        });
                        setOnPickupAmount(totalCodAmount);
                    }
                dispatch(getAllPickupOrder(res.data));
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const getCustomerList=()=>{
        axios.get('/partner/customer/list')
            .then((res) => {
                console.log(res)

                    if(res.data){
                        console.log('dispatch data');
                        let allcustomerData =res?.data;
                        let allCustomerDataList=[];
                        allcustomerData.forEach((items,index)=>{
                            console.log('hello list');
                            let arrayObject={
                                value:items.id,
                                label:items.name+'('+items.phone+')',
                            };
                            // allCustomerDataList.value=items.id;
                            // allCustomerDataList.label=items.name+'('+items.phone+')';
                           allCustomerDataList.push( arrayObject);

                        })
                        console.log(allCustomerDataList);
                        console.log('customer Data');
                         dispatch(getAllCustomerList(allCustomerDataList));

                    }

            })
            .catch((err) => {
                console.log(err.response)
            })
    }
  const windowsSize = useWindowSize();
  const isMobile=576;
  console.log(windowsSize);
  if (windowsSize.width<=isMobile) {
    return (
      <>
          <Row style={{height:'81vh',overflowY:'auto'}}>
              <Col xs={12} >
                     {/*<Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>*/}
                      <div style={{marginTop:'-30px',padding:'5px 5px',height:'200px',overflowY:'hidden',borderRadius:'20px'}}>
                           {/*<div>Dashboard Mobile</div>*/}
                          <Image src={vendorBanner} className="img-fluid"  />

                      </div>
                      {/* <div style={{marginTop:'-30px',padding:'5px 5px',height:'200px',overflowY:'hidden',borderRadius:'20px'}}>*/}
                      {/*     /!*<div>Dashboard Mobile</div>*!/*/}
                      {/*    <Image src={vendorBanner} className="img-fluid"  />*/}

                      {/*</div>*/}
                      {/* <div style={{marginTop:'-30px',padding:'5px 5px',height:'200px',overflowY:'hidden',borderRadius:'20px'}}>*/}
                      {/*     /!*<div>Dashboard Mobile</div>*!/*/}
                      {/*    <Image src={vendorBanner} className="img-fluid"  />*/}

                      {/*</div>*/}
                      {/* <div style={{marginTop:'-30px',padding:'5px 5px',height:'200px',overflowY:'hidden',borderRadius:'20px'}}>*/}
                      {/*     /!*<div>Dashboard Mobile</div>*!/*/}
                      {/*    <Image src={vendorBanner} className="img-fluid"  />*/}

                      {/*</div>*/}
                   {/*</Carousel>*/}
              </Col>
              <Col xs={12} style={{paddingLeft:'17px',paddingRight:'17px'}}>
                  <div className="pt-2">
                       <ReactDashboardMainSearch />
                  </div>
              </Col>
              <Col xs={6} className="p-0">
                  <div style={{marginTop:'5px',paddingLeft:'17px',paddingRight:'2px'}}>
                       <Link to="/vendor/partner_orders" style={{color:'#000',textDecoration:'none'}}>
                      <Card style={{borderRadius:'15px'}}>
                          <Card.Body>
                              <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>All Orders</h4>
                                  {/*{allDeliveriesList.length ===' '?*/}
                                  {/*                <>*/}
                                  {/*                     <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allDeliveriesList.length} )</h6>*/}
                                  {/*                </>:*/}
                                  {/*                <>*/}
                                  {/*                     <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(Empty)</h6>*/}
                                  {/*                </>}\*/}
                                  {
                                      allPickupOrders.length?
                                          <>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allPickupOrders.length} )</h6>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {onPickupAmount}</h6>
                                          </>:
                                          <>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( 0 )</h6>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. 0</h6>
                                          </>
                                  }


                              </div>
                          </Card.Body>
                      </Card>
                       </Link>
                  </div>
              </Col>
              <Col xs={6} className="p-0">
                   <div style={{marginTop:'5px',paddingRight:'17px',paddingLeft:'2px'}}>
                   <Link to="/vendor/pickup_area" style={{color:'#000',textDecoration:'none'}}>
                      <Card style={{borderRadius:'15px'}}>

                          <Card.Body>
                                 <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>On Process Orders</h4>
                                     {/*{allHoldDeliveries==='null'?*/}
                                     {/*     <>*/}
                                     {/*          <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(2000+)</h6>*/}
                                     {/*     </>:*/}
                                     {/*     <>*/}
                                     {/*          <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(Empty)</h6>*/}
                                     {/*     </>}*/}
                                     {allProcessPickup.length?
                                     <>
                                         <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allProcessPickup.length} )</h6>
                                         <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {onProcessAmount}</h6>
                                     </>:
                                     <>
                                         <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( 0 )</h6>
                                         <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. 0</h6>
                                     </>
                                     }


                                 </div>
                          </Card.Body>
                      </Card>
                   </Link>
                  </div>
              </Col>
               <Col xs={6} className="p-0">
                  <div style={{marginTop:'5px',paddingRight:'2px',paddingLeft:'17px'}}>
                   <Link to="/vendor/account" style={{color:'#000',textDecoration:'none'}}>
                      <Card style={{borderRadius:'15px'}}>

                          <Card.Body>
                                 <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>All Delivered</h4>
                                     {/*{allHoldDeliveries==='null'?*/}
                                     {/*     <>*/}
                                     {/*          <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(2000+)</h6>*/}
                                     {/*     </>:*/}
                                     {/*     <>*/}
                                     {/*          <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(Empty)</h6>*/}
                                     {/*     </>}*/}
                                     {
                                        pendingOrdersList?
                                            <>
                                                <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {pendingOrdersList.length} )</h6>
                                                <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {onDeliveredAmount}</h6>
                                            </>:
                                            <>
                                                <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( 0 )</h6>
                                                <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. 0 </h6>
                                            </>
                                     }


                                 </div>
                          </Card.Body>
                      </Card>
                   </Link>
                  </div>
              </Col>
              <Col xs={6} className="p-0">
                  <div style={{marginTop:'5px',paddingLeft:'2px',paddingRight:'17px'}}>
                      <Link to="/vendor/hold_area" style={{color:'#000',textDecoration:'none'}}>
                      <Card style={{borderRadius:'15px'}}>
                          <Card.Body>
                                 <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>Holds</h4>
                                     {allHoldDeliveries.length?
                                          <>
                                               <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>({allHoldDeliveries.length})</h6>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {onHoldAmount}</h6>
                                          </>:
                                          <>
                                               <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(0)</h6>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {allHoldDeliveries.length}</h6>
                                          </>}
                                 </div>
                          </Card.Body>
                      </Card>
                      </Link>
                  </div>
              </Col>
               <Col xs={6} className="p-0">
                      <div style={{marginTop:'5px',paddingRight:'2px',paddingLeft:'17px'}}>
                           <Link to="/vendor/returns_area" style={{color:'#000',textDecoration:'none'}}>
                          <Card style={{borderRadius:'15px'}}>
                              <Card.Body>
                                  <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',textAlign:'center'}}>Returns & Exchange</h4>
                                      {allReturnsDelivery.length?
                                          <>
                                               <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>({allReturnsDelivery.length})</h6>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {allReturnsDelivery.length}</h6>
                                          </>:
                                          <>
                                               <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(0)</h6>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {allReturnsDelivery.length}</h6>
                                          </>}

                                  </div>
                              </Card.Body>
                          </Card>
                           </Link>
                      </div>
              </Col>
               <Col xs={6} className="p-0">
                       <div style={{marginTop:'5px',paddingLeft:'2px',paddingRight:'17px'}}>
                          <Card style={{borderRadius:'15px'}}>
                              <Card.Body>
                                  <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>All Customers</h4>
                                      {allCustomerLists.length?
                                      <>
                                           <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allCustomerLists.length} )</h6>
                                           <h6 style={{display:'grid',placeContent:'center',fontSize:'14px',color:'transparent'}}>( {allCustomerLists.length} )</h6>
                                      </>
                                      :
                                      <>
                                           <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( 0 )</h6>
                                          <h6 style={{display:'grid',placeContent:'center',fontSize:'14px',color:'transparent'}}>( {allCustomerLists.length} )</h6>
                                      </>
                                      }

                              </div>
                              </Card.Body>
                          </Card>
                      </div>
              </Col>
              <Col xs={6} className="p-0">
                  <div style={{marginTop:'5px',paddingRight:'2px',paddingLeft:'17px'}}>
                      <Card style={{borderRadius:'15px'}}>
                          <Card.Body>
                              <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>All Payments</h4>
                                  <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allDeliveriesList.length} )</h6>
                              </div>
                          </Card.Body>
                      </Card>
                  </div>
              </Col>
              <Col xs={6} className="p-0">
                  <div style={{marginTop:'5px',paddingRight:'17px',paddingLeft:'2px'}}>
                      <Card style={{borderRadius:'15px'}}>
                          <Card.Body>
                              <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>All Delivery Charge</h4>
                                  {totalDeliveryCharge?
                                      <>
                                           <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {totalDeliveryCharge}</h6>
                                      </>
                                      :
                                      <>
                                           <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. 0</h6>
                                      </>
                                      }

                              </div>
                          </Card.Body>
                      </Card>
                  </div>
              </Col>
               <Col xs={12} className="p-0">
                      <div style={{marginTop:'5px',paddingRight:'17px',paddingLeft:'17px'}}>
                          <Card style={{borderRadius:'15px'}}>
                              <Card.Body>
                                  <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>Our Information</h4>
                                  {/*<h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allDeliveriesList.length} )</h6>*/}
                                  </div>
                              </Card.Body>
                          </Card>
                      </div>
              </Col>

          </Row>


      </>
    );
  }
  else{
      return (
          <>
              {/*<Row>*/}
              {/*    /!*<Col md={3} style={{width:'30%'}}>*!/*/}

              {/*    /!*</Col>*!/*/}

              {/*<Col md={12} >*/}
                   <Row style={{height:'91vh',overflowY:'auto'}}>
                       <Col xs={12} >
                     {/*<Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>*/}
                              <div style={{marginTop:'0px',padding:'5px 5px',height:'200px',overflowY:'hidden',borderRadius:'20px'}}>
                                   {/*<div>Dashboard Mobile</div>*/}
                                  <Image src={vendorBanner} className="img-fluid"  />
                              </div>
                       </Col>
                       <Col xs={12} style={{paddingLeft:'17px',paddingRight:'17px'}}>
                          <div className="pt-2">
                       <ReactDashboardMainSearch />
                  </div>
                       </Col>
                       <Col xs={6} className="p-0">
                          <div style={{marginTop:'5px',paddingLeft:'17px',paddingRight:'2px'}}>
                       <Link to="/vendor/partner_orders" style={{color:'#000',textDecoration:'none'}}>
                      <Card style={{borderRadius:'15px'}}>
                          <Card.Body>
                              <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>All Orders</h4>
                                  {/*{allDeliveriesList.length ===' '?*/}
                                  {/*                <>*/}
                                  {/*                     <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allDeliveriesList.length} )</h6>*/}
                                  {/*                </>:*/}
                                  {/*                <>*/}
                                  {/*                     <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(Empty)</h6>*/}
                                  {/*                </>}\*/}
                                  {
                                      allPickupOrders.length?
                                          <>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allPickupOrders.length} )</h6>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {onPickupAmount}</h6>
                                          </>:
                                          <>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( 0 )</h6>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. 0</h6>
                                          </>
                                  }


                              </div>
                          </Card.Body>
                      </Card>
                       </Link>
                  </div>
                       </Col>
                       <Col xs={6} className="p-0">
                           <div style={{marginTop:'5px',paddingRight:'17px',paddingLeft:'2px'}}>
                           <Link to="/vendor/pickup_area" style={{color:'#000',textDecoration:'none'}}>
                              <Card style={{borderRadius:'15px'}}>

                                  <Card.Body>
                                         <div style={{display:'grid',placeContent:'center'}}>
                                          <h4 style={{fontSize:'17px',}}>On Process Orders</h4>
                                             {/*{allHoldDeliveries==='null'?*/}
                                             {/*     <>*/}
                                             {/*          <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(2000+)</h6>*/}
                                             {/*     </>:*/}
                                             {/*     <>*/}
                                             {/*          <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(Empty)</h6>*/}
                                             {/*     </>}*/}
                                             {allProcessPickup.length?
                                             <>
                                                 <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allProcessPickup.length} )</h6>
                                                 <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {onProcessAmount}</h6>
                                             </>:
                                             <>
                                                 <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( 0 )</h6>
                                                 <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. 0</h6>
                                             </>
                                             }


                                         </div>
                                  </Card.Body>
                              </Card>
                           </Link>
                          </div>
                      </Col>
                       <Col xs={6} className="p-0">
                         <div style={{marginTop:'5px',paddingRight:'2px',paddingLeft:'17px'}}>
                   <Link to="/vendor/account" style={{color:'#000',textDecoration:'none'}}>
                      <Card style={{borderRadius:'15px'}}>

                          <Card.Body>
                                 <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>All Delivered</h4>
                                     {/*{allHoldDeliveries==='null'?*/}
                                     {/*     <>*/}
                                     {/*          <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(2000+)</h6>*/}
                                     {/*     </>:*/}
                                     {/*     <>*/}
                                     {/*          <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(Empty)</h6>*/}
                                     {/*     </>}*/}
                                     {
                                        pendingOrdersList?
                                            <>
                                                <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {pendingOrdersList.length} )</h6>
                                                <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {onDeliveredAmount}</h6>
                                            </>:
                                            <>
                                                <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( 0 )</h6>
                                                <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. 0 </h6>
                                            </>
                                     }


                                 </div>
                          </Card.Body>
                      </Card>
                   </Link>
                  </div>
                      </Col>
                       <Col xs={6} className="p-0">
                         <div style={{marginTop:'5px',paddingLeft:'2px',paddingRight:'17px'}}>
                      <Link to="/vendor/hold_area" style={{color:'#000',textDecoration:'none'}}>
                      <Card style={{borderRadius:'15px'}}>
                          <Card.Body>
                                 <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>Holds</h4>
                                     {allHoldDeliveries.length?
                                          <>
                                               <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>({allHoldDeliveries.length})</h6>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {onHoldAmount}</h6>
                                          </>:
                                          <>
                                               <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(0)</h6>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {allHoldDeliveries.length}</h6>
                                          </>}
                                 </div>
                          </Card.Body>
                      </Card>
                      </Link>
                  </div>
                      </Col>
                       <Col xs={6} className="p-0">
                          <div style={{marginTop:'5px',paddingRight:'2px',paddingLeft:'17px'}}>
                           <Link to="/vendor/returns_area" style={{color:'#000',textDecoration:'none'}}>
                          <Card style={{borderRadius:'15px'}}>
                              <Card.Body>
                                  <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',textAlign:'center'}}>Returns & Exchange</h4>
                                      {allReturnsDelivery.length?
                                          <>
                                               <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>({allReturnsDelivery.length})</h6>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {allReturnsDelivery.length}</h6>
                                          </>:
                                          <>
                                               <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(0)</h6>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {allReturnsDelivery.length}</h6>
                                          </>}

                                  </div>
                              </Card.Body>
                          </Card>
                           </Link>
                      </div>
                       </Col>
                       <Col xs={6} className="p-0">
                          <div style={{marginTop:'5px',paddingLeft:'2px',paddingRight:'17px'}}>
                          <Card style={{borderRadius:'15px'}}>
                              <Card.Body>
                                  <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>All Customers</h4>
                                      {allCustomerLists.length?
                                      <>
                                           <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allCustomerLists.length} )</h6>
                                           <h6 style={{display:'grid',placeContent:'center',fontSize:'14px',color:'transparent'}}>( {allCustomerLists.length} )</h6>
                                      </>
                                      :
                                      <>
                                           <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( 0 )</h6>
                                          <h6 style={{display:'grid',placeContent:'center',fontSize:'14px',color:'transparent'}}>( {allCustomerLists.length} )</h6>
                                      </>
                                      }

                              </div>
                              </Card.Body>
                          </Card>
                      </div>
                       </Col>
                       <Col xs={6} className="p-0">
                            <div style={{marginTop:'5px',paddingRight:'2px',paddingLeft:'17px'}}>
                      <Card style={{borderRadius:'15px'}}>
                          <Card.Body>
                              <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>All Payments</h4>
                                  <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allDeliveriesList.length} )</h6>
                              </div>
                          </Card.Body>
                      </Card>
                  </div>
                       </Col>
                       <Col xs={6} className="p-0">
                         <div style={{marginTop:'5px',paddingRight:'17px',paddingLeft:'2px'}}>
                      <Card style={{borderRadius:'15px'}}>
                          <Card.Body>
                              <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>All Delivery Charge</h4>
                                  {totalDeliveryCharge?
                                      <>
                                           <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {totalDeliveryCharge}</h6>
                                      </>
                                      :
                                      <>
                                           <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. 0</h6>
                                      </>
                                      }

                              </div>
                          </Card.Body>
                      </Card>
                  </div>
                       </Col>
                       <Col xs={12} className="p-0">
                         <div style={{marginTop:'5px',paddingRight:'17px',paddingLeft:'17px'}}>
                          <Card style={{borderRadius:'15px'}}>
                              <Card.Body>
                                  <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>Our Information</h4>
                                  {/*<h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allDeliveriesList.length} )</h6>*/}
                                  </div>
                              </Card.Body>
                          </Card>
                      </div>
                       </Col>
                  </Row>
              {/*</Col>*/}
              {/* /!*<Col md={3} style={{width:'30%'}}>*!/*/}
              {/* /!*</Col>*!/*/}
              {/*</Row>*/}

          </>
    );

  }
}
export default VendorDashboardTest