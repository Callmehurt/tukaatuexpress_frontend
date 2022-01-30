import React, {useEffect, useState} from 'react'
import MUIDataTable from "mui-datatables";
import {RiDeleteBin2Line} from "react-icons/ri";
import {useSelector, useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import setAuthorizationToken from "./../../../utils/setAuthorizationToken";
import axios from "axios";
import {ImBoxRemove} from "react-icons/im";
import CustomToolbarSelect from "./CustomToolbarSelect";

const AllDatatables = ()=> {
    const dispatch = useDispatch();
    const accountAdmin = useSelector((state) => state.accountAdmin);
    const allDeliveries = accountAdmin.paymentAllDeliveries;
    const [rowString,setRowString]= useState({
       indexSelect:'',
   });

    useEffect(()=>{
        let AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        console.log(AccountStorage);
        if(AccountStorage){
          setAuthorizationToken(AccountStorage.token);
        }
        deliveredData();
        console.log(allDeliveries);
        console.log('all Deliveries');
    },[]);

   const columns = [
        {
            name: 'id',
            label: 'Action',
            options: {
              filter: true,
              sort: true,
             }
        },
        {
         name: "tex_code",
         label: "Tracking Id",
         options: {
          filter: true,
          sort: true,
         }
        },
         {
         name: "entry_date",
         label: "Entry Date",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "customer_phone",
         label: "contact info.",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "customer_name",
         label: "Reciever Name",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "packet_name",
         label: "Product Name",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "cod_received",
         label: "COD",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "delivery_charge",
         label: "Delivery Charge",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "customer_address",
         label: "Address",
         options: {
          filter: true,
          sort: true,
         }
        }

       ];
   const deliveredData = () => {
         // axios.get('/admin/pickup/list')
         //    .then((res) => {
         //        console.log(res);
         //        dispatch(NewPickupList(res.data));
         //        dispatch(NewPickupListCount(res.data.length));
         //    })
         //    .catch((err) => {
         //        console.log(err.response.data);
         //    })

   }
   // const Custom =(props)=>{
   //   console.log(props.selectedRows);
   // }

    const options = {
    searchOpen:false,
    filterType:'textField',
    fixedHeader:false,
    rowsPerPage:[100],
    rowsPerPageOptions:[10,20,50,100,500],
    selectableRows: false,
  //   customToolbarSelect: (selectedRows,displayData) => (
  //   <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} />
  // )

    // onRowsSelect: (currentRowsSelected, allRowsSelected) =>{
    //         // setRowData(allRowsSelected);
    //         handleRowClick(currentRowsSelected,allRowsSelected);
    //         console.log(currentRowsSelected);
    //         console.log(allRowsSelected[0].index);
    //         console.log('all selected row index');
    //         console.log(allRowsSelected.length);
    //     }

  }
  // const handleRowClick =(currentRowData, allRowsData)=>{
  //       console.log('handleClickData');
  //       console.log(allRowsData);
  //       console.log(currentRowData);
  //       let newArray=[];
  //       let rowLength=allRowsData.length-1;
  //       while(rowLength>=0){
  //           newArray.push(allRowsData[rowLength].index);
  //           rowLength--;
  //       }
  //       const newString=newArray.join();
  //       console.log(newString);
  //      const newStringPut={...rowString};
  //          newStringPut['indexSelect']=newString;
  //          setRowString(newStringPut);
  //
  //       console.log(newStringPut);
  //       console.log('new array');
  // }
    return(
        <>
           <MUIDataTable
            // title={"All Deliveries"}
            data={allDeliveries}
            columns={columns}
            options={options}
           />
        </>
    )
}

export default AllDatatables