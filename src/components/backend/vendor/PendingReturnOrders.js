import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {Card, Col, Row} from "react-bootstrap";
import Avatar from "react-avatar";
import axios from "axios";
import {pendingOrderList,returnsOrderList} from "../../../redux/actions/vendor";

const PendingReturnOrders=()=>{
    const history = useHistory();
     const dispatch = useDispatch();
     const vendor = useSelector((state) => state.vendor);
     const returnsOrdersList = vendor.returnsOrdersList;
     useEffect(()=>{
         let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
            // console.log(staff_admin);
            if(vendorDetail){
              setAuthorizationToken(vendorDetail.token);
            }
            getPendingReturnList();


     },[]);
     const getPendingReturnList=()=>{
            axios.get('/partner/get/cancelled/pickups')
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data);
                        dispatch(returnsOrderList(res.data));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })

        }
     const getOrderDetail=(id)=>{
                history.push({
                   pathname: '/vendor/pickup_detail',
                   state: {pickupID: id }
               });
         }

    return(
        <>
             <div style={{height:'80vh',overflowY:'auto',overflowX:'hidden'}}>
                    <div>
                        {returnsOrdersList.length?<>
                            {
                                returnsOrdersList.map((list)=>(
                                    <>
                                        <Col lg={12}>
                            {/*<a onclick={(e)=>{e.preventDefault();getMessageDetail(2);}}>*/}

                            <div>

                               <Card onClick={(e)=>{e.preventDefault();getOrderDetail(list.id)}}>
                                  <Card.Body className="p-0">
                                      <Row>
                                          <Col xs={3} className="pl-0 pr-0">
                                              {/*<Image src={logoImage} roundedCircle />*/}
                                              <div style={{display:'grid',placeContent:'center',alignItems:'center',height:'55px'}}>
                                                    <Avatar size="40" name={list.packet_name}  round={true}/>
                                              </div>
                                          </Col>
                                          <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>
                                              <div className="pt-2">
                                                      <h6 className="mb-1">{list.packet_name}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}>(COD Rs.{list.cod})</span></h6>
                                                  </div>
                                               <div>

                                                      <Row>
                                                          <Col xs={6}>
                                                               <span style={{fontSize:'14px'}}>{list.tex_code}</span>
                                                             {/*<span style={{fontSize:'15px'}}>{ list.customer_name.length>13 ? <div><span>{list.customer_name.substring(0,13)}...</span></div>: <div><span>{list.customer_name}</span></div> }</span>*/}
                                                          </Col>
                                                          <Col xs={6}>
                                                              <span style={{fontSize:'14px'}}>Status: {list.status}</span>
                                                          </Col>
                                                      </Row>

                                                  </div>
                                              {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                          </Col>
                                      </Row>
                                  </Card.Body>
                               </Card>
                            </div>
                            {/*</a>*/}
                        </Col>
                                    </>
                                ))

                            }

                            </>: <>
                                <Col xs={12}>
                                    <div style={{height:'60vh',display:'grid',placeContent:'center',fontSize:'16px',fontWeight:'500'}}>No Orders Here...</div>
                                </Col>
                            </>
                        }

                    </div>
            </div>

        </>
    )
}
export default PendingReturnOrders