import React from 'react';
import MUIDataTable from "mui-datatables";

const VendorAccountDatatables=()=>{

    const columns = [
        {
         name: "Statement Date",
         label: "Statement Date",
         options: {
          filter: true,
          sort: true,
         }
        },
         {
         name: "entry_date",
         label: "Statement Number",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "customer_phone",
         label: "Receivable",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "customer_name",
         label: "Received",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "packet_name",
         label: "Add/Deduct",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "cod",
         label: "Invoice",
         options: {
          filter: true,
          sort: true,
         }
        },
       ];
const options = {
        searchOpen:false,
        filterType:'checkbox',
        fixedHeader:false,
        selectableRows: 'none',
        responsive:'standard',
        rowsPerPage:100,
  }
    return(
        <>
            <div className="pt-2">
                <MUIDataTable
                     title={<><div style={{fontSize:'16px', fontWeight:'500',}}>At WareHouse</div></>}
                    // data={wareHouseList}
                    columns={columns}
                    options={options}
                />
            </div>
        </>
    )
}

export default VendorAccountDatatables