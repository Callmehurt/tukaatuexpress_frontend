import React, {useEffect, useState} from 'react'
import MUIDataTable from "mui-datatables";
import {RiDeleteBin2Line} from "react-icons/ri";
import {useSelector, useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {NewPickupList} from "../../../../../redux/actions/newPickupList";
import {ImBoxRemove} from "react-icons/im"
import showNotification from "../../../includes/notification";
import NewPickupListCount from "../../../../../redux/actions/newPickupListCount";
import {newPickupSameDay,getPrintSelectedData} from './../../../../../redux/actions/BranchOperation';
import CustomToolbarSelectPrint from "../ActionArea/CustomToolbarSelectPrint";
import {useHistory, useLocation} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {MdCancel} from "react-icons/md";
import {useForm} from "react-hook-form";
import {PendingStatements} from "../../../../../redux/actions/MainBranches";
import notification from "../../../includes/notification";
const PickupDatatables = ()=> {
     const history = useHistory();
     const location=useLocation();
    const dispatch = useDispatch();
    const {register, handleSubmit, errors} = useForm();
    const[tableData,setTableData]=useState([]);
    const[weightEdit,setWeightEdit]=useState(false);
    const[printDataSelected,setPrintDataSelected]=useState([]);
    const thisState = useSelector((state) => state.newpickuplist);
    const newPickupList = thisState.NewPickupList;
    const[texCodeEdit,setTexCodeEdit]=useState(null);
    const [pickupList,setPickupList]= useState(false);
    const [weightEditField,setWeightEditField]=useState({
        pickup_id:'',
        weight:'',
    });

    useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        console.log(staff_admin);
        if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
        }else{
             history.push('/admin/login');
        }
        setPrintDataSelected(JSON.parse(localStorage.getItem('printDataSelect')))
        newpickupsdata();
        newpickupssamedaydata();
        console.log(printDataSelected);
        console.log('printDataSelected');
    },[]);
         const changeWeight=(event)=>{
        console.log(event.target.value);
            const newWeightEditField=weightEditField;
            newWeightEditField.weight=event.target.value;
            setWeightEditField(newWeightEditField);

    }
         const editWeightFunc=(pickup_id,tex_code)=>{
            setTexCodeEdit(tex_code);
            setWeightEdit(true);
            const newWeightEditField=weightEditField;
            newWeightEditField.pickup_id=pickup_id;
            setWeightEditField(newWeightEditField);
        }
         const onSubmit=(event)=>{
           setTexCodeEdit(null);
          console.log(weightEditField);
          setWeightEdit(false);
          axios.post('/admin/pickup/update/weight', weightEditField)
            .then((res) => {
                console.log(res)
                axios.get('/admin/pickup/list')
                    .then((res) => {
                        // console.log(res);
                        // console.log('res data pickup')
                        dispatch(NewPickupList(res.data));
                        dispatch(NewPickupListCount(res.data.length));
                    })
                    .catch((err) => {
                        console.log(err.response);
                    })
                if(res.data.status === true){
                    notification('success', res.data.message);

                }else {
                    notification('success', res.data.message);
                }
            })
            .catch((err) => {
                console.log(err.response)
            })


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
                  <div key={value} style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[10])}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[10])}>{value}</div>
              </>
          )
         }
        },
        {
           name: "vendor_name",
           label: "vendor_name",
           options: {
               filter: true,
               sort: true,
               customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[10])}>{value}</div>
              </>
          )
           },
       },
        {
         name: "customer_phone",
         label: "contact info.",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[10])}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[10])}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[10])}>{value}</div>
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
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[10])}>{value}</div>
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
             display:false,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[10])}>{value}</div>
              </>
          )
         }
        },
       {
         name: "weight",
         label: "Weight",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {texCodeEdit===tableMeta.rowData[0]?
                      <>
                          {weightEdit?
                              <>
                                  <Form onSubmit={handleSubmit(onSubmit)}>
                                              <Form.Group style={{position:'relative',display:'flex'}} className="mb-0" controlId="formBasicEmail">

                                                <Form.Control type="text" name="total_commission" onChange={(event)=>changeWeight(event)} defaultValue={value} style={{fontSize:'12px',}} placeholder="Enter" />
                                                  <div style={{position:'absolute',right:'5px',top:'20%'}}>
                                                      <MdCancel size={15} onClick={(event)=>{setWeightEdit(false);setTexCodeEdit(null)}} style={{color:'red',cursor:'pointer'}} />

                                                  </div>
                                              </Form.Group>
                                              <Button style={{display:'none'}} variant="primary" type="submit">
                                                Submit
                                              </Button>
                                            </Form>
                              </>:
                              <>
                                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> editWeightFunc(tableMeta.rowData[10],tableMeta.rowData[0])}>{value}</div>

                              </>
                          }
                      </>:
                      <>
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> editWeightFunc(tableMeta.rowData[10],tableMeta.rowData[0])}>{value}</div>

                      </>

                  }
                  {/*{console.log(tableMeta.rowData[8])}*/}
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
                  {/*{console.log(tableMeta.rowData[8])}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[10])}>{value}</div>
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
                      {/*{console.log(tableMeta.rowData[8])}*/}
                      <div style={{width:'100%',display:'flex'}}>
                          <div style={{width:'80%',}}>
                                <button onClick={(event)=> Movetowarehouse(value)} style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}}> Move to <ImBoxRemove/></button>
                          </div>
                          {/* <div style={{width:'80%',}}>*/}
                          {/*      <button onClick={(event)=> getPickupDetail(value)} style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}}> View Detail</button>*/}
                          {/*</div>*/}
                          {/*<div style={{width:'20%',}}>*/}
                          {/*        <button className="deleteBtn" onClick={(event) => removepickups(value)}><RiDeleteBin2Line/></button>*/}
                          {/*</div>*/}
                      </div>
                  </>
              )
            }
        },
       {
           name: "vendor_mobile",
           label: "vendor_mobile",
           options: {
               filter: true,
               sort: true,
               display:false,
           },
       },
       {
           name: "address",
           label: "Address",
           options: {
               filter: true,
               sort: true,
               display:false,
           },
       },

       ];
   const newpickupsdata = () => {
         axios.get('/admin/pickup/list')
            .then((res) => {
                // console.log(res);
                // console.log('res data pickup')
                dispatch(NewPickupList(res.data));
                dispatch(NewPickupListCount(res.data.length));
            })
            .catch((err) => {
                console.log(err.response);
            })
   }
   const newpickupssamedaydata = () => {
         axios.get('/admin/pickup/sameday/list')
            .then((res) => {
                // console.log(res);
                // console.log('res data pickup')
                dispatch(newPickupSameDay(res.data));
                // dispatch(NewPickupListCount(res.data.length));
            })
            .catch((err) => {
                console.log(err.response);
            })
   }
   const Movetowarehouse = async (id) => {
       console.log(id);
         await axios.get(`admin/pickup/move/to/warehouse/${id}`)
            .then((res) => {
                // console.log(res.data);
                // console.log('res data pickup')
                showNotification('success', res.data.message);
                newpickupsdata();
            })
            .catch((err) => {
                console.log(err.response.data);
            })
   }
   const removepickups  = async (id) => {
       console.log(id);
         await axios.delete(`admin/pickup/destroy/${id}`)
            .then((res) => {
                // console.log(res);
                // dispatch(NewPickupList(res.data))
            })
            .catch((err) => {
                console.log(err.response.data);
            })
   }
   const getPickupDetail=(id)=>{
       console.log(id);
        history.push({
              pathname: '/staff/admin/pickup_detail',
           state: {imageDetail: id }
        });
   }

    const options = {
    searchOpen:false,
    filterType:'textField',
    rowsPerPage:[100],
    rowsPerPageOptions:[10,20,50,100,500],
    fixedHeader:false,
    onTableChange: (action, tableState) => {
       getSelectedData(tableState);
       if(tableState.selectedRows.data.length===tableState.data.length){
           console.log(tableState.data);
           console.log('tableState Data');
            localStorage.setItem('printDataSelect',JSON.stringify(tableState.data));
       }else{
           let printDataDisplay=[];
           let tableData=tableState.selectedRows.data;
           tableData.map((items,index)=>{
               console.log(items);
               printDataDisplay.push(tableState.data[items.index]);
           });
           console.log(printDataDisplay);
           localStorage.setItem('printDataSelect',JSON.stringify(printDataDisplay));



       }
    },
    selectableRows: true,
       customToolbarSelect: (selectedRows,displayData,tableMeta) => (
           <>
           {
               console.log(tableMeta,'table meta data')
           }
             <CustomToolbarSelectPrint selectedRows={selectedRows} tableMeta={tableMeta} displayData={displayData} />
           </>
       )
  }
  const getSelectedData=(tableState)=>{
       console.log('selected data');
       console.log(tableState);
  }

    return(
        <>
           <MUIDataTable
            // title={"New Pickup List"}
            data={newPickupList}
            columns={columns}
            options={options}
           />
        </>
    )
}

export default PickupDatatables