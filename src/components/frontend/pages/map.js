import React, {useEffect, useState} from "react";
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markIcon from 'leaflet/dist/images/marker-icon.png';
import {Icon} from 'leaflet';
import SearchField from "./mapSearch";
import {vendorAuthenticate} from "../../../redux/actions/vendorAuthenticate";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {pendingOrderList} from "../../../redux/actions/vendor";


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
                        console.log(res);
                        console.log(res.data);
                        let branchDetail=res.data.data;
                        console.log(res.data);
                        console.log(branchDetail);
                        let branchDetailsArray=[];
                        branchDetail.forEach((items,index)=>{
                            let actualBranchName=items.name.split(' ',1);
                            console.log(actualBranchName);
                            let arrayObject = {
                                   // branch:items.name,
                                    branch:actualBranchName,
                                   contact:items.phone,
                                   position:[items.lat,items.lng],
                            };
                            branchDetailsArray.push(arrayObject);
                         })

                            console.log(branchDetailsArray);
                            console.log("branchDetailsArray");
                            setBranchLocation(branchDetailsArray);
                            console.log(branchLocations);
                            console.log('branchLocations');


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
    const position = [28.315177778858335, 83.9109019905555]
    return (
        <MapContainer center={position} zoom={7} scrollWheelZoom={false}>
            <TileLayer
               attribution='&copy; <a href="http://tukaatuexpress.com" target="_blank">Tukaatuexpress</a> contributors'
                url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {branchLocations.map( data => {
                return (
                    <Marker key={data.branch} position={data.position} icon={new Icon({iconUrl: markIcon, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                      <Popup>
                          <div style={{color:'#000',fontSize:'15px'}}>{data.branch}</div>

                          {/*<span>Contact: {data.contact}</span>*/}
                      </Popup>
                    </Marker>
                )
            })}
            {/*<SearchField apiKey="pk.eyJ1IjoiY2FsbG1laHVydCIsImEiOiJja3Myc292cmgxcGRyMnZtcmw2dHhkZ3NnIn0.77cjfL72VBsvoqaFWLzR1g"/>*/}
          </MapContainer>
    )
}


export default Map;