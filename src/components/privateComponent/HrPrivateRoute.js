import React, {useEffect} from 'react'
import {Container} from "react-bootstrap";
import {Redirect, Route, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {isExpired} from "react-jwt";
import HrHeader from "../backend/staff/hr/HrHeader";
import backgroundPartner from "../../assets/backgroundPartner.svg";

const HrPrivateRoute = ({ component: Component, ...rest }) =>{
     const history = useHistory();
     const thisState = useSelector((state) => state.hrAuth);
     const isLoggedIn = thisState.isAuthenticated;
     const isHrAdmin = thisState.user.roles[0].name;


      useEffect(() => {
            let hrAdmin = JSON.parse(localStorage.getItem('staff_hrAdmin'));
            if(hrAdmin){
                const isMyTokenExpired = isExpired(hrAdmin.token);
                if(isMyTokenExpired){
                    localStorage.removeItem('staff_hrAdmin');
                    history.push('/hr/login');
                }
            }
            console.log(isLoggedIn);
        });
    return(
        <>
            <Route
            {...rest}
            render={props =>(
                isLoggedIn && isHrAdmin ==='hr_admin' ? (
                    <>
                        <HrHeader />
                        <Container fluid className=" pt-5 pt-sm-0 " style={{backgroundImage:`url(${backgroundPartner})`,backgroundAttachment:'fixed',backgroundRepeat:'no-repeat',position:'relative',height:'83vh',overflowX:'hidden',overflowY:'auto',paddingBottom:'60px!important',backgroundPosition:'cover'}}>
                             <Component {...props} />
                        </Container>
                    </>
                ) : (
                  <Redirect to={{ pathname: '/hr/login', state: { from: props.location } }} />
                )
            )}
            />

        </>
    )
}

export default HrPrivateRoute