import React, {useEffect} from 'react';
import {Redirect, Route, useLocation} from 'react-router-dom';
import {Container,Row,Col} from 'react-bootstrap';
import useWindowSize from './../../use-window-size';
import {useSelector} from "react-redux";
import {isExpired} from "react-jwt";
import {useHistory} from 'react-router-dom';
import VendorHeader from './../backend/vendor/VendorHeader';
import VendorMobileHeader from "../backend/vendor/VendorMobileHeader";
import VendorFooter from "../backend/vendor/VendorFooter";
import backgroundPartner from './../../assets/backgroundPartner.svg';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
const VendorPrivateRoute =({ component: Component, ...rest })=>{
    const handle = useFullScreenHandle();
    const history = useHistory();
    const location=useLocation();
    const thisState = useSelector((state) => state.vendorAuth);
    const isLoggedIn = thisState.isAuthenticated;
    const windowsSize = useWindowSize();
    const isMobile=576;

    useEffect(() => {

        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        if(vendorDetail){

            const isMyTokenExpiredadmin = isExpired(vendorDetail.token)
            // console.log(isMyTokenExpiredadmin);
            if(isMyTokenExpiredadmin){
                localStorage.removeItem('vendorDetail');
                history.push('/')
            }

        }
    },[]);

    return(
        <>
            {/*<div onTouchStart={handle.enter} onLoad={handle.enter}>*/}
            {/*    <FullScreen handle={handle}>*/}
                     <Route
                    {...rest}
                    render={props =>
                        isLoggedIn ? (
                          <>
                              <div>
                                  { windowsSize.width<=isMobile ?
                                      <>
                                         <VendorMobileHeader />
                                              <Container fluid className="p-0 pt-5 pt-sm-0 mobileBackground" style={{backgroundImage:`url(${backgroundPartner})`,backgroundAttachment:'fixed',backgroundRepeat:'no-repeat',position:'relative',height:'100vh',overflowX:'hidden',overflowY:'auto',paddingBottom:'60px!important',backgroundPosition:'cover'}}>
                                             <div className="pt-0 mt-0 mt-sm-0 pt-sm-0">
                                                 <Component {...props} />
                                             </div>

                                          </Container>
                                          <VendorFooter />
                                      </>:
                                      <>
                                           <Container style={{maxWidth:'100%',backgroundImage:`url(${backgroundPartner})`,position:'fixed',height:'100vh'}}>
                                              <Row>
                                                  <Col md={3} style={{width:'27%',}}>

                                                  </Col>

                                                   <Col md={6} style={{width:'46%'}}>
                                                       <VendorMobileHeader />
                                                          <Container fluid className="p-0 pt-5 pt-sm-0 mobileBackground" style={{height:'100vh',overflowX:'hidden',overflowY:'auto',backgroundAttachment:'fixed',backgroundRepeat:'no-repeat',backgroundPosition:'cover',marginTop:'0px',paddingBottom:'60px!important'}}>
                                                             <div className="pt-4 mt-0 mt-sm-0 pt-sm-0">
                                                                 <Component {...props} />
                                                             </div>

                                                          </Container>
                                                        <VendorFooter />
                                                   </Col>
                                                  <Col md={3} style={{width:'27%',}}>

                                                  </Col>
                                              </Row>
                                           </Container>
                                      </>
                                  }
                              </div>

                          </>
                        ) : (
                          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                        )
                      }
                    />
            {/* </FullScreen>*/}
        </>
    );
}
export default VendorPrivateRoute