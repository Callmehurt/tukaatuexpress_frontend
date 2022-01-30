import React, {useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import {ImBoxRemove} from "react-icons/im";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {assignDeliveryPerson} from "../../../../../redux/actions/wareHouseListCount";
import HoldMoveWarehouseModal from "./Warehouseactions/HoldMoveWarehouseModal";
import HoldToCancelModal from "./Warehouseactions/HoldToCancelModal";
import {useDispatch, useSelector} from "react-redux";
import {allHoldList} from './../../../../../redux/actions/BranchOperation';
import showNotification from "../../../includes/notification";
import AssignDeliveryModal from "./Warehouseactions/AssignDeliveryModal";
import {useHistory} from "react-router-dom";


const AllHoldsDatatables=()=>{
     const history = useHistory();
      const dispatch = useDispatch();
       const thisState = useSelector((state) => state.branchOperation);
        const allHoldLists = thisState.allHoldList;
        const[holdMoveShow,setHoldMoveShow]=useState(false);
         const[cancelShow,setCancelShow]=useState(false);
         const [packetId,setPacketId]=useState('');
        useEffect(()=>{
            let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
            // console.log(staff_admin);
            if(staff_admin){
              setAuthorizationToken(staff_admin.token);
            }
             getAllHolds();

        },[0]);
    const  getAllHolds=()=>{
        axios.get('/admin/pickup/hold/list')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 dispatch(allHoldList(res.data));
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
    const moveToWarehouse=async(id)=>{
         setPacketId(id);
          console.log(packetId);
           console.log('hold move id');
          setHoldMoveShow(true);
        // await axios.get(`admin/pickup/move/to/warehouse/${id}`)
        //     .then((res) => {
        //         console.log(res.data);
        //         console.log('res data pickup')
        //         showNotification('success', res.data.message);
        //         getAllHolds();
        //     })
        //     .catch((err) => {
        //         console.log(err.response.data);
        //     })
    }
    const holdConfirmFunc =(data_id)=>{
        let PostData={
                   id:data_id,
               }
               axios.post('admin/confirm/hold',PostData)
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    if(res.data.status === false){
                       showNotification('danger', res.data.message);
                     }else{
                            showNotification('success', res.data.message);

                       }
                   getAllHolds();
                })
                .catch((err) => {
                    console.log(err.response);
                });
    }
    const CancelToOrder=async(id)=>{
         setPacketId(id);
          setCancelShow(true);
    }
     const onHideHoldMove=()=>{
          setHoldMoveShow(false);
        }
        const onHideHoldToCancel=()=>{
           setCancelShow(false);
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>
              </>
          )
         }
        },
       {
         name: "hold_confirm",
         label: "Hold Confirm",
         options: {
          filter: true,
          sort: true,
             display:false,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>
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
                          <div style={{width:'50%',}}>
                                <button style={{borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => moveToWarehouse(value)}> Move to Warehouse </button>
                          </div>
                           <div style={{width:'35%',}}>
                                <button style={{borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => CancelToOrder(value)}>Cancel Order </button>
                          </div>
                          {tableMeta.rowData[7]==0?
                              <>
                                  <div style={{width:'25%',}}>
                                     <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => holdConfirmFunc(value)}> Confirm</button>
                                  </div>
                              </>:
                              <>
                                  <div style={{width:'25%',}}>
                                     <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} > Confirmed </button>
                                  </div>

                              </>

                          }

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
                 <HoldMoveWarehouseModal packetId={packetId} show={holdMoveShow} toggle={onHideHoldMove} />
                <HoldToCancelModal packetId={packetId} show={cancelShow} toggle={onHideHoldToCancel} />
                <MUIDataTable
                 // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>At WareHouse</div></>}
                data={allHoldLists}
                columns={columns}
                options={options}
               />

            </>
        );
    }
export default AllHoldsDatatables