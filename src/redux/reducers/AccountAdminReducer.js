import {AccountAdminTypes} from "../types/AccountAdminTypes";

const initialState = {
       PettyCashApprovedList:[],
       PettyCashPendingList:[],
       paymentPartnerList:[],
       paymentAllDeliveries:[],
       paymentDeliveredDeliveries:[],
       paymentPaidDeliveries:[],
       paymentReceivedDeliveries:[],
       paymentPacketExchangedDeliveries:[],
       paymentPartnerRequest:[],
       accountPendingBranchDailyStatement:[],
       accountApprovedBranchDailyStatement:[],
       allPartnerPaymentStatements:[],
    }
const AccountAdminReducer=(state=initialState, action)=>{
    switch (action.type) {
            case AccountAdminTypes.PETTY_CASH_APPROVED_LIST:
                return {
                    ...state,
                   PettyCashApprovedList: action.payload
                }
            case AccountAdminTypes.PETTY_CASH_PENDING_LIST:
            return {
                ...state,
                PettyCashPendingList: action.payload
                }
            case AccountAdminTypes.PARTNER_PAYMENT_LIST:
            return {
                ...state,
                paymentPartnerList: action.payload
                }
            case AccountAdminTypes.PAYMENT_ALL_DELIVERIES:
            return {
                ...state,
                 paymentAllDeliveries: action.payload
            }
            case AccountAdminTypes.PAYMENT_DELIVERED_DELIVERIES:
            return {
                ...state,
                paymentDeliveredDeliveries: action.payload
            }
            case AccountAdminTypes.PAYMENT_PAID_DELIVERIES:
            return {
                ...state,
                paymentPaidDeliveries: action.payload
            }
            case AccountAdminTypes.PAYMENT_RECEIVED_DELIVERIES:
            return {
                ...state,
                paymentReceivedDeliveries: action.payload
            }
            case AccountAdminTypes.PACKET_EXCHANGED_DELIVERIES:
            return {
                ...state,
                paymentPacketExchangedDeliveries: action.payload
            }
            case AccountAdminTypes.PAYMENT_REQUEST_PARTNER:
            return {
                ...state,
                paymentPartnerRequest: action.payload
            }
            case AccountAdminTypes.ACCOUNT_PENDING_DAILY_STATEMENT:
            return {
                ...state,
                accountPendingBranchDailyStatement: action.payload
            }
            case AccountAdminTypes.ACCOUNT_APPROVED_DAILY_STATEMENT:
            return {
                ...state,
                accountApprovedBranchDailyStatement: action.payload
            }
            case AccountAdminTypes.ACCOUNT_PAYMENT_PARTNER_STATEMENT_LIST:
            return {
                ...state,
                allPartnerPaymentStatements: action.payload
            }
            default:
                return state;
        }
}

export default AccountAdminReducer