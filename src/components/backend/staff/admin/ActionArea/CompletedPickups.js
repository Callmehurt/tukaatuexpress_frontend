import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "./../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {getPartnerRequest,allCompleteRequest} from "../../../../../redux/actions/BranchOperation";

import MUIDataTable from "mui-datatables";
const CompletedPickups=()=>{
     const history = useHistory();
     const dispatch = useDispatch();
     const thisState = useSelector((state) => state.branchOperation);
     const allCompleteRequests=thisState.allCompleteRequest;
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
     const getProcessRequest=()=>{
         axios.get('/admin/partner/completed/requests')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 dispatch(allCompleteRequest(res.data));
             })
             .catch((err) => {
                 console.log(err.response);
             });
     }
     const columns = [
         {
         name: "request_date",
         label: "Request Date",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> viewPickups(tableMeta.rowData[3])}>{value}</div>
              </>
          )
         }
        },
        {
         name: "request_code",
         label: "Request Date",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> viewPickups(tableMeta.rowData[3])}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> viewPickups(tableMeta.rowData[3])}>{value}</div>
              </>
          )
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
                          {/*<div style={{width:'25%',}}>*/}
                          {/*      <button style={{width:'70px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => AssignToDelivery(value)}> Assign </button>*/}
                          {/*</div>*/}
                           <div style={{width:'25%',}}>
                                {/*<button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => AssignRequest(value)}>Assign Request</button>*/}
                          </div>
                          {/* <div style={{width:'25%',}}>*/}
                          {/*      <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => MoveToCancel(value)}> Move to Cancel <ImBoxRemove/></button>*/}
                          {/*</div>*/}
                          {/* <div style={{width:'25%',}}>*/}
                          {/*      <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => TransferAction(value)}> Transfer <ImBoxRemove/></button>*/}
                          {/*</div>*/}
                          {/*<div style={{width:'50%',}}>*/}
                          {/*      <button className="editBtn" ><BiEdit /></button>*/}
                          {/*</div>*/}
                      </div>
                  </>
              )
            }
        },
        // {
        //     name: 'id',
        //     label: 'View Orders',
        //     options: {
        //       filter: false,
        //       sort: false,
        //       customBodyRender: (value, tableMeta, updateValue) => (
        //           <>
        //               <div style={{width:'100%',display:'flex'}}>
        //                   {/*<div style={{width:'25%',}}>*/}
        //                   {/*      <button style={{width:'70px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => AssignToDelivery(value)}> Assign </button>*/}
        //                   {/*</div>*/}
        //                    <div style={{width:'25%',}}>
        //                         <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => viewPickups(value)}>View Orders</button>
        //                   </div>
        //                   {/* <div style={{width:'25%',}}>*/}
        //                   {/*      <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => MoveToCancel(value)}> Move to Cancel <ImBoxRemove/></button>*/}
        //                   {/*</div>*/}
        //                   {/* <div style={{width:'25%',}}>*/}
        //                   {/*      <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => TransferAction(value)}> Transfer <ImBoxRemove/></button>*/}
        //                   {/*</div>*/}
        //                   {/*<div style={{width:'50%',}}>*/}
        //                   {/*      <button className="editBtn" ><BiEdit /></button>*/}
        //                   {/*</div>*/}
        //               </div>
        //           </>
        //       )
        //     }
        // }

       ];
     const viewPickups=(id)=>{
         console.log(id);
         history.push({
           pathname: '/staff/admin/proceeded_request_detail',
           state: {requestID: id,completeDetail:true }
       });
     }
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
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}></div></>}
            data={allCompleteRequests}
            columns={columns}
            options={options}
           />

        </>
    )
}
export default CompletedPickups
