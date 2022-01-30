import React, {useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {AccountApprovedBranchDailyStatement} from './../../../redux/actions/AccountAdmin';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {AiFillEye} from "react-icons/ai";

const BranchDailyStatementRequestApprove=()=>{
    const dispatch = useDispatch();
     const accountAdmin = useSelector((state) => state.accountAdmin);
     const accountApprovedBranchDailyStatementList=accountAdmin.accountApprovedBranchDailyStatement;
    useEffect(()=>{
        const AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        if(AccountStorage){
            setAuthorizationToken(AccountStorage.token);

        }
        getBranchStatementApproved();
    },[]);
    const getBranchStatementApproved=()=>{
    axios.get('/account/get/branch/approved/daily/statements')
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    dispatch(AccountApprovedBranchDailyStatement(res.data));
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
                      <div style={{width:'100%',display:'flex'}}>
                          <div style={{width:'100%',}}>
                             <Button variant="outline-primary" className="pb-1 pt-1" onClick={() => viewPdfStatement(value)}> <AiFillEye size={20} /> </Button>
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
            {/*<h5>BranchDailyStatementRequestApprove</h5>*/}
             <MUIDataTable
                 data={accountApprovedBranchDailyStatementList}
                columns={columns}
                options={options}
           />
        </>
    )
}
export default BranchDailyStatementRequestApprove