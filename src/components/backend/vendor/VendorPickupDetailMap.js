import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon} from "leaflet";
import 'leaflet/dist/leaflet.css';
import markIcon from 'leaflet/dist/images/marker-icon.png';
import {Button} from "react-bootstrap";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {
    getDeliveryPersonCurrentLocation,
    getSinglePickupDetail,
    getSinglePickupLocation
} from "../../../redux/actions/vendor";

const VendorPickupDetailMap=()=>{
        const dispatch = useDispatch();
        const vendor = useSelector((state) => state.vendor);
        const singlePickupDetail = vendor.singlePickupDetail;
        const singlePickupLocations=vendor.singlePickupLocations;
        const [customerLocation,setCustomerLocation]=useState([]);
    useEffect(()=>{
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        // console.log(staff_admin);
        if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }
        getCurrentDeliveryPersonLocation();
        getCustomerLocation();
        // console.log
        // let consData=singlePickupDetail.dest_coordinate;
        // console.log(consData);
        console.log(position);
        console.log("position");
        console.log(singlePickupLocations);


        console.log(customerLocation);
         console.log("customerLocation");
    },[]);
    const getCurrentDeliveryPersonLocation=()=>{
        axios.get(`/partner/delivery/person/active/location`)
             .then((res)=>{
                 console.log(res.data);
                 console.log('delivery Person Location');
                 dispatch(getDeliveryPersonCurrentLocation(res.data));
             })
            .catch((err)=>{
               console.log(err.response);
            })

    }

    const getCustomerLocation=()=>{
        // let exactLocation=singlePickupDetail.dest_coordinate;

        // if(exactLocation){
        // if(singlePickupDetail.dest_coordinate!=null){
        //      let exactSplit = exactLocation.split(',');
        //       console.log(exactSplit);
        // }

        // }
        // if(singlePickupDetail.dest_coordinate){
        //     let exactLocation = new Array(singlePickupDetail.dest_coordinate);
        //     let splitArray1 = exactLocation[0].split(',',2);
        //     // let splitArray= exactLocation.slice(0,1);
        //      console.log("exactLocation");
        //      console.log(exactLocation);
        //      // console.log(splitArray);
        //       console.log(splitArray1);
        //      console.log("exactLocation");
        //      setCustomerLocation(splitArray1);
        //      console.log(customerLocation);
        //
        // }
        // else{
        //     console.log("null");
        //     console.log(customerLocation);
        // }


        // // const locationData=new Array('splitArray[0]','splitArray[1]');
        // // console.log(locationData);
        //  console.log(splitArray);
        //  console.log(splitArray[0]);
        //  // const arrayLocation= new Array({
        //  //     0:splitArray[0],
        //  //     1:splitArray[1],
        //  // });
        // const arrayLocation = [];
        // arrayLocation.push(splitArray[0]);
        // arrayLocation.push(splitArray[1]);
        //  // console.log(arrayLocation);
        //
        // console.log("splitArray");

        // let ArrayLocation=[];
        // console.log(exactLocation);
        // console.log("exactLocation");
        //
        // let locationCustomer=[{exactLocation}];

    }
    const position = [27.04715503556404, 86.23082233741818]

    return(
        <>
            <div className="map-container" >
                    <MapContainer center={position} zoom={7} scrollWheelZoom={false} style={{height:'75vh'}}>
                    <TileLayer
                       attribution='&copy; <a href="http://tukaatuexpress.com" target="_blank">Tukaatuexpress</a> contributors'
                        url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/*{officeLocation.map( data => {*/}
                    {/*    return (*/}
                        {
                            singlePickupLocations[0]?
                                <>
                                    <Marker key={singlePickupDetail.entry_branch} position={singlePickupLocations} icon={new Icon({iconUrl: markIcon, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                                      <Popup>
                                  {/*{data.branch}*/}Product name(9815360575)
                                  {/*{data.packet_name}*/}
                                  <br/>

                                   {/*<Button variant="primary" onClick={(event)=>getProductID(2)} style={{fontSize:'10px',padding:'2px',marginTop:'5px',marginLeft:'20px'}}>View Details</Button>*/}
                                  {/*<span>Contact: {data.contact}</span>*/}
                                        </Popup>
                                    </Marker>

                                </>:
                                <>
                                    hello
                                </>
                        }
                            {/*<Marker key={singlePickupDetail.entry_branch} position={[27.685025524308465, 85.34556875178576]} icon={new Icon({iconUrl: markIcon, iconSize: [25, 41], iconAnchor: [12, 41]})}>*/}
                            {/*  <Popup>*/}
                            {/*      /!*{data.branch}*!/Product name(9815360575)*/}
                            {/*      /!*{data.packet_name}*!/*/}
                            {/*      <br/>*/}

                            {/*       /!*<Button variant="primary" onClick={(event)=>getProductID(2)} style={{fontSize:'10px',padding:'2px',marginTop:'5px',marginLeft:'20px'}}>View Details</Button>*!/*/}
                            {/*      /!*<span>Contact: {data.contact}</span>*!/*/}
                            {/*  </Popup>*/}
                            {/*</Marker>*/}
                        {/*)*/}
                    {/*})}*/}
                    {/*<SearchField apiKey="pk.eyJ1IjoiY2FsbG1laHVydCIsImEiOiJja3Myc292cmgxcGRyMnZtcmw2dHhkZ3NnIn0.77cjfL72VBsvoqaFWLzR1g"/>*/}
                  </MapContainer>
            </div>
        </>
    )
}
export default VendorPickupDetailMap