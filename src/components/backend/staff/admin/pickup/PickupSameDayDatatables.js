import React, {useEffect, useState} from 'react'
import MUIDataTable from "mui-datatables";
import {useSelector, useDispatch} from "react-redux";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {ImBoxRemove} from "react-icons/im"
import showNotification from "../../../includes/notification";
import {newPickupSameDay} from './../../../../../redux/actions/BranchOperation'
import {useHistory} from "react-router-dom";
import {NewPickupList} from "../../../../../redux/actions/newPickupList";
import NewPickupListCount from "../../../../../redux/actions/newPickupListCount";
import notification from "../../../includes/notification";
import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import {MdCancel} from "react-icons/md";

const PickupSameDayDatatables = ()=> {
    const history = useHistory();
     const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const thisState = useSelector((state) => state.branchOperation);
    const NewPickupsSameDay = thisState.newPickupsSameDay;
    const [pickupList,setPickupList]= useState(false);
    const[texCodeEdit,setTexCodeEdit]=useState(null);
    const [weightEditField,setWeightEditField]=useState({
        pickup_id:'',
        weight:'',
    });
    // NewPickupsSameDay.map((data)=>{
    //      const[weightEdit,setWeightEdit]=useState(false);
    // })
     const[weightEdit,setWeightEdit]=useState(false);

    useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
        }else{
             history.push('/admin/login');
        }
        // newpickupsdata();
        newpickupssamedaydata();
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
          console.log(weightEditField);
          setTexCodeEdit(null);
          setWeightEdit(false);
          axios.post('/admin/pickup/update/weight', weightEditField)
            .then((res) => {
                console.log(res)
                axios.get('/admin/pickup/sameday/list')
                .then((res) => {
                    console.log(res);
                    // console.log('res data pickup')
                    dispatch(newPickupSameDay(res.data));
                    // dispatch(NewPickupListCount(res.data.length));
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
    const getPickupDetail=(id)=>{
           // console.log(id);
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
                  {/*{console.log(tableMeta.rowData[8])}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[10])}>{value}</div>
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
                  {/*{console.log(tableMeta.rowData[8])}*/}
                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[10])}>{value}</div>
              </>
          )
         }
        },
       {
         name: "vendor_name",
         label: "Partner name",
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
         name: "customer_phone",
         label: "contact info.",
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
         name: "customer_name",
         label: "Reciever Name",
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
         name: "packet_name",
         label: "Product Name",
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
         name: "cod",
         label: "COD",
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
         name: "delivery_charge",
         label: "Delivery Charge",
         options: {
          filter: true,
          sort: true,
             display:false,
             customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  {/*{console.log(tableMeta.rowData[8])}*/}
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
                      <div style={{width:'100%',display:'flex'}}>
                          <div style={{width:'80%',}}>
                                <button onClick={(event)=> Movetowarehouse(value)} style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}}> Move to <ImBoxRemove/></button>
                          </div>
                          {/*<div style={{width:'20%',}}>*/}
                          {/*        <button className="deleteBtn" onClick={(event) => removepickups(value)}><RiDeleteBin2Line/></button>*/}
                          {/*</div>*/}
                      </div>
                  </>
              )
            }
        }

       ];

   const newpickupssamedaydata = () => {
         axios.get('/admin/pickup/sameday/list')
            .then((res) => {
                console.log('Same day', res);
                // console.log('res data pickup')
                dispatch(newPickupSameDay(res.data));
                // dispatch(NewPickupListCount(res.data.length));
            })
            .catch((err) => {
                console.log(err.response);
            })
   }
   const Movetowarehouse = (id) => {
       console.log(id);
       axios.get(`admin/pickup/move/to/warehouse/${id}`)
            .then((res) => {
                console.log(res);
                // console.log('res data pickup')
                showNotification('success', res.data.message);
               newpickupssamedaydata();
            })
            .catch((err) => {
                console.log(err.response.data);
            })
   }
   // const removepickups  = async (id) => {
   //     console.log(id);
   //       await axios.delete(`admin/pickup/destroy/${id}`)
   //          .then((res) => {
   //              console.log(res);
   //              // dispatch(NewPickupList(res.data))
   //          })
   //          .catch((err) => {
   //              console.log(err.response.data);
   //          })
   // }
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
            // title={"New Pickup Same List"}
            data={NewPickupsSameDay}
            columns={columns}
            options={options}
           />
        </>
    )
}

export default PickupSameDayDatatables