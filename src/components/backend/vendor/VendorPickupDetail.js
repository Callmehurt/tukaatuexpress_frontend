import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {getMessageDetail, getSinglePickupDetail,getSinglePickupLocation,getDeliveryPersonCurrentLocation} from './../../../redux/actions/vendor'
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import{Row,Col} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import VendorPickupDetailMap from "./VendorPickupDetailMap";



const VendorPickupDetail=()=>{
        const location=useLocation();
        const dispatch = useDispatch();
        const vendor = useSelector((state) => state.vendor);
        const singlePickupDetail = vendor.singlePickupDetail;
        const[pickupID,setPickupID]=useState(location.state?.pickupID);
        useEffect(()=>{
            let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
            // console.log(staff_admin);
            if(vendorDetail){
              setAuthorizationToken(vendorDetail.token);
            }
            getSinglePickup();
            getCurrentDeliveryPersonLocation();

        },[0]);
        const getCurrentDeliveryPersonLocation=()=>{
        axios.get(`partner/delivery/person/active/location/${singlePickupDetail.staff_id}`)
             .then((res)=>{
                 console.log(res.data);
                 console.log('delivery Person Location');
                 let DeliveryPersonDetail = res.data;
                 let deliveryPersonDetailPush =[];

                 DeliveryPersonDetail.map((items,index)=>
                     {
                          let currentActiveLocation=items.current_active_location;

                         let arrayObject = {
                             name: items.id,
                             phone: items.phone,

                             // activeLocation:[currentActiveLocation.],

                         };

                         deliveryPersonDetailPush.push(arrayObject);
                     }

                 )

                 dispatch(getDeliveryPersonCurrentLocation(res.data));

             })
            .catch((err)=>{
               console.log(err.response);
            })

    }
        const getSinglePickup=()=>{
            axios.get(`partner/pickup/details/${pickupID}`)
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data);
                        if(res.data){
                            let singlePickup=res.data;
                            console.log(singlePickup.dest_coordinate);
                            // let singlePickupDetail={
                            //     // singlePickups:[{
                            //     //     singlePickup.dest_coordinate
                            //     // }]
                            // }
                            if(singlePickup.dest_coordinate) {
                                let exactLocation = singlePickup.dest_coordinate;
                                let splitArray1 = exactLocation[0].split(',', 2);
                                console.log(splitArray1);
                            }

                        }
                        console.log('mmmm');
                         console.log("res.coordinate[0]");
                        dispatch(getSinglePickupLocation(res.data.coordinate[0]));
                        dispatch(getSinglePickupDetail(res.data.data));
                    })
            .catch((err)=>{
               console.log(err.response);
            })

        }


    return(
        <>
         <Row style={{height:'80vh',overflowY:'hidden'}}>
             <Col xs={12}>
                    {/*<h6>pickup Detail{pickupID}</h6>*/}
                    {/*<h6>{singlePickupDetail.id}</h6>*/}
                    <div style={{paddingLeft:'15px',paddingTop:'10px'}}>
                             <h5 style={{fontWeight:'600'}}>Order Details:</h5>
                             <h6> TEX Code: {singlePickupDetail.tex_code || <Skeleton />}</h6>
                             <h6> Detail: {singlePickupDetail.packet_name || <Skeleton />}</h6>
                             <h6> Status: {singlePickupDetail.status || <Skeleton />}</h6>
                             <h6> COD: Rs. {singlePickupDetail.cod || <Skeleton />}</h6>
                            <h6> Type: {singlePickupDetail.type || <Skeleton />}</h6>
                            <h6> Weight: {singlePickupDetail.weight || <Skeleton />} KG</h6>
                            <h6> Payment Type: {singlePickupDetail.payment_method || <Skeleton />}</h6>
                            <h6> Payment Status: {singlePickupDetail.payment_status || <Skeleton />}</h6>
                            <h6> Delivery Charge: Rs. {singlePickupDetail.delivery_charge || <Skeleton />}</h6>
                            <hr  style={{width:'93vw',height:'3px',color:'black'}}/>
                            <h5 style={{fontWeight:'600'}}>Customer Details:</h5>
                             <h6> Name: {singlePickupDetail.customer || <Skeleton />}</h6>
                             <h6> Phone: {singlePickupDetail.customer_phone || <Skeleton />}</h6>
                              <h6> Address: {singlePickupDetail.customer_address || <Skeleton />}</h6>
                    </div>
                    <div style={{height:'43vh',overflowY:'hidden'}}>
                      <VendorPickupDetailMap />
                    </div>
              </Col>
            </Row>
        </>



    );
}

export default VendorPickupDetail