import React from 'react';
import {Card, Col, Form, Image, Row} from "react-bootstrap";
import logoImage from "../../../logo.svg";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const VendorDashboardDesktop=()=>{
    const vendor = useSelector((state) => state.vendor);
     const allBanner=vendor.allBanner;
     const appSetting = useSelector((state) => state.appSetting);
      const urlDomain=appSetting.urlDomain;
     const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return(
        <>
             <Row >
                       <Col xs={12} >
                     {/*<Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>*/}
                              <div style={{marginTop:'0px',padding:'5px 5px',height:'200px',overflowY:'hidden',borderRadius:'20px',display:'flex',placeContent:'center'}}>
                                   {/*<div>Dashboard Mobile</div>*/}
                                 {allBanner.length?
                                              <>



                                                   <Slider {...settings}>
                                                           {allBanner.map((data)=>(
                                                               <div><img
                                                                  className="d-block w-100"
                                                                  src={urlDomain+data.banner}
                                                                  alt="First slide"/>
                                                                </div>
                                                           ))}

                                                   </Slider>

                                              </>:
                                              <>
                                              </>
                                     }
                              </div>
                       </Col>


                  </Row>
        </>
    )
}
export default VendorDashboardDesktop