import React, {useEffect} from "react"
import MUIDataTable from "mui-datatables";
import {ImBoxRemove} from "react-icons/im";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {TransferIns, TransferInsCount} from "../../../../../redux/actions/Trasnfer";
import {useDispatch, useSelector} from "react-redux";
import showNotification from "../../../includes/notification";
import {useHistory} from "react-router-dom";

const TransferInsRequest=()=>{
     const history = useHistory();
     const dispatch = useDispatch();
     const transferInsSelect = useSelector((state) => state.transfer);
     const transferInsList = transferInsSelect.NewTransferInsList;
     useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
        // console.log('fetch api');

    },[]);
     const getAllTransferIns=()=>{
         axios.get('admin/pickup/transfer/ins')
            .then((res) => {
                dispatch(TransferIns(res.data));
                dispatch(TransferInsCount(res.data.length));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
     }
     const Movetowarehouse = async (id) => {
       console.log(id);
         await axios.get(`/admin/pickup/set/on/warehouse/${id}`)
            .then((res) => {
                if(res.data.status === false){
                     showNotification('danger', res.data.message);
                }else{
                      showNotification('success', res.data.message);
                }

               getAllTransferIns();
            })
            .catch((err) => {
                console.log(err.response.data);
            })
   }
    const getPickupDetail=(id)=>{
        history.push({
              pathname: '/staff/admin/pickup_detail',
           state: {imageDetail: id }
        });


   }
    const columns = [
        {
         name: "tex_code",
         label: "Tracking Id",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferInsList[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
        {
         name: "transferred_from",
         label: "Transferred From",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferInsList[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
         {
         name: "entry_date",
         label: "Entry Date",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferInsList[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
        {
         name: "customer_phone",
         label: "Contact info.",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferInsList[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
        {
         name: "customer_name",
         label: "Reciever Name",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferInsList[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
       {
         name: "packet_name",
         label: "Product Name",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferInsList[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
         }
        },
       {
         name: "cod",
         label: "COD",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferInsList[tableMeta.rowIndex].id)}>Rs. {value}</div>
              </>
          )
         }
        },
       {
         name: "delivery_charge",
         label: "Delivery Charge",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta)}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferInsList[tableMeta.rowIndex].id)}>Rs. {value}</div>
              </>
          )
         }
        },
       {
         name: "customer_address",
         label: "Address",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(transferInsList[tableMeta.rowIndex].id)}>{value}</div>
              </>
          )
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
                           <div style={{width:'100%',}}>
                                <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={(event)=> Movetowarehouse(value)} > Move to WareHouse</button>
                          </div>
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
            {/*<h6>TransferIns Request</h6>*/}
             <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>Incoming Request</div></>}
            data={transferInsList}
            columns={columns}
            options={options}
           />
        </>
    )
}
export default TransferInsRequest