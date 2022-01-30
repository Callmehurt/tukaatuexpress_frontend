import React, {useEffect} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon} from "leaflet";
import {Button} from "react-bootstrap";
import markIcon from 'leaflet/dist/images/marker-icon.png';
import {useSelector} from "react-redux";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";

const SinglePickupMap=()=>{
 const thisState = useSelector((state) => state.branchOperation);
 const singlePickupDetailCoordinate= thisState.singlePickupDetailCoordinate;
 const singlePickupDetailOperation= thisState.singlePickupDetailOperation;
const position = [27.04715503556404, 86.23082233741818];
useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
         console.log("singlePickupDetailCoordinate");
        console.log(singlePickupDetailCoordinate);
        console.log("singlePickupDetailCoordinate");
},[])
const branch='';
    return(
        <>
            {singlePickupDetailCoordinate[0]?
                <>
                      <div className="map-container" >
                    <MapContainer center={position} zoom={7} scrollWheelZoom={false} style={{height:'75vh'}}>
                    <TileLayer
                       attribution='&copy; <a href="http://tukaatuexpress.com" target="_blank">Tukaatuexpress</a> contributors'
                        url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                        <Marker key={branch} position={singlePickupDetailCoordinate} icon={new Icon({iconUrl: markIcon, iconSize: [25, 41], iconAnchor: [12, 41]})}>

                        </Marker>

                    {/*<SearchField apiKey="pk.eyJ1IjoiY2FsbG1laHVydCIsImEiOiJja3Myc292cmgxcGRyMnZtcmw2dHhkZ3NnIn0.77cjfL72VBsvoqaFWLzR1g"/>*/}
                  </MapContainer>
            </div>
                </>:
                <>

                     <div className="map-container" >
                    <MapContainer center={position} zoom={7} scrollWheelZoom={false} style={{height:'75vh'}}>
                    <TileLayer
                       attribution='&copy; <a href="http://tukaatuexpress.com" target="_blank">Tukaatuexpress</a> contributors'
                        url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                        {/*{singlePickupDetailCoordinate[0]?*/}
                        {/*    <>*/}
                        {/*        0*/}

                        {/*    </>:*/}
                        {/*    <>*/}
                        {/*        1*/}
                        {/*    </>*/}
                        {/*}*/}

                    {/*<SearchField apiKey="pk.eyJ1IjoiY2FsbG1laHVydCIsImEiOiJja3Myc292cmgxcGRyMnZtcmw2dHhkZ3NnIn0.77cjfL72VBsvoqaFWLzR1g"/>*/}
                  </MapContainer>
            </div>
                </>

            }
        </>
    )
}
export default SinglePickupMap