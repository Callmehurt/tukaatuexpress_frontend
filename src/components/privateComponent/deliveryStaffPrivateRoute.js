import React, {useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {useSelector} from "react-redux";
import {isExpired} from "react-jwt";
import {useHistory} from 'react-router-dom';
import DeliveryStaffHeader from "../backend/staff/delivery/DeliveryStaffHeader";
import DeliveryStaffFooter from "../backend/staff/delivery/DeliveryStaffFooter";

const IsDeliveryStaff = ({ component: Component, ...rest }) => {
    const history = useHistory();
    const thisState = useSelector((state) => state.deliveryStaffAuth);
    const isLoggedIn = thisState.isAuthenticated;
    // const[isDeliveryStaffRole,setIsDeliveryStaffRole] = useState('');

    // if(isLoggedIn){
         const isDeliveryStaffRole=thisState.user.roles[0].name;
    // }
    useEffect(() => {
        let staff_detail = JSON.parse(localStorage.getItem('staff_delivery'));
        if(staff_detail){
            const isMyTokenExpired = isExpired(staff_detail.token);
            if(isMyTokenExpired){
                localStorage.removeItem('staff_delivery');
                history.push('/delivery/login');
            }
        }
    });
    return (
      <>
       
        <Route
            {...rest}
            render={props =>
                isLoggedIn && isDeliveryStaffRole === 'delivery' ? (
                    <>
                        <DeliveryStaffHeader />
                            <Container fluid>
                                 <Component {...props} />
                            </Container>
                        <DeliveryStaffFooter />

                    </>
                ) : (
                  <Redirect to={{ pathname: '/delivery/login', state: { from: props.location } }} />
                )
              }
            />
            
      </>
  );
}

export default IsDeliveryStaff