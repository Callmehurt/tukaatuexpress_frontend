import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {Card,Row,Col,Button,Badge} from 'react-bootstrap';
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
// import {getMessageDetail} from "../../../../../redux/actions/vendor";
import {getPartnerProceededRequestDetail,requestProceededEntryDetailGetPartner} from './../../../../../redux/actions/BranchOperation'
import {useDispatch, useSelector} from "react-redux";
import ImageDisplayPickup from "./ImageDisplayPickup";
import {useForm} from "react-hook-form";
import Avatar from "react-avatar";
import MUIDataTable from "mui-datatables";
import showNotification from "../../../includes/notification";


const ViewPickupProceededRequestDetail=()=>{
     const history = useHistory();
      const { register, handleSubmit, errors } = useForm();
     const location=useLocation();
      const dispatch = useDispatch();
      const thisState = useSelector((state) => state.branchOperation);
      const partnerProceededRequestDetail = thisState.partnerProceededRequestDetail;
      const entryDetailPartnerProceededRequest = thisState.entryDetailPartnerProceededRequest;
      const[requestID,setRequestID]=useState(location.state?.requestID);
      const[completeDetail,setCompleteDetail]=useState(location.state?.completeDetail);

     useEffect(()=>{
         let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
        }else{
             history.push('/admin/login');
        }
        getProceededRequestedPickups();
     },[0]);
     const getProceededRequestedPickups=()=>{
         if(completeDetail){
             axios.get(`/admin/view/partner/pickup/request/complete/${requestID}`)
                    .then((res)=>{
                        dispatch(requestProceededEntryDetailGetPartner(res.data));

                    })
            .catch((err)=>{
               console.log(err.response);
            })
         }
         else{
             axios.get(`/admin/view/partner/pickup/request/${requestID}`)
                    .then((res)=>{
                        dispatch(getPartnerProceededRequestDetail(res.data.original.pickup_by_image));
                        dispatch(requestProceededEntryDetailGetPartner(res.data.original.pickup));

                    })
            .catch((err)=>{
               console.log(err.response);
            })
         }

     }
     const viewImageDetail=(img_id)=>{
         axios.get(`/admin/partner/pickup/request/detail/${img_id}`)
                    .then((res)=>{
                        console.log(res.data);
                        // dispatch(getPartnerRequestDetail(res.data));
                    })
            .catch((err)=>{
               console.log(err.response);
            })
     }
     const displayMoveTOProcess=(tableData,value)=>{
         // let TableData=tableData;
         console.log(tableData);
         // let filterTableData=TableData.filter(checkIdWithValue);
         // // const checkIdWithValue=(items)=>{
         // //      return items.id === value;
         // // }
         // function checkIdWithValue(items) {
         //  return items.id === value;
         // }
         // console.log(filterTableData);
         // console.log(filterTableData.received_status);
         // console.log("filterTableData");
         tableData.map((items)=>{
             console.log(items);
             console.log("items");
             if(items.id===value){
                 if(items.received_status===0){
                     return(
                         <>
                              <div style={{display:'flex',placeContent:'center'}}>On Process
                             </div>
                         </>
                     )

                 }
                 else if(items.received_status===1){
                      return(
                          <>
                             <button style={{width:'150px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => moveToProcess(value)}>Move to Process</button>
                          </>
                      );
                 }

             }
         })

         // return(
         //     <>
         //         {filterTableData.received_status!=0?
         //             <>
         //                 <button style={{width:'150px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => moveToProcess(value)}>Move to Process</button>
         //             </>:
         //             <>
         //                 <div style={{display:'flex',placeContent:'center'}}>On Process
         //                 </div>
         //             </>
         //         }
         //         {filterTableData.received_status!=0?
         //             <>
         //                 <div style={{display:'flex',placeContent:'center'}}>On Process
         //                 </div>
         //             </>:
         //             <>
         //                 <button style={{width:'150px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => moveToProcess(value)}>Move to Process</button>
         //
         //             </>
         //         }
         //
         //          {/*<div style={{width:'100%',display:'flex'}}>*/}
         //          {/*                {*/}
         //          {/*                    tableData*/}
         //          {/*                    .filter(itemsData => itemsData.id === value)*/}
         //          {/*                    .map((itemsData)=>(*/}
         //          {/*                            <>*/}
         //          {/*                                {*/}
         //          {/*                                    itemsData.received_status!=0?*/}
         //          {/*                                        <>*/}
         //          {/*                                            <button style={{width:'150px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => moveToProcess(value)}>Move to Process</button>*/}
         //
         //          {/*                                        </>:*/}
         //          {/*                                        <>*/}
         //          {/*                                            <div style={{display:'flex',placeContent:'center'}}>*/}
         //          {/*                                              On Process*/}
         //          {/*                                            </div>*/}
         //          {/*                                        </>*/}
         //          {/*                                }*/}
         //          {/*                            </>*/}
         //          {/*                        ))*/}
         //          {/*                }*/}
         //          {/*</div>*/}
         //     </>
         // )

     }
     // const getImageEntry=(data)=>{
     //     console.log(data);
     //     history.push({
     //       pathname: '/staff/admin/pickup_create_image',
     //       state: {requestData: data }
     //   });
     //
     // }
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
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[7])}>{value}</div>
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
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[7])}>{value}</div>
                      </>
                  )
         }
        },
        {
         name: "cod",
         label: "COD Amount",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                      <>
                          {/*{console.log(tableMeta)}*/}
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[7])}>{value}</div>
                      </>
                  )
         }
        },
         {
         name: "customer",
         label: "Customer Name",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                      <>
                          {/*{console.log(tableMeta)}*/}
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[7])}>{value}</div>
                      </>
                  )
         }
        },
         {
         name: "customer_phone",
         label: "Customer Phone",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                      <>
                          {/*{console.log(tableMeta)}*/}
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[7])}>{value}</div>
                      </>
                  )
         }
        },
         {
         name: "received_status",
         label: "",
         options: {
          filter: true,
          sort: true,
             display: false,
             customBodyRender: (value, tableMeta, updateValue) => (
                      <>
                          {console.log(tableMeta)}
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[7])}>{value}</div>
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
                          {console.log(tableMeta)}
                          <div style={{cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[7])}>{value}</div>
                      </>
                  )
         }
        },
          {
            name: 'status',
            label: 'Status',
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',cursor:'pointer'}} onDoubleClick={(event)=> getPickupDetail(tableMeta.rowData[7])}>
                          {/*<Button variant="success" style={{padding:'5px 10px'}}>{value}</Button>*/}
                          {completeDetail?
                              <>
                                  {
                                      value==='request'?
                                          <>
                                               Complete
                                          </>
                                          :
                                          <>
                                          </>
                                  }
                              </>:
                              <>
                                  {value.charAt(0).toUpperCase()+ value.substring(1)}
                              </>
                          }



                      </div>
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
                      {console.log(tableMeta) }
                      {console.log('table Meta')}
                      {completeDetail?
                          <>
                               <div style={{width:'100%',display:'flex'}}>

                      </div>
                          </>:
                          <>
                              {tableMeta.rowData[5]!=0?
                                  <>
                                        <div style={{display:'flex',placeContent:'center'}}>
                                           <button style={{width:'150px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => moveToProcess(value)}>Move to Process</button>
                                        </div>

                                  </>:
                                  <>
                                      <div style={{display:'flex',placeContent:'center'}}>On Process
                                      </div>
                                  </>

                              }
                          </>
                      }
                  </>
              )
            }
        }

       ];
     const moveToProcess=(id)=>{
         axios.get(`admin/markPickupRequestedReceived/${id}`)
            .then((res) => {
                console.log(res);
                if(res.data.status===true){
                       showNotification('success', res.data.message);
                       getProceededRequestedPickups();
                }
                else{
                       showNotification('danger', res.data.message);
                }
            })
            .catch((err) => {
                console.log(err.response.data);
            })
     }
     const getImageEntry=(data)=>{
         console.log(data);
         let img_id=data.requestimageId;
         let image_id='';
         let received_statusData='';
         axios.get(`admin/partner/pickup/request/detail/${img_id}`)
           .then((res) => {
                  console.log(res);
                  console.log(res.data);
                  image_id=res.data.image_id;
                  received_statusData=res.data.received_status;
                  console.log(image_id);
                  history.push({
                       pathname: '/staff/admin/pickup_create_image',
                       state: {requestData: data,image_idData:image_id,received_status:received_statusData,imageRequestID:requestID}
                   });
                })
         .catch((err) => {
                console.log(err.response.data);
            })

     }
     const options = {
        searchOpen:false,
        filterType:'textField',
        fixedHeader:false,
         rowsPerPage:[100],
         rowsPerPageOptions:[10,20,50,100,500],
        selectableRows: 'none',
  }
      const getPickupDetail=(id)=>{
       console.log(id);
       console.log('id pickup Detail');
        history.push({
              pathname: '/staff/admin/pickup_detail',
           state: {imageDetail: id }
        });
     }
    return(
        <>
            <Row>
                 <Col lg={12} className="pb-4">
                     <Row>
                           <h6 style={{color:'transparent'}}>View Pickup Request Detail</h6>
                            {partnerProceededRequestDetail.map((items)=>(
                                <>
                                    {/*<ImageDisplayPickup imgId={items.id} />*/}

                                    <Col lg={1}>

                                        <Card style={{backgroundColor:'#147298',color:'#fff'}} onClick={(event)=>{getImageEntry(items)}}>
                                           <Card.Body style={{padding:'0px'}}>
                                               {/*<p className="d-flex justify-content-center">{items.id}</p>*/}
                                               <img src={items.img_url} className="img-fluid" />
                                           </Card.Body>
                                        </Card>
                                    </Col>
                                </>
                            ))}
                     </Row>
                 </Col>
                <div>
                    </div>

            </Row>
            <Row>
                <MUIDataTable
                   // title={<><div style={{fontSize:'16px', fontWeight:'500',}}></div></>}
                    data={entryDetailPartnerProceededRequest}
                    columns={columns}
                    options={options}
                   />
            </Row>
        </>
    )
}
export default ViewPickupProceededRequestDetail