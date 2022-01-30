import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from 'react-bootstrap';
import {fetchMonthlyPaymentDetails, makeMonthlyStatement, fetchMonthlyCashRecords} from "./../../../../redux/actions/monthlyStatementActions";
// //
// // //mui
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// //
// //
// // //tables
import DeliveryStaffTable from "./deliveryStaffTableComponent";
import BranchOperatorTable from "./BranchOperatorTableComponent";
import EntryOperatorTable from "./EntryOperatorTableComponent";
import MarketingStaffTable from "./MarketingStaffTableComponent";
import DeliveryRevenueTable from "./DeliveryRevenueTableComponent";
import MonthlyExpenseForm from "./MonthlyExpenseForm";
import PettyCashTable from "./PettyCashTableComponent";
//
//
//
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'start',
  color: theme.palette.text.secondary,
  backgroundColor: 'none',
}));
//
const MonthlyStatementComponent = () => {

    const dispatch = useDispatch();
    const [expenses, setExpenses] = useState([]);
    const [totalExpenditure, setTotalExpenditure] = useState(0)
    const [grossProfit, setGrossProfit] = useState(0)
    const [netProfit, setNetProfit] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [branchRevenue, setBranchRevenue] = useState({
        totalDeliveryCharge: 0,
        totalCommission: 0
    })

    const expenseHandler = (exp) => {
        setExpenses([...expenses, exp])
    }
//
    const branchOperators = useSelector((state) => state.monthlyStatementDetails.branchOperators);
    const deliveryStaffs = useSelector((state) => state.monthlyStatementDetails.deliveryStaffs);
    const marketingStaffs = useSelector((state) => state.monthlyStatementDetails.marketingStaffs);
    const entryStaffs = useSelector((state) => state.monthlyStatementDetails.entryOperators);
    const pettyCashes = useSelector((state) => state.monthlyStatementDetails.pettyCashes);
    const deliveryStatements = useSelector((state) => state.monthlyStatementDetails.deliveryStatements);
    const totalBranchOperatorSalary = branchOperators.reduce((total, obj) => parseInt(obj.salary) + total, 0)
    const totalDeliveryStaffSalary = deliveryStaffs.reduce((total, obj) => parseInt(obj.salary) + total, 0)
    const totalMarketingStaffSalary = marketingStaffs.reduce((total, obj) => parseInt(obj.salary) + total, 0)
    const totalEntryStaffSalary = entryStaffs.reduce((total, obj) => parseInt(obj.salary) + total, 0)
    const totalPettyCash = pettyCashes.reduce((total, obj) => parseInt(obj.total_petty_cash) + total, 0)
    const totalDc = deliveryStatements.reduce((total, obj) => parseInt(obj.total_delivery_charge) + total, 0)
    const totalCom = deliveryStatements.reduce((total, obj) => parseInt(obj.total_commission) + total, 0)
    const total = totalBranchOperatorSalary+totalDeliveryStaffSalary+totalMarketingStaffSalary+totalEntryStaffSalary+totalPettyCash;
//
   useEffect(() => {
       let expenseList = JSON.parse(localStorage.getItem('expenseList'));
       if(expenseList){
           setExpenses(expenseList);
       }
       return () => {
           localStorage.removeItem('expenseList')
       }
   }, [])
//
//
    useEffect(() => {
        setBranchRevenue({totalDeliveryCharge: totalDc, totalCommission: totalCom})
        const gross_profit = totalDc-totalCom;
        setGrossProfit(gross_profit)
        if(gross_profit > 0){
            const netPro = Math.round((gross_profit)-(totalExpenditure/totalDay));
            setNetProfit(netPro);
        }else {
            setNetProfit(0)
        }
    }, [deliveryStatements, pettyCashes])
//
    useEffect(() => {
        localStorage.setItem('expenseList', JSON.stringify(expenses));
        const totalExpenses = expenses.reduce((total, obj) => parseInt(obj.expense_amount) + total, 0)
        const gross_profit = totalDc-totalCom;
        setGrossProfit(gross_profit)
        const totalExp = total+totalExpenses
        setTotalExpenditure(totalExp)
        setTotalExpense(totalExpenses)
        setBranchRevenue({totalDeliveryCharge: totalDc, totalCommission: totalCom})
        if(gross_profit > 0){
            const netPro = Math.round((gross_profit)-(totalExp/totalDay));
            setNetProfit(netPro);
        }else {
            setNetProfit(0)
        }
    }, [expenses])
//
    useEffect(() => {
        const totalExpenses = expenses.reduce((total, obj) => parseInt(obj.expense_amount) + total, 0)
        const totalExp = total+totalExpenses
        setTotalExpenditure(totalExp)
        setTotalExpense(totalExpenses)
        setBranchRevenue({totalDeliveryCharge: totalDc, totalCommission: totalCom})
    }, [total])
//
//
//
    useEffect(() => {
        dispatch(fetchMonthlyPaymentDetails())
    }, [])
//
//
    const monthlyStatementHandler = () => {
       const finalDetails = {
           deliveryStaffs: deliveryStaffs,
           branchOperators: branchOperators,
           entryOperators: entryStaffs,
           marketingStaffs: marketingStaffs,
           pettyCashes: pettyCashes,
           deliveryStatements: deliveryStatements,
           totalExpenditure: totalExpenditure,
           totalExpenses: totalExpense,
           grossProfit: grossProfit,
           netProfit: netProfit,
           expenseList: expenses
       }
       dispatch(makeMonthlyStatement(finalDetails)).then((data) => {
           console.log(data)
       })
    }
//
    const months = [
        { name: 'January', value: 1 },
        { name: 'February', value: 2 },
        { name: 'March', value: 3 },
        { name: 'April', value: 4 },
        { name: 'May', value: 5 },
        { name: 'June', value: 6 },
        { name: 'July', value: 7 },
        { name: 'August', value: 8 },
        { name: 'September', value: 9 },
        { name: 'October', value: 10 },
        { name: 'November', value: 11 },
        { name: 'December', value: 12 },
    ]
//
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState((new Date()).getFullYear());
    const [totalDay, setTotalDay] = useState(1);

   const daysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    }
//    //
   const monthHandler = (event) => {
       setMonth(event.target.value);
   }
//
   const yearHandler = (event) => {
       setYear(event.target.value)
   }
//
   const submitDateForRecord = () => {
       dispatch(fetchMonthlyCashRecords(year, month));
   }
//
   useEffect(() => {
       const days = daysInMonth(month, year);
       setTotalDay(days)
       console.log('run')
   }, [month, year])
//
    const currentYear = (new Date()).getFullYear();
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
    const yearRange = range(currentYear, currentYear - 3, -1);
//
    return (
        <>
           <Box sx={{ flexGrow: 1 }}>
             {/*    {month}  {totalDay} {year}*/}
                 <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                         <Item>
                        <FormControl fullWidth>
                             <InputLabel id="demo-simple-select-label">Age</InputLabel>
                             <Select
                               labelId="demo-simple-select-label"
                               id="demo-simple-select"
                               value={month}
                               label="Age"
                               onChange={monthHandler}
                             >
                                 {
                                     months.map((m) => {
                                         return (
                                             <MenuItem value={m.value} key={m.value}>{m.name}</MenuItem>
                                         )
                                     })
                                 }                             </Select>
                           </FormControl>
                         </Item>
                     </Grid>
                     <Grid item xs={12} sm={12} md={6} lg={6}>
                         <Item>
                        <FormControl fullWidth>
                             <InputLabel id="year_field">Year</InputLabel>
                             <Select
                               labelId="year_field"
                              id="year_field"
                               value={year}
                               label="Year"
                               onChange={yearHandler}
                             >
                                 {
                                     yearRange.map((yr) => {
                                         return (
                                                 <MenuItem value={yr} key={yr}>{yr}</MenuItem>
                                         )
                                     })
                                 }
                             </Select>
                           </FormControl>
                         </Item>
                         <Button variant="primary" onClick={submitDateForRecord}>View Details</Button>
                     </Grid>
                     <Grid item xs={12} sm={12} md={6} lg={6}>
                         <Item>
                             <DeliveryStaffTable/>
                         </Item>
                     </Grid>
                     <Grid item xs={12} sm={12} md={6} lg={6}>
                         <Item>
                             <BranchOperatorTable salary={totalBranchOperatorSalary}/>
                         </Item>
                     </Grid>
                     <Grid item xs={12} sm={12} md={6} lg={6}>
                         <Item>
                             <EntryOperatorTable/>
                         </Item>
                     </Grid>
                     <Grid item xs={12} sm={12} md={6} lg={6}>
                         <Item>
                             <MarketingStaffTable/>
                         </Item>
                     </Grid>
                     <Grid item xs={12} sm={12} md={6} lg={6}>
                         <Item>
                            <PettyCashTable pettyCashes={pettyCashes}/>
                         </Item>
                     </Grid>
                     <Grid item xs={12} sm={12} md={6} lg={6}>
                         <Item>
                            <DeliveryRevenueTable deliveryRevenues={deliveryStatements}/>
                         </Item>
                     </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Item>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                               <Item>
                                     <h5 style={{fontSize:'1rem',color:'black'}}>Total Expenditure: {totalExpenditure}</h5>
                                     <h5 style={{fontSize:'1rem',color:'black'}}>Total Expense: {totalExpense}</h5>
                                     <h5 style={{fontSize:'1rem',color:'black'}}>Per Day Average: {Math.round(totalExpenditure/totalDay)}</h5>
                                     <h5 style={{fontSize:'1rem',color:'black'}}>Total DC: {branchRevenue.totalDeliveryCharge}</h5>
                                     <h5 style={{fontSize:'1rem',color:'black'}}>Total Com: {branchRevenue.totalCommission}</h5>
                                     <h5 style={{fontSize:'1rem',color:'black'}}>Gross Profit: {grossProfit}</h5>
                                     <h5 style={{fontSize:'1rem',color:'black'}}>Net Profit: {netProfit}</h5>
                               </Item>
                            </Grid>
                         </Item>
                     </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                         <Item>
                            <ul>
                             {Object.keys(expenses).length === 0 ? (                                 <h5 style={{fontSize:'1rem'}}>No expenses</h5>
                             ): (
                                 expenses.map((ex) => {
                                     return (
                                         <li style={{fontSize:'15px',fontWeight:'500',color:'black'}} key={ex.title}>{ex.title} - {ex.expense_amount}</li>
                                     )
                                 })
                             )}
                         </ul>
                         </Item>
                     </Grid>
                     <Grid item xs={12} sm={12} md={6} lg={6}>
                         <Item>
                              <MonthlyExpenseForm expenseHandler={expenseHandler}/>
                             <div style={{display:'flex',justifyContent:'center'}}>
                                 <Button variant="primary" onClick={monthlyStatementHandler}>Make Statement</Button>

                             </div>
                         </Item>
                     </Grid>
                 </Grid>
             </Box>

         </>
    )
}

export default MonthlyStatementComponent;