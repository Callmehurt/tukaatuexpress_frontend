import {MonthlyStatementActionTypes} from "../types/monthly-statement-action-types";

const initialState = {
    deliveryStaffs: [],
    branchOperators: [],
    entryOperators: [],
    marketingStaffs: [],
    pettyCashes: [],
    deliveryStatements: []
}

export const monthlyStatementReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case MonthlyStatementActionTypes.FETCH_DELIVERY_STAFFS:
            return {...state, deliveryStaffs: payload};
        case MonthlyStatementActionTypes.FETCH_BRANCH_OPERATORS:
            return {...state, branchOperators: payload};
        case MonthlyStatementActionTypes.FETCH_ENTRY_OPERATORS:
            return {...state, entryOperators: payload};
        case MonthlyStatementActionTypes.FETCH_MARKETING_STAFFS:
            return {...state, marketingStaffs: payload};
        case MonthlyStatementActionTypes.FETCH_PETTY_CASHES:
            return {...state, pettyCashes: payload};
        case MonthlyStatementActionTypes.FETCH_DELIVERY_STATEMENTS:
            return {...state, deliveryStatements: payload};
        default:
            return state;
    }
}