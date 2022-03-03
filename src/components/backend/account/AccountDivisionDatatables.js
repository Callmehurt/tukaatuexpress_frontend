import React,{useEffect} from 'react'
import MUIDataTable from "mui-datatables";
import{Link} from 'react-router-dom';
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {useDispatch,useSelector} from "react-redux";
import {
    AccountPartnerPaymentList,
    AccountPaymentAllDeliveries,
    AccountPaymentDeliveredDeliveries, AccountPaymentPaidDeliveries, AccountPaymentReceivedDeliveries
} from "../../../redux/actions/AccountAdmin";
import {ImBoxRemove} from "react-icons/im";
import { useHistory } from "react-router-dom";


const AccountDivisionDatatables =()=>{
    const dispatch=useDispatch();
    const history=useHistory();
    const accountAdmin = useSelector((state) => state.accountAdmin);
    const paymentPartnerList=accountAdmin.paymentPartnerList;
    useEffect(()=>{
        const AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        if(AccountStorage){
            setAuthorizationToken(AccountStorage.token);

        }
        partnerPaymentsList();
        deletePrintDataStorage();
    },[]);
    const deletePrintDataStorage=()=>{
        let paymentDeliveryDataStore= JSON.parse(localStorage.getItem('paymentDeliveryData'));
        if(paymentDeliveryDataStore){
            localStorage.removeItem('paymentDeliveryData');
        }
    }
     const partnerPaymentsList=()=>{
         axios.get('account/partner/payment/details')
            .then((res) => {
                console.log(res.data);
                dispatch(AccountPartnerPaymentList(res.data));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
     }
     const getPartnerAccountDetail= async (partner_id)=>{
             await axios.get(`/account/partner/deliveries/details/${partner_id}`)
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
    const columns = [
        {
        name: 'vendor_name',
        label: 'Name',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => (
             <div  onClick={(event)=>getPartnerAccountDetail(paymentPartnerList[tableMeta.rowIndex].partner_id)} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>{value}</div>
          )
        },
      },
         {
         name: "vendor_email",
         label: "Email",
         options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => (
             <div  onClick={(event)=>getPartnerAccountDetail(paymentPartnerList[tableMeta.rowIndex].partner_id)} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>{value}</div>
          )
         },
        },
        {
         name: "vendor_phone",
         label: "Phone",
         options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => (
             <div  onClick={(event)=>getPartnerAccountDetail(paymentPartnerList[tableMeta.rowIndex].partner_id)} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>{value}</div>
          )
         }
        },
        {
         name: "total_delivered",
         label: "Delivered",
         options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => (
             <>
             <span>{value}</span>
             </>
          )
         }
        },
        {
        name: 'pending_payment',
        label: 'P. Remaining',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
             const Remain=RemainCash(value);
              return Remain;
          }
        },
      },
       {
         name: "last_paid",
         label: "L. Paid",
         options: {
          customBodyRender: (value, tableMeta, updateValue) => {
              const notYet=<div>Not Tran... Yet</div>;
             if(value=='0'){
                 return<>Today</>;
             }
             else if(value>0){
                 return<>{value} days ago</>;
             }
             else{
                  return notYet;

             }
          }

          }
        },
       {
         name: "vendor_bank",
         label: "B. Name",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
             <div  onClick={(event)=>getPartnerAccountDetail(paymentPartnerList[tableMeta.rowIndex].partner_id)} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>{value}</div>
          )
         }
        },
       {
         name: "vendor_account",
         label: "Account No.",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
             <div  onClick={(event)=>getPartnerAccountDetail(paymentPartnerList[tableMeta.rowIndex].partner_id)} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>{value}</div>
          )
         }
        },
       {
         name: "bank_branch",
         label: "B. Branch",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
             <div  onClick={(event)=>getPartnerAccountDetail(paymentPartnerList[tableMeta.rowIndex].partner_id)} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>{value}</div>
          )
         }
        },
        {
         name: "vendor_account_holder",
         label: "A. H. Name",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
             <div  onClick={(event)=>getPartnerAccountDetail(paymentPartnerList[tableMeta.rowIndex].partner_id)} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>{value}</div>
          )
         }
        },
        {
         name: "vendor_esewa",
         label: "E-Sewa ID",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
             <div  onClick={(event)=>getPartnerAccountDetail(paymentPartnerList[tableMeta.rowIndex].partner_id)} style={{color:'#147298',textDecoration:'none',cursor:'pointer'}}>{value}</div>
          )
         }
        },
        {
            name: 'partner_id',
            label: 'Action',
            options: {
              filter: false,
              sort: false,
              display:false,
            }
        }

       ];
     const viewPaymentDetails=(id)=>{
         console.log(id);
         console.log('view detail');
          history.push({
           pathname: '/account/pickup',
           state: {partnerID: id }
       });
     }
    const RemainCash = (value) =>{
        if(value>5000)
        {
            return(
             <>
                  <div style={{
                      border: '2px solid red',
                      color: 'red',
                      borderRadius: '25px',
                      display: 'flex',
                      justifyContent: 'center',
                      paddingTop: '3px',
                      paddingBottom: '3px',
                      fontWeight: '500'
                  }}>Rs. {value} </div>

              </>
            );
        }
        else if(value<=5000){
             return(
            <>
                  <div style={{
                      border: '2px solid green',
                      color: 'green',
                      borderRadius: '25px',
                      display: 'flex',
                      justifyContent: 'center',
                      paddingTop: '3px',
                      paddingBottom: '3px',
                      fontWeight: '500'
                  }}>Rs. {value} </div>

              </>
             );
        }

    }

 const options = {
        searchOpen:false,
        filterType:'textField',
        fixedHeader:false,
        rowsPerPage:[100],
        rowsPerPageOptions:[10,20,50,100,500],
        selectableRows: 'none',
  }

    return(
        <>
          <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>Account Division</div></>}
             data={paymentPartnerList}
             columns={columns}
             options={options}
           />
        </>
    )
}
export default AccountDivisionDatatables



