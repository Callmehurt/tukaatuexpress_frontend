import React, {useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import axios from "axios";
import {getPendingDailyStatements} from './../../../../redux/actions/MainBranches';
import showNotification from "../../includes/notification";
import {ImBoxRemove} from "react-icons/im";
import {RiDeleteBin2Line} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {AiFillEye} from "react-icons/ai";

const PendingDailyStatement=()=>{
     const dispatch = useDispatch();
     const mainBranches = useSelector((state) => state.mainBranches);
     const pendingDailyStatement=mainBranches.pendingDailyStatement;
    useEffect(()=>{
        let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
            if(branch_detail){
              setAuthorizationToken(branch_detail.token);
            }
            PendingStatement();

    },[]);
    const PendingStatement=()=>{
        axios.get('/branch/get/pending/daily/statements')
                .then((res) => {
                    console.log(res);
                    // console.log(res.data);
                    dispatch(getPendingDailyStatements(res.data));
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
                             <Button variant="outline-primary" className="pb-1 pt-1" onClick={() => viewPdfStatement(value)}> <AiFillEye size={20} /> </Button>
                       </div>
                  </>
              )
            }
        }

       ];
    const viewPdfStatement=(statement_id)=>{
        axios.get(`/branch/get/daily/statement/${statement_id}`,{
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
            {/*<h5>Pending Daily Statement</h5>*/}
             <MUIDataTable
            // title={"New Pickup List"}
            data={pendingDailyStatement}
            columns={columns}
            options={options}
           />
        </>
    )
}
export default PendingDailyStatement