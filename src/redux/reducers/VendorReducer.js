import {VendorTypes} from "../types/VendorTypes";

const initialState = {
    allDeliveries:[],
    allMessageList:[],
    pickupMessageDetail:[],
    singlePickupDetail:[],
    pendingOrdersList:[],
    settledOrdersList:[],
    searchOrderList:'',
    statementAndInvoice:[],
    allCustomerList:[],
    allCustomerListDisplay:[],
    allHoldDeliveries:[],
    allReturnsDelivery:[],
    newRequestList:[],
    currentCustomerAdded:'',
    holdOrdersList:[],
    holdConfirmsOrdersList:[],
    returnsOrdersList:[],
    returnsConfirmsOrdersList:[],
    statementAndInvoiceHold:[],
    productExchangeItems:[],
    customerReplaceItems:[],
    requestList:[],
    requestImageDetail:[],
    requestEntryDetail:[],
    allProcessPickup:[],
    allPickupOrder:[],
    singlePickupLocations:[],
    deliveryPersonCurrentLocation:[],
    allPendingReturnStatement:[],
    allApprovedReturnStatement:[],
    allBanner:[],
    allNotice:[],
    paymentReceivedDeliveries: []
}

const VendorReducer = (state = initialState, action) => {
     switch (action.type) {
        case VendorTypes.ALL_DELIVERIES:
            return {
                ...state,
                allDeliveries: action.payload
            }
        case VendorTypes.ALL_MESSAGE_LIST:
            return {
                ...state,
                allMessageList: action.payload
            }
        case VendorTypes.GET_MESSAGE_DETAIL:
            return {
                ...state,
                pickupMessageDetail: action.payload
            }
        case VendorTypes.SINGLE_PICKUP_DETAIL:
        return {
            ...state,
            singlePickupDetail: action.payload
        }
        case VendorTypes.PENDING_ORDER_LIST:
        return {
            ...state,
            pendingOrdersList: action.payload
        }
        case VendorTypes.SETTLE_ORDER_LIST:
        return {
            ...state,
             settledOrdersList: action.payload
        }
        case VendorTypes.STATEMENTS_AND_INVOICES:
        return {
            ...state,
            statementAndInvoice: action.payload
        }
        case VendorTypes.ALL_CUSTOMER_LIST:
        return {
            ...state,
            allCustomerList: action.payload
        }
        case VendorTypes.ALL_CUSTOMER_LIST_DISPLAY:
        return {
            ...state,
            allCustomerListDisplay: action.payload
        }
        case VendorTypes.ALL_HOLD_DELIVERIES:
        return {
            ...state,
            allHoldDeliveries: action.payload
        }
        case VendorTypes.ALL_RETURNS_DELIVERIES:
        return {
            ...state,
            allReturnsDelivery: action.payload
        }
        case VendorTypes.NEW_REQUEST_LIST:
        return {
            ...state,
            newRequestList: action.payload
        }
        case VendorTypes.PARTNER_CURRENT_CUSTOMER_ADDED:
        return {
            ...state,
            currentCustomerAdded: action.payload
        }
        case VendorTypes.Hold_ORDER_LIST:
        return {
            ...state,
            holdOrdersList: action.payload
        }
        case VendorTypes.Hold_ORDER_CONFIRM_LIST:
        return {
            ...state,
            holdConfirmsOrdersList: action.payload
        }
        case VendorTypes.RETURN_ORDER_LIST:
        return {
            ...state,
            returnsOrdersList: action.payload
        }
        case VendorTypes.RETURN_ORDER_CONFIRM_LIST:
        return {
            ...state,
            returnsConfirmsOrdersList: action.payload
        }
        case VendorTypes.STATEMENTS_AND_INVOICES_HOLDS:
        return {
            ...state,
            statementAndInvoiceHold: action.payload
        }
        case VendorTypes.PRODUCT_EXCHANGE_ITEMS:
        return {
            ...state,
            productExchangeItems: action.payload
        }
        case VendorTypes.CUSTOMER_REPLACE_ITEMS:
        return {
            ...state,
            customerReplaceItems: action.payload
        }
        case VendorTypes.REQUEST_IMAGE_DETAIL:
        return {
            ...state,
            requestImageDetail: action.payload
        }
        case VendorTypes.REQUEST_ENTRY_DETAIL:
        return {
            ...state,
            requestEntryDetail: action.payload
        }
        case VendorTypes.ALL_PROCESS_PICKUP:
        return {
            ...state,
            allProcessPickup: action.payload
        }
        case VendorTypes.ALL_PICKUP_ORDER:
        return {
            ...state,
            allPickupOrder: action.payload
        }
        case VendorTypes.SEARCH_ORDER_LIST:
        return {
            ...state,
            searchOrderList: action.payload
        }
        case VendorTypes.GET_SINGLE_PICKUP_LOCATION:
        return {
            ...state,
            singlePickupLocations: action.payload
        }
        case VendorTypes.DELIVERY_PERSON_CURRENT_LOCATION:
        return {
            ...state,
            deliveryPersonCurrentLocation: action.payload
        }
        case VendorTypes.PENDING_RETURN_STATEMENT:
        return {
            ...state,
            allPendingReturnStatement: action.payload
        }
        case VendorTypes.APPROVED_RETURN_STATEMENT:
        return {
            ...state,
            allApprovedReturnStatement: action.payload
        }
        case VendorTypes.ALL_BANNER_LIST:
        return {
            ...state,
            allBanner: action.payload
        }
        case VendorTypes.ALL_NOTICES_LIST:
        return {
            ...state,
            allNotice: action.payload
        }
        case VendorTypes.FETCH_PAYMENT_RECEIVED_DELIVERIES:
        return {
            ...state,
            paymentReceivedDeliveries: action.payload
        }
        default:
            return state;
    }
}

export default VendorReducer
