import {PartnerReturnStatementTypes} from "../types/PartnerReturnStatementTypes";

const initialState = {
    returnDeliveries: [],
    pendingReturnStatements: [],
    approvedReturnStatements: [],
    selectedReturnStatement: {}
}

export const partnerReturnStatementReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case PartnerReturnStatementTypes.FETCH_RETURNED_DELIVERIES:
            return {...state, returnDeliveries: payload};
        case PartnerReturnStatementTypes.FETCH_PENDING_RETURN_STATEMENTS:
            return {...state, pendingReturnStatements: payload};
        case PartnerReturnStatementTypes.FETCH_APPROVED_RETURN_STATEMENTS:
            return {...state, approvedReturnStatements: payload};
        case PartnerReturnStatementTypes.FETCH_SELECTED_STATEMENT_DELIVERIES:
            return {...state, selectedReturnStatement: payload};
        case PartnerReturnStatementTypes.CLEAR_SELECTED_STATEMENT_DELIVERIES:
            return {...state, selectedReturnStatement: {}};
        case PartnerReturnStatementTypes.REMOVE_DETAILS:
            return {...state, returnDeliveries: [], pendingReturnStatements: [], approvedReturnStatements: []};
        default:
            return state;
    }
}