import React, {useEffect, useState} from "react"
import MUIDataTable from "mui-datatables";
import {ImBoxRemove} from "react-icons/im";
import {useDispatch,useSelector} from "react-redux";
import {AssignedDelivery} from "../../../../redux/actions/AssignedDelivery"
import axios from "axios";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import {updatePartner} from "../../../../redux/actions/updatePartner";


const AssignedDatatables = () =>{
    const dispatch = useDispatch();
    const[rowData,setRowData]=useState([]);
    const AssignedDeliveries = useSelector((state)=>state.deliveryStaff);
    const assignedDelivery = AssignedDeliveries.assigned_Delivery;

    useEffect(()=>{
         let staff_delivery = JSON.parse(localStorage.getItem('staff_delivery'));
         console.log(staff_delivery);
        if(staff_delivery){
          setAuthorizationToken(staff_delivery.token);
        }
       getAssignedList();

    },[0]);
    const getAssignedList=()=>{
        axios.get('/delivery/assigned/deliveries')
            .then((res)=>{
                console.log(res);
                dispatch(AssignedDelivery(res.data));
            })
            .catch((error)=>{
                 console.log(error.response.data);
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
         name: "assigned_date",
         label: "Assigned Date",
         options: {
          filter: true,
          sort: true,
         }
        },
         {
         name: "name",
         label: "Reciever Name",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "phone",
         label: "Contact info.",
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
         name: "address",
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
                          {/*<div style={{width:'25%',}}>*/}
                          {/*      <button style={{width:'70px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} > Assign </button>*/}
                          {/*</div>*/}
                          {/* <div style={{width:'25%',}}>*/}
                          {/*      <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} > Move to Hold<ImBoxRemove/></button>*/}
                          {/*</div>*/}
                          {/* <div style={{width:'25%',}}>*/}
                          {/*      <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} > Move to Cancel <ImBoxRemove/></button>*/}
                          {/*</div>*/}
                          {/* <div style={{width:'25%',}}>*/}
                          {/*      <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} > Transfer <ImBoxRemove/></button>*/}
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
    const handleRowClick =(currentRowData, allRowsData)=>{
        console.log('handleClickData');
        console.log(allRowsData);
        const newArray = allRowsData.join();
        console.log(newArray);
        console.log('new array');

         // allRowsData.map((selectedData)=>{
         //
         //    //  axios.get(`/admin/vendor/detail/ ${id}`)
         //    // .then((res) => {
         //    //
         //    //     // setEditData(res);
         //    //     console.log(res.data);
         //    //
         //    //
         //    // })
         //    // .catch((err) => {
         //    //     console.log(err.response.data);
         //    // })
         // })


  }
     const options = {
        searchOpen:true,
        filterType:'textField',
        fixedHeader:false,
        onRowsSelect: (currentRowsSelected, allRowsSelected) =>{

            setRowData(allRowsSelected);
            handleRowClick(currentRowsSelected,allRowsSelected);
            // console.log(currentRowsSelected);
            // console.log(allRowsSelected);
            // console.log(allRowsSelected.length);
        }



  }

    return(
        <>
            {/*<h4>Assigned Datatables</h4>*/}
             <MUIDataTable
             title={<><div style={{fontSize:'16px', fontWeight:'500',}}>Assigned Datatables</div></>}
            data={assignedDelivery}
            columns={columns}
            options={options}
             onRowClick={handleRowClick}
             checkboxSelection={true}
           />
        </>
    )
}

export default AssignedDatatables