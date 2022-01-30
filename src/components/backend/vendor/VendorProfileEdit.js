import React, {useEffect, useState} from 'react';
import {Form,Row,Col,Button} from 'react-bootstrap';
import {FaSave} from 'react-icons/fa'
import {useForm} from "react-hook-form";
import axios from "axios";
import notification from "../includes/notification";
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import VendorEditLocationMap from "./VendorEditLocationMap";
import {MapContainer, TileLayer, useMapEvents} from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import favIcon from "../../../assets/faviconwhite.png";
let icon = L.icon({
    iconUrl: favIcon,
    iconSize:     [20, 20],
    iconAnchor:   [20, 20],
});
const VendorProfileEdit=()=>{
     const dispatch = useDispatch();
      const history = useHistory();
       const location=useLocation();
    const [updateProfile,setUpdateProfile]=useState('');
    const {register, handleSubmit, errors} = useForm();
    const [formField,setFormField]=useState({
        vendor_name:'',
        vendor_email:'',
        vendor_phone:'',
        address:'',
        vendor_bank:'',
        bank_branch:'',
        vendor_account:'',
        vendor_account_holder:'',
        vendor_esewa:'',
        lat:null,
        lan:null,
    });

    useEffect(()=>{
         let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
         if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }
         getVendorDetail();
         // getVendorLocation();
         getProfileDetail();
          let latLngEditPartner = JSON.parse(localStorage.getItem('vendor_location_edit'));
           const newField= {...formField};
             newField.lat = latLngEditPartner?.lat;
             newField.lan = latLngEditPartner?.lng;
             setFormField(newField);
           console.log(updateProfile);
           console.log('updateProfile');
    },[]);
    const getProfileDetail=()=>{
        axios.get('/partner/profile/details')
                    .then((res)=>{
                        let onlyOneCount=0;
                        console.log('get profile update run');
                        console.log(res);
                        console.log(res.data);
                        let VendorDetailUser=res.data?.details;
                        const newField = {...formField}
                            newField.vendor_name =VendorDetailUser?.vendor_name ;
                            newField.vendor_email =VendorDetailUser?.vendor_email ;
                            newField.vendor_phone =VendorDetailUser.vendor_phone ;
                            newField.address =VendorDetailUser?.address ;
                            newField.vendor_bank =VendorDetailUser?.vendor_bank ;
                            newField.bank_branch =VendorDetailUser?.bank_branch ;
                            newField.vendor_account =VendorDetailUser?.vendor_account ;
                            newField.vendor_account_holder =VendorDetailUser?.vendor_account_holder ;
                            newField.vendor_esewa =VendorDetailUser?.vendor_esewa ;
                                 newField.lat =VendorDetailUser?.lat ;
                                  newField.lan =VendorDetailUser?.lon ;
                            setFormField(newField);
                        // setPartnerDetail(res.data.details);
                        // dispatch(pendingOrderList(res.data));
                    })
            .catch((err)=>{
               console.log(err.response);
            })
    }
    const getVendorLocation=()=>{
           let latLng = JSON.parse(localStorage.getItem('vendor_location_edit'));
              const newField= {...formField};
             newField.lat = latLng?.lat;
             newField.lan = latLng?.lng;
             setFormField(newField);
    }
    const getVendorDetail=()=>{
        // setUpdateProfile(vendorDetail);
        console.log(updateProfile);
         let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
         let VendorDetailUser=vendorDetail.user;
         console.log(VendorDetailUser);
        // console.log('updateProfile');
        //  const newField = {...formField}
        // newField.vendor_name =VendorDetailUser.vendor_name ;
        //  newField.vendor_email =VendorDetailUser.vendor_email ;
        //   newField.vendor_phone =VendorDetailUser.vendor_phone ;
        //   newField.address =VendorDetailUser.address ;
        //   newField.vendor_bank =VendorDetailUser.vendor_bank ;
        //   newField.bank_branch =VendorDetailUser.bank_branch ;
        //   newField.vendor_account =VendorDetailUser.vendor_account ;
        //    newField.vendor_account_holder =VendorDetailUser.vendor_account_holder ;
        //     newField.vendor_esewa =VendorDetailUser.vendor_esewa ;
        //      newField.lat =VendorDetailUser.lat ;
        //       newField.lon =VendorDetailUser.lon ;
        // setFormField(newField);
    }
     const onSubmit =(event) => {
        // event.preventDefault();
         let latLngEditPartner = JSON.parse(localStorage.getItem('vendor_location_edit'));
             console.log(latLngEditPartner);
             console.log(latLngEditPartner?.lat);
             console.log(latLngEditPartner?.lng);
              const newField= {...formField};
             newField.lat = latLngEditPartner?.lat;
             newField.lan = latLngEditPartner?.lng;

             setFormField(newField);
        console.log(formField);
        axios.post('/partner/update/profile', formField)
            .then((res) => {
                console.log(res)
                if(res.data.status === true){
                    notification('success', res.data.message);
                    console.log(formField);
                    getProfileDetail();
                    // clearform();
                    // setLoading(false);
                    history.push('/vendor/profile');
                }else {
                    notification('danger', res.data.message);
                }
            })
            .catch((err) => {
                 // if(err.response.status==422){
                 //      console.log(err.response)
                 //
                 //     // notification('danger', err.data.message);
                 // }
                console.log(err.response)
            })
     }
    const profileArray=[
        {type:'text',name:'name',placeholder:'Name', defaultValue:formField?.vendor_name},
        {type:'email',name:'email',placeholder:'Email',defaultValue:formField?.vendor_email},
        {type:'number',name:'phone',placeholder:'Contact no.',defaultValue:formField?.vendor_phone},
        {type:'text',name:'address',placeholder:'Address',defaultValue:formField?.address},
        {type:'text',name:'vendor_bank',placeholder:'Bank Name',defaultValue:formField?.vendor_bank},
        {type:'text',name:'bank_branch',placeholder:'Bank Branch',defaultValue:formField?.bank_branch},
        {type:'text',name:'vendor_account_holder',placeholder:'Account Holder Name',defaultValue:formField?.vendor_account_holder},
        {type:'number',name:'vendor_account',placeholder:'Account Number',defaultValue:formField?.vendor_account},
        {type:'number',name:'vendor_esewa',placeholder:'E-sewa',defaultValue:formField?.vendor_esewa},

    ];
     const position = [27.04715503556404, 86.23082233741818]
    const handleForm = event => {
        console.log('handle form click');
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
    }
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
           localStorage.setItem('vendor_location_edit', JSON.stringify(e.latlng));
             let latLng = JSON.parse(localStorage.getItem('vendor_location_edit'));
              console.log(latLng.lat,latLng.lng);
              const newField= {...formField};
              newField.lat = latLng?.lat;
              newField.lan = latLng?.lng;
              setFormField(newField);
        },
      })
        return null
    }


    return(
        <>
            <Row className="profile_edit_vendor" style={{height:'82vh',overflowY:'auto'}} >
                <Col xs={12} style={{padding:'10px 20px'}}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row style={{paddingBottom:'10px'}}>
                        <Col xs={5}>
                           {/*<h6 style={{paddingTop:'10px'}}>Vendor Profile edit</h6>*/}
                        </Col>
                         <Col xs={7}>
                             <div style={{display:'flex',justifyContent:'end',paddingRight:'5px'}}>
                                    <Button variant="primary" type="submit">
                                        <FaSave  /> <span style={{marginTop:'5px'}}>Save and Exit</span>
                                    </Button>
                             </div>
                        </Col>
                    </Row>
                     {profileArray.map((profileArray) => (
                         <>
                              <Form.Group className="mb-3" >
                                {/*<Form.Label>Email address</Form.Label>*/}
                                <Form.Control type={profileArray.type} autocomplete="off" name={profileArray.name} defaultValue={profileArray.defaultValue} placeholder={profileArray.placeholder} onClick={(event)=>handleForm(event)} />
                                {/*<Form.Text className="text-muted">*/}
                                {/*  We'll never share your email with anyone else.*/}
                                {/*</Form.Text>*/}
                              </Form.Group>
                         </>
                     ))
                     }
                      {/*<Button variant="primary" type="submit">*/}
                      {/*  Submit*/}
                      {/*</Button>*/}
                    <VendorEditLocationMap  />
                    {/*<Row>*/}
                    {/*    <Col xs={12}>*/}
                    {/*        <div style={{height:'300px'}}>*/}
                    {/*            /!*<VendorEditLocationMap  />*!/*/}
                    {/*             <MapContainer style={{height: "100%", width: "100%"}} center={position} zoom={7} scrollWheelZoom={false}>*/}
                    {/*                <LocationMarker/>*/}
                    {/*                <TileLayer*/}
                    {/*                    attribution='&copy; <a href="http://tukaatuexpress.com" target="_blank">Tukaatuexpress</a> contributors'*/}
                    {/*                    url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
                    {/*                />*/}
                    {/*            </MapContainer>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </Form>

                </Col>
            </Row>

        </>
    )
}

export default VendorProfileEdit