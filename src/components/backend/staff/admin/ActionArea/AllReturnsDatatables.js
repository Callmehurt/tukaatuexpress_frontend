import React, {useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import {ImBoxRemove} from "react-icons/im";
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import CancelToWarehouseModal from './Warehouseactions/CancelToWarehouseModal';
import CancelToHoldModal from './Warehouseactions/CancelToHoldModal';
import axios from "axios";
import {allReturnList} from "../../../../../redux/actions/BranchOperation";
import {useHistory} from "react-router-dom";
import showNotification from "../../../includes/notification";

const AllReturnsDatatables=()=> {
    const history = useHistory();
    const dispatch = useDispatch();
    const thisState = useSelector((state) => state.branchOperation);
    const allReturnLists = thisState.allReturnList;
    const [packetId, setPacketId] = useState('');
    const [cancelToWarehouseShow, setCancelToWarehouseShow] = useState(false);
    const [cancelToHoldShow, setCancelToHoldShow] = useState(false);
    useEffect(() => {
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if (staff_admin) {
            setAuthorizationToken(staff_admin.token);
        }
        getAllReturnAndCancel();

    }, [0]);
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
                    getAllReturnAndCancel();
                })
                .catch((err) => {
                    console.log(err.response);
                });
         }
    const getAllReturnAndCancel = () => {
        axios.get('/admin/pickup/cancel/list')
            .then((res) => {
                console.log(res);
                console.log(res.data);
                dispatch(allReturnList(res.data));
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
                   getAllReturnAndCancel();
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
            label: "confirm cancel",
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
            label: "Transfer Return Status",
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
            label: "confirm cancel receive",
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
                            <div style={{width: '40%',}}>
                                <button style={{
                                    width: '150px',
                                    borderRadius: '5px',
                                    border: 'none',
                                    backgroundColor: '#ffc107',
                                    padding: '5px 10px'
                                }} onClick={() => cancelToWarehouse(value)}> Move to Warehouse
                                </button>
                            </div>
                            <div style={{width: '35%',}}>
                                <button style={{
                                    width: '130px',
                                    borderRadius: '5px',
                                    border: 'none',
                                    backgroundColor: '#ffc107',
                                    padding: '5px 10px'
                                }} onClick={() => CancelToHold(value)}>Cancel to Hold
                                </button>
                            </div>
                            {tableMeta.rowData[11]==1?
                                <>
                                    {tableMeta.rowData[8]==0?
                                        <>
                                            <div style={{width: '25%',}}>
                                                <button style={{
                                                    width: '100px',
                                                    borderRadius: '5px',
                                                    border: 'none',
                                                    backgroundColor: '#ffc107',
                                                    padding: '5px 10px'
                                                }} onClick={() => confirmCancel(value)}>Confirm
                                                </button>
                                           </div>
                                        </>:
                                        <>
                                            {tableMeta.rowData[9]=='constant'?
                                                <>
                                                    <div style={{width: '25%',}}>
                                                        <button style={{
                                                            width: '100px',
                                                            borderRadius: '5px',
                                                            border: 'none',
                                                            backgroundColor: '#ffc107',
                                                            padding: '5px 10px'
                                                        }} onClick={() => sendBackToBranch(value)}>Send Back To Branch
                                                        </button>
                                                    </div>
                                                </>:
                                                <>
                                                    {tableMeta.rowData[10]==0?
                                                        <>
                                                            <div style={{width: '25%',}}>
                                                                <button style={{
                                                                    width: '100px',
                                                                    borderRadius: '5px',
                                                                    border: 'none',
                                                                    backgroundColor: '#ffc107',
                                                                    padding: '5px 10px'
                                                                }} >Sending Back...
                                                                </button>
                                                            </div>
                                                        </>:
                                                        <>
                                                            <div style={{width: '25%',}}>
                                                                <button style={{
                                                                    width: '100px',
                                                                    borderRadius: '5px',
                                                                    border: 'none',
                                                                    backgroundColor: '#ffc107',
                                                                    padding: '5px 10px'
                                                                }} >Complete
                                                                </button>
                                                            </div>
                                                        </>
                                                    }

                                                </>

                                            }

                                        </>
                                    }
                                </>:
                                <>
                                    {tableMeta.rowData[8]==0?
                                        <>
                                            <div style={{width: '25%',}}>
                                                <button style={{
                                                    width: '100px',
                                                    borderRadius: '5px',
                                                    border: 'none',
                                                    backgroundColor: '#ffc107',
                                                    padding: '5px 10px'
                                                }} onClick={() => confirmCancel(value)}>Confirm
                                                </button>
                                           </div>
                                        </> :
                                        <>
                                             <div style={{width: '25%',}}>
                                                <button style={{
                                                    width: '100px',
                                                    borderRadius: '5px',
                                                    border: 'none',
                                                    backgroundColor: '#ffc107',
                                                    padding: '5px 10px'
                                                }} >Confirmed
                                                </button>
                                           </div>
                                        </>
                                    }

                                </>
                            }

                        </div>
                    </>
                )
            }
        }

    ];
    const cancelToWarehouse = (id) => {
        setPacketId(id);
        console.log(packetId);
        // console.log('hold move id');
        setCancelToWarehouseShow(true);
    }
    const CancelToHold = (id) => {
        setPacketId(id);
        setCancelToHoldShow(true);
    }

    const options = {
        searchOpen: false,
        filterType: 'textField',
        fixedHeader: false,
        rowsPerPage:[100],
        rowsPerPageOptions:[10,20,50,100,500],

        selectableRows: 'none',
    }
    const onHideCancelToWarehouse=()=>{
      setCancelToWarehouseShow(false);
    }
    const onHideCancelToHold=()=>{
     setCancelToHoldShow(false);
    }

    return(
        <>

            <CancelToWarehouseModal packetId={packetId} show={cancelToWarehouseShow} toggle={onHideCancelToWarehouse}/>
            <CancelToHoldModal packetId={packetId} show={cancelToHoldShow} toggle={onHideCancelToHold}/>
            <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>At WareHouse</div></>}
            data={allReturnLists}
            columns={columns}
            options={options}
           />

        </>
    );
}
export default AllReturnsDatatables