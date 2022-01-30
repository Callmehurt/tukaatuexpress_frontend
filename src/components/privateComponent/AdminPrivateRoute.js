import React, {useEffect} from 'react'
import {Redirect, Route } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {useSelector} from "react-redux";
import {isExpired} from "react-jwt";
import {useHistory} from 'react-router-dom';
import StaffHeader from '../backend/staff/admin/Staffheader'
import backgroundPartner from "../../assets/backgroundPartner.svg";


const AdminPrivateRoute = ({ component: Component, ...rest }) => {

    const history = useHistory();
    const thisState = useSelector((state) => state.adminStaffAuth);
    const isLoggedIn = thisState.isAuthenticated;
    let isAdminStaff = '';
    if(isLoggedIn){
        isAdminStaff = thisState.user.roles[0].name;
    }

    useEffect(() => {

        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        if( staff_admin){
            
            const isMyTokenExpiredadmin = isExpired(staff_admin.token)
            // console.log(isMyTokenExpiredadmin);
            if(isMyTokenExpiredadmin){
                localStorage.removeItem('staff_admin');
                history.push('/admin/login')
            }

        }
    },[]);

    return (
        <>
       
        <Route
            {...rest}
            render={props =>
                isLoggedIn && isAdminStaff ==='admin' ? (
                  <>
                      <StaffHeader />
                      <Container fluid className=" pt-5 pt-sm-0 " style={{backgroundImage:`url(${backgroundPartner})`,backgroundAttachment:'fixed',backgroundRepeat:'no-repeat',position:'relative',height:'76vh',overflowX:'hidden',overflowY:'auto',paddingBottom:'60px!important',backgroundPosition:'cover'}}>
                         <Component {...props} />
                     </Container>
                  </>
                ) : (
                  <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />
                )
              }
            />
            
      </>
    );
}

export default AdminPrivateRoute
