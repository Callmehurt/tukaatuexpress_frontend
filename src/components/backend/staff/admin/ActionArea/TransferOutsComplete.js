import React, {useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {TransferOuts, TransferOutsCount} from "../../../../../redux/actions/Trasnfer";
import {getTransferOutsComplete} from './../../../../../redux/actions/BranchOperation'
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const TransferOutsComplete=()=>{
     const history = useHistory();
     const dispatch= useDispatch();
      const branchOperation = useSelector((state) => state.branchOperation);
       const transferOutsComplete = branchOperation.transferOutsComplete;
    useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
        getTransferOutsCompleteFunction();

    },[0]);
    const getPickupDetail=(id)=>{
        history.push({
              pathname: '/staff/admin/pickup_detail',
           state: {imageDetail: id }
        });


   }
    const getTransferOutsCompleteFunction=()=>{
        axios.get('admin/pickup/transfer/outs/complete')
            .then((res) => {
                dispatch(getTransferOutsComplete(res.data));
            })
            .catch((err) => {
                console.log(err.response);
                // console.log('error transfer ins')
            })
    }
    const columns = [
        {
         name: "tex_code",
         label: "Tracking Id",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferOutsComplete[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
        {
         name: "transferred_branch",
         label: "Transferred Branch",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferOutsComplete[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
         {
         name: "entry_date",
         label: "Entry Date",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferOutsComplete[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
        {
         name: "customer_phone",
         label: "Contact info.",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferOutsComplete[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
        {
         name: "customer_name",
         label: "Receiver Name",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferOutsComplete[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
       {
         name: "packet_name",
         label: "Product Name",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferOutsComplete[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
       {
         name: "cod",
         label: "COD",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferOutsComplete[tableMeta.rowIndex].id)}>Rs. {value}</div>
              </>
          )
         }
        },
       {
         name: "delivery_charge",
         label: "Delivery Charge",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferOutsComplete[tableMeta.rowIndex].id)}>Rs. {value}</div>
              </>
          )
         }
        },
       {
         name: "customer_address",
         label: "Address",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferOutsComplete[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
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
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>Incoming Request</div></>}
            data={transferOutsComplete}
            columns={columns}
            options={options}
           />
        </>
    )
}
export default TransferOutsComplete