import React, {useEffect} from 'react'
import { Redirect, Route } from 'react-router-dom'
import {useSelector} from "react-redux";
import {isExpired} from "react-jwt";
import {useHistory, useLocation} from 'react-router-dom';
import {Container} from "react-bootstrap";
import BranchFooter from "../backend/branch/partial/footer";
import Navbar from "../backend/includes/navbar";
import backgroundPartner from "../../assets/backgroundPartner.svg";


const BranchPrivateRoute = ({ component: Component, ...rest }) => {
    const location = useLocation();
    const history = useHistory();
    const thisState = useSelector((state) => state.branchAuth);
    let isLoggedIn = thisState.isAuthenticated;

    useEffect(() => {
        let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
        if(branch_detail){
            const isMyTokenExpired = isExpired(branch_detail.token);
            if(isMyTokenExpired){
                localStorage.removeItem('branch_detail');
                history.push('/branch')
            }
        }
    });

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <section className="branch_section">
                        <Navbar user={thisState.user} />
                        {/*<Container fluid style={{paddingTop: '70px', height: '100vh', overflowY: 'auto'}}>*/}
                            <Container fluid className="" style={{paddingTop: '70px',backgroundImage:`url(${backgroundPartner})`,backgroundAttachment:'fixed',backgroundRepeat:'no-repeat',position:'relative',height:'93vh',overflowX:'hidden',overflowY:'auto',paddingBottom:'60px!important',backgroundPosition:'cover'}}>
                              <Component {...props} />
                            </Container>
                        <BranchFooter currentlocation={location} />
                    </section>
                ) : (
                  <Redirect to={{ pathname: '/branch/login', state: { from: props.location } }} />
                )
              }
            />
  )
}

export default BranchPrivateRoute