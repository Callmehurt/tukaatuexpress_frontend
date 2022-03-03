import React, {useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "./../../../../../utils/setAuthorizationToken";
import axios from "axios";
// import {allHoldList} from "../../../../../redux/actions/BranchOperation";
import {getPartnerRequest} from  '../../../../../redux/actions/BranchOperation'
import {useHistory} from "react-router-dom";

import AssignRequestModal from "./AssignRequestModal";
import {assignDeliveryPerson} from "../../../../../redux/actions/wareHouseListCount";

const PickupRequestDatatable=()=>{
    const history = useHistory();
     const dispatch = useDispatch();
     const thisState = useSelector((state) => state.branchOperation);
     const partnerRequest = thisState.partnerRequest;
      const [assignRequestShow, setAssignRequestShow] = React.useState(false);
       const [requestId,setRequestId]=useState('');
     useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
        }else{
             history.push('/admin/login');
        }
        getNewPickupRequest();
        getDeliveryPerson();

    },[0]);
     const getNewPickupRequest=()=>{
         axios.get('/admin/partner/requests')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 dispatch(getPartnerRequest(res.data));
             })
             .catch((err) => {
                 console.log(err.response);
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> viewPickups(tableMeta.rowData[3])}>{value}</div>
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
                                <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => AssignRequest(value)}>Assign Request</button>
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
        }
       ];
     const AssignRequest=(id)=>{
            setRequestId(id);
            setAssignRequestShow(true);
     }
     const viewPickups=(id)=>{
         history.push({
           pathname: '/staff/admin/pickup_request_detail',
           state: {requestID: id }
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
  const getDeliveryPerson=()=>{
        axios.get('/admin/get/delivery/staff/list')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 if (res.data) {
                            let DeliveryPerson = res.data;
                            let DeliveryPersonList = [];
                            DeliveryPerson.forEach((items,index)=>{
                            if(items.isBan === 0){
                                let arrayObject = {
                                value: items.id,
                                label: items.name.concat(' - ', items.phone),
                                };
                                DeliveryPersonList.push(arrayObject);
                            }
                            })
                            dispatch(assignDeliveryPerson(DeliveryPersonList));
                        }

             })
             .catch((err) => {
                 console.log(err.response);
             });
    }
  const onHideAssign=()=>{
          setAssignRequestShow(false);
        }
    return(
        <>
            <AssignRequestModal requestId={requestId} show={assignRequestShow} toggle={onHideAssign} />
            <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}></div></>}
            data={partnerRequest}
            columns={columns}
            options={options}
           />
        </>
    )
}
export default PickupRequestDatatable