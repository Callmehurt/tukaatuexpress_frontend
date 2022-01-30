import React from 'react';
import {Row,Col,Button} from 'react-bootstrap';
import {Link, usehistory} from 'react-router-dom';
import PickupRequestList from "./PickupRequestList";
import useWindowSize from "../../../use-window-size";

const PickupRequestArea = () =>{
const windowsSize = useWindowSize();
  const isMobile=576;
  console.log(windowsSize);
   if (windowsSize.width<=isMobile) {
       return (
           <>
               <Row style={{paddingTop: '7px'}}>
                   <Col xs={6}>
                       <div className="d-flex justify-content-center">
                           <Link to="/vendor/request_pickup"> <Button variant="warning" style={{fontSize: '14px',}}>Request
                                by Entry</Button></Link>
                       </div>
                   </Col>
                   <Col xs={6}>
                       <div className="d-flex justify-content-center">
                           <Link to="/vendor/request_image"> <Button variant="warning" style={{fontSize: '14px',}}>Request
                                by Image</Button></Link>
                       </div>
                   </Col>
               </Row>
               <Row>
                   <Col xs={12}>
                       <PickupRequestList/>
                   </Col>
               </Row>

           </>
       )
   }
   else{
       return (
           <>
               <Row style={{paddingTop: '7px'}}>
                   <Col lg={6}>
                       <div className="d-flex justify-content-center">
                           <Link to="/vendor/request_pickup"> <Button variant="warning" style={{fontSize: '12px',}}>Request by Entry</Button></Link>
                       </div>
                   </Col>
                   <Col lg={6}>
                       <div className="d-flex justify-content-center">
                           <Link to="/vendor/request_image"> <Button variant="warning" style={{fontSize: '12px',}}>Request by Image</Button></Link>
                       </div>
                   </Col>
               </Row>
               <Row>
                   <Col xs={12}>
                       <PickupRequestList/>
                   </Col>
               </Row>

           </>
       )

   }
}
export default PickupRequestArea