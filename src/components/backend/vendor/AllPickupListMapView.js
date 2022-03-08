import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Button} from 'react-bootstrap';
import markIcon from 'leaflet/dist/images/marker-icon.png';
import {Icon} from 'leaflet';
import {useHistory} from "react-router-dom";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";


const AllPickupListMapView=()=>{
     const history = useHistory();
    const[pickupData, setPickupData]=useState([]);
    useEffect(()=>{
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        // console.log(staff_admin);
        if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }
        getLocation();

    },[]);

    const getLocation=()=>{
        axios.get('/partner/pickup/process/list')
            .then((res)=>{
                let arr = [];
                res.data.map((data) => {
                    if(data.current_location !== null && data.current_location !== ''){
                        let detail = {
                            coordinate: data.current_location.split(','),
                            tex_code: data.tex_code,
                            packet_name: data.packet_name
                        }
                        arr.push(detail)
                    }
                })
                setPickupData(arr);
                 })
            .catch((err)=>{
               console.log(err.response);
            })
    }
    const getProductID=(id)=>{
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
                    {pickupData.map(data => {
                        return (
                            <>
                                <Marker key={data.tex_code} position={data.coordinate} icon={new Icon({iconUrl: markIcon, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                                  <Popup>
                                      { data.tex_code} / {data.packet_name}
                                      <br/>
                                       <Button variant="primary" onClick={(event)=>getProductID(2)} style={{fontSize:'10px',padding:'2px',marginTop:'5px',marginLeft:'20px'}}>View Details</Button>
                                  </Popup>
                                </Marker>
                            </>
                        )
                    })}
                  </MapContainer>
            </div>

        </>
    )
}
export default AllPickupListMapView