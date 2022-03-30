import React, {useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {assignedList} from "./../../../../../redux/actions/BranchOperation";
import {useHistory} from "react-router-dom";

const AssignedDatatables=()=>{
     const history = useHistory();
    const dispatch = useDispatch();
      const thisState = useSelector((state) => state.branchOperation);
       const assignedDeliveryList = thisState.assignedDeliveryList;

     useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
         getAssigned();

    },[0]);
      const  getAssigned =()=>{
        axios.get('/admin/pickup/assigned/list')
             .then((res) => {
                 console.log('assigned', res.data);
                 dispatch(assignedList(res.data));
             })
             .catch((err) => {
                 console.log(err.response);
             });
    }
    const getPickupDetail=(id)=>{
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(assignedDeliveryList[tableMeta.rowIndex].id)}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(assignedDeliveryList[tableMeta.rowIndex].id)}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(assignedDeliveryList[tableMeta.rowIndex].id)}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(assignedDeliveryList[tableMeta.rowIndex].id)}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(assignedDeliveryList[tableMeta.rowIndex].id)}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(assignedDeliveryList[tableMeta.rowIndex].id)}>Rs. {value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(assignedDeliveryList[tableMeta.rowIndex].id)}>Rs. {value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(assignedDeliveryList[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
        {
         name: "vendor_name",
         label: "Partner",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(assignedDeliveryList[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
        {
         name: "delivery_person_name",
         label: "Del. Per",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(assignedDeliveryList[tableMeta.rowIndex].id)}>{value}</div>
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
            {/*<h6>SentForDelivery</h6>*/}
            <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>At WareHouse</div></>}
            data={assignedDeliveryList}
            columns={columns}
            options={options}
           />

        </>
    )
}

export default AssignedDatatables