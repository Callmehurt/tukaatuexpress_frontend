import React,{useEffect,useState} from 'react'
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {AccountPartnerPaymentList} from "../../../redux/actions/AccountAdmin";

const PartnerAllStatementsDatatables=()=>{
    const location=useLocation();
     const dispatch=useDispatch();
     const history=useHistory();
     const [partnerAllStatement,setPartnerAllStatement]=useState('');
     useEffect(()=>{
       const AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        if(AccountStorage){
            setAuthorizationToken(AccountStorage.token);

        }
        getAllStatement();
     },[0]);
    const getAllStatement =()=>{
        let partner_id=location.state?.partnerID;
        console.log(partner_id);
        axios.get(`account/get/partner/payment/statement/list/${partner_id}`)
            .then((res) => {
                console.log(res.data);
                console.log('Res Data');
                setPartnerAllStatement(res.data);
                // dispatch(AccountPartnerPaymentList(res.data));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
      const columns = [
        {
         name: "tex_code",
         label: "Tracking Id",
         options: {
          filter: true,
          sort: true,
         }
        },
         {
         name: "entry_date",
         label: "Entry Date",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "customer_phone",
         label: "contact info.",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "customer_name",
         label: "Reciever Name",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "packet_name",
         label: "Product Name",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "cod",
         label: "COD",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "delivery_charge",
         label: "Delivery Charge",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "customer_address",
         label: "Address",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
            name: 'id',
            label: 'Action',
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>

                  </>
              )
            }
        }

       ];
     const options = {
        searchOpen:true,
        filterType:'textField',
        fixedHeader:false,
         rowsPerPage:[100],
        rowsPerPageOptions:[10,20,50,100,500],
        selectableRows: 'none',
     }
    return(
        <>
            <MUIDataTable
             title={<><div style={{fontSize:'16px', fontWeight:'500',}}>Account Division</div></>}
             data={partnerAllStatement}
             columns={columns}
             options={options}
           />
        </>
    )
}
export default PartnerAllStatementsDatatables