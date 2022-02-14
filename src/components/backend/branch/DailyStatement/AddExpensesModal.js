import React, {useState,useEffect} from 'react'
import {Modal, Button,Form,Row,Col} from 'react-bootstrap';
import VendorEdit from "../../staff/admin/vendor/edit";
import axios from "axios";
import notification from "../../includes/notification";
import {useHistory} from "react-router-dom";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import {useDispatch, useSelector} from "react-redux";
import {
    CurrentPettyCash,
    DailyStatementExpensesList,
    DailyStatementPettyCash,
    DailyStatements,
    DailyStatementTotalCashCollected,
    DailyStatementTotalCommission,
    DailyStatementTotalDeliveryCharge,
    DailyStatementTotalDeposit,
    DailyStatementTotalExpenses,
    DailyStatementTotalPettyCash
} from "../../../../redux/actions/MainBranches";

const AddExpensesModal=(props)=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const mainBranches = useSelector((state) => state.mainBranches);
    const totalExpenses = mainBranches.DailyStatementTotalExpenses;
    const totalPettyCash = mainBranches.DailyStatementTotalPettyCash;
    const toggle = props.toggle;
    const [formField, setFormField] = useState({
            remarks: '',
            expense_amount: '',
        });
    useEffect(()=>{
           let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
            if(branch_detail){
              setAuthorizationToken(branch_detail.token);
            }
    })
    const [formerrors, setFormerrors ] = useState({});
     const handleLoginForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
         if ( !!formerrors[event.target.name] ) setFormerrors({
          ...formerrors,
          [event.target.name]: null
        })
    }
    const FindFormErrors = () =>{
     console.log(formerrors);
     // let pattern = /^(\d*)([,.]\d{0,2})?$/;
     const {remarks,expense_amount} = formField
     const newErrors = {}
     // packet name validate
     if ( !remarks || remarks === '' ) newErrors.remarks = 'Remarks is empty!'
     else if ( remarks.length > 30 ) newErrors.remarks = 'Remarks is too long!'
     // price cod validation
     if ( !expense_amount || expense_amount === ''  ) newErrors.expense_amount = 'Amount is empty'
     // else if ( expense_amount >= 30 ) newErrors.expense_amount = 'Amount is too long!'



     return newErrors
    }
    const submitForm = async(event)=>{
          event.preventDefault();
          const newErrors = FindFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
          // We got errors!
           setFormerrors(newErrors);
        } else {
            console.log(formField);
            if(totalPettyCash) {


                await axios.post('/branch/add/expense', formField)
                    .then((res) => {
                        console.log(res);
                        getActiveExpensesList();
                        console.log(formField);
                        history.push('/branch/daily_statement');
                    })
                    .catch((err) => {
                        console.log(err.response)
                    })
            }
        }
    }
    const getActiveExpensesList=()=>{
            axios.get('/branch/active/expenses')
                .then((res) => {
                    console.log(res);
                   dispatch(DailyStatementExpensesList(res.data.expenses));
                   // dispatch(DailyStatementTotalPettyCash(totalPettyCash,res.data.total_expenses));
                   //  dispatch(DailyStatementTotalPettyCash(totalPettyCash));
                   dispatch(DailyStatementTotalExpenses(res.data.total_expenses));
                   axios.get('branch/daily/details')
                    .then((res) => {
                        console.log(res.data);
                        console.log('branch transaction detail expenses');
                        dispatch(CurrentPettyCash(res.data.current_petty_cash));
                        dispatch(DailyStatementExpensesList(res.data.expenses));
                        dispatch(DailyStatementTotalExpenses(res.data.total_expenses));
                        dispatch(DailyStatementPettyCash(res.data.petty_cash));
                        dispatch(DailyStatementTotalPettyCash(res.data?.total_petty_cash,0));
                    if(res.data.current_petty_cash?.on_statement=="0"){
                        // console.log('ON_Statement0');
                        console.log("hello");
                        dispatch(DailyStatementTotalDeposit(res.data.total_deposit,res.data?.total_petty_cash));

                    }
                    else if(res.data.current_petty_cash?.on_statement=="1") {

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


    return(
        <>
                 <Modal
                  {...props}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  className="modal_size_assign"
                >
                    <Modal.Header>
                        <Modal.Title style={{fontSize:'17px'}}>
                          Add Expenses
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{width:'400px'}}>
                        <Form onSubmit={(event) => submitForm(event)}>
                          <Form.Group className="mb-3" >
                            <Form.Label>Expenses Remarks</Form.Label>
                            <Form.Control type="text" placeholder="Enter Remarks..." name="remarks" onChange={(event) => handleLoginForm(event)} isInvalid={ !!formerrors.remarks } />
                               <Form.Control.Feedback type='invalid'>
                                {formerrors.remarks}
                            </Form.Control.Feedback>
                          </Form.Group>


                          <Form.Group className="mb-3" >
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" placeholder="Amount..." name="expense_amount" onChange={(event) => handleLoginForm(event)} isInvalid={ !!formerrors.expense_amount } />
                              <Form.Control.Feedback type='invalid'>
                                {formerrors.expense_amount}
                            </Form.Control.Feedback>
                          </Form.Group>
                            <Row>
                                <Col lg={6}>
                                     <div className="d-flex justify-content-center">
                                            <Button className="customBtn" style={{width:'100%'}} type="submit"  onClick={() => toggle(false)} >
                                            Submit
                                          </Button>
                                     </div>
                                </Col>
                                 <Col lg={6}>
                                     <Button className="customBtn" style={{float: 'right', marginRight: '10px',width:'100%',backgroundColor:'red'}} onClick={() => toggle(false)}>Close</Button>
                                </Col>
                            </Row>

                        </Form>

                    </Modal.Body>
              </Modal>


        </>
    )
}

export default AddExpensesModal