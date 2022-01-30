import React, {useEffect} from 'react'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import DeliveredDatatables from "./DeliveredDatatables";
import PaymentReceivedDatatables from "./PaymentReceivedDatatables";
import PaidDatatables from "./PaidDatatables";
import AllDatatables from "./AllDatatables";
import PaymentStatementDatatables from "./PaymentStatementDatatables";
import { useLocation } from "react-router-dom";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {AccountPaymentAllDeliveries,AccountPaymentDeliveredDeliveries,AccountPaymentPaidDeliveries,AccountPaymentReceivedDeliveries} from './../../../redux/actions/AccountAdmin'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
const AccountPickup=()=>{
    const location=useLocation();
    const dispatch=useDispatch();
     const accountAdmin = useSelector((state) => state.accountAdmin);
      const paymentDeliveredDeliveries=accountAdmin.paymentDeliveredDeliveries;
       const paymentReceivedDeliveries=accountAdmin.paymentReceivedDeliveries;
       const paymentPaidDeliveries=accountAdmin.paymentPaidDeliveries;
       const paymentAllDeliveries=accountAdmin.paymentAllDeliveries;
       const allPartnerPaymentStatements=accountAdmin.allPartnerPaymentStatements;
    useEffect(()=>{
        console.log(location.state.partnerId,'partner id');
        // console.log('partner id');
         const AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        if(AccountStorage){
            setAuthorizationToken(AccountStorage.token);
            getPaymentDetails();
        }
    },[]);
    const getPaymentDetails=()=>{
        let partner_id=location.state?.partnerId;
        console.log(partner_id);
         console.log('account Pickup'+'+'+partner_id);
        axios.get(`/account/partner/deliveries/details/${partner_id}`)
            .then((res) => {
                console.log(res);
                dispatch(AccountPaymentAllDeliveries(res.data.all_deliveries));
                dispatch(AccountPaymentDeliveredDeliveries(res.data.delivered_deliveries));
                dispatch(AccountPaymentPaidDeliveries(res.data.payment_paid_deliveries));
                dispatch(AccountPaymentReceivedDeliveries(res.data.payment_received_deliveries));
            })
            .catch((err) => {
                console.log(err.response.data);
            })

    }
    return(
        <>
            {/*<h6>Account Pickup List</h6>*/}
             <Tabs
            defaultActiveKey="delivered"
            transition={false}
            className="mb-0 mt-3"
              >
              <Tab eventKey="delivered" title={<><div style={{fontSize:'13px'}}>Delivered <span>
                    {
                        paymentDeliveredDeliveries.length?
                            <>
                                {paymentDeliveredDeliveries.length}
                            </>:
                            <>
                                0
                            </>
                    }
                </span></div></>} >
                <div style={{minHeight:'150vh'}}>
                    {/*<h6>Delivered</h6>*/}
                    <DeliveredDatatables />
                </div>
              </Tab>
              <Tab eventKey="Payment_received" title={<><div style={{fontSize:'13px'}}>Payment Received <span>
                    {
                        paymentReceivedDeliveries.length?
                            <>
                                {paymentReceivedDeliveries.length}
                            </>:
                            <>
                                0
                            </>
                    }
                </span></div></>}>
                <div style={{minHeight:'150vh'}}>
                    {/*<h6>Payment Received</h6>*/}
                    <PaymentReceivedDatatables />
                </div>
              </Tab>
             <Tab eventKey="Paid" title={<><div style={{fontSize:'13px'}}>Paid<span>
                    {
                        paymentPaidDeliveries.length?
                            <>
                                {paymentPaidDeliveries.length}
                            </>:
                            <>
                                0
                            </>
                    }
                </span></div></>}>
                <div style={{minHeight:'150vh'}}>
                    {/*<h6>Paid</h6>*/}
                    <PaidDatatables />
                </div>
              </Tab>
                 <Tab eventKey="All" title={<><div style={{fontSize:'13px'}}>All<span>
                    {
                        paymentAllDeliveries.length?
                            <>
                                {paymentAllDeliveries.length}
                            </>:
                            <>
                                0
                            </>
                    }
                </span></div></>}>
                <div style={{minHeight:'150vh'}}>
                    {/*<h6>All</h6>*/}
                    <AllDatatables />

                </div>
              </Tab>
                 <Tab eventKey="Payment_statements" title={<><div style={{fontSize:'13px'}}>Payment Statements<span>
                    {
                        allPartnerPaymentStatements.length?
                            <>
                                {allPartnerPaymentStatements.length}
                            </>:
                            <>
                                0
                            </>
                    }
                </span></div></>}>
                <div style={{minHeight:'150vh'}}>
                    {/*<h6>Payment Statements</h6>*/}
                    <PaymentStatementDatatables />
                </div>
              </Tab>



            </Tabs>
        </>
    )
}
export default AccountPickup