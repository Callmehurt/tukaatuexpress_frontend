import React, {useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import {Table,Button,Row,Col} from 'react-bootstrap';
import AddExpensesModal from "./AddExpensesModal";
import RequestPettyCashModal from "./RequestPettyCashModal"
import VendorEditModal from "../../staff/admin/vendor/VendorEditModal";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import showNotification from "./../../includes/notification";
import {DailyStatementExpensesList,DailyStatementTotalPettyCash, DailyStatementTotalExpenses,DailyStatementPettyCash,DailyStatementTotalCashCollected,DailyStatements,DailyStatementTotalCommission,DailyStatementTotalDeliveryCharge,DailyStatementTotalDeposit,CurrentPettyCash} from "../../../../redux/actions/MainBranches";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";

const DailyStatementDatatables = () =>{
       const dispatch = useDispatch();
       const mainBranches = useSelector((state) => state.mainBranches);
        const expensesList = mainBranches.DailyStatementExpensesList;
        const totalExpenses = mainBranches.DailyStatementTotalExpenses;
         const dailyStatementsLists = mainBranches.DailyStatements;
         const dailyPettyCash = mainBranches.DailyStatementPettyCash;
          const dailyTotalPettyCash = mainBranches.DailyStatementTotalPettyCash;
         const dailyTotalCashCollected = mainBranches.DailyStatementTotalCashCollected;
         const dailyTotalDeliveryCharge = mainBranches.DailyStatementTotalDeliveryCharge;
         const dailyTotalCommission = mainBranches.DailyStatementTotalCommission;
         const dailyTotalToDeposit = mainBranches.DailyStatementTotalDeposit;
         const currentPettyCash=mainBranches.currentPettyCash;
         const [requestedPettyCashCount,setRequestedPettyCashCount]=useState('');

        const [expensesShow, setExpensesShow] = React.useState(false);
        const [pettyCashShow, setPettyCashShow] = React.useState(false);


        const addExpenses =()=>{
            setExpensesShow(true);
        }
        const onHide =()=>{
            setExpensesShow(false);
        }
        const onHidePettyCash=()=>{
          setPettyCashShow(false);
        }
        useEffect(()=>{
            let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
            if(branch_detail){
              setAuthorizationToken(branch_detail.token);
            }
            // getActiveExpensesList();
            getDailyBranchDetail();
            RequestPettyCashCount();
            // console.log(expensesList);
        },[]);
        const RequestPettyCashCount=()=>{
            axios.get('/branch/request/petty-cash/count')
                .then((res) => {
                    console.log(res);
                    setRequestedPettyCashCount(res.data);

                    })
                .catch((err) => {
                    console.log(err.response)
                })
        }



        const getDailyBranchDetail=()=>{
           let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
            if(branch_detail){
              setAuthorizationToken(branch_detail.token);
            }
            axios.get('branch/daily/details')
                .then((res) => {
                    console.log(res.data);
                    console.log('branch transaction detail');
                    dispatch(DailyStatements(res.data.statements));
                    dispatch(DailyStatementTotalDeliveryCharge(res.data.total_delivery_charge));
                    dispatch(DailyStatementTotalCommission(res.data.total_commission));
                    dispatch(DailyStatementTotalCashCollected(res.data.total_cash_collected));
                    dispatch(CurrentPettyCash(res.data.current_petty_cash));
                    dispatch(DailyStatementExpensesList(res.data.expenses));
                    dispatch(DailyStatementTotalExpenses(res.data.total_expenses));
                    dispatch(DailyStatementPettyCash(res.data.petty_cash));
                    dispatch(DailyStatementTotalPettyCash(res.data.current_petty_cash?.total_petty_cash,0));
                    if(res.data.current_petty_cash?.on_statement==="0"){
                        // console.log('ON_Statement0');
                        dispatch(DailyStatementTotalDeposit(res.data.total_deposit,res.data.current_petty_cash?.provided_petty_cash));

                    }
                    else if(res.data.current_petty_cash?.on_statement==="1") {

                        dispatch(DailyStatementTotalDeposit(res.data.total_deposit));

                    }
                    else if(res.data?.statements.length){
                         dispatch(DailyStatementTotalDeposit(res.data.total_deposit));
                    }

                })
                .catch((err) => {
                    console.log(err.response)
                })
        }

        const makeApplyStatement = () =>{

              axios.get('/branch/make/daily/statement')
                .then((res) => {
                    console.log(res);
                    if(res.data.status===true){
                          showNotification('success', res.data.message);
                          getDailyBranchDetail();

                    }
                    else{
                        showNotification('danger', res.data.message);
                    }

                    })
                .catch((err) => {
                    console.log(err.response)
                })
        }
    // const getActiveExpensesList=()=>{
    //         let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
    //         if(branch_detail){
    //           setAuthorizationToken(branch_detail.token);
    //         }
    //         axios.get('/branch/active/expenses')
    //             .then((res) => {
    //                 console.log(res);
    //                dispatch(DailyStatementExpensesList(res.data.expenses));
    //                dispatch(DailyStatementTotalExpenses(res.data.total_expenses));
    //             })
    //             .catch((err) => {
    //                 console.log(err.response)
    //             })
    // }
    const removeExpenses=(expense_id)=>{
             axios.delete(`/branch/remove/expense/${expense_id}`)
                .then((res) => {
                     axios.get('branch/daily/details')
                        .then((res) => {
                            console.log(res);
                            console.log('branch transaction detail remove expense');
                            dispatch(CurrentPettyCash(res.data.current_petty_cash));
                            dispatch(DailyStatementExpensesList(res.data.expenses));
                            dispatch(DailyStatementTotalExpenses(res.data.total_expenses));
                            dispatch(DailyStatementPettyCash(res.data.petty_cash));
                            dispatch(DailyStatementTotalPettyCash(res.data.current_petty_cash?.total_petty_cash,0));
                            if(res.data.current_petty_cash?.on_statement==="0"){
                                // console.log('ON_Statement0');
                                dispatch(DailyStatementTotalDeposit(res.data.total_deposit,res.data.current_petty_cash?.provided_petty_cash));

                            }
                            else if(res.data.current_petty_cash?.on_statement==="1") {

                                dispatch(DailyStatementTotalDeposit(res.data.total_deposit));

                            }
                            else if(res.data?.statements.length){
                              dispatch(DailyStatementTotalDeposit(res.data.total_deposit));
                             }

                        })
                        .catch((err) => {
                            console.log(err.response)
                        })

                })
                .catch((err) => {
                    console.log(err.response)
                })
    }
    const requestPityCash=()=>{
      setPettyCashShow(true);
    }

    return(
        <>
            {requestedPettyCashCount===0?
                <>
                    <Button variant="primary" className="mb-2" onClick={(event)=>requestPityCash()} style={{padding:'2px 5px',fontSize:'16px',marginLeft:'10px',}}>Request Petty Cash</Button>

                </>:
                <>
                    <Button variant="primary" className="mb-2"  style={{padding:'2px 5px',fontSize:'16px',marginLeft:'10px',opacity:'0.3'}}>Requesting Petty Cash</Button>

                </>
            }
            <AddExpensesModal show={expensesShow}  toggle={onHide} />
            <Row className="mb-2">
                  <Col lg={2}><div style={{fontWeight:'600',fontSize:'14px'}}>Remaining Petty Cash : {dailyTotalPettyCash?<>{dailyTotalPettyCash}</>:<>0</>}</div></Col>
                {/*<Col lg={2}><div style={{fontWeight:'600',fontSize:'14px'}}>Previous Petty Cash : {dailyPettyCash?.prev_petty_cash}</div></Col>*/}
                {currentPettyCash?.approve_status===0?
                    <>
                        <Col lg={2}><div style={{fontWeight:'600',fontSize:'14px'}}>Request on Process : {currentPettyCash?.requested_petty_cash}</div></Col>

                    </>:
                    <>
                    </>
                }
                {/*<Col lg={2}><div style={{fontWeight:'600',fontSize:'14px'}}>Provided Petty Cash : {dailyPettyCash?.provided_petty_cash}</div></Col>*/}

            </Row>
            <RequestPettyCashModal show={pettyCashShow} toggle={onHidePettyCash} />

            <div >
            <Table striped bordered hover >
              <thead>
                <tr>
                  <th style={{fontWeight:'600',fontSize:'15px'}}>Statement Number</th>
                  <th style={{fontWeight:'600',fontSize:'15px'}}>Submitted by</th>
                  <th style={{fontWeight:'600',fontSize:'15px'}}>Delivered Packages</th>
                  <th style={{fontWeight:'600',fontSize:'15px'}}>Delivered Charge</th>
                   <th style={{fontWeight:'600',fontSize:'15px'}}>D.C. from Customer</th>
                  <th style={{fontWeight:'600',fontSize:'15px'}}>Total Cash Collected</th>
                  <th style={{fontWeight:'600',fontSize:'15px'}}>Commission</th>
                  <th style={{fontWeight:'600',fontSize:'15px'}}>To Deposit</th>
                  <th style={{fontWeight:'600',fontSize:'15px'}}>Approved Date </th>
                </tr>
              </thead>
              <tbody>
              {/*{ dailyStatements ? <>*/}
              {/*    dailyStatements.map((statements)=>(*/}
              {/*        <tr>*/}

              {/*            <td>{statements.statement_num}</td>*/}
              {/*            <td>{statements.delivery_boy}</td>*/}
              {/*            <td>{statements.delivered}</td>*/}
              {/*            <td>{statements.total_delivery_charge}</td>*/}
              {/*            <td>{statements.total_cod_received}</td>*/}
              {/*            <td>{statements.commission}</td>*/}
              {/*            <td>{statements.to_deposit}</td>*/}
              {/*            <td>{statements.approved_date}</td>*/}
              {/*        </tr>*/}
              {/*    ))</>:<><tr><div style={{display:'flex',justifyContent:'center'}}>Sorry no Result found</div></tr></>*/}
              {/*}*/}
              { dailyStatementsLists?.length >0 ?<>{dailyStatementsLists.map((statements)=>(
                          <tr>

                              <td>{statements?.statement_num}</td>
                              <td>{statements?.delivery_boy}</td>
                               <td>{
                                  statements?.delivered.split(',').length
                               }</td>
                              <td>{statements?.total_delivery_charge}</td>
                                <td>{statements?.dc_from_customer}</td>
                              <td>{statements?.total_cod_received}</td>
                              <td>{statements?.commission}</td>
                              <td>{statements?.to_deposit}</td>
                              <td>{statements?.approved_date}</td>
                          </tr>
                      ))}
                  </>:<>
                        <tr style={{padding:'25px'}}>
                          <td colSpan={8}>
                             <div className="text-center" style={{width:'100%'}}>No Statement Founds</div>
                          </td>
                         </tr>
                      </>
              }
              </tbody>
                <thead>
                <tr>

                  <th colSpan="8"><div className="text-center">Expenses <Button variant="primary" onClick={(event)=>addExpenses()} style={{padding:'2px 5px',fontSize:'13px',marginLeft:'10px'}}>Add Expenses</Button></div></th>
                  {/*<th>Add Expenses</th>*/}

                </tr>
              </thead>
              <tbody>
              {
                  expensesList.map((expensesList) => (
                      <tr>

                          <td colSpan="4"></td>
                          <td colSpan="2" style={{fontWeight:'400',fontSize:'14px'}}>{expensesList.remarks}</td>
                          <td style={{fontWeight:'400',fontSize:'14px'}}>{expensesList.amount}</td>
                          <td key={expensesList.id}><Button variant="primary" onClick={(event)=>removeExpenses(expensesList.id)} style={{padding:'2px 5px',fontSize:'13px',marginLeft:'10px',backgroundColor:'red',border:'1px solid red'}}>Remove</Button></td>

                      </tr>
                  ))
              }
              <tr>

                          <td colSpan="4"></td>
                          <td colSpan="2" style={{fontWeight:'500',fontSize:'14px'}}>Total Expenses</td>
                          <td>{totalExpenses}</td>

              </tr>
                  <td colSpan="3"></td>
                 <td colSpan="2" style={{fontWeight:'500',fontSize:'17px'}}>Total Calculation</td>

              <tr>

                          <td colSpan="4"></td>
                          <td colSpan="2" style={{fontWeight:'500',fontSize:'14px'}}>Total Collected Cash</td>
                          <td>{dailyTotalCashCollected}</td>

              </tr>
              <tr>

                          <td colSpan="4"></td>
                          <td colSpan="2" style={{fontWeight:'500',fontSize:'14px'}}>Total Delivery Charge</td>
                          <td>{dailyTotalDeliveryCharge}</td>

              </tr>
              <tr>

                          <td colSpan="4"></td>
                          <td colSpan="2" style={{fontWeight:'500',fontSize:'14px'}}>Total Commission</td>
                          <td>{dailyTotalCommission}</td>

              </tr>
              <tr>
                   <td colSpan="4"></td>
                  <td colSpan="2" style={{fontWeight:'500',fontSize:'14px'}}>Petty Cash</td>
                  <td>{currentPettyCash?<>
                      {currentPettyCash?.on_statement==1?
                          <>
                              0
                          </>:
                          <>
                              {currentPettyCash?.provided_petty_cash}
                          </>
                      }

                  </>:
                      <>
                        0
                      </>
                  }
                  </td>
              </tr>
              <tr>

                          <td colSpan="4"></td>
                          <td colSpan="2" style={{fontWeight:'500',fontSize:'14px'}}>Total To Deposit</td>
                          <td>{dailyTotalToDeposit?<>{dailyTotalToDeposit}</>:<>0</>}
                              {/*minus{dailyTotalPettyCash}*/}
                          </td>
                          {/*<td>{dailyTotalToDeposit>(dailyTotalPettyCash)?<>{dailyTotalToDeposit}</>:<>-{dailyTotalToDeposit}</>}</td>*/}

              </tr>

              </tbody>
           </Table>
                </div>
            <Row className="mb-5 pb-3">
                <Col lg={12}>
                    <div className="d-flex justify-content-center"><Button variant="primary" onClick={(event)=>makeApplyStatement()}>Make apply statement</Button></div>
                </Col>
            </Row>

        </>

    )
}
export default DailyStatementDatatables
