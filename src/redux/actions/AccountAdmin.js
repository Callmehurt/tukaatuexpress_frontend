import {AccountAdminTypes} from './../types/AccountAdminTypes';

export const AccountPettyCashApproved = (requestList) => {
    return(dispatch) => {
        dispatch({
            type: AccountAdminTypes.PETTY_CASH_APPROVED_LIST,
            payload:requestList
        })
    }
}
export const AccountPettyCashPending = (requestList) => {
    return(dispatch) => {
        dispatch({
            type: AccountAdminTypes.PETTY_CASH_PENDING_LIST,
            payload:requestList
        })
    }
}

export const AccountPartnerPaymentList = (partnerList) => {
    return(dispatch) => {
        dispatch({
            type: AccountAdminTypes.PARTNER_PAYMENT_LIST,
            payload:partnerList
        })
    }
}
export const AccountPaymentAllDeliveries = (data) => {
    return(dispatch) => {
        dispatch({
            type: AccountAdminTypes.PAYMENT_ALL_DELIVERIES,
            payload:data
        })
    }
}
export const AccountPaymentDeliveredDeliveries = (data) => {
    return(dispatch) => {
        dispatch({
            type: AccountAdminTypes.PAYMENT_DELIVERED_DELIVERIES,
            payload:data
        })
    }
}
export const AccountPaymentPaidDeliveries = (data) => {
    return(dispatch) => {
        dispatch({
            type: AccountAdminTypes.PAYMENT_PAID_DELIVERIES,
            payload:data
        })
    }
}
export const AccountPaymentReceivedDeliveries = (data) => {
    return(dispatch) => {
        dispatch({
            type: AccountAdminTypes.PAYMENT_RECEIVED_DELIVERIES,
            payload:data
        })
    }
}
export const AccountPaymentRequestPartner = (data) => {
    return(dispatch) => {
        dispatch({
            type: AccountAdminTypes.PAYMENT_REQUEST_PARTNER,
            payload:data
        })
    }
}
export const getAccountPendingBranchDailyStatement = (allData) => {
    return(dispatch) => {
        dispatch({
            type: AccountAdminTypes.ACCOUNT_PENDING_DAILY_STATEMENT,
            payload:allData
        })
    }
}
export const AccountApprovedBranchDailyStatement = (data) => {
    return(dispatch) => {
        dispatch({
            type: AccountAdminTypes.ACCOUNT_APPROVED_DAILY_STATEMENT,
            payload:data
        })
    }
}
export const getAccountPartnerPaymentStatementList = (data) => {
    return(dispatch) => {
        dispatch({
            type: AccountAdminTypes.ACCOUNT_PAYMENT_PARTNER_STATEMENT_LIST,
            payload:data
        })
    }
}