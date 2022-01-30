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
       const appSetting = useSelector((state) => state.appSetting);
       const urlDomain=appSetting.urlDomain;
      const partnerProceededRequestDetail = thisState.partnerProceededRequestDetail;
      const entryDetailPartnerProceededRequest = thisState.entryDetailPartnerProceededRequest;
      const[requestID,setRequestID]=useState(location.state?.requestID);
      const[completeDetail,setCompleteDetail]=useState(location.state?.completeDetail);


      const urlServer='https://jawaikhana.techxbay.com/';
     useEffect(()=>{
         let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
        }else{
             history.push('/admin/login');
        }
        getProceededRequestedPickups();
        console.log(entryDetailPartnerProceededRequest);
        console.log("entryDetailPartnerProceededRequest");
     },[0]);
     const getProceededRequestedPickups=()=>{
         if(completeDetail){
             console.log('complete');
             axios.get(`/admin/view/partner/pickup/request/complete/${requestID}`)
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data);
                        // console.log(res.data.original);
                        console.log('original pickup')
                        // dispatch(getPartnerProceededRequestDetail(res.data.original.pickup_by_image));
                        dispatch(requestProceededEntryDetailGetPartner(res.data));

                    })
            .catch((err)=>{
               console.log(err.response);
            })
         }
         else{
             console.log('Process');
             axios.get(`/admin/view/partner/pickup/request/${requestID}`)
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data.original.pickup);
                        console.log(res.data.original);
                        console.log('original pickup')
                        dispatch(getPartnerProceededRequestDetail(res.data.original.pickup_by_image));
                        dispatch(requestProceededEntryDetailGetPartner(res.data.original.pickup));
                        // if(res.data.original.pickup){
                        //     history.push('')
                        // }

                    })
            .catch((err)=>{
               console.log(err.response);
            })
         }

     }
     const viewImageDetail=(img_id)=>{
         // console.log(id);
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
                                               <img src={urlDomain+items.image} className="img-fluid" />
                                               {/*<div className="d-flex justify-content-center">*/}
                                               {/*    <Row>*/}
                                               {/*        <Col lg={6}>*/}
                                               {/*    {*/}
                                               {/*        items.proceed_status==='1'?*/}
                                               {/*            <>*/}
                                               {/*                 <Button variant="primary" style={{fontSize:'12px'}}>Proceeded</Button>*/}
                                               {/*            </>:*/}
                                               {/*            <>*/}
                                               {/*                <Button variant="primary" style={{fontSize:'12px'}}>Unproceed</Button>*/}
                                               {/*            </>*/}

                                               {/*    }*/}
                                               {/*    </Col>*/}
                                               {/*         <Col lg={6}>*/}
                                               {/*             {*/}
                                               {/*                items.received_status==='1'?*/}
                                               {/*                    <>*/}
                                               {/*                         <Button variant="primary" style={{fontSize:'12px'}}>Received</Button>*/}
                                               {/*                    </>:*/}
                                               {/*                    <>*/}
                                               {/*                        <Button variant="primary" style={{fontSize:'12px'}}>Unreceived</Button>*/}
                                               {/*                    </>*/}

                                               {/*            }*/}
                                               {/*         </Col>*/}
                                               {/*         <Col lg={12}>*/}
                                               {/*             <div className="d-flex justify-content-center pt-3">*/}
                                               {/*                  <Button variant="primary" style={{fontSize:'12px'}} onClick={(event)=>viewImageDetail(items.id)}>View Image</Button>*/}

                                               {/*             </div>*/}
                                               {/*         </Col>*/}
                                               {/*     </Row>*/}

                                               {/*</div>*/}
                                                {/*<Button variant="primary">Primary</Button>*/}
                                           </Card.Body>
                                        </Card>
                                    </Col>
                                </>
                            ))}
                     </Row>
                 </Col>
                <div>
                            {/*<Col lg={4} className="pt-3 pr-5">*/}
                            {/*    {entryDetailPartnerRequest?*/}
                            {/*        <>*/}
                            {/*            {entryDetailPartnerRequest.map((items) => (*/}
                            {/*               <Card >*/}
                            {/*                  <Card.Body className="p-0">*/}
                            {/*                      <Row>*/}
                            {/*                          <Col xs={3} className="pl-0 pr-0">*/}
                            {/*                              <div style={{display:'grid',placeContent:'center',alignItems:'center',height:'55px'}}>*/}
                            {/*                                    <Avatar size="40" name={items.packet_name}  round={true}/>*/}
                            {/*                              </div>*/}

                            {/*                              /!*<Image src={logoImage} roundedCircle />*!/*/}
                            {/*                          </Col>*/}
                            {/*                          <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                            {/*                                  <div className="pt-2">*/}
                            {/*                                      <h6 className="mb-1">{items.tex_code}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}>*/}

                            {/*                                         </span>*/}
                            {/*                                      </h6>*/}
                            {/*                                  </div>*/}
                            {/*                                  <div>*/}
                            {/*                                      <Row>*/}
                            {/*                                          <Col xs={6}>*/}
                            {/*                                               <span style={{fontSize:'14px'}}>{items.customer_name}</span>*/}
                            {/*                                             /!*<span style={{fontSize:'15px'}}>{ list.customer_name.length>13 ? <div><span>{list.customer_name.substring(0,13)}...</span></div>: <div><span>{list.customer_name}</span></div> }</span>*!/*/}
                            {/*                                          </Col>*/}
                            {/*                                          <Col xs={6}>*/}
                            {/*                                              <span style={{fontSize:'14px'}}>Status: {items.status}</span>*/}
                            {/*                                          </Col>*/}
                            {/*                                      </Row>*/}
                            {/*                                  </div>*/}
                            {/*                              /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                            {/*                          </Col>*/}
                            {/*                      </Row>*/}
                            {/*                  </Card.Body>*/}
                            {/*               </Card>*/}
                            {/*            ))*/}
                            {/*            }*/}

                            {/*        </>:*/}
                            {/*        <>*/}

                            {/*        </>*/}
                            {/*    }*/}

                            {/*</Col>*/}
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