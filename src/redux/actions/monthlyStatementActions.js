import {MonthlyStatementActionTypes} from '../types/monthly-statement-action-types';
import axios from "axios";

export const fetchMonthlyPaymentDetails = () =>

    async (dispatch) => {
         let mainAdmin = JSON.parse(localStorage.getItem('main_admin'));
        const token = mainAdmin.token;
        const response = await axios.get('/mainadmin/monthly/detail', {
                headers: {
                        'Authorization': `Bearer ${token}`
                }
        }).catch((err) => {
                console.log(err)
        });
        console.log(response?.data)
        dispatch({
            type: MonthlyStatementActionTypes.FETCH_DELIVERY_STAFFS,
            payload: response.data?.delivery_staffs
        });
        dispatch({
            type: MonthlyStatementActionTypes.FETCH_BRANCH_OPERATORS,
            payload: response.data?.branch_admins
        });
        dispatch({
            type: MonthlyStatementActionTypes.FETCH_MARKETING_STAFFS,
            payload: response.data?.marketing_staff
        });
        dispatch({
            type: MonthlyStatementActionTypes.FETCH_ENTRY_OPERATORS,
            payload: response.data?.entry_operators
        });

};

export const fetchMonthlyCashRecords = (year, month) =>
    async (dispatch) => {
             let mainAdmin = JSON.parse(localStorage.getItem('main_admin'));
            // console.log(mainAdmin);
            const token = mainAdmin.token;
            const response = await axios.post('/mainadmin/monthly/cash/record', {
                year:year,
                month:month
            },{
                    headers: {
                            'Authorization': `Bearer ${token}`
                    }
            }).catch((err) => {
                    console.log(err)
            });
            console.log(response.data?.petty_cashes)
            dispatch({
            type: MonthlyStatementActionTypes.FETCH_PETTY_CASHES,
            payload: response.data?.petty_cashes
            });
            dispatch({
            type: MonthlyStatementActionTypes.FETCH_DELIVERY_STATEMENTS,
            payload: response.data?.delivery_statements
            });
    }

export const makeMonthlyStatement = (data) =>
    async () => {
        let mainAdmin = JSON.parse(localStorage.getItem('main_admin'));
        // console.log(mainAdmin);
        const bearer_token = mainAdmin.token;
        // const bearer_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hZG1pblwvbG9naW4iLCJpYXQiOjE2NDE3OTE2MTQsImV4cCI6MTY0MTkxMTYxNCwibmJmIjoxNjQxNzkxNjE0LCJqdGkiOiI1endTbWNlSWtlandwYWs3Iiwic3ViIjoxLCJwcnYiOiJkZjg4M2RiOTdiZDA1ZWY4ZmY4NTA4MmQ2ODZjNDVlODMyZTU5M2E5In0.qeTuwQliXeLrjbu05SnjPBHMxB5xpnZvkFM-Fnh7JJs';
        const response = await axios.post('/mainadmin/make/monthly/statement', {
            deliveryStaffs: data.deliveryStaffs,
            branchOperators: data.branchOperators,
            entryStaffs: data.entryOperators,
            marketingStaffs: data.marketingStaffs,
            pettyCashes: data.pettyCashes,
            deliveryStatements: data.deliveryStatements,
            expenseList: data.expenseList,
        }, {
             headers: {
                        'Authorization': `Bearer ${bearer_token}`
                }
        }).catch((err) => {
                console.log(err)
        });
        console.log(response.data)
        return response.data?.status;

};