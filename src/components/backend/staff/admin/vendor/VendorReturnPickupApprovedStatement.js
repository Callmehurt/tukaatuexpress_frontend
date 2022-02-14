import React, {useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import {Button} from "react-bootstrap";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {
    getVendorReturnApprovedStatement,
    getVendorReturnPendingStatement
} from "../../../../../redux/actions/BranchOperation";
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const VendorReturnPickupApprovedStatement = (props) => {

    const statements = props.statements;


     const columns = [
        {
         name: "statement_num",
         label: "Statement N0.",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "returns",
         label: "Returns",
         options: {
          filter: true,
          sort: true,
         }
      }, {
         name: "approve_status",
         label: "Approved Status",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta.rowData[8])}*/}
                  {value==0?
                      <>
                          <Button variant="warning">UnApproved</Button>
                      </>:
                      <>
                           <Button variant="success">Approved</Button>
                      </>
                  }

              </>
          )
         }
      }, {
         name: "approved_date",
         label: "Approved Date",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta.rowData[8])}*/}
                  {value==null?
                      <>
                          {/*<Button variant="warning">UnApproved</Button>*/}
                          Calculating..
                      </>:
                      <>
                          {value}
                           {/*<Button variant="success">Approved</Button>*/}
                      </>
                  }

              </>
          )
         }
      },{
         name: "id",
         label: "Action",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                  </>
              )
         }
      },



       ];
     const options = {
        searchOpen:false,
        filterType:'textField',
        fixedHeader:false,
         rowsPerPage: 100,
         rowsPerPageOptions: [10,20,50,100,500],
         selectableRows:false,
     }
    return(
        <>
            <MUIDataTable
            data={statements}
            columns={columns}
            options={options}
           />

        </>
    )
}
export default VendorReturnPickupApprovedStatement