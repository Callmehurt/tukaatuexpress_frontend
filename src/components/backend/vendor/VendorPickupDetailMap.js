import React, {useEffect, useRef, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon} from "leaflet";
import 'leaflet/dist/leaflet.css';
import markIcon from 'leaflet/dist/images/marker-icon.png';

const VendorPickupDetailMap=({coordinate})=>{
    let position = []
    if(coordinate !== null && coordinate !== undefined){
        position = coordinate.split(',')
    }else {
        position = [27.04715503556404, 86.23082233741818]
    }

    return(
        <>
            <div className="map-container" >
                    <MapContainer center={position} zoom={14} scrollWheelZoom={false} style={{height:'75vh'}}>
                    <TileLayer
                       attribution='&copy; <a href="http://tukaatuexpress.com" target="_blank">Tukaatuexpress</a> contributors'
                        url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                        {
                            coordinate !== null && coordinate !== undefined ? (
                                <>
                                    <Marker position={position} icon={new Icon({iconUrl: markIcon, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                                    </Marker>
                                </>
                            ): (
                                <>
                                </>
                            )
                        }
                  </MapContainer>
            </div>
        </>
    )
}
export default VendorPickupDetailMap