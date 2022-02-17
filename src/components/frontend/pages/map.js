import React, {useEffect, useState} from "react";
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markIcon from 'leaflet/dist/images/marker-icon.png';
import {Icon} from 'leaflet';
import {useHistory} from "react-router-dom";
import axios from "axios";


const Map = () => {
    const history = useHistory();
    const [branchLocations,setBranchLocation]=useState([]);
     useEffect(()=>{
         const vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        if(vendorDetail){
            // dispatch(vendorAuthenticate(vendorDetail.user));
            history.push('/vendor/dashboard');
        }
        getLocations();
    },[0]);
     const getLocations=()=>{
         axios.get('/branch/list')
                    .then((res)=>{
                        let branchDetail=res.data.data;
                        let branchDetailsArray=[];
                        branchDetail.forEach((items,index)=>{
                            let actualBranchName=items.name.split(' ',1);
                            let arrayObject = {
                                   // branch:items.name,
                                    branch:actualBranchName,
                                   contact:items.phone,
                                   position:[items.lat,items.lng],
                            };
                            branchDetailsArray.push(arrayObject);
                         })
                            setBranchLocation(branchDetailsArray);
                    })

     }
    const position = [28.315177778858335, 83.9109019905555]
    return (
        <MapContainer center={position} zoom={7} scrollWheelZoom={false}>
            <TileLayer
               attribution='&copy; <a href="https://tukaatuexpress.com" target="_blank">Tukaatuexpress</a> contributors'
                url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {branchLocations.map((data, index) => {
                return (
                    <Marker key={index} position={data.position} icon={new Icon({iconUrl: markIcon, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                      <Popup>
                          <div style={{color:'#000',fontSize:'15px'}}>{data.branch}</div>
                      </Popup>
                    </Marker>
                )
            })}
            {/*<SearchField apiKey="pk.eyJ1IjoiY2FsbG1laHVydCIsImEiOiJja3Myc292cmgxcGRyMnZtcmw2dHhkZ3NnIn0.77cjfL72VBsvoqaFWLzR1g"/>*/}
          </MapContainer>
    )
}


export default Map;