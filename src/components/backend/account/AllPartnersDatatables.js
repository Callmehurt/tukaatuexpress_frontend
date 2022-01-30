import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {AccountPartnerPaymentList} from "../../../redux/actions/AccountAdmin";
import {ImBoxRemove} from "react-icons/im";
import MUIDataTable from "mui-datatables";

const AllPartnersDatatables=()=>{
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
    },[]);
     const viewAllStatement=(id)=>{
         console.log(id);
         console.log('view detail');
          history.push({
           pathname: '/account/partnerallstatements',
           state: {partnerID: id }
       });
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
     const columns = [
        {
        name: 'vendor_name',
        label: 'Name',
        options: {
          filter: true,
          sort: true,
         }
      },
         {
         name: "vendor_email",
         label: "Email",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "vendor_phone",
         label: "Phone",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "vendor_bank",
         label: "Bank Name",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "vendor_account",
         label: "Account No.",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "bank_branch",
         label: "Bank Branch",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "vendor_account_holder",
         label: "Account Holder Name",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "vendor_esewa",
         label: "E-Sewa ID",
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
              display:false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex'}}>
                          <button style={{fontSize:'13px',width:'140px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 8px'}} onClick={() =>{viewAllStatement(value)}}> View Statements <ImBoxRemove/></button>

                      </div>
                  </>
              )
            }
        }

       ];
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
export default AllPartnersDatatables
