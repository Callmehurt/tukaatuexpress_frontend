import React,{useEffect} from "react";
import {Redirect, Route } from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {useSelector} from "react-redux";
import {isExpired} from "react-jwt";
import {useHistory} from 'react-router-dom';
import AdminHeader from "../backend/admin/AdminHeader";

const MainAdminPrivateRoute = ({ component: Component, ...rest }) =>{
       const history = useHistory();
       // const mainAdminAuth = useSelector((state) => state.mainAdminAuth);
       const isLoggedIn = true;
       // const [isMainAdmin,setIsMainAdmin]=useState('');
       // if(isLoggedIn){
       //     setIsMainAdmin(mainAdminAuth.user.name);
       // }
        useEffect(() => {
        let mainAdmin = JSON.parse(localStorage.getItem('main_admin'));
        if(mainAdmin){
            const isMyTokenExpiredadmin = isExpired(mainAdmin.token);
            if(isMyTokenExpiredadmin){
                localStorage.removeItem('main_admin');
                history.push('/main_admin');
            }
        }
    },[]);
    return(
        <>
             <Route
            {...rest}
            render={props =>
                 isLoggedIn ? (
                  <>
                      <AdminHeader />
                     <Container fluid>
                         <Component {...props} />
                     </Container>
                  </>
                 ):(
                      <Redirect to={{ pathname: '/main_admin/login', state: { from: props.location } }} />
                 )
              }
            />

        </>
    )

}

export default MainAdminPrivateRoute