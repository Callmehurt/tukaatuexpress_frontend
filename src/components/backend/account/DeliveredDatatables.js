import React, {useEffect, useState} from 'react'
import MUIDataTable from "mui-datatables";
import {RiDeleteBin2Line} from "react-icons/ri";
import {useSelector, useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import setAuthorizationToken from "./../../../utils/setAuthorizationToken";
import axios from "axios";
import {ImBoxRemove} from "react-icons/im"
import CustomToolbarSelect from "./CustomToolbarSelect";

const DeliveredDatatables = ()=> {
    const dispatch = useDispatch();
    const accountAdmin = useSelector((state) => state.accountAdmin);
    const deliveredDeliveries = accountAdmin.paymentDeliveredDeliveries;
    // const [pickupList,setPickupList]= useState(false);

    useEffect(()=>{
        let AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        console.log(AccountStorage);
        if(AccountStorage){
          setAuthorizationToken(AccountStorage.token);
        }
        deliveredData();
    },[]);

   const columns = [
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
           <MUIDataTable
            // title={"All Delivered Deliveries"}
            data={deliveredDeliveries}
            columns={columns}
            options={options}
           />
        </>
    )
}

export default DeliveredDatatables