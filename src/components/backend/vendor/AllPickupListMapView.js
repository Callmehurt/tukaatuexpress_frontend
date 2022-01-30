import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Button} from 'react-bootstrap';
import markIcon from 'leaflet/dist/images/marker-icon.png';
import {Icon} from 'leaflet';
import SearchField from "../../frontend/pages/mapSearch";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {getAllRole} from "../../../redux/actions/HrAdmin";
import axios from "axios";
import {VendorAllDeliveries} from "../../../redux/actions/vendor";


const AllPickupListMapView=()=>{
     const history = useHistory();
     const vendor = useSelector((state) => state.vendor);
    const allDeliveries = vendor.allDeliveries;
    const[pickupData,setPickupData]=useState([]);
    useEffect(()=>{
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        // console.log(staff_admin);
        if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }
        console.log(allDeliveries);
        getLocation();
        console.log(pickupData);
    },[0]);
    const getLocation=()=>{
        axios.get('/partner/pickup/process/list')
            .then((res)=>{
                console.log(res.data);
                if(allDeliveries){
                       let allProcessList =res.data;
                        let mapViewProcess=[];
                        allProcessList.forEach((items,index)=>{
                        console.log('hello list');
                        let arrayObject={
                            id:items.name,
                            product_name:items.product_name,
                            customer_phone:items.customer_phone,
                            dp_coordinates:[items.dp_coordinates],
                        };
                        // allCustomerDataList.value=items.id;
                        // allCustomerDataList.label=items.name+'('+items.phone+')';
                        mapViewProcess.push( arrayObject);
                        // dispatch(getAllRole(allRolesList));
                            setPickupData(mapViewProcess);

                    })

                }
                 })
            .catch((err)=>{
               console.log(err.response);
            })
    }
    const officeLocation = [
        {
            'branch': 'Kathmandu Branch',
            'contact': '01-52458',
            'position': [27.685025524308465, 85.34556875178576]

        },
         {
            'branch': 'Itahari Branch',
             'contact': '025-52488',
             'position': [26.661187592983435, 87.27606015684826]
        },
        {
            'branch': 'Damak Branch',
             'contact': '025-52488',
             'position': [26.66079566607416, 87.70294281920796]
        },
        {
            'branch': 'Birtamode Branch',
             'contact': '025-52488',
             'position': [26.619848924659596, 87.98950543606706]
        },
         {
            'branch': 'Birgunj Branch',
             'contact': '025-52488',
             'position': [27.016407130537893, 84.87749532161064]
        },
        {
            'branch': 'Biratnagar Branch',
             'contact': '025-52488',
             'position': [26.486003522303008, 87.27263195302766]
        },
         {
            'branch': 'Dharan Branch',
             'contact': '025-52488',
             'position': [26.811255994937007, 87.28755321197828]
        },
        {
            'branch': 'Inaruwa Branch',
             'contact': '025-52488',
             'position': [26.604997993851494, 87.14158875912686]
        }
    ]
    const getProductID=(id)=>{
        console.log(id);
         history.push({
           pathname: '/vendor/pickup_detail',
           state: {pickupID: id }
       });
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
                    {pickupData.map( data => {
                        return (
                            <>
                                {data.dest_coordinate?
                                    <>
                                        <Marker key={data.tex_code} position={data.dest_coordinate} icon={new Icon({iconUrl: markIcon, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                                          <Popup>
                                              {/*/!*{data.branch}*!/Product name(9815360575)*/}
                                              {/*{data.packet_name}*/}
                                              { data.packet_name}
                                              <br/>

                                               <Button variant="primary" onClick={(event)=>getProductID(2)} style={{fontSize:'10px',padding:'2px',marginTop:'5px',marginLeft:'20px'}}>View Details</Button>
                                              {/*<span>Contact: {data.contact}</span>*/}
                                          </Popup>
                                        </Marker>
                                    </>:
                                    <>
                                    </>
                                }

                            </>
                        )
                    })}
                    {/*<SearchField apiKey="pk.eyJ1IjoiY2FsbG1laHVydCIsImEiOiJja3Myc292cmgxcGRyMnZtcmw2dHhkZ3NnIn0.77cjfL72VBsvoqaFWLzR1g"/>*/}
                  </MapContainer>
            </div>

        </>
    )
}
export default AllPickupListMapView