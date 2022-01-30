import React, {useEffect} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Button} from 'react-bootstrap';
import MUIDataTable from "mui-datatables";
import {getVendorReturnPendingStatement,getVendorReturnApprovedStatement} from "../../../../../redux/actions/BranchOperation";

const VendorReturnPickupPendingStatement=()=>{
    const location=useLocation();
     const dispatch=useDispatch();
     const history = useHistory();
      const branchOperation = useSelector((state) => state.branchOperation);
      const vendorReturnPendingStatement=branchOperation.vendorReturnPendingStatement;
     useEffect(()=>{
         let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
         console.log(staff_admin);
         if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
         }else{
            history.push('/admin/login');
         }
         VendorPickupReturnStatements();
     },[]);
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
     const VendorPickupReturnStatements=()=>{
            let partner_id=location.state?.partnerID;
           axios.get(`/admin/partner/return/statement/list/${partner_id}`)
            .then((res) => {
                console.log(res);
                dispatch(getVendorReturnPendingStatement(res.data.pending));
                dispatch(getVendorReturnApprovedStatement(res.data.approved));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
     }
    return(
        <>
            <MUIDataTable
            // title={"Payment Recieved Deliveries"}
            data={vendorReturnPendingStatement}
            columns={columns}
            options={options}
           />
        </>
    )
}
export default VendorReturnPickupPendingStatement