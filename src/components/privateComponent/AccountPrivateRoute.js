import React, {useEffect} from 'react'
import {Redirect, Route } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {useSelector} from "react-redux";
import {isExpired} from "react-jwt";
import {useHistory} from 'react-router-dom';
import HeaderAccount from './../backend/account/HeaderAccount'
import backgroundPartner from "../../assets/backgroundPartner.svg";


const AccountPrivateRoute =({ component: Component, ...rest })=>{
    const history = useHistory();
    const thisState = useSelector((state) => state.accountAuth);
    const isLoggedIn = thisState.isAuthenticated;
    const isAccount = thisState.user.name;

    useEffect(() => {

        let AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        if(AccountStorage){

            const isMyTokenExpiredadmin = isExpired(AccountStorage.token)
            // console.log(isMyTokenExpiredadmin);
            if(isMyTokenExpiredadmin){
                localStorage.removeItem('Account_storage');
                history.push('/account/login')
            }

        }
    },[]);

    return(
        <>
             <Route
            {...rest}
            render={props =>
                isLoggedIn  ? (
                  <>
                     <HeaderAccount />
                      <Container fluid className=" pt-5 pt-sm-0 " style={{backgroundImage:`url(${backgroundPartner})`,backgroundAttachment:'fixed',backgroundRepeat:'no-repeat',position:'relative',height:'84vh',overflowX:'hidden',overflowY:'auto',paddingBottom:'60px!important',backgroundPosition:'cover'}}>
                         <Component {...props} />
                     </Container>
                  </>
                ) : (
                  <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />
                )
              }
            />
        </>
    )
}
export default AccountPrivateRoute