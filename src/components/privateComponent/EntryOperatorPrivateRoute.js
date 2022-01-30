import React, {useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {useSelector} from "react-redux";
import {isExpired} from "react-jwt";
import {useHistory} from 'react-router-dom';
import EntryHeader from "../backend/entryOperation/EntryHeader";
import backgroundPartner from "../../assets/backgroundPartner.svg";

const EntryOperatorPrivateRoute=({ component: Component, ...rest })=>{
     const history = useHistory();
     const entryOperatorAuth = useSelector((state) => state.entryOperatorAuth);
      const isLoggedIn = entryOperatorAuth.isAuthenticated;
        // const isEntryOperator=entryOperatorAuth.user.name;

      useEffect(()=>{
          let entry_operator = JSON.parse(localStorage.getItem('Entry_Operator'));
          if(entry_operator){
            const isMyTokenExpired = isExpired(entry_operator.token);
            if(isMyTokenExpired){
                localStorage.removeItem('Entry_Operator');
                history.push('/entry/login');
            }
          }
      })

    return(
        <>
            <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <>
                        <EntryHeader />
                            <Container fluid className=" pt-5 pt-sm-0 " style={{backgroundImage:`url(${backgroundPartner})`,backgroundAttachment:'fixed',backgroundRepeat:'no-repeat',position:'relative',height:'100vh',overflowX:'hidden',overflowY:'hidden',paddingBottom:'60px!important',backgroundPosition:'cover'}}>

                                 <Component {...props} />
                            </Container>
                    </>
                ) : (
                  <Redirect to={{ pathname: '/entry/login', state: { from: props.location } }} />
                )
              }
            />
        </>
    );
}

export default EntryOperatorPrivateRoute

