import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {Card,Row,Col,Button} from 'react-bootstrap'
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
// import {getMessageDetail} from "../../../../../redux/actions/vendor";
import {getPartnerRequestDetail,requestEntryDetailGetPartner} from './../../../../../redux/actions/BranchOperation'
import {useDispatch, useSelector} from "react-redux";
import ImageDisplayPickup from "./ImageDisplayPickup";
import {useForm} from "react-hook-form";
import Avatar from "react-avatar";
import MUIDataTable from "mui-datatables";


const ViewPickupRequestDetail=()=>{
     const history = useHistory();
      const { register, handleSubmit, errors } = useForm();
     const location=useLocation();
      const dispatch = useDispatch();
      const thisState = useSelector((state) => state.branchOperation);
       const appSetting = useSelector((state) => state.appSetting);
       const urlDomain=appSetting.urlDomain;
      const partnerRequestDetail = thisState.partnerRequestDetail;
      const entryDetailPartnerRequest = thisState.entryDetailPartnerRequest;
      const[requestID,setRequestID]=useState(location.state?.requestID);
      const urlServer='https://jawaikhana.techxbay.com/';
     useEffect(()=>{
         let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
        }else{
             history.push('/admin/login');
        }
        getRequestedPickups();
     },[0]);
     const getRequestedPickups=()=>{
         axios.get(`/admin/view/partner/pickup/request/${requestID}`)
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data.original.pickup);
                        console.log('original pickup')
                        dispatch(getPartnerRequestDetail(res.data.original.pickup_by_image));
                        dispatch(requestEntryDetailGetPartner(res.data.original.pickup));

                    })
            .catch((err)=>{
               console.log(err.response);
            })
     }
     const viewImageDetail=(dataRequest)=>{
         // console.log(id);
         let img_id=dataRequest.requestimageId;
         console.log(dataRequest);
         axios.get(`/admin/partner/pickup/request/detail/${img_id}`)
                    .then((res)=>{
                        console.log(res.data);
                        dispatch(getPartnerRequestDetail(res?.data));
                         history.push({
                           pathname: '/staff/admin/pickup_create_image',
                           state: {requestData: dataRequest }
                       });
                    })
            .catch((err)=>{
               console.log(err.response);
            })
     }
     // const getImageEntry=(data)=>{
     //     viewImageDetail(data.requestimageId);
     //     console.log(data);
     //     history.push({
     //       pathname: '/staff/admin/pickup_create_image',
     //       state: {requestData: data }
     //   });
     //
     // }
    const getPickupDetail=(id)=>{
       console.log(id);
       console.log('id pickup Detail');
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
                          {console.log(tableMeta)}
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
                          {console.log(tableMeta)}
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
                          {console.log(tableMeta)}
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
                          {console.log(tableMeta)}
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
                          {value.charAt(0).toUpperCase()+ value.substring(1)}

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
                      {/*<div style={{width:'100%',display:'flex'}}>*/}
                      {/*    {tableMeta.tableData.map((itemsData)=>(*/}
                      {/*        <>*/}
                      {/*            {*/}
                      {/*                itemsData.id===value?*/}
                      {/*                    <>*/}
                      {/*                        {*/}
                      {/*                            itemsData.received_status!=0?*/}
                      {/*                                <>*/}
                      {/*                                    <button style={{width:'150px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => moveToProcess(value)}>Move to Process</button>*/}

                      {/*                                </>:*/}
                      {/*                                <>*/}
                      {/*                                    <div style={{display:'flex',placeContent:'center'}}>*/}
                      {/*                                      On Process*/}
                      {/*                                    </div>*/}
                      {/*                                </>*/}
                      {/*                        }*/}
                      {/*                    </>:*/}
                      {/*                    <>*/}
                      {/*                    </>*/}
                      {/*            }*/}
                      {/*        </>*/}
                      {/*    ))}*/}

                      {/*    /!*{  let tableDataCheck=tableData;}*!/*/}

                      {/*    /!*<div style={{width:'25%',}}>*!/*/}
                      {/*    /!*      <button style={{width:'70px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => AssignToDelivery(value)}> Assign </button>*!/*/}
                      {/*    /!*</div>*!/*/}
                      {/*    /!*{*!/*/}
                      {/*    /!*    completeDetail?*!/*/}
                      {/*    /!*        <>*!/*/}
                      {/*    /!*        </>:*!/*/}
                      {/*    /!*        <>*!/*/}
                      {/*    /!*            if(){*!/*/}

                      {/*    /!*                }*!/*/}




                      {/*                /!*{entryDetailPartnerProceededRequest.received_status===0?*!/*/}
                      {/*                /!*       <>*!/*/}
                      {/*                /!*            <div style={{width:'50%',}}>*!/*/}
                      {/*                /!*               <button style={{width:'150px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => moveToProcess(value)}>Move to Process</button>*!/*/}
                      {/*                /!*          </div>*!/*/}
                      {/*                /!*      </>:*!/*/}
                      {/*                /!*      <>*!/*/}


                      {/*                /!*      </>*!/*/}
                      {/*                /!*}*!/*/}





                      {/*    /!* <div style={{width:'25%',}}>*!/*/}
                      {/*    /!*      <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => MoveToCancel(value)}> Move to Cancel <ImBoxRemove/></button>*!/*/}
                      {/*    /!*</div>*!/*/}
                      {/*    /!* <div style={{width:'25%',}}>*!/*/}
                      {/*    /!*      <button style={{width:'90px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => TransferAction(value)}> Transfer <ImBoxRemove/></button>*!/*/}
                      {/*    /!*</div>*!/*/}
                      {/*    /!*<div style={{width:'50%',}}>*!/*/}
                      {/*    /!*      <button className="editBtn" ><BiEdit /></button>*!/*/}
                      {/*    /!*</div>*!/*/}
                      {/*</div>*/}
                  </>
              )
            }
        }

       ];
     const options = {
        searchOpen:true,
        filterType:'textField',
        fixedHeader:false,
         rowsPerPage:[100],
         rowsPerPageOptions:[10,20,50,100,500],
        selectableRows: 'none',
  }
    return(
        <>
            <Row>
                 <Col lg={12}>
                     <Row>
                     <h6 style={{color:'transparent'}}>View Pickup Request Detail</h6>
                         {Array.isArray(partnerRequestDetail)?
                             <>
                                 {partnerRequestDetail.map((items)=>(
                                              <>
                                {/*<ImageDisplayPickup imgId={items.id} />*/}

                                <Col lg={3}>
                                    <Card style={{backgroundColor:'#147298',color:'#fff'}} onClick={(event)=>{viewImageDetail(items)}}>
                                       <Card.Body>
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
                             </>:
                             <>
                             </>
                         }

                     </Row>
                 </Col>
                <Col lg={12} className="pt-3">
                    <MUIDataTable
                   // title={<><div style={{fontSize:'16px', fontWeight:'500',}}></div></>}
                    data={entryDetailPartnerRequest}
                    columns={columns}
                    options={options}
                   />
                </Col>

            </Row>
        </>
    )
}
export default ViewPickupRequestDetail