import React, {useEffect,useState} from 'react';
import {Carousel} from 'react-bootstrap';
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useSelector} from "react-redux";
import Slider from "react-slick";

const MobileSlider=()=>{
    const [slider,setSlider]=useState('');
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


    useEffect(()=>{
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        if (vendorDetail) {
            setAuthorizationToken(vendorDetail.token);
        }
        // console.log(allBanner);

    },[])



    return(
        <>
            {/*carousel*/}
            <div style={{marginTop:'0px',padding:'5px 5px',height:'200px',overflowY:'hidden',borderRadius:'20px',display:'flex',placeContent:'center'}}>
                {/*<img srrc="https://jawaikhana.techxbay.com/banners/2022/Jan/16/1642312444.3333449.jpg" />*/}
                {/*  <Carousel>*/}
                {/*      {allBanner.map((items)=> (*/}
                {/*          <>*/}
                {/*          <Carousel.Item>*/}
                {/*               <img*/}
                {/*                  className="d-block w-100"*/}
                {/*                  src={urlDomain+items.banner}*/}
                {/*                  alt="First slide"*/}
                {/*                />*/}

                {/*              /!*<div>*!/*/}
                {/*              /!*    hello world*!/*/}
                {/*              /!*</div>*!/*/}
                {/*          </Carousel.Item>*/}
                {/*          </>*/}
                {/*          )*/}
                {/*      )}*/}
                {/*</Carousel>*/}

                {allBanner.length?
                              <>
                          {/*         <Carousel style={{height:'220px'}}>*/}
                          {/*    {allBanner.map((data)=>(*/}
                          {/*        <>*/}
                          {/*              <Carousel.Item className="d-block">*/}
                          {/*                  <img*/}
                          {/*                    className="d-block w-100"*/}
                          {/*                    src={urlDomain+data.banner}*/}
                          {/*                    alt="First slide"*/}
                          {/*                  />*/}
                          {/*                  <Carousel.Caption>*/}
                          {/*                      <p>{data.description}</p>*/}
                          {/*                  </Carousel.Caption>*/}
                          {/*            </Carousel.Item>*/}
                          {/*        </>*/}
                          {/*    ))}*/}

                          {/*</Carousel>*/}
                          {/*        {sliderSlick()}*/}
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
        </>
    )
}
export default MobileSlider