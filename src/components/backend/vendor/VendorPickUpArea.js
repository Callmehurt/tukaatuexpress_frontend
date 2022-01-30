import React, {useState} from 'react';
import {Row,Col,Button} from 'react-bootstrap';
import AllPickupsDatatables from "./AllPickupsDatatables";
import {Link, usehistory} from 'react-router-dom';
import {FaRegListAlt,FaListAlt} from 'react-icons/fa';
import {RiRoadMapLine,RiRoadMapFill} from 'react-icons/ri';
import AllPickupListMapView from "./AllPickupListMapView";

const VendorPickUpArea=()=>{
    const [changeView,setChangeView]=useState('true');
    const createPickup=()=>{

    }

    return(
        <>
            <div className="px-2">
                {/*<h6>vendorPickup area</h6>*/}
                {/*<Row>*/}
                {/*    <Col style={{width:'40%'}} >*/}
                {/*        <Link to="/vendor/request_pickup"> <Button variant="secondary" style={{fontSize:'12px',width:'130px'}} >Request Pickup</Button></Link>*/}
                {/*    </Col>*/}
                {/*    <Col style={{width:'40%'}}>*/}
                {/*        <Link to="/vendor/request_image"><Button variant="secondary" style={{fontSize:'12px',width:'170px'}}>Request Pickup by Image</Button></Link>*/}
                {/*    </Col>*/}
                {/*    <Col style={{width:'20%'}}>*/}
                {/*         /!*<Button variant="secondary" style={{fontSize:'12px'}}>Create Pick up</Button>*!/*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                <Row style={{paddingTop:'10px'}}>
                    <Col xs={4}>

                    </Col>
                    <Col xs={4}>
                        { changeView ?
                            <>
                                <FaListAlt size={20} />
                                 <span style={{paddingLeft:'7px',paddingTop:'3px'}}>List View</span>

                            </>:
                            <>
                                <div onClick={(event)=>setChangeView(true)} style={{cursor:'pointer'}}>
                                     <FaRegListAlt size={20} />
                                     <span style={{paddingLeft:'7px',paddingTop:'3px'}}>List View</span>
                                </div>

                            </>
                        }
                        {/*<FaRegListAlt size={20} />*/}
                        {/*<span style={{paddingLeft:'7px',paddingTop:'3px'}}>List View</span>*/}
                    </Col>
                    <Col xs={4}>
                        {changeView ?
                            <>
                                <div onClick={(event)=>setChangeView(false)} style={{cursor:'pointer'}}>
                                 <RiRoadMapLine size={24} />
                                 <span style={{paddingLeft:'3px',paddingTop:'3px'}}> Map View</span>
                                </div>

                            </>:
                            <>
                                 <RiRoadMapFill size={24} />
                                  <span style={{paddingLeft:'3px',paddingTop:'3px'}}> Map View</span>
                            </>

                        }
                        {/*<RiRoadMapLine size={24} />*/}
                        {/*  <span style={{paddingLeft:'3px',paddingTop:'3px'}}> Map View</span>*/}
                    </Col>
                    {
                        changeView?
                            <>
                                <Col lg={12} className="pt-2">
                                  <AllPickupsDatatables />
                                </Col>
                            </>
                            :
                            <>
                                <Col lg={12} className="pt-2">
                                   <AllPickupListMapView />
                                </Col>
                            </>
                    }


                </Row>

            </div>

        </>
    );
}
export default VendorPickUpArea