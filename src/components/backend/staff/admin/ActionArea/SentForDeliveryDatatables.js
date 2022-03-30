import React, {useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {sentForDelivery} from "./../../../../../redux/actions/BranchOperation";
import {useHistory} from "react-router-dom";

const SentForDeliveryDatatables=()=>{
     const history = useHistory();
    const dispatch = useDispatch();
      const thisState = useSelector((state) => state.branchOperation);
       const sentForDeliveries = thisState.sentForDelivery;

     useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
         getSentForDelivery();

    },[0]);
     const getPickupDetail=(id)=>{
        history.push({
              pathname: '/staff/admin/pickup_detail',
           state: {imageDetail: id }
        });


   }
      const  getSentForDelivery =()=>{
        axios.get('/admin/pickup/on/way/list')
             .then((res) => {
                 dispatch(sentForDelivery(res.data));
             })
             .catch((err) => {
                 console.log(err.response);
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(sentForDeliveries[tableMeta.rowIndex].id)}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(sentForDeliveries[tableMeta.rowIndex].id)}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(sentForDeliveries[tableMeta.rowIndex].id)}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(sentForDeliveries[tableMeta.rowIndex].id)}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(sentForDeliveries[tableMeta.rowIndex].id)}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(sentForDeliveries[tableMeta.rowIndex].id)}>Rs. {value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(sentForDeliveries[tableMeta.rowIndex].id)}>Rs. {value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(sentForDeliveries[tableMeta.rowIndex].id)}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(sentForDeliveries[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
        {
         name: "delivery_person_name",
         label: "Del. per",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(sentForDeliveries[tableMeta.rowIndex].id)}>{value}</div>
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
            data={sentForDeliveries}
            columns={columns}
            options={options}
           />

        </>
    )
}

export default SentForDeliveryDatatables