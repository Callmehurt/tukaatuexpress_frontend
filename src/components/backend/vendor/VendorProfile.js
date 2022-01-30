import React, {useEffect, useState} from 'react';
import {Row,Col,Card,Button} from 'react-bootstrap';
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import Avatar from 'react-avatar';
import axios from "axios";
import {pendingOrderList} from "../../../redux/actions/vendor";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {adminStaffLogout} from "../../../redux/actions/adminStaffAuthenticate";

const VendorProfile=()=>{
    const history=useHistory();
    const [partnerDetail,setPartnerDetail]=useState('');
    const[receivableAmount,setReceivableAmount]=useState('');
     const dispatch = useDispatch();
    useEffect(()=>{
       let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        // console.log(staff_admin);
        setPartnerDetail(vendorDetail.user);
        if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }
        console.log(partnerDetail);
        getAccountBalance();
        getProfileDetail();

    },[0]);

    const getAccountBalance=()=>{
        axios.get('/partner/account/balance')
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data);
                        setReceivableAmount(res.data);
                        // dispatch(pendingOrderList(res.data));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })
    }
    const getProfileDetail=()=>{
        axios.get('/partner/profile/details')
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data);
                        setPartnerDetail(res.data.details);
                        // dispatch(pendingOrderList(res.data));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })
    }
    const changePassword=()=>{
        history.push('/vendor/change_password');
    }
    const logoutPartner=()=>{
        axios.post('/partner/logout')
                    .then((res)=>{
                        console.log(res);
                        // console.log(res.data);
                         let VendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
                        if(VendorDetail){
                             localStorage.removeItem('vendorDetail');
                             history.push('/');
                          }
                        // dispatch(pendingOrderList(res.data));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })
    }

    return(
        <>
            {/*<h6>Vendor Profile</h6>*/}
            <Row style={{height:'80vh',overflowY:'auto'}}>
                {/*<Col lg={12} style={{paddingTop:'5px',paddingLeft:'35px',paddingRight:'35px'}}>*/}

                {/*          <Row>*/}
                {/*              <Col xs={12} className="p-0">*/}
                {/*                  <Card style={{borderRadius:'5%',}}>*/}
                {/*                    <Card.Body>*/}
                {/*                          <div style={{height:'50px'}}>*/}
                {/*                              <h6 className="text-center">Receivable Amount </h6>*/}
                {/*                              <h6 className="text-center">Rs. {receivableAmount}</h6>*/}
                {/*                          </div>*/}
                {/*                    </Card.Body>*/}
                {/*                  </Card>*/}
                {/*              </Col>*/}
                {/*              /!*<Col xs={6} className="p-0">*!/*/}
                {/*              /!*    <Card style={{borderRadius:'5%',}}>*!/*/}
                {/*              /!*      <Card.Body>*!/*/}
                {/*              /!*              <h6 className="text-center">Total Delivered COD</h6>*!/*/}
                {/*              /!*              <h6 className="text-center">2000000+</h6>*!/*/}
                {/*              /!*           </Card.Body>*!/*/}
                {/*              /!*    </Card>*!/*/}
                {/*              /!*</Col>*!/*/}
                {/*              /!*<Col xs={6} className="p-0">*!/*/}
                {/*              /!*    <Card style={{borderRadius:'5%',}}>*!/*/}
                {/*              /!*      <Card.Body>*!/*/}
                {/*              /!*                <h6 className="text-center">Total Delivery Charge</h6>*!/*/}
                {/*              /!*                <h6 className="text-center">2000000+</h6>*!/*/}
                {/*              /!*          </Card.Body>*!/*/}
                {/*              /!*    </Card>*!/*/}
                {/*              /!*</Col>*!/*/}
                {/*          </Row>*/}

                {/*</Col>*/}
                <Col xs={12} style={{paddingLeft:'30px',}}>
                    <div style={{display:'grid',placeContent:'center',paddingTop:'50px',paddingBottom:'10px'}}>
                       <Avatar name={partnerDetail?.vendor_name} round={true}/>
                    </div>
                    <div style={{display:'grid',placeContent:'start',}}>
                        <h6 className="mb-2">Name : {partnerDetail?.vendor_name}</h6>
                    </div>
                    <div style={{display:'grid',placeContent:'start',}}>
                        <h6 className="mb-2">Contact no. : {partnerDetail?.vendor_phone}</h6>
                    </div>
                    <div style={{display:'grid',placeContent:'start',}}>
                        <h6 className="mb-2">Email : {partnerDetail?.vendor_email}</h6>
                    </div>
                     <div style={{display:'grid',placeContent:'start',}}>
                        <h6 className="mb-2">Address : {partnerDetail?.address}</h6>
                    </div>
                    <div style={{display:'grid',placeContent:'start',}}>
                        <h6 className="mb-2">Bank : {partnerDetail?.vendor_bank}</h6>
                    </div>
                    <div style={{display:'grid',placeContent:'start',}}>
                        <h6 className="mb-2">Account Number : {partnerDetail?.vendor_account}</h6>
                    </div>
                    <div style={{display:'grid',placeContent:'start',}}>
                        <h6 className="mb-2">Account Holder : {partnerDetail?.vendor_account_holder}</h6>
                    </div>
                     <div style={{display:'grid',placeContent:'start',}}>
                        <h6 className="mb-2">Bank Branch : {partnerDetail?.bank_branch}</h6>
                    </div>
                    <div style={{display:'grid',placeContent:'start',}}>
                        <h6 className="mb-2">E-sewa : {partnerDetail?.vendor_esewa}</h6>
                    </div>



                </Col>
                <Col xs={12}>
                    <div style={{display:'flex',placeContent:'center',paddingLeft:'50px',paddingRight:'50px'}}>
                        <Button variant="warning" style={{width:'100vw',}} onClick={(event)=>changePassword()}>Change Password</Button>
                    </div>
                </Col>
                <Col xs={12}>
                    <div style={{display:'flex',placeContent:'center',paddingLeft:'50px',paddingRight:'50px'}}>
                        <Button variant="warning" style={{width:'100vw',}} onClick={(event)=>logoutPartner()}>Log Out</Button>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default VendorProfile