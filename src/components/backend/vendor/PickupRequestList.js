import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import {FaListAlt, FaRegListAlt} from "react-icons/fa";
import {RiRoadMapFill, RiRoadMapLine} from "react-icons/ri";
import PickupRequestListView from "./PickupRequestListView";
import PickupRequestImageView from "./PickupRequestImageView";
import useWindowSize from "../../../use-window-size";


const PickupRequestList=()=>{
      const [imageList,setImageList]=useState('true');
const windowsSize = useWindowSize();
  const isMobile=576;
  console.log(windowsSize);
  if (windowsSize.width<=isMobile) {
      return (
          <>
              <Row style={{paddingTop: '10px'}}>
                  <Col xs={6}>
                      <div className="d-flex justify-content-center">
                      </div>
                  </Col>
                  <Col xs={6}>
                      <div className="d-flex justify-content-center">
                      </div>
                  </Col>
                   <Col lg={12} className="pt-2">
                       <PickupRequestImageView/>
                   </Col>


              </Row>
          </>
      )
  }
  else{
       return (
      <Row style={{paddingTop:'10px'}}>
                  {/*<Col xs={1}>*/}

                  {/*</Col>*/}
                  <Col lg={6}>
                      {/*<div className="d-flex justify-content-center">*/}
                      {/*    {imageList ?*/}
                      {/*        <>*/}
                      {/*            <div style={{cursor:'pointer',}}>*/}
                      {/*            <FaListAlt size={20}/>*/}
                      {/*            <span style={{paddingLeft: '7px', paddingTop: '3px'}}>Entry Request</span>*/}
                      {/*            </div>*/}
                      {/*        </> :*/}
                      {/*        <>*/}
                      {/*            <div onClick={(event) => setImageList(true)}>*/}
                      {/*                 <div style={{cursor:'pointer',}}>*/}
                      {/*                    <FaRegListAlt size={20}/>*/}
                      {/*                    <span style={{paddingLeft: '7px', paddingTop: '3px'}}>Entry Request</span>*/}
                      {/*                 </div>*/}
                      {/*            </div>*/}
                      {/*        </>*/}
                      {/*     }*/}
                      {/*</div>*/}
                      {/*<FaRegListAlt size={20} />*/}
                      {/*<span style={{paddingLeft:'7px',paddingTop:'3px'}}>List View</span>*/}
                  </Col>
                  {/*<Col lg={12}>*/}
                  {/*    {*/}
                  {/*    imageList ?*/}
                  {/*        <>*/}

                  {/*            <Col lg={12} className="pt-2">*/}
                  {/*                /!*<AllPickupsDatatables />*!/*/}
                  {/*                <PickupRequestListView/>*/}
                  {/*            </Col>*/}
                  {/*        </>*/}
                  {/*        :*/}
                  {/*        <>*/}
                  {/*            /!*<Col lg={12} className="pt-2">*!/*/}
                  {/*            /!*    /!*<AllPickupListMapView />*!/*!/*/}
                  {/*            /!*    /!* Image List*!/*!/*/}
                  {/*            /!*    <PickupRequestImageView/>*!/*/}
                  {/*            /!*</Col>*!/*/}
                  {/*        </>*/}
                  {/*   }*/}

                  {/*</Col>*/}
                  {/*<Col lg={12}>*/}
                  {/*    {*/}
                  {/*    imageList ?*/}
                  {/*        <>*/}
                  {/*            /!*<Col lg={12} className="pt-2">*!/*/}
                  {/*            /!*    /!*<AllPickupsDatatables />*!/*!/*/}
                  {/*            /!*    <PickupRequestListView/>*!/*/}
                  {/*            /!*</Col>*!/*/}
                  {/*        </>*/}
                  {/*        :*/}
                  {/*        <>*/}

                  {/*            <Col lg={12} className="pt-2">*/}
                  {/*                /!*<AllPickupListMapView />*!/*/}
                  {/*                /!* Image List*!/*/}
                  {/*                <PickupRequestImageView/>*/}
                  {/*            </Col>*/}

                  {/*        </>*/}
                  {/*   }*/}
                  {/*</Col>*/}
                  <Col lg={12} className="pt-2">
                                  {/*<AllPickupListMapView />*/}
                                  {/* Image List*/}
                       <PickupRequestImageView/>
                   </Col>
              </Row>
       )

  }
}
export default PickupRequestList