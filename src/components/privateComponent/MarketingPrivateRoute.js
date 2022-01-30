import React, {useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {useSelector} from "react-redux";
import {isExpired} from "react-jwt";
import {useHistory} from 'react-router-dom';
import MarketingHeader from "../backend/marketing/MarketingHeader";
import backgroundPartner from "../../assets/backgroundPartner.svg";
const MarketingPrivateRoute=({ component: Component, ...rest })=>{
     const history = useHistory();
      const marketingAuth = useSelector((state) => state.marketingAuth);
      const isLoggedIn = marketingAuth.isAuthenticated;
    return(
        <>
            <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <>
                        {/*<EntryHeader />*/}
                           <MarketingHeader />
                            <Container fluid className=" pt-5 pt-sm-0 " style={{backgroundImage:`url(${backgroundPartner})`,backgroundAttachment:'fixed',backgroundRepeat:'no-repeat',position:'relative',height:'83vh',overflowX:'hidden',overflowY:'auto',paddingBottom:'60px!important',backgroundPosition:'cover'}}>

                                 <Component {...props} />
                            </Container>
                    </>
                ) : (
                  <Redirect to={{ pathname: '/marketing/login', state: { from: props.location } }} />
                )
              }
            />
        </>
    )
}
export default MarketingPrivateRoute