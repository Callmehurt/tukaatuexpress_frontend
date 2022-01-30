import React from 'react'
import MUIDataTable from "mui-datatables";

const AllStatementDatatables=()=>{
const columns = [
    {
     name: "tex_code",
     label: "Statement Number",
     options: {
      filter: true,
      sort: true,
     }
    },
     {
     name: "entry_date",
     label: "Created Date",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "customer_phone",
     label: "Store",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "customer_name",
     label: "Payable",
     options: {
      filter: true,
      sort: true,
     }
    },
   {
     name: "packet_name",
     label: "Paid",
     options: {
      filter: true,
      sort: true,
     }
    },
   {
     name: "cod",
     label: "To add/Deduct(Next statement)",
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
                      {/*<div style={{width:'25%',}}>*/}
                      {/*      <button style={{width:'70px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => AssignToDelivery(value)}> Assign </button>*/}
                      {/*</div>*/}
                      {/* <div style={{width:'25%',}}>*/}
                      {/*      <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => MoveToHold(value)}> Move to Hold<ImBoxRemove/></button>*/}
                      {/*</div>*/}
                      {/* <div style={{width:'25%',}}>*/}
                      {/*      <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => MoveToCancel(value)}> Move to Cancel <ImBoxRemove/></button>*/}
                      {/*</div>*/}
                      {/* <div style={{width:'25%',}}>*/}
                      {/*      <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => TransferAction(value)}> Transfer <ImBoxRemove/></button>*/}
                      {/*</div>*/}
                      {/*<div style={{width:'50%',}}>*/}
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
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>All Statements</div></>}
            // data={wareHouseList}
            columns={columns}
            options={options}
           />
        </>
    )
}

export default AllStatementDatatables