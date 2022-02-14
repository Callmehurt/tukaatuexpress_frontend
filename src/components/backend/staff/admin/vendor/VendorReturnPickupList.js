import React from 'react';
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from "./../../../staff/admin/vendor/CustomToolbarSelect";

const VendorReturnPickupList=(props)=>{

    const returnDeliveries = props.returns;

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
            data={returnDeliveries}
            columns={columns}
            options={options}
           />

        </>
    )
}
export default VendorReturnPickupList