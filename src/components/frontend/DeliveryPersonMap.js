import React, {useEffect, useState} from "react";
import 'leaflet/dist/leaflet.css';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon} from "leaflet";
import axios from "axios";
// import markIcon from 'leaflet/dist/images/marker-icon.png';
import markIcon from '../../assets/dpIcon.png';

const DeliveryPersonMap = () => {

    const [staffs, setStaffs] = useState([]);

    useEffect(() => {
        fetchDeliveryStaffs();
        setInterval(() => {
            fetchDeliveryStaffs();
        }, 60000)
    }, [])


    const fetchDeliveryStaffs = async () => {
        const res = await axios.get('/delivery/person/status').catch((err) => {
            console.log(err)
        })
        setStaffs(res?.data)
    }

    const position = [28.315177778858335, 83.9109019905555]
    return (
        <div style={{height: '100vh'}}>
            <MapContainer center={position} zoom={8} scrollWheelZoom={true} style={{height: '100vh'}}>
            <TileLayer
               attribution='&copy; <a href="https://tukaatuexpress.com" target="_blank">Tukaatuexpress</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {staffs.map((data, index) => {
                if(data.current_active_location !== '' || data.current_active_location !== null){
                    const coor = data.current_active_location.split(',');
                 return (
                    <Marker key={data.id} position={coor} icon={new Icon({iconUrl: markIcon, iconSize: [25, 25], iconAnchor: [12, 41]})}>
                      <Popup>
                          <div style={{color:'#000',fontSize:'15px'}}>{data.name} - <strong>{data.isActive ? 'Online': 'Ofline'}</strong></div>
                      </Popup>
                    </Marker>
                )
                }
            })}
          </MapContainer>
        </div>
    )
}

export default DeliveryPersonMap;