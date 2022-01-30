import React, {useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getAccountPendingBranchDailyStatement} from "./../../../redux/actions/AccountAdmin";
import {Button} from "react-bootstrap";
import {AiFillEye} from "react-icons/ai";


const BranchDailyStatementRequestPending=()=>{
      const dispatch = useDispatch();
       const accountAdmin = useSelector((state) => state.accountAdmin);
       const accountPendingBranchDailyStatementList=accountAdmin.accountPendingBranchDailyStatement;
 useEffect(()=>{
        const AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        if(AccountStorage){
            setAuthorizationToken(AccountStorage.token);

        }
        getBranchStatementPending();
    },[]);
 // const get
 const getBranchStatementPending=()=>{
    axios.get('/account/get/branch/pending/daily/statements')
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    dispatch(getAccountPendingBranchDailyStatement(res.data));
                    })
                .catch((err) => {
                    console.log(err.response)
                })
 }
 const approvedStatement=(stat_id)=>{
     console.log(stat_id);
     axios.put(`/account/approve/branch/daily/statement/${stat_id}`)
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    getBranchStatementPending();

                    })
                .catch((err) => {
                    console.log(err.response)
                })
 }
const columns = [
        {
         name: "statement_num",
         label: "Statement No.",
         options: {
          filter: true,
          sort: true,
         }
        },
         {
         name: "branch_name",
         label: "Branch No.",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "total_cash_collected",
         label: "T. C. Col.",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "total_delivery_charge",
         label: "Total D. char.",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "total_commission",
         label: "Total Commission",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "total_expenses",
         label: "T. Expenses",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "amount_to_deposit",
         label: "A. T. Dep. ",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "total_delivered",
         label: "T. Deliver.",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "statement_date",
         label: "A. Stat. Date",
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
                      <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                           <div style={{width:'50%',}}>
                             <Button variant="outline-primary" className="pb-1 pt-1" onClick={() => viewPdfStatement(value)}> <AiFillEye size={20} /> </Button>
                          </div>
                          <div style={{width:'50%',}}>
                                <button onClick={(event)=> approvedStatement(value)} style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}}> Approve</button>
                          </div>

                      </div>
                  </>
              )
            }
        }

       ];
 const viewPdfStatement=(statement_id)=>{
   axios.get(`/account/get/daily/statement/${statement_id}`,{
              responseType: 'blob',
             Accept: 'application/pdf',
        })
        .then(response => {
            console.log(response.data);
            const file = new Blob(
              [response.data],
              {type: 'application/pdf'});
            console.log(file);
            const fileURL = URL.createObjectURL(file);
            // const link = document.createElement('a');
            // link.href = fileURL;
            // link.setAttribute('staffs.pdf');
            // document.body.appendChild(link);
            // link.click();
        //Open the URL on new Window
            window.open(fileURL);
        })
       .catch(error => {
        console.log(error);
    });
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
            data={accountPendingBranchDailyStatementList}
            columns={columns}
            options={options}
           />
        </>
    )
}
export default BranchDailyStatementRequestPending