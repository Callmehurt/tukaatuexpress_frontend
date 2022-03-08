import React, {useEffect} from 'react';
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {
    AccountPaymentAllDeliveries,
    AccountPaymentDeliveredDeliveries, AccountPaymentPaidDeliveries, AccountPaymentReceivedDeliveries,
    AccountPaymentRequestPartner
} from "../../../redux/actions/AccountAdmin";
import MUIDataTable from "mui-datatables";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import moment from "moment";

const AccountPartnerRequests=()=>{
    const dispatch = useDispatch();
     const history=useHistory();
    const accountAdmin = useSelector((state) => state.accountAdmin);
    const paymentPartnerRequest=accountAdmin.paymentPartnerRequest;
    useEffect(()=>{
        const AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        if(AccountStorage){
            setAuthorizationToken(AccountStorage.token);
        }
        getPartnerRequest();
    },[]);
    const getPartnerRequest=()=>{
      axios.get('account/payment/request/list')
            .then((res) => {
                console.log('payment requests', res.data);
                dispatch(AccountPaymentRequestPartner(res.data));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
    const getPartnerAccountDetail=(partner_id)=>{
             console.log('Account Division');
             axios.get(`/account/partner/deliveries/details/${partner_id}`)
            .then((res) => {
                console.log(res);
                dispatch(AccountPaymentAllDeliveries(res.data.all_deliveries));
                dispatch(AccountPaymentDeliveredDeliveries(res.data.delivered_deliveries));
                dispatch(AccountPaymentPaidDeliveries(res.data.payment_paid_deliveries));
                dispatch(AccountPaymentReceivedDeliveries(res.data.payment_received_deliveries));
                history.push({
                    pathname:'/account/pickup',
                    state:{partnerId:partner_id}
                })
            })
            .catch((err) => {
                console.log(err.response.data);
            })
     }
    const options = {
        searchOpen:false,
        filterType:'textField',
        fixedHeader:false,
        rowsPerPage:[100],
        rowsPerPageOptions:[10,20,50,100,500],
        selectableRows: 'none',
  }
  const columns = [
      {
         name: "partner_id",
         label: "partner Id",
         options: {
          filter: true,
          sort: true,
             display:false,
         }
        },
        {
         name: "payment_code",
         label: "Pay. Code",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
             <div  onClick={(event)=>getPartnerAccountDetail(tableMeta.rowData[0])} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>{value}</div>
          )
         }
        },
         {
         name: "payment_method",
         label: "Pay. Method",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
             <div  onClick={(event)=>getPartnerAccountDetail(tableMeta.rowData[0])} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>{value}</div>
          )
         }
        },
         {
         name: "message",
         label: "Message",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
             <div  onClick={(event)=>getPartnerAccountDetail(tableMeta.rowData[0])} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>{value}</div>
          )
         }
        },
      {
         name: "created_at",
         label: "Request Date",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
             <div  onClick={(event)=>getPartnerAccountDetail(tableMeta.rowData[0])} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>{value}</div>
          )
         }
        },
       {
         name: "created_at",
         label: "Requested On",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
             <div  onClick={(event)=>getPartnerAccountDetail(tableMeta.rowData[0])} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>
                 {
                     moment(value, 'YYYY-MM-DD').fromNow()
                 }
             </div>
          )
         }
        },
        {
         name: "receivable_amount",
         label: "Receivable Amount",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
             <div  onClick={(event)=>getPartnerAccountDetail(tableMeta.rowData[0])} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>Rs. {value}</div>
          )
         }
        },
          {
             name: "vendor_name",
             label: "Partner Name",
             options: {
              filter: true,
              sort: true,
                 customBodyRender: (value, tableMeta, updateValue) => (
                  <div  onClick={(event)=>getPartnerAccountDetail(tableMeta.rowData[0])} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>{value}</div>
             )
             }
            },
          {
             name: "vendor_address",
             label: "Address",
             options: {
              filter: true,
              sort: true,
                 customBodyRender: (value, tableMeta, updateValue) => (
                 <div  onClick={(event)=>getPartnerAccountDetail(tableMeta.rowData[0])} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>{value}</div>
              )
         }
        },
          {
                 name: "vendor_phone",
                 label: "Phone",
                 options: {
                  filter: true,
                  sort: true,
                     customBodyRender: (value, tableMeta, updateValue) => (
                       <div  onClick={(event)=>getPartnerAccountDetail(tableMeta.rowData[0])} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>{value}</div>
                  )
             }
            },
        {
            name: 'pickup_id',
            label: 'Action',
            options: {
              filter: false,
              sort: false,
                display:false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex'}}>
                          {value}
                      </div>
                  </>
              )
            }
        }

       ];

    return(
        <>
            {/*<h5>Account Partner Request</h5>*/}
            <MUIDataTable
             data={paymentPartnerRequest}
             columns={columns}
             options={options}
           />
        </>
    )
}
export default AccountPartnerRequests