import React, {useEffect} from 'react';
import {Row,Col,Image,Card} from 'react-bootstrap';
import logoImage from "../../../assets/faviconwhite.png";
import {GrView} from 'react-icons/gr';
import {useHistory} from "react-router-dom";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {pendingOrderList,getNewRequestList} from "../../../redux/actions/vendor";
import {useDispatch, useSelector} from "react-redux";
import useWindowSize from "../../../use-window-size";
import Avatar from "react-avatar";

const PickupRequestImageView=()=>{
     const history = useHistory();
     const dispatch = useDispatch();
      const vendor = useSelector((state) => state.vendor);
      const newRequestLists=vendor.newRequestList;
     useEffect(()=>{
           let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
            // console.log(staff_admin);
            if(vendorDetail){
              setAuthorizationToken(vendorDetail.token);
            }
            getRequestOrderList();
     },[0]);
    const getRequestOrderList=()=>{
            axios.get('/partner/my/new/pickup/request')
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data);
                        dispatch(getNewRequestList(res.data));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })

        }
    const getAllImageDetail=(id,requestCode)=>{
       history.push({
           pathname: '/vendor/Pickup_request_images',
           state: {PickupRequestID: id, RequestCode:requestCode }
       });
    }
const windowsSize = useWindowSize();
  const isMobile=576;
  console.log(windowsSize);
  if (windowsSize.width<=isMobile) {
      return (
          <>
              {/*<h6>Pickup Request Image View</h6>*/}
              <Row style={{
                  height: '73vh',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  paddingLeft: '7px',
                  paddingRight: '7px'
              }}>
                  <Col xs={12}>
                      {newRequestLists.length ?
                          <>
                              {
                                  newRequestLists.map((items) => (
                                      <>
                                          <Card onClick={(e) => {
                                              e.preventDefault();
                                              getAllImageDetail(items.id, items.request_code)
                                          }}>
                                              <Card.Body className="p-0">
                                                  <Row>
                                                      <Col xs={3} className="pl-0 pr-0" style={{display: 'grid', placeItems: 'center'}}>
                                                      <div style={{height: '55px', width: '55px', borderRadius: '50%', display: 'grid', placeItems: 'center', border: '1px solid rgba(36, 36, 36, .5'}}>
                                                          <Image src={logoImage} roundedCircle className="img-fluid" style={{height:'40px'}}/>
                                                          </div>
                                                      </Col>
                                                      <Col xs={9} style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                          <Row>
                                                              <Col xs={8}>
                                                                  <div style={{
                                                                      display: 'grid',
                                                                      height: '50px',
                                                                      alignContent: 'center'
                                                                  }}>
                                                                      <h6 className="mb-1 pt-4">{items.request_code}</h6>
                                                                      <p className="mb-0"
                                                                         style={{fontSize: '13px'}}>{items.request_date}</p>
                                                                  </div>
                                                              </Col>
                                                              <Col xs={4}>
                                                                  <div style={{
                                                                      display: 'grid',
                                                                      height: '50px',
                                                                      alignContent: 'center'
                                                                  }}>
                                                                      <div
                                                                          onClick={(event) => getAllImageDetail(items.id)}>
                                                                          <GrView size={25}/>
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
                                      </>
                                  ))
                              }

                          </> :
                          <>
                              <div style={{
                                  height: '60vh',
                                  display: 'grid',
                                  placeContent: 'center',
                                  fontSize: '16px',
                                  fontWeight: '500'
                              }}>No Orders Here...
                              </div>
                          </>
                      }
                      {/*<Card onClick={(e)=>{e.preventDefault(); getAllImageDetail(2)}}>*/}
                      {/*   <Card.Body className="p-0">*/}
                      {/*       <Row>*/}
                      {/*           <Col xs={3} className="pl-0 pr-0">*/}
                      {/*               <Image src={logoImage} roundedCircle />*/}
                      {/*           </Col>*/}
                      {/*           <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                      {/*               <Row>*/}
                      {/*                   <Col xs={8}>*/}
                      {/*                       <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
                      {/*                           <h6 className="mb-1">Product Name<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>(Tex Code)</span></h6>*/}
                      {/*                       </div>*/}
                      {/*                   </Col>*/}
                      {/*                   <Col xs={4}>*/}
                      {/*                       <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
                      {/*                           <div onClick={(event)=>getAllImageDetail(2)}>*/}
                      {/*                                 <GrView size={25} />*/}
                      {/*                           </div>*/}

                      {/*                       </div>*/}
                      {/*                       /!*<h6>view Button</h6>*!/*/}
                      {/*                   </Col>*/}
                      {/*               </Row>*/}
                      {/*               <div className="pt-2">*/}
                      {/*                   /!*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*!/*/}

                      {/*               </div>*/}
                      {/*                <div>*/}
                      {/*                    /!*<p style={{fontSize:'15px'}}>Recent Message Show</p>*!/*/}

                      {/*               </div>*/}
                      {/*               /!*<div>*!/*/}
                      {/*               /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

                      {/*               /!*</div>*!/*/}
                      {/*               /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                      {/*           </Col>*/}
                      {/*       </Row>*/}
                      {/*   </Card.Body>*/}
                      {/*</Card>*/}
                  </Col>
              </Row>
          </>
      )
  }else{
      return (
          <>
              {/*<h6>Pickup Request Image View</h6>*/}
              <Row style={{
                  height: '73vh',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  paddingLeft: '7px',
                  paddingRight: '7px'
              }}>
                  <Col xs={12}>
                      {newRequestLists.length ?
                          <>
                              {
                                  newRequestLists.map((items) => (
                                      <>
                                          <Card onClick={(e) => {
                                              e.preventDefault();
                                              getAllImageDetail(items.id, items.request_code)
                                          }}>
                                              <Card.Body className="p-0">
                                                  <Row>
                                                      <Col lg={2} className="pl-0 pr-0" style={{display: 'grid', placeItems: 'center'}}>
                                                          <div style={{height: '55px', width: '55px', borderRadius: '50%', display: 'grid', placeItems: 'center', border: '1px solid rgba(36, 36, 36, .5'}}>
                                                          <Image src={logoImage} roundedCircle className="img-fluid" style={{height:'40px'}}/>
                                                          </div>
                                                      </Col>
                                                      <Col lg={10} style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                          <Row>
                                                              <Col xs={8}>
                                                                  <div style={{
                                                                      display: 'grid',
                                                                      height: '50px',
                                                                      alignContent: 'center'
                                                                  }}>
                                                                      <h6 className="mb-1 pt-4">{items.request_code}</h6>
                                                                      <p className="mb-0"
                                                                         style={{fontSize: '13px'}}>{items.request_date}</p>
                                                                  </div>
                                                              </Col>
                                                              <Col xs={4}>
                                                                  <div style={{
                                                                      display: 'grid',
                                                                      height: '50px',
                                                                      alignContent: 'center'
                                                                  }}>
                                                                      <div
                                                                          onClick={(event) => getAllImageDetail(items.id)}>
                                                                          <GrView size={25}/>
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
                                      </>
                                  ))
                              }

                          </> :
                          <>
                              <div style={{
                                  height: '60vh',
                                  display: 'grid',
                                  placeContent: 'center',
                                  fontSize: '16px',
                                  fontWeight: '500'
                              }}>No Orders Here...
                              </div>
                          </>
                      }
                      {/*<Card onClick={(e)=>{e.preventDefault(); getAllImageDetail(2)}}>*/}
                      {/*   <Card.Body className="p-0">*/}
                      {/*       <Row>*/}
                      {/*           <Col xs={3} className="pl-0 pr-0">*/}
                      {/*               <Image src={logoImage} roundedCircle />*/}
                      {/*           </Col>*/}
                      {/*           <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                      {/*               <Row>*/}
                      {/*                   <Col xs={8}>*/}
                      {/*                       <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
                      {/*                           <h6 className="mb-1">Product Name<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>(Tex Code)</span></h6>*/}
                      {/*                       </div>*/}
                      {/*                   </Col>*/}
                      {/*                   <Col xs={4}>*/}
                      {/*                       <div style={{display:'grid',height:'50px',alignContent:'center'}}>*/}
                      {/*                           <div onClick={(event)=>getAllImageDetail(2)}>*/}
                      {/*                                 <GrView size={25} />*/}
                      {/*                           </div>*/}

                      {/*                       </div>*/}
                      {/*                       /!*<h6>view Button</h6>*!/*/}
                      {/*                   </Col>*/}
                      {/*               </Row>*/}
                      {/*               <div className="pt-2">*/}
                      {/*                   /!*<h6 className="mb-1">{requestList.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({requestList.tex_code})</span></h6>*!/*/}

                      {/*               </div>*/}
                      {/*                <div>*/}
                      {/*                    /!*<p style={{fontSize:'15px'}}>Recent Message Show</p>*!/*/}

                      {/*               </div>*/}
                      {/*               /!*<div>*!/*/}
                      {/*               /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

                      {/*               /!*</div>*!/*/}
                      {/*               /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                      {/*           </Col>*/}
                      {/*       </Row>*/}
                      {/*   </Card.Body>*/}
                      {/*</Card>*/}
                  </Col>
              </Row>
          </>
      )
  }
}
export default PickupRequestImageView