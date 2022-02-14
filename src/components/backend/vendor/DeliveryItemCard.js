import React, {useEffect} from "react";
import {Card, Col, Row} from "react-bootstrap";
import Avatar from "react-avatar";
import {useHistory} from "react-router-dom";
import useWindowSize from "../../../use-window-size";

const DeliveryItemCard = (props) => {

    const history = useHistory();
    const settledOrdersList = props.deliveries;
     const getOrderDetail=(id)=>{
            history.push({
               pathname: '/vendor/pickup_detail',
               state: {pickupID: id }
           });
     }
 const windowsSize = useWindowSize();
  const isMobile=576;
  console.log(windowsSize);
   if (windowsSize.width<=isMobile) {
       return (
           <>
               <div>
                   {/*<h6>Pending Orders</h6>*/}
                   <div style={{height: '60vh', overflowY: 'auto', overflowX: 'hidden'}}>
                       <div>
                           {settledOrdersList.length ? <>
                               {
                                   settledOrdersList.map((list) => (
                                       <>
                                           <Col lg={12}>
                                               {/*<a onclick={(e)=>{e.preventDefault();getMessageDetail(2);}}>*/}
                                               <div>

                                                   <Card onClick={(e) => {
                                                       e.preventDefault();
                                                       getOrderDetail(list.id)
                                                   }}>
                                                       <Card.Body className="p-0">
                                                           <Row>
                                                               <Col xs={3} className="pl-0 pr-0">
                                                                   {/*<Image src={logoImage} roundedCircle />*/}
                                                                   <div style={{
                                                                       display: 'grid',
                                                                       placeContent: 'center',
                                                                       alignItems: 'center',
                                                                       height: '55px'
                                                                   }}>
                                                                       <Avatar size="40" name={list.packet_name}
                                                                               round={true}/>
                                                                   </div>
                                                               </Col>
                                                               <Col xs={9}
                                                                    style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                                   <div className="pt-2">
                                                                       <h6 className="mb-1">{list.tex_code}<span
                                                                           style={{
                                                                               fontSize: '15px',
                                                                               fontWeight: '500',
                                                                               paddingLeft: '5px'
                                                                           }}>(COD Rs.{list.cod})</span></h6>
                                                                   </div>
                                                                   <div>

                                                                       <Row>
                                                                           <Col xs={6}>
                                                                               {list.customer_name ?
                                                                                   <>
                                                                                       <span
                                                                                           style={{fontSize: '15px'}}>{list.customer_name.length > 13 ?
                                                                                           <div>
                                                                                               <span>{list.customer_name.substring(0, 13)}...</span>
                                                                                           </div> : <div>
                                                                                               <span>{list.customer_name}</span>
                                                                                           </div>}</span>

                                                                                   </> :
                                                                                   <>
                                                                                   </>
                                                                               }
                                                                           </Col>
                                                                           <Col xs={6}>
                                                                               <span
                                                                                   style={{fontSize: '14px'}}>Status: {list.status}</span>
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

                           </> : <>
                               <Col xs={12}>
                                   <div style={{
                                       height: '60vh',
                                       display: 'grid',
                                       placeContent: 'center',
                                       fontSize: '16px',
                                       fontWeight: '500'
                                   }}>No Orders Here...
                                   </div>
                               </Col>
                           </>
                           }
                       </div>
                   </div>
               </div>

           </>
       )
   }else{
       return (
           <>
               <div>
                   {/*<h6>Pending Orders</h6>*/}
                   <div style={{height: '60vh', overflowY: 'auto', overflowX: 'hidden'}}>
                       <div>
                           {settledOrdersList.length ? <>
                               {
                                   settledOrdersList.map((list) => (
                                       <>
                                           <Col lg={12}>
                                               {/*<a onclick={(e)=>{e.preventDefault();getMessageDetail(2);}}>*/}

                                               <div>

                                                   <Card onClick={(e) => {
                                                       e.preventDefault();
                                                       getOrderDetail(list.id)
                                                   }}>
                                                       <Card.Body className="p-0">
                                                           <Row>
                                                               <Col lg={2} className="pl-0 pr-0">
                                                                   {/*<Image src={logoImage} roundedCircle />*/}
                                                                   <div style={{
                                                                       display: 'grid',
                                                                       placeContent: 'center',
                                                                       alignItems: 'center',
                                                                       height: '55px'
                                                                   }}>
                                                                       <Avatar size="40" name={list.packet_name}
                                                                               round={true}/>
                                                                   </div>
                                                               </Col>
                                                               <Col lg={10}
                                                                    style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                                   <div className="pt-2">
                                                                       <h6 className="mb-1">{list.tex_code}<span
                                                                           style={{
                                                                               fontSize: '15px',
                                                                               fontWeight: '500',
                                                                               paddingLeft: '5px'
                                                                           }}>(COD Received Rs.{list.cod_received})</span></h6>
                                                                   </div>
                                                                   <div>

                                                                       <Row>
                                                                           <Col xs={6}>
                                                                               {list.customer_name ?
                                                                                   <>
                                                                                       <span
                                                                                           style={{fontSize: '15px'}}>{list.customer_name.length > 13 ?
                                                                                           <div>
                                                                                               <span>{list.customer_name.substring(0, 13)}...</span>
                                                                                           </div> : <div>
                                                                                               <span>{list.customer_name}</span>
                                                                                           </div>}</span>

                                                                                   </> :
                                                                                   <>
                                                                                   </>
                                                                               }
                                                                           </Col>
                                                                           <Col xs={6}>
                                                                               <span
                                                                                   style={{fontSize: '14px'}}>Status: {list.status}</span>
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

                           </> : <>
                               <Col xs={12}>
                                   <div style={{
                                       height: '60vh',
                                       display: 'grid',
                                       placeContent: 'center',
                                       fontSize: '16px',
                                       fontWeight: '500'
                                   }}>No Orders Here...
                                   </div>
                               </Col>
                           </>
                           }
                       </div>
                   </div>
               </div>

           </>
       )
   }

}

export default DeliveryItemCard;