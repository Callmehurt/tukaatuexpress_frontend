import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon} from "leaflet";
import markIcon from 'leaflet/dist/images/marker-icon.png';


const SinglePickupMap = ({coordinate}) =>{

    const [position, setPosition] = useState([]);
    const random = [27.04715503556404, 86.23082233741818];
    useEffect(() => {
        if(coordinate !== undefined && coordinate !== null){
            setPosition(coordinate.split(','))
        }
    }, [coordinate])

    return(
        <>
            {Object.keys(position).length === 0 ? (
                <>
                    <div className="map-container">
                        <MapContainer center={random} zoom={14} scrollWheelZoom={false} style={{height:'75vh', zIndex: 0}}>
                        <TileLayer style={{zIndex: 0}}
                           attribution='&copy; <a href="http://tukaatuexpress.com" target="_blank">Tukaatuexpress</a> contributors'
                            url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                      </MapContainer>
                </div>
                </>
            ): (
                <div className="map-container">
                    <MapContainer center={position} zoom={14} scrollWheelZoom={false} style={{height:'75vh', zIndex: 0}}>
                    <TileLayer style={{zIndex: 0}}
                       attribution='&copy; <a href="http://tukaatuexpress.com" target="_blank">Tukaatuexpress</a> contributors'
                        url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                        <Marker position={position} icon={new Icon({iconUrl: markIcon, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                        </Marker>
                  </MapContainer>
                </div>
            )}
        </>
    )
}
export default SinglePickupMap