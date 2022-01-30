import React, {useState,useEffect} from 'react';
import {Card, Col, Image, Row} from "react-bootstrap";
import logoImage from "../../../logo.svg";
import {GrView} from "react-icons/gr";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {getNewRequestList} from "../../../redux/actions/vendor";

const PickupRequestListView=()=>{
     const history = useHistory();
     const dispatch = useDispatch();
     const vendor = useSelector((state) => state.vendor);
     const newRequestList=vendor.newRequestList;
    const[requestList,setRequestList]=useState('');
    const getAllImageDetail=(id)=>{
      history.push({
           pathname: '/vendor/pickup_detail',
           state: {pickupID: id }
       });
    }
    useEffect(()=>{
       let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        // console.log(staff_admin);
        if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }
        getEntryRequestList();
    },[0]);
    const getEntryRequestList=()=>{
        axios.get('/partner/my/new/pickup/request')
            .then((res)=>{
                console.log(res.data);
                dispatch(getNewRequestList(res.data));
            })
            .catch((err)=>{
               console.log(err.response.data);
            })
    }

    return(
        <>
            {/*<h6>Pickup Request List View</h6>*/}
              <Row>
                <Col xs={12}>
                    <Card onClick={(e)=>{e.preventDefault(); getAllImageDetail(2)}}>
                          <Card.Body className="p-0">
                              <Row>
                                  <Col xs={3} className="pl-0 pr-0">
                                      <Image src={logoImage} roundedCircle />
                                  </Col>
                                  <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>
                                      <Row>
                                          <Col xs={8}>
                                              <div style={{display:'grid',height:'50px',alignContent:'center'}}>
                                                  <h6 className="mb-1">Product Name<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>(Tex Code)</span></h6>
                                              </div>
                                          </Col>
                                          <Col xs={4}>
                                              <div style={{display:'grid',height:'50px',alignContent:'center'}}>
                                                  <div onClick={(event)=>getAllImageDetail(2)}>
                                                        <GrView size={25} />
                                                  </div>

                                              </div>
                                              {/*<h6>view Button</h6>*/}
                                          </Col>
                                      </Row>
                                      <div className="pt-2">
                                          {/*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*/}

                                      </div>
                                       <div>
                                           {/*<p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                                      </div>
                                      {/*<div>*/}
                                      {/*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*/}

                                      {/*</div>*/}
                                      {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                  </Col>
                              </Row>
                          </Card.Body>
                       </Card>

                </Col>
            </Row>
        </>
    )
}
export default PickupRequestListView