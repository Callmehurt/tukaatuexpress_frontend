import React, {useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {DeliveredList} from './../../../../../redux/actions/BranchOperation'
import {useHistory} from "react-router-dom";

const AllDeliveredDatatables=()=>{
      const history = useHistory();
      const dispatch = useDispatch();
      const thisState = useSelector((state) => state.branchOperation);
       const deliveredList = thisState.deliveredList;

     useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
         getAllDelivered();

    },[0]);
      const  getAllDelivered =()=>{
        axios.get('/admin/pickup/delivered/list')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 dispatch(DeliveredList(res.data));
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
         name: "prompt_date",
         label: "Delivered Date",
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
         name: "name",
         label: "Delivery Person",
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
         label: "Receiver Name",
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>Rs. {value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>Rs. {value}</div>
              </>
          )
         }
        },
       {
         name: "address",
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
            name: 'pickup_id',
            label: 'Action',
            options: {
              filter: false,
              sort: false,
                display:false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex'}}>

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
            {/*<h6>SentForDelivery same Day</h6>*/}
            <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>At WareHouse</div></>}
            data={deliveredList}
            columns={columns}
            options={options}
           />

        </>
    )
}

export default AllDeliveredDatatables