import React, {useEffect, useState} from 'react'
// import {Link} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import {Button,Form} from 'react-bootstrap'
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import {ApprovedStatements, PendingStatements} from './../../../../redux/actions/MainBranches';
import {useDispatch, useSelector} from "react-redux";
// import wareHouseLists from "../../../../redux/actions/wareHouseList";
// import {wareHouseListCount} from "../../../../redux/actions/wareHouseListCount";
import showNotification from "../../includes/notification";
import {AiFillEye} from 'react-icons/ai';
import{MdCancel} from 'react-icons/md';
import {useForm} from "react-hook-form";
import notification from "../../includes/notification";

const PendingStatementDatatables = () =>{
        const dispatch = useDispatch();
        const BranchDeliveryStatement = useSelector((state) => state.mainBranches);
        const PendingDeliveryStatements = BranchDeliveryStatement.PendingStatements;
        const[totalCommissionEdit,setTotalCommissionEdit]=useState(false);
        const[statementNumber,setStatementNumber]=useState(null);
        const appSetting = useSelector((state) => state.appSetting);
        const urlDomain=appSetting.urlDomain;
        const {register, handleSubmit, errors} = useForm();
        const [totalCommissionField,setTotalCommissionField]=useState({
            statement_id:'',
            total_commission:'',
            amount_to_deposit:'',
            total_cod_received:'',
            remarks:'',

        })
        useEffect(()=>{
            let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
            if(branch_detail){
              setAuthorizationToken(branch_detail.token);
            }
            getPendingDeliveryStatement();
        },[]);
        const changeCommission=(event)=>{
            console.log(event.target.value);
            console.log(event.target.name);
            const newTotalCommissionField=totalCommissionField;
            newTotalCommissionField[event.target.name]=event.target.value;
            setTotalCommissionField(newTotalCommissionField);


        }
        const getPendingDeliveryStatement=()=>{
             axios.get('/branch/pending/delivery/statements')
                .then((res) => {
                    console.log(res.data);
                    console.log('BRANCH DELIVERY STATEMENT');
                     dispatch(PendingStatements(res.data));

                })
                .catch((err) => {
                    console.log(err.response);
                })
        }
        const onSubmit=(event)=>{
            console.log(totalCommissionField);
             setStatementNumber(null);
             setTotalCommissionEdit(false);
             axios.post('/branch/total/comission/edit', totalCommissionField)
            .then((res) => {
                console.log(res)
                axios.get('/branch/pending/delivery/statements')
                .then((res) => {
                    console.log(res.data);
                    console.log('BRANCH DELIVERY STATEMENT');
                     dispatch(PendingStatements(res.data));

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
        const editTotalCommission=(statement_id,value,total_cod_received,amount_to_deposit,statement_num)=>{
            console.log(statement_id);
            setStatementNumber(statement_num);
            const newTotalCommissionField=totalCommissionField;
            newTotalCommissionField.statement_id=statement_id;
            newTotalCommissionField.total_cod_received=total_cod_received;
            newTotalCommissionField.amount_to_deposit=amount_to_deposit;
            setTotalCommissionField(newTotalCommissionField);
            setTotalCommissionEdit(true);
            console.log("statement id");
            console.log(value);
            console.log('total commission value');
        }
        const getApprovedStatements=()=>{
             axios.get('/branch/approved/delivery/statements')
                .then((res) => {
                    console.log(res.data);
                    console.log('BRANCH Approved STATEMENT');
                     dispatch(ApprovedStatements(res.data));
                })
                .catch((err) => {
                    console.log(err.response);
                })
        }
    const columns = [
        {
        name: 'statement_num',
        label: 'S. No.',
        options: {
          filter: true,
          sort: true,
         }
      },
         {
         name: "delivered",
         label: "T. Delivered",
         options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                  // console.log(value+'o');
                  if(value) {
                      const newValue = value.split(",")
                      return newValue?.length;
                  }
                  else{
                      value=0;
                      return value;
                  }
              }
            }
        },
        {
         name: "returns",
         label: "T. Returns",
        options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                  // console.log(value+'o');
                  if(value) {
                      const newValue = value.split(",")
                      return newValue?.length;
                  }
                  else{
                      value=0;
                      return value;
                  }
              }
            }
        },
        {
         name: "holds",
         label: "T. Holds",
         options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                  // console.log(value+'o');
                  if(value) {
                      const newValue = value.split(",")
                      return newValue?.length;
                  }
                  else{
                      value=0;
                      return value;
                  }
              }
            }
        },
        {
         name: "submit_date",
         label: "Applied Date",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "total_cod_received",
         label: "T. COD Rec.",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "total_delivery_charge",
         label: "T. DC.",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "dc_from_customer",
         label: "D.C From C.",
         options: {
          filter: true,
          sort: true,
         }
        },

        {
        name: 'commission',
        label: 'T. Com.',
        options: {
          filter: true,
          sort: true,
            customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                          {statementNumber===tableMeta.rowData[0]?
                              <>
                                  {totalCommissionEdit?
                                      <>
                                          <Form onSubmit={handleSubmit(onSubmit)}>
                                              <Form.Group style={{position:'relative',display:'flex'}} className="mb-0" controlId="formBasicEmail">

                                                <Form.Control type="text" name="total_commission" defaultValue={value} onChange={(event)=>changeCommission(event)} style={{fontSize:'12px',}} placeholder="Enter" />
                                                  <div style={{position:'absolute',right:'5px',top:'20%'}}>
                                                      <MdCancel size={15} onClick={(event)=>{setTotalCommissionEdit(false);setStatementNumber(null);}} style={{color:'red',cursor:'pointer'}} />

                                                  </div>
                                              </Form.Group>
                                              <Button style={{display:'none'}} variant="primary" type="submit">
                                                Submit
                                              </Button>
                                            </Form>
                                      </>:
                                      <>
                                        <div style={{cursor:'pointer'}} onDoubleClick={(event)=> editTotalCommission(tableMeta.rowData[15],value,tableMeta.rowData[5],tableMeta.rowData[9],tableMeta.rowData[0])}> {value} </div>
                                      </>
                                  }
                              </>:
                              <>
                                  <div style={{cursor:'pointer'}} onDoubleClick={(event)=> editTotalCommission(tableMeta.rowData[15],value,tableMeta.rowData[5],tableMeta.rowData[9],tableMeta.rowData[0])}> {value} </div>

                              </>
                          }

                      </div>
                  </>
              )
         },
      },
       {
         name: "to_deposit",
         label: "A. To Dep.",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "id",
         label: "Statement",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                           <Button variant="outline-primary" className="pb-1 pt-1" onClick={() => viewPdf(value)}> <AiFillEye size={20} /> </Button>

                      </div>
                  </>
              )
         }
        },
       {
         name: "invoice",
         label: "Invoice",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "statement_from",
         label: "D.Person",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "submitted_by",
         label: "Sub. By",
         options: {
          filter: true,
          sort: true,
          display:false,
         }
        },
       {
         name: "remarks",
         label: "Remarks",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                          {statementNumber===tableMeta.rowData[0]?
                              <>
                                  {totalCommissionEdit ?
                                      <>
                                          <Form onSubmit={handleSubmit(onSubmit)}>
                                              <Form.Group style={{position:'relative',display:'flex'}} className="mb-0" controlId="formBasicEmail">

                                                <Form.Control type="text" name="remarks" defaultValue={value} onChange={(event)=>changeCommission(event)} style={{fontSize:'12px',}} placeholder="Enter" />
                                                  <div style={{position:'absolute',right:'5px',top:'20%'}}>
                                                      <MdCancel size={15} onClick={(event)=>{setTotalCommissionEdit(false);setStatementNumber(null);}} style={{color:'red',cursor:'pointer'}} />

                                                  </div>
                                              </Form.Group>
                                              <Button style={{display:'none'}} variant="primary" type="submit">
                                                Submit
                                              </Button>
                                            </Form>
                                      </> :
                                      <>
                                      </>
                                  }
                              </>:
                              <>
                                  {value}
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

                      <div style={{width:'100%',display:'flex'}}>
                          <button style={{width:'70px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => approveDeliveryStatement(value)}> Approve </button>

                      </div>
                  </>
              )
            }
        }

       ];
        const approveDeliveryStatement =(id)=>{
             console.log(id);
             axios.put(`branch/approve/delivery/statement/${id}`)
            .then((res) => {
                console.log(res);
                if(res.data.status===true){
                      showNotification('success', res.data.message);
                      getPendingDeliveryStatement();
                      getApprovedStatements();
                }
                else{
                    showNotification('danger', res.data.message);
                }

            })
            .catch((err) => {
                console.log(err.response.data);
            })
        }
        const viewPdf =(statement_id)=>{
        console.log(statement_id);
        axios.get(`/branch/get/delivery/statement/${statement_id}`,{
              responseType: 'blob',
             Accept: 'application/pdf',
        })
        .then(response => {
            console.log(response.data);
            const file = new Blob(
              [response.data],
              {type: 'application/pdf'});
            console.log(file);
            const fileURL = URL.createObjectURL(file);
            // const link = document.createElement('a');
            // link.href = fileURL;
            // link.setAttribute('staffs.pdf');
            // document.body.appendChild(link);
            // link.click();
        //Open the URL on new Window
            window.open(fileURL);
        })
       .catch(error => {
        console.log(error);
    });
  }
    // const RemainCash = (value) =>{
    //     if(value>5000)
    //     {
    //         return(
    //          <>
    //               <div style={{
    //                   border: '2px solid red',
    //                   color: 'red',
    //                   borderRadius: '25px',
    //                   display: 'flex',
    //                   justifyContent: 'center',
    //                   paddingTop: '3px',
    //                   paddingBottom: '3px',
    //                   fontWeight: '500'
    //               }}> {value} </div>
    //
    //           </>
    //         );
    //     }
    //     else if(value<=5000){
    //          return(
    //         <>
    //               <div style={{
    //                   border: '2px solid green',
    //                   color: 'green',
    //                   borderRadius: '25px',
    //                   display: 'flex',
    //                   justifyContent: 'center',
    //                   paddingTop: '3px',
    //                   paddingBottom: '3px',
    //                   fontWeight: '500'
    //               }}> {value} </div>
    //
    //           </>
    //          );
    //     }
    //
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
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>Pending Statements</div></>}
             data={PendingDeliveryStatements}
             columns={columns}
             options={options}
           />
        </>
    )
}
export default PendingStatementDatatables