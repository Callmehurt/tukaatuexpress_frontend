import React, {useEffect} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {getVendorReturnList} from './../../../../../redux/actions/BranchOperation';
import {useDispatch, useSelector} from "react-redux";
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from "./../../../staff/admin/vendor/CustomToolbarSelect";

const VendorReturnPickupList=()=>{
     const location=useLocation();
     const dispatch=useDispatch();
     const history = useHistory();
     const branchOperation = useSelector((state) => state.branchOperation);
     const allVendorReturnList = branchOperation.allVendorReturnList;
     useEffect(()=>{
         let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
         console.log(staff_admin);
         if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
         }else{
            history.push('/admin/login');
         }
         VendorPickupReturnList();
     },[]);
     const VendorPickupReturnList=()=>{
         let partner_id=location.state?.partnerID;
         axios.get(`/admin/partner/packet/return/list/${partner_id}`)
            .then((res) => {
                console.log(res);
                dispatch(getVendorReturnList(res.data))
            })
            .catch((err) => {
                console.log(err.response.data);
            })
     }
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
         label: "Receiver Name",
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
         name: "cod",
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
              display:false,
            }
        },
        {
            name: 'partner_id',
            label: 'partner ID',
            options: {
              filter: false,
              sort: false,
              display:false,
            }
        }

       ];
     const options = {
    searchOpen:false,
    filterType:'textField',
    fixedHeader:false,
     rowsPerPage: 100,
    rowsPerPageOptions: [10,20,50,100,500],
    selectableRows: true,
    customToolbarSelect: (selectedRows,displayData) => (
      <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} />
  )
     }

    return(
        <>
             <MUIDataTable
            // title={"Payment Recieved Deliveries"}
            data={allVendorReturnList?.all_returns}
            columns={columns}
            options={options}
           />

        </>
    )
}
export default VendorReturnPickupList