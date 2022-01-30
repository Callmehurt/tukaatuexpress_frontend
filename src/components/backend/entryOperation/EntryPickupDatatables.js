import React, {useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {entryOperatorGetEntryPickups} from './../../../redux/actions/EntryOperator';
const EntryPickupDatatables=()=>{
     const history = useHistory();
      const dispatch = useDispatch();
       const entryOperator = useSelector((state) => state.entryOperator);
       const allEntryPickups=entryOperator.allEntryPickups;
      useEffect(()=>{
            let entryOperator = JSON.parse(localStorage.getItem('Entry_Operator'));
            // console.log(staff_admin);
           if(entryOperator?.token){
              setAuthorizationToken(entryOperator.token);
            }else{
                 history.push('/entry/login');
            }
             getEntryListFunc();

        },[]);
      const getEntryListFunc=()=>{
          axios.get('/entry_operator/get/entry/request')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 dispatch(entryOperatorGetEntryPickups(res.data));
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
                   {value}
                  {/*{console.log(tableMeta)}*/}
                  {/*<div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>*/}
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
                   {value}
                  {/*{console.log(tableMeta)}*/}
                  {/*<div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>*/}
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
                   {value}
                  {/*{console.log(tableMeta)}*/}
                  {/*<div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>*/}
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
                   {value}
                  {/*{console.log(tableMeta)}*/}
                  {/*<div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>*/}
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
                   {value}
                  {/*{console.log(tableMeta)}*/}
                  {/*<div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>*/}
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
                   {value}
                  {/*{console.log(tableMeta)}*/}
                  {/*<div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>*/}
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
                   {value}
                  {/*{console.log(tableMeta)}*/}
                  {/*<div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>*/}
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
                  {value}
                  {/*{console.log(tableMeta)}*/}
                  {/*<div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[9])}>{value}</div>*/}
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

                  </>
              )
            }
        }

       ];
    const options = {
            searchOpen:false,
            filterType:'textField',
            fixedHeader:false,
            selectableRows: 'none',
      }

    return(
        <>
            {/*<h5>EntryPickupDatatables</h5>*/}
            <MUIDataTable
                 // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>At WareHouse</div></>}
                data={allEntryPickups}
                columns={columns}
                options={options}
               />

        </>
    )
}
export default EntryPickupDatatables