import React from 'react'
import MUIDataTable from "mui-datatables";
import {Button} from 'react-bootstrap'

const Datatables = () => {
    const columns = [
        {
         name: "Tracking ID",
         label: "Tracking ID",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "Date",
         label: "Date",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
            name: "Partner Name",
            label: "Partner Name",
            options: {
             filter:true,
             sort:true,
            }
           },

        {
         name: "Type",
         label: "Type",
         options: {
          filter:false,
          sort:true,
         }
        },

        {
         name: "Weight",
         label: "Weight",
         options: {
          filter:false,
          sort:true,
         }
        },

        {
         name: "Pickup Branch",
         label: "Pickup Branch",
         options: {
          filter:false,
          sort:true,
         }
        },


        {
         name: "Receiver Detail",
         label: "Receiver Detail",
         options: {
          filter:true,
          sort:true,
         }
        },

        {
         name: "Delivery Charge",
         label: "Delivery Charge",
         options: {
          filter:false,
          sort:true,
         }
        },

        {
         name: "COD",
         label: "COD",
         options: {
          filter:false,
          sort:true,
         }
        },

        {
         name: "Product Name",
         label: "Product Name",
         options: {
          filter:false,
          sort:true,
         }
        },

        {
         name: "Action",
         label: "Action",
         options: {
          filter: false,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <>
                    <button onClick={() => console.log(value, tableMeta) }>
                        Edit
                    </button>
                    <button onClick={() => console.log(value, tableMeta) }>
                        Edit
                    </button>
                    </>
                )
                }
         }
        },
       ];

const data = [];

const options = {
    searchOpen:true,
    filterType:'textField',
    fixedHeader:false,
    selectableRows: false,

  };
  const actions = (
    <Button variant="primary">Primary</Button>
  );
    return (
        <div className="datatable_area">
            <MUIDataTable
            title={"Total Delivered"}
            data={data}
            columns={columns}
            options={options}
            actions={actions}
            />
        </div>
    )
}

export default Datatables
