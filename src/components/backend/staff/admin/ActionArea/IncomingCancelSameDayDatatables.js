import React, {useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {getIncomingCancels,getIncomingCancelsSameDay} from "../../../../../redux/actions/BranchOperation";
import {useHistory} from "react-router-dom";
import showNotification from "../../../includes/notification";

const IncomingCancelSameDayDatatables=()=>{
        const history = useHistory();
        const dispatch = useDispatch();
        const [packetId, setPacketId] = useState('');
        const branchOperation = useSelector((state) => state.branchOperation);
        const allIncomingCancelSameDay=branchOperation.allIncomingCancelSameDay;
         useEffect(() => {
            let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
            // console.log(staff_admin);
            if (staff_admin) {
                setAuthorizationToken(staff_admin.token);
            }
            getAllIncomingCancelSameDay();
        }, [0]);
          const getAllIncomingCancelSameDay = () => {
            axios.get('admin/pickup/sameday/transfer/cancel/incoming')
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    dispatch(getIncomingCancelsSameDay(res.data));
                })
                .catch((err) => {
                    console.log(err.response);
                });
         }
         const confirmCancel=(data_id)=>{
              // let id=data_id;
               let PostData={
                   id:data_id,
               }
            axios.post('admin/confirm/cancel',PostData)
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    if(res.data.status === false){
                       showNotification('danger', res.data.message);
                     }else{
                            showNotification('success', res.data.message);

                       }
                    getAllIncomingCancelSameDay();
                })
                .catch((err) => {
                    console.log(err.response);
                });
         }
         const sendBackToBranch=(data_id)=>{
            // let id=data_id;
             let PostData={
                   id:data_id,
               }
           axios.post('admin/send/back/branch',PostData)
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    if(res.data.status === false){
                       showNotification('danger', res.data.message);
                     }else{
                            showNotification('success', res.data.message);

                       }
                    getAllIncomingCancelSameDay();
                })
                .catch((err) => {
                    console.log(err.response);
                });
         }
         const sendBackToVendor=(data_id)=>{
            // let id=data_id;
             let PostData={
                   id:data_id,
               }
            axios.post('admin/send/back/vendor',PostData)
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    if(res.data.status === false){
                       showNotification('danger', res.data.message);
                     }else{
                            showNotification('success', res.data.message);

                       }
                    getAllIncomingCancelSameDay();

                })
                .catch((err) => {
                    console.log(err.response);
                });
         }
         const getPickupDetail=(id)=>{
           console.log(id);
           console.log('id pickup Detail');
            history.push({
                  pathname: '/staff/admin/pickup_detail',
               state: {imageDetail: id }
            });
       }
       const sendBackToBranchConfirm=(data_id)=>{
            // let id=data_id;
             let PostData={
                   id:data_id,
               }
            axios.post('admin/send/back/branch/confirm',PostData)
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    if(res.data.status === false){
                       showNotification('danger', res.data.message);
                     }else{
                            showNotification('success', res.data.message);

                       }
                    getAllIncomingCancelSameDay();

                })
                .catch((err) => {
                    console.log(err.response);
                });
         }
     const options = {
        searchOpen: false,
        filterType: 'textField',
        fixedHeader: false,
         rowsPerPage:[100],
         rowsPerPageOptions:[10,20,50,100,500],

        selectableRows: 'none',
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
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[12])}>{value}</div>
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
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[12])}>{value}</div>
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
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[12])}>{value}</div>
                      </>
                  )
            }
        },
        {
            name: "customer_name",
            label: "Reciever Name",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                      <>
                          {/*{console.log(tableMeta)}*/}
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[12])}>{value}</div>
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
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[12])}>{value}</div>
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
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[12])}>{value}</div>
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
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[12])}>{value}</div>
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
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[12])}>{value}</div>
                      </>
                  )
            }
        },
        {
        name: "cancel_confirm",
        label: "Cancel Confirm",
        options: {
            filter: true,
            sort: true,
            display:false,
            customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      {/*{console.log(tableMeta)}*/}
                      <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[12])}>{value}</div>
                  </>
              )
            }
        },
            {
        name: "transfer_return_status",
        label: "T. Return",
        options: {
            filter: true,
            sort: true,
            display:false,
            customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      {/*{console.log(tableMeta)}*/}
                      <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[12])}>{value}</div>
                  </>
              )
            }
        },
            {
        name: "confirm_cancel_receive",
        label: "Confirm Cancel Receive",
        options: {
            filter: true,
            sort: true,
            display:false,
            customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      {/*{console.log(tableMeta)}*/}
                      <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[12])}>{value}</div>
                  </>
              )
            }
        },
            {
        name: "transfer",
        label: "Transfer",
        options: {
            filter: true,
            sort: true,
            display:false,
            customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      {/*{console.log(tableMeta)}*/}
                      <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[12])}>{value}</div>
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
                        <div style={{width: '100%', display: 'flex'}}>
                            {/*{console.log(tableMeta.rowData[11])}*/}

                            {tableMeta.rowData[11]==1?
                                <>
                                    {tableMeta.rowData[8]==1?
                                        <>
                                            {tableMeta.rowData[9]=='Processing'?
                                                <>
                                                    {tableMeta.rowData[10]==1?
                                                        <>
                                                            <button style={{
                                                                width: '100px',
                                                                borderRadius: '5px',
                                                                border: 'none',
                                                                backgroundColor: '#ffc107',
                                                                padding: '5px 10px'
                                                            }} >Complete
                                                            </button>
                                                        </>:
                                                        <>
                                                            <button style={{
                                                                width: '100px',
                                                                borderRadius: '5px',
                                                                border: 'none',
                                                                backgroundColor: '#ffc107',
                                                                padding: '5px 10px'
                                                            }} onClick={() => sendBackToBranchConfirm(value)}>Confirm
                                                            </button>
                                                        </>

                                                    }
                                                </>:
                                                <>
                                                </>

                                            }

                                        </>:
                                        <>
                                            <button style={{
                                                width: '100px',
                                                borderRadius: '5px',
                                                border: 'none',
                                                backgroundColor: '#ffc107',
                                                padding: '5px 10px'
                                            }} >Pending
                                            </button>
                                        </>


                                    }
                                </>:
                                <>

                                </>

                            }


                        </div>
                    </>
                )
            }
        }

    ];
    return(

        <>
            <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>At WareHouse</div></>}
            data={allIncomingCancelSameDay}
            columns={columns}
            options={options}
           />
        </>
    )
}
export default IncomingCancelSameDayDatatables