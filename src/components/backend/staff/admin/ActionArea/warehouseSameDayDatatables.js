import React, {useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import {ImBoxRemove} from "react-icons/im";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import wareHouseLists  from "../../../../../redux/actions/wareHouseList";
import {wareHouseListCount} from "../../../../../redux/actions/wareHouseListCount";
import AssignDeliveryModal from "./Warehouseactions/AssignDeliveryModal";
import {updatePartner} from "../../../../../redux/actions/updatePartner";
import TransferModal from "./Warehouseactions/TransferModal";
import{TransferAllBranch} from './../../../../../redux/actions/Trasnfer';
import {assignDeliveryPerson} from './../../../../../redux/actions/wareHouseListCount';
import {warehouseListSameDay} from './../../../../../redux/actions/BranchOperation'
import showNotification from "../../../includes/notification";
import WarehouseToHoldModal from "./Warehouseactions/WarehouseToHoldModal";
import WarehouseToCancelModal from "./Warehouseactions/WarehouseToCancelModal";
import {useHistory} from "react-router-dom";


const WarehouseSameDayDatatables = () => {
     const history = useHistory();
    const dispatch = useDispatch();
    const [assignDeliveryShow, setAssignDeliveryShow] = React.useState(false);
    const [transferShow, setTransferShow] = React.useState(false);
    const thisState = useSelector((state) => state.branchOperation);
    const warehouseListsSameDay = thisState.warehouseListsSameDay;
     const[warehouseToHoldShow,setWarehouseToHoldShow]=useState(false);
    const[warehouseToCancelShow,setWarehouseToCancelShow]=useState(false);
    // const thisState = useSelector((state) => state.warehouseList);
    // const wareHouseList = thisState.WareHouseList;
    // const wareHouseCount = thisState.WareHouseListCount;

    const [packetId,setPacketId]=useState('');
    useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
        }else{
             history.push('/admin/login');
        }
        getWarehousesameDayList();
        getTransferBranches();
        getDeliveryPerson();

    },[0]);
     const getWarehousesameDayList = () =>{
         axios.get('admin/pickup/sameday/warehouse/list')
            .then((res) => {
                console.log(res);
                dispatch(warehouseListSameDay(res.data));
            })
            .catch((err) => {
                console.log(err.response);
            })
     }
    const getDeliveryPerson=()=>{
        axios.get('/admin/get/delivery/staff/list')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 let deliveryPerson = res.data;
                 let deliveryPersonList = [];
                 deliveryPerson.forEach((items,index)=>{
                 console.log('hello list');
                    let arrayObject = {
                        value: items.id,
                        label: items.name + '(' + items.phone + ')',

                    };
                    console.log(arrayObject);
                    deliveryPersonList.push(arrayObject);
                    // dispatch(assignDeliveryPerson(deliveryPersonList));

                })
                 dispatch(assignDeliveryPerson(res.data));
             })
             .catch((err) => {
                 console.log(err.response);
             });
    }
    const getTransferBranches=()=>{
             console.log("request get branch");
          axios.get('/admin/pickup/transfer/branches')
             .then((res) => {
                 console.log(res.data);
                 console.log('get branches');
                 dispatch(TransferAllBranch(res.data));

             })
             .catch((err) => {
                 console.log(err.response);
             });
      }
     const AssignToDelivery = async (id) =>{
        console.log('assign delivery');
          setPacketId(id);
          console.log(packetId);
           console.log('assign delivery id');
          setAssignDeliveryShow(true);

    }
    const MoveToHold = async (id) =>{
         console.log('Moved to hold');
          console.log('Moved to hold');
          setPacketId(id);
          setWarehouseToHoldShow(true);
         // setTransferShow(true);
        // axios.get(`/admin/pickup/move/to/hold/${id}`)
        //      .then((res) => {
        //          console.log(res.data);
        //          console.log('get branches');
        //          // dispatch(TransferAllBranch(res.data));
        //
        //           if(res.data.status === false){
        //              showNotification('danger', res.data.message);
        //          }else{
        //              showNotification('success', res.data.message);
        //             getWarehousesameDayList();
        //          }
        //
        //      })
        //      .catch((err) => {
        //          console.log(err.response);
        //      });


    }
    const MoveToCancel = async (id) =>{
         console.log('Moved to Cancel');
          console.log('Moved to Cancel');
          setPacketId(id);
           setWarehouseToCancelShow(true);
         // axios.get(`/admin/pickup/move/to/cancel/${id}`)
         //     .then((res) => {
         //         console.log(res.data);
         //         console.log('get branches');
         //         // dispatch(TransferAllBranch(res.data));
         //
         //          if(res.data.status === false){
         //             showNotification('danger', res.data.message);
         //         }else{
         //
         //             showNotification('success', res.data.message);
         //             getWarehousesameDayList();
         //         }
         //
         //     })
         //     .catch((err) => {
         //         console.log(err.response);
         //     });

    }
    const TransferAction = async(id) =>{
          console.log('Transfer to other branch');
          console.log(id);
           setTransferShow(true);
           setPacketId(id);
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
         name: "vendor_name",
         label: "Partner Name",
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
                          <div style={{width:'20%',}}>
                                <button style={{borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px',fontSize:'12px'}} onClick={() => AssignToDelivery(value)}> Assign </button>
                          </div>
                           <div style={{width:'32%',}}>
                                <button style={{borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px',fontSize:'12px'}} onClick={() => MoveToHold(value)}> Move to Hold<ImBoxRemove/></button>
                          </div>
                           <div style={{width:'36%',}}>
                                <button style={{borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px',fontSize:'12px'}} onClick={() => MoveToCancel(value)}> Move to Cancel <ImBoxRemove/></button>
                          </div>
                           <div style={{width:'17%',}}>
                                <button style={{borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px',fontSize:'12px'}} onClick={() => TransferAction(value)}> Transfer <ImBoxRemove/></button>
                          </div>
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
  const onHideAssign=()=>{
          setAssignDeliveryShow(false);
        }
        const onHideTransfer=()=>{
          setTransferShow(false);
        }
        const onHideHold=()=>{
          setWarehouseToHoldShow(false);
        }
        const onHideCancel=()=>{
          setWarehouseToCancelShow(false);
        }
    return(
        <>
        <AssignDeliveryModal packetId={packetId} show={assignDeliveryShow} toggle={onHideAssign} />
        <TransferModal packetId={packetId} show={transferShow} toggle={onHideTransfer} />
        <WarehouseToHoldModal packetId={packetId} show={warehouseToHoldShow} toggle={onHideHold} />
        <WarehouseToCancelModal packetId={packetId} show={warehouseToCancelShow} toggle={onHideCancel} />
         <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>At WareHouse</div></>}
            data={warehouseListsSameDay}
            columns={columns}
            options={options}
           />
        </>
    )
}
export default WarehouseSameDayDatatables