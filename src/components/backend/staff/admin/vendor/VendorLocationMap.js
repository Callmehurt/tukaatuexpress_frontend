import React from "react";
import {MapContainer, TileLayer, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import favIcon from '../../../../../assets/faviconwhite.png';

let icon = L.icon({
    iconUrl: favIcon,
    iconSize:     [20, 20],
    iconAnchor:   [20, 20],
});

const VendorLocationMap = () => {

    const LocationMarker = () => {
        let marker;
        const map = useMapEvents({
        click: (e) => {
            map.flyTo(e.latlng);
            if (marker) {
                marker.setLatLng(e.latlng, {icon: icon});
            }else {
                marker = L.marker(e.latlng, {icon: icon}).addTo(map);
            }
           localStorage.setItem('vendor_location', JSON.stringify(e.latlng));
        },
      })
        return null
    }

    const position = [27.04715503556404, 86.23082233741818]
    return (
        <>
            <MapContainer style={{height: "100%", width: "100%"}} center={position} zoom={7} scrollWheelZoom={false}>
                <LocationMarker/>
                <TileLayer
                    attribution='&copy; <a href="http://tukaatuexpress.com" target="_blank">Tukaatuexpress</a> contributors'
                    url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
       </>
    )
}


export default VendorLocationMap;