import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "./../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {useHistory} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {getPartnerRequest,allProcessRequest} from "../../../../../redux/actions/BranchOperation";
const OnProcessPickups=()=>{
     const history = useHistory();
     const dispatch = useDispatch();
     const thisState = useSelector((state) => state.branchOperation);
     const allProcessRequests=thisState.allProcessRequest;
     useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
        }else{
             history.push('/admin/login');
        }
        getProcessRequest();


    },[0]);
     const viewPickups=(id)=>{
         history.push({
           pathname: '/staff/admin/proceeded_request_detail',
           state: {requestID: id,completeDetail:false }
       });
     }
     const columns = [

         {
         name: "request_date",
         label: "Request Date/ Time",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> viewPickups(allProcessRequests[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
        {
         name: "request_code",
         label: "Request Code",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> viewPickups(allProcessRequests[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
        {
         name: "partner_name",
         label: "Partner Name",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> viewPickups(allProcessRequests[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
         {
         name: "vendor_phone",
         label: "Partner Phone",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> viewPickups(allProcessRequests[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
        {
         name: "address",
         label: "Partner Address",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> viewPickups(allProcessRequests[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
         {
         name: "delivery_person_name",
         label: "Assigned To",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> viewPickups(allProcessRequests[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
         {
         name: "request_count",
         label: "Packet Count",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> viewPickups(allProcessRequests[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },

       ];
     const options = {
        searchOpen:true,
        filterType:'textField',
        fixedHeader:false,
         rowsPerPage:[100],
         rowsPerPageOptions:[10,20,50,100,500],

        selectableRows: 'none',
  }
  const getProcessRequest=()=>{
         axios.get('/admin/partner/proceeded/requests')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 dispatch(allProcessRequest(res.data));
             })
             .catch((err) => {
                 console.log(err.response);
             });
     }

    return(
        <>
            <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}></div></>}
            data={allProcessRequests}
            columns={columns}
            options={options}
           />

        </>
    )
}
export default OnProcessPickups