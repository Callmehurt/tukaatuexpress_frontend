import React from 'react';
import MUIDataTable from "mui-datatables";
import {RiDeleteBin2Line} from "react-icons/ri";
import {BiEdit} from "react-icons/bi";

const DeliveryPersonDatatables=()=>{
    const columns = [
        {
         name: "name",
         label: "Name",
         options: {
          filter: true,
          sort: true,
         }
        },
         {
         name: "phone",
         label: "Phone",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "email",
         label: "Email",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "address",
         label: "Address",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "join_date",
         label: "Join Date",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "bank_account",
         label: "Bank Account",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "account_holder",
         label: "Account Holder",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "citizenship",
         label: "CitizenShip",
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
                          {/*<div style={{width:'50%',}}>*/}
                          {/*      <button className="deleteBtn" onClick={(event)=>employeeRemove(value)}> <RiDeleteBin2Line/> </button>*/}
                          {/*</div>*/}
                          {/* <div style={{width:'50%',}}>*/}
                          {/*      <button className="editBtn" ><BiEdit /></button>*/}
                          {/*</div>*/}
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
            <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>Delivery Person List</div></>}
            // data={deliveryPersonList}
            columns={columns}
            options={options}
           />
        </>
    )
}
export default DeliveryPersonDatatables