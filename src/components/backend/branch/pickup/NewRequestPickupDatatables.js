import React from 'react';
import MUIDataTable from "mui-datatables";
import {ImBoxRemove} from "react-icons/im";
import {RiDeleteBin2Line} from "react-icons/ri";

const NewRequestPickupDatatables=()=>{
    const Movetowarehouse = () =>{

    }
    const removepickups = () =>{

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
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex'}}>
                          <div style={{width:'80%',}}>
                                <button onClick={(event)=> Movetowarehouse(value)} style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}}> Move to <ImBoxRemove/></button>
                          </div>
                          <div style={{width:'20%',}}>
                                  <button className="deleteBtn" onClick={(event) => removepickups(value)}><RiDeleteBin2Line/></button>
                          </div>
                      </div>
                  </>
              )
            }
        }

       ];
const options = {
    searchOpen:true,
    filterType:'textField',
    fixedHeader:false,
    selectableRows: 'none',
  }
    return(
        <>
            <h6>New Request Pickup Datatables</h6>
            <MUIDataTable
            title={"New Pickup List"}
            // data={newPickupList}
            columns={columns}
            options={options}
           />
        </>
    )
}
export default NewRequestPickupDatatables