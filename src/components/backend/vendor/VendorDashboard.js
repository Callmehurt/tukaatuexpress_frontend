import React, {useEffect, useState} from 'react';
import useWindowSize from './../../../use-window-size';
import {BrowserRouter as Router, Link, useHistory} from "react-router-dom";
import {Image,Row,Col,Card,Form} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Fuse from "fuse.js";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import vendorBanner from '../../../assets/vendorBanner.png';
import carouselHeader from './../../../assets/carouselHeader.png';
import axios from "axios";
import messageNotification from "../includes/messageNotification";
import VendorDashboardDesktop from "./VendorDashboardDesktop";
import ReactDashboardMainSearch from "./ReactDashboardMainSearch";
import Slider from "react-slick";
import SliderDesktop from "react-slick";
import {
    getAllCustomerList,
    getAllHoldDeliveries,
    getAllReturnsDeliveries,
    VendorAllDeliveries,
    getAllPickupOrder, getAllProcessPickup, holdsOrderList, getAllCustomerListDisplay,getAllBanner
} from "../../../redux/actions/vendor";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useDispatch, useSelector} from "react-redux";
import {pendingOrderList,getAllNotice} from "../../../redux/actions/vendor";
import MobileSlider from "./MobileSlider";
// import { Carousel } from 'react-responsive-carousel';
import {FiSave} from "react-icons/fi";
import logoImage from "../../../logo.svg";
import Pusher from "pusher-js";
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
const VendorDashboard=()=>{
    const history=useHistory();
     const appSetting = useSelector((state) => state.appSetting);
      const urlDomain=appSetting.urlDomain;
     const vendor = useSelector((state) => state.vendor);
     const[exactSlider,setExactSlider]=useState([]);
     const allDeliveriesList=vendor.allDeliveries;
     const singlePickupDetail=vendor.singlePickupDetail;
     const allHoldDeliveries = vendor.allHoldDeliveries;
     const holdOrdersList=vendor.holdOrdersList;
     const returnsOrdersList=vendor.returnsOrdersList;
     const returnsConfirmsOrdersList=vendor.returnsConfirmsOrdersList;
     const allReturnsDelivery = vendor.allReturnsDelivery;
     const allCustomerLists = vendor.allCustomerListDisplay;
     const allBanner=vendor.allBanner;
     const allNotice=vendor.allNotice;

     const pendingOrdersList=vendor.pendingOrdersList;
     const allPickupOrders=vendor.allPickupOrder;
     const allProcessPickup=vendor.allProcessPickup;
     const [allCustomerCount,setAllCustomerCount]=useState(0);
     const [allDeliveredCodTotal,setAllDeliveredCodTotal]=useState(0);
     const [allDeliveredCount,setAllDeliveredCount]=useState(0);
     const [allHoldCodTotal,setAllHoldCodTotal]=useState(0);
     const [allHoldCount,setAllHoldCount]=useState(0);
     const [allOrderCodTotal,setAllOrderCodTotal]=useState(0);
     const [allOrderCount,setAllOrderCount]=useState(0);
     const [onProcessOrderCodTotal,setOnProcessOrderCodTotal]=useState(0);
     const [onProcessOrderCount,setOnProcessOrderCount]=useState(0);
     const [totalDeliveryCharge,setTotalDeliveryCharge]=useState(0);
     const [allPaymentCount,setAllPaymentCount]=useState(0);
     const [returnAndExchangeTotal,setReturnAndExchangeTotal]=useState(0);
     const [returnAndExchangeCount,setReturnAndExchangeCount]=useState('0');
     const [returnCount , setReturnCount] = useState('0');


     const partner = useSelector((state) => state.vendorAuth.user);
     useEffect(() => {
        const pusher = new Pusher('c083779ed67708696f1e', {
            cluster: 'ap2',
        });
        const channel = pusher.subscribe('tukaatuexpress');
        channel.bind('notice_to_partner', (data) => {
            if(data.partner.id === partner.id){
                messageNotification('warning', data.message)
            }
            console.log(data.partner.id)
        })
    }, [])


     const [query, setQuery] = useState("");
     const fuse = new Fuse(allPickupOrders, options);
      const results = fuse.search(query);
      const characterResults = query
        ? results.map((character) => character.item)
        : allPickupOrders;
      const onSearch = ({ currentTarget })=>{
       setQuery(currentTarget.value);
       console.log(currentTarget.value);
    }
    const dispatch = useDispatch();
    useEffect(()=>{
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        // console.log(vendorDetail);
        // console.log('staff_admin');
        if (vendorDetail) {
            setAuthorizationToken(vendorDetail.token);
        }

        counterDetail();
        getAllPickupOrders();
        getAllProcessPickupData();
        getPendingOrdersList();
        getReturnAndExchangeList();
        holdsOrderListFunc();
        getCustomerList();
        getBannerList();
        getNoticeList();
        makeExactSlider();
        console.log(exactSlider);


    },[]);
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const makeExactSlider=()=>{
        let sliderData=[];
        // sliderData=allNotice;
        allBanner.map((items)=>{
            sliderData.push(items);
        });

        allNotice.map((items)=>{
            sliderData.push(items);
        });


        // sliderData.push(allBanner);
        setExactSlider(sliderData);
        console.log('Slider Data exact');
        console.log(exactSlider);


    }

    const getBannerList=()=>{
        axios.get('/partner/banner/list')
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data);
                        dispatch(getAllBanner(res.data));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })
    }
    const getNoticeList=()=>{
        // axios.get('/partner/notice/list')
        //             .then((res)=>{
        //                 console.log(res);
        //                 console.log(res.data);
        //                 dispatch(getAllNotice(res.data?.data));
        //             })
        //     .catch((err)=>{
        //        console.log(err.response.data);
        //     })
    }
    const holdsOrderListFunc=()=>{
            axios.get('/partner/get/hold/pickups')
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data);
                        dispatch(holdsOrderList(res.data));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })

        }
        const getCustomerList=()=>{
        axios.get('/partner/customer/list')
            .then((res) => {
                console.log(res)
                dispatch(getAllCustomerListDisplay(res.data));

            })
            .catch((err) => {
                console.log(err.response)
            })
    }
     const getPendingOrdersList=()=>{
            axios.get('/partner/get/delivered/pickups')
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data);
                        dispatch(pendingOrderList(res.data));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })

        }
        const getReturnAndExchangeList=()=>{
            axios.get('/partner/get/cancelled/pickups')
                    .then((res)=>{
                        console.log('Returns & exchanges',res.data);
                        dispatch(getAllReturnsDeliveries(res.data));
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
    const getOrderDetail=(id)=>{
        history.push({
           pathname: '/vendor/pickup_detail',
           state: {pickupID: id }
       });

    }
    const counterDetail=()=>{
         axios.get('/partner/counter/details')
            .then((res) => {
                console.log('counter data', res);
                 console.log(res.data.return_count);
                setAllCustomerCount(res.data?.customer_count);
                setAllDeliveredCodTotal(res.data?.all_delivered);
                setAllDeliveredCount(res.data?.all_delivered_count);
                setAllHoldCodTotal(res.data?.holds_cod);
                setAllHoldCount(res.data?.holds_count);
                setAllOrderCodTotal(res.data?.all_order_cod_total);
                setAllOrderCount(res.data?.all_order_count);
                setOnProcessOrderCodTotal(res.data?.onprocess_cod);
                setTotalDeliveryCharge(res.data?.total_delivery_charge);
                setOnProcessOrderCount(res.data?.onprocess_count);
                setAllPaymentCount(res.data?.payment_count);
                setReturnAndExchangeTotal(res.data?.returns_cod);
                setReturnAndExchangeCount(res.data?.return_count);
                setReturnCount(res.data?.return_count);

            })
            .catch((err) => {
                console.log(err.response);
            })
    }
    // const sliderSlick=()=>{
    //          const windowsSize = useWindowSize();
    //          const isMobile=576;
    //     return(
    //         <>
    //
    //             {windowsSize.width<=isMobile?<> <Slider {...settings}>
    //                                        {allBanner.map((data)=>(
    //                                            <div><img
    //                                               className="d-block w-100"
    //                                               src={urlDomain+data.banner}
    //                                               alt="First slide"/>
    //                                             </div>
    //                                        ))}
    //
    //                                </Slider><>:<> <Slider {...settings}>
    //                                        {allBanner.map((data)=>(
    //                                            <div><img
    //                                               className="d-block w-100"
    //                                               src={urlDomain+data.banner}
    //                                               alt="First slide"/>
    //                                             </div>
    //                                        ))}
    //
    //                                </Slider></>}
    //         </>
    //     )
    //
    // }

  const windowsSize = useWindowSize();
  const isMobile=576;
  console.log(windowsSize);
  if (windowsSize.width<=isMobile) {
    return (
      <>
          <Row >
              <Col xs={12}  >
                     {/*<Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>*/}
                      <div style={{marginTop:'-7px',padding:'5px 5px',height:'200px',overflow:'hidden',borderRadius:'20px'}}>
                          {allBanner.length || allNotice.length?
                              <>
                          {/*         <Carousel style={{height:'220px'}}>*/}
                          {/*    {allBanner.map((data)=>(*/}
                          {/*        <>*/}
                          {/*              <Carousel.Item className="d-block">*/}
                          {/*                  <img*/}
                          {/*                    className="d-block w-100"*/}
                          {/*                    src={urlDomain+data.banner}*/}
                          {/*                    alt="First slide"*/}
                          {/*                  />*/}
                          {/*                  <Carousel.Caption>*/}
                          {/*                      <p>{data.description}</p>*/}
                          {/*                  </Carousel.Caption>*/}
                          {/*            </Carousel.Item>*/}
                          {/*        </>*/}
                          {/*    ))}*/}

                          {/*</Carousel>*/}
                          {/*        {sliderSlick()}*/}
                                   <Slider {...settings}>

                                           {allBanner.map((data)=>(
                                               <div><img
                                                  className="d-block w-100"
                                                  src={data.banner_url}
                                                  alt="First slide"/>
                                                </div>
                                           ))}
                                       {allNotice.map((data)=>(
                                           <div>
                                               <div style={{height:'200px',display:'flex',placeContent:'center',alignItems:'center',backgroundColor:'#fff20042'}}>
                                                  <p style={{fontSize:'17px',fontWeight:'500',padding:'13px'}} className="text-center">{data.notice}</p>
                                               </div>
                                           </div>

                                       ))}

                                   </Slider>
                              </>:
                              <>
                              </>
                          }
                           {/*<div>Dashboard Mobile</div>*/}
                          {/*<Image src={vendorBanner} className="img-fluid"  />*/}

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
              <Col xs={12} style={{paddingLeft:'17px',paddingRight:'17px',paddingBottom:'7px'}}>
                  <div className="pt-2 ">
                      <Card style={{borderRadius:'30px',border:'none'}}>
                          <Card.Body className="p-2">
                               <Form className="search">
                                   <Form.Control type="text" value={query} placeholder="Search all orders ..." onChange={onSearch} style={{borderRadius:'15px',}} />
                                  {/*<input type="text" value={query} onChange={onSearch} />*/}
                              </Form>
                          </Card.Body>
                      </Card>

                       {/*<ReactDashboardMainSearch />*/}
                  </div>
              </Col>
              {
                  query.length>0?
                      <>
                           <Col lg={12} style={{paddingLeft:'17px',paddingRight:'17px',paddingBottom:'7px'}}>
                              <div>
                                  {characterResults.map((character) => {
                                      const {packet_name, type, customer_phone, cod,tex_code,customer_name} = character;
                                      return (
                                          <>
                                              <Card onClick={(e)=>{e.preventDefault();getOrderDetail(character.id)}}>
                                                      <Card.Body className="p-0">
                                                          <Row>
                                                              <Col xs={3} className="pl-0 pr-0">
                                                                  <Image src={logoImage} roundedCircle />
                                                              </Col>
                                                              <Col xs={9} style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                                  <div className="pt-2">
                                                                      <h6 className="mb-1">{character.tex_code}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}>(COD Rs.{character.cod})</span></h6>

                                                                  </div>
                                                                  <div>
                                                                      <Row>
                                                                         <Col xs={6}>
                                                                           <span style={{fontSize:'15px'}}>{ character.customer_name.length>13 ? <><span>{character.customer_name.substring(0,13)}...</span></>: <><span>{character.customer_name}</span></> }</span>
                                                                         </Col>
                                                                         <Col xs={6}>
                                                                          <span style={{fontSize:'14px'}}>Status: {character.status}</span>
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
                      </>:
                      <>

                      </>
              }
              <div>
              {/*<Col lg={12}>*/}
              {/*    <div>*/}
              {/*        {characterResults.map((character) => {*/}
              {/*            const {packet_name, type, customer_phone, cod,tex_code,customer_name} = character;*/}
              {/*            return (*/}
              {/*                <>*/}
              {/*                    <Card>*/}
              {/*                            <Card.Body className="p-0">*/}
              {/*                                <Row>*/}
              {/*                                    <Col xs={3} className="pl-0 pr-0">*/}
              {/*                                        <Image src={logoImage} roundedCircle/>*/}
              {/*                                    </Col>*/}
              {/*                                    <Col xs={9} style={{paddingLeft: '0px', paddingRight: '0px'}}>*/}
              {/*                                        <div className="pt-2">*/}
              {/*                                            <h6 className="mb-1">{character.tex_code}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}>(COD Rs.{character.cod})</span></h6>*/}

              {/*                                        </div>*/}
              {/*                                        <div>*/}
              {/*                                            <Row>*/}
              {/*                                               <Col xs={6}>*/}
              {/*                                                 /!*<span style={{fontSize:'15px'}}>{ chatList.customer_name.length>13 ? <><span>{chatList.customer_name.substring(0,13)}...</span></>: <><span>{chatList.customer_name}</span></> }</span>*!/*/}
              {/*                                               </Col>*/}
              {/*                                               <Col xs={6}>*/}
              {/*                                                /!*<span style={{fontSize:'14px'}}>Status: {chatList.status}</span>*!/*/}
              {/*                                            </Col>*/}
              {/*                                            </Row>*/}

              {/*                                        </div>*/}
              {/*                                        /!*<div>*!/*/}
              {/*                                        /!*    <p style={{fontSize: '15px'}}>{chatList.message}</p>*!/*/}

              {/*                                        /!*</div>*!/*/}
              {/*                                        /!*<div>*!/*/}
              {/*                                        /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

              {/*                                        /!*</div>*!/*/}
              {/*                                        /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
              {/*                                    </Col>*/}
              {/*                                </Row>*/}
              {/*                            </Card.Body>*/}
              {/*                        </Card>*/}
              {/*                </>*/}
              {/*            )*/}
              {/*        })*/}
              {/*        }*/}
              {/*    </div>*/}
              {/*</Col>*/}
              </div>
              <Col xs={6} className="p-0">
                  <div style={{marginTop:'5px',paddingLeft:'17px',paddingRight:'2px'}}>
                       <Link to="/vendor/partner_orders" style={{color:'#000',textDecoration:'none'}}>
                      <Card style={{borderRadius:'15px'}}>
                          <Card.Body>
                              <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>All Orders</h4>

                                  {
                                      allPickupOrders.length?
                                          <>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allOrderCount} )</h6>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {allOrderCodTotal}</h6>
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

                                     {allProcessPickup.length?
                                     <>
                                         <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {onProcessOrderCount} )</h6>
                                         <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {onProcessOrderCodTotal}</h6>
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

                                     {
                                        pendingOrdersList?
                                            <>
                                                <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allDeliveredCount} )</h6>
                                                <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {allDeliveredCodTotal}</h6>
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
                                     {holdOrdersList.length?
                                          <>
                                               <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>({allHoldCount})</h6>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {allHoldCodTotal}</h6>
                                          </>:
                                          <>
                                               <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(0)</h6>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {allHoldCodTotal}</h6>
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
                                      <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>({returnCount})</h6>
                                      <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {returnAndExchangeTotal}</h6>
                                      {/*{(returnsOrdersList.length+returnsConfirmsOrdersList.length) > 0?*/}
                                      {/*    <>*/}
                                      {/*         <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>({returnCount})</h6>*/}
                                      {/*        <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {returnAndExchangeTotal}</h6>*/}
                                      {/*    </>:*/}
                                      {/*    <>*/}
                                      {/*         <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(0)</h6>*/}
                                      {/*        <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {0}</h6>*/}
                                      {/*    </>}*/}

                                  </div>
                              </Card.Body>
                          </Card>
                           </Link>
                      </div>
              </Col>
               <Col xs={6} className="p-0">
                       <div style={{marginTop:'5px',paddingLeft:'2px',paddingRight:'17px'}}>
                            <Link to="/vendor/all_customer" style={{color:'#000',textDecoration:'none'}}>
                              <Card style={{borderRadius:'15px'}}>
                              <Card.Body>
                                  <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>All Customers</h4>
                                      {allCustomerLists.length?
                                      <>
                                           <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allCustomerCount} )</h6>
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
                            </Link>
                      </div>
              </Col>
              <Col xs={6} className="p-0">
                  <div style={{marginTop:'5px',paddingRight:'2px',paddingLeft:'17px'}}>
                      <Card style={{borderRadius:'15px'}}>
                          <Card.Body>
                              <div style={{display:'grid',placeContent:'center'}}>
                                  <h4 style={{fontSize:'17px',}}>All Payments</h4>
                                  <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allPaymentCount} )</h6>
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
                                  <h4 style={{fontSize:'17px',}}>Payable Delivery Charge</h4>
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
                   <Row >
                       {/*<Col xs={12}>*/}
                       {/*   <MobileSlider />*/}
                       {/*</Col>*/}
                       <Col xs={12}  >
                     {/*<Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>*/}
                              <div style={{marginTop:'0px',padding:'5px 5px',height:'200px',overflowY:'hidden',borderRadius:'20px',display:'flex',placeContent:'center'}}>
                                   {/*<div>Dashboard Mobile</div>*/}
                                 {allBanner.length?
                                              <>
                                                  <SliderDesktop {...settings}>
                                                           {allBanner.map((data)=>(
                                                               <div><img
                                                                  className="d-block w-100"
                                                                  src={data.banner_url}
                                                                  alt="First slide"/>
                                                                </div>
                                                           ))}

                                                   </SliderDesktop>
                                              </>:
                                              <>
                                              </>
                                     }
                              </div>
                       </Col>
                       <Col xs={12} style={{paddingLeft:'17px',paddingRight:'17px',paddingBottom:'7px'}}>
                         <div className="pt-2 ">
                            <Card style={{borderRadius:'30px',border:'none'}}>
                          <Card.Body className="p-0">
                               <Form className="search">
                                   <Form.Control type="text" value={query} placeholder="Search all orders ..." onChange={onSearch} style={{borderRadius:'15px',}} />
                                  {/*<input type="text" value={query} onChange={onSearch} />*/}
                              </Form>
                          </Card.Body>
                      </Card>

                            {/*<ReactDashboardMainSearch />*/}
                        </div>
                       </Col>
                          {
                              query.length>0?
                                  <>
                                       <Col lg={12}>
                                          <div style={{paddingLeft:'10px',paddingRight:'10px'}}>
                                              {characterResults.map((character) => {
                                                  const {packet_name, type, customer_phone, cod,tex_code,customer_name} = character;
                                                  return (
                                                      <>
                                                          <Card onClick={(e)=>{e.preventDefault();getOrderDetail(character.id)}}>
                                                                  <Card.Body className="p-0">
                                                                      <Row>
                                                                          <Col xs={3} className="pl-0 pr-0">
                                                                              <Image src={logoImage} roundedCircle style={{height:'60px'}}/>
                                                                          </Col>
                                                                          <Col xs={9} style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                                              <div className="pt-2">
                                                                                  <h6 className="mb-1">{character.tex_code}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}>(COD Rs.{character.cod})</span></h6>
                                                                              </div>
                                                                              <div>
                                                                                  <Row>
                                                                                     <Col xs={6}>
                                                                                       <span style={{fontSize:'15px'}}>{ character.customer_name.length>13 ? <><span>{character.customer_name.substring(0,13)}...</span></>: <><span>{character.customer_name}</span></> }</span>
                                                                                     </Col>
                                                                                     <Col xs={6}>
                                                                                      <span style={{fontSize:'14px'}}>Status: {character.status}</span>
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
                                  </>:
                                  <>

                                  </>
                          }
                           <Col xs={6} className="p-0">
                      <div style={{marginTop:'5px',paddingLeft:'17px',paddingRight:'2px'}}>
                           <Link to="/vendor/partner_orders" style={{color:'#000',textDecoration:'none'}}>
                          <Card style={{borderRadius:'15px'}}>
                              <Card.Body>
                                  <div style={{display:'grid',placeContent:'center'}}>
                                      <h4 style={{fontSize:'17px',}}>All Orders</h4>

                                      {
                                          allPickupOrders.length?
                                              <>
                                                  <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allOrderCount} )</h6>
                                                  <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {allOrderCodTotal}</h6>
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

                                                 {allProcessPickup.length?
                                                 <>
                                                     <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {onProcessOrderCount} )</h6>
                                                     <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {onProcessOrderCodTotal}</h6>
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

                                                 {
                                                    pendingOrdersList?
                                                        <>
                                                            <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allDeliveredCount} )</h6>
                                                            <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {allDeliveredCodTotal}</h6>
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
                                                 {holdOrdersList.length?
                                                      <>
                                                           <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>({allHoldCount})</h6>
                                                          <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {allHoldCodTotal}</h6>
                                                      </>:
                                                      <>
                                                           <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(0)</h6>
                                                          <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {allHoldCodTotal}</h6>
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
                                                  <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>({returnCount})</h6>
                                                  <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {returnAndExchangeTotal}</h6>
                                                  {/*{(returnsOrdersList.length+returnsConfirmsOrdersList.length) > 0?*/}
                                                  {/*    <>*/}
                                                  {/*         <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>({returnCount})</h6>*/}
                                                  {/*        <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {returnAndExchangeTotal}</h6>*/}
                                                  {/*    </>:*/}
                                                  {/*    <>*/}
                                                  {/*         <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>(0)</h6>*/}
                                                  {/*        <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>Rs. {0}</h6>*/}
                                                  {/*    </>}*/}

                                              </div>
                                          </Card.Body>
                                      </Card>
                                       </Link>
                                  </div>
                          </Col>
                           <Col xs={6} className="p-0">
                                   <div style={{marginTop:'5px',paddingLeft:'2px',paddingRight:'17px'}}>
                                        <Link to="/vendor/all_customer" style={{color:'#000',textDecoration:'none'}}>
                                          <Card style={{borderRadius:'15px'}}>
                                          <Card.Body>
                                              <div style={{display:'grid',placeContent:'center'}}>
                                              <h4 style={{fontSize:'17px',}}>All Customers</h4>
                                                  {allCustomerLists.length?
                                                  <>
                                                       <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allCustomerCount} )</h6>
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
                                        </Link>
                                  </div>
                          </Col>
                          <Col xs={6} className="p-0">
                              <div style={{marginTop:'5px',paddingRight:'2px',paddingLeft:'17px'}}>
                                  <Card style={{borderRadius:'15px'}}>
                                      <Card.Body>
                                          <div style={{display:'grid',placeContent:'center'}}>
                                              <h4 style={{fontSize:'17px',}}>All Payments</h4>
                                              <h6 style={{display:'grid',placeContent:'center',fontSize:'14px'}}>( {allPaymentCount} )</h6>
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
                                              <h4 style={{fontSize:'17px',}}>Payable Delivery Charge</h4>
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
}
export default VendorDashboard