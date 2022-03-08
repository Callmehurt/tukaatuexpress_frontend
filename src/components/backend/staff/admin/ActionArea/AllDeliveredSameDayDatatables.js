import React, {useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {DeliveredListSameDay} from "../../../../../redux/actions/BranchOperation";

const AllDeliveredSameDayDatatables=()=>{
     const dispatch = useDispatch();
      const thisState = useSelector((state) => state.branchOperation);
       const deliveredListSameDay = thisState.deliveredListSameDay;
     useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
         getAllDelivered();
    },[0]);
      const  getAllDelivered =()=>{
        axios.get('/admin/pickup/sameday/delivered/list')
             .then((res) => {
                 dispatch(DeliveredListSameDay(res.data));
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
         label: "Contact info.",
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
                display:false,
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
            {/*<h6>SentForDelivery same Day</h6>*/}
            <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>At WareHouse</div></>}
            data={deliveredListSameDay}
            columns={columns}
            options={options}
           />

        </>
    )
}

export default AllDeliveredSameDayDatatables