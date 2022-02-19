import React, {useEffect, useState} from "react";
import 'leaflet/dist/leaflet.css';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon} from "leaflet";
import axios from "axios";
// import markIcon from 'leaflet/dist/images/marker-icon.png';
import markIcon from '../../assets/dpIcon.jpg';
import StaffAccordion from "./StaffAccordion";

const DeliveryPersonMap = () => {

    const [activeStaffs, setActiveStaffs] = useState([]);
    const [inActiveStaffs, setInActiveStaffs] = useState([]);

    useEffect(() => {
        fetchDeliveryStaffs();
        setInterval(() => {
            fetchDeliveryStaffs();
        }, 30000)
    }, [])


    const fetchDeliveryStaffs = async () => {
        const res = await axios.get('/delivery/person/status').catch((err) => {
            console.log(err)
        })
        console.log(res?.data)
        setActiveStaffs(res?.data.activeStaffs)
        setInActiveStaffs(res?.data.inActiveStaffs)
    }

    const position = [28.315177778858335, 83.9109019905555]
    return (
        <div style={{height: '100vh', position: 'relative'}}>
            <div style={{height: 'auto', width: '300px', background: 'white', position: 'absolute', right: '0', top: '0', zIndex: '1000',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
               <StaffAccordion active={activeStaffs} inActive={inActiveStaffs}/>
            </div>
            <MapContainer center={position} zoom={8} scrollWheelZoom={true} style={{height: '100vh'}}>
            <TileLayer
               attribution='&copy; <a href="https://tukaatuexpress.com" target="_blank">Tukaatuexpress</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {activeStaffs.map((data, index) => {
                if(data.current_active_location !== '' || data.current_active_location !== null){
                    const coor = data.current_active_location.split(',');
                 return (
                    <Marker key={data.id} position={coor} icon={new Icon({iconUrl: markIcon, iconSize: [20, 20], iconAnchor: [12, 41]})}>
                      <Popup>
                          <div style={{color:'#000',fontSize:'15px'}}>{data.name} - <strong>{data.isActive ? 'Online': 'Offline'}</strong></div>
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