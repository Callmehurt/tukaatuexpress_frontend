import React,{useEffect} from 'react'
import MUIDataTable from "mui-datatables";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";

const PettyCashApprovedDatatables=()=>{

    const accountAdmin = useSelector((state) => state.accountAdmin);
    const pettyCashApprovedList = accountAdmin.PettyCashApprovedList;

    const columns = [
    {
     name: "branch_name",
     label: "Branch Name",
     options: {
      filter: true,
      sort: true,
     }
    },
     {
     name: "request_date",
     label: "Requested Date",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "approved_date",
     label: "Approved Date",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "requested_petty_cash",
     label: "Requested Petty Cash",
     options: {
      filter: true,
      sort: true,
   }
   },
    {
     name: "prev_petty_cash",
     label: "Previous Petty Cash",
     options: {
      filter: true,
      sort: true,
   }
   },
    {
     name: "provided_petty_cash",
     label: "Provided Petty Cash",
     options: {
      filter: true,
      sort: true,
   }
   },
    {
     name: "total_petty_cash",
     label: "Total Petty Cash",
     options: {
      filter: true,
      sort: true,
   }
   },

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
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>All Statements</div></>}
            data={pettyCashApprovedList}
            columns={columns}
            options={options}
           />
        </>
    )
}
export default PettyCashApprovedDatatables