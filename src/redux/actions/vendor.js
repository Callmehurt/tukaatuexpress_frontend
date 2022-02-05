import {VendorTypes} from "./../types/VendorTypes";
import axios from "axios";
export const VendorAllDeliveries = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.ALL_DELIVERIES,
            payload: allData
        })
    }
}
export const allMessageList = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.ALL_MESSAGE_LIST,
            payload: allData
        })
    }
}
export const getMessageDetail = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.GET_MESSAGE_DETAIL,
            payload: allData
        })
    }
}
export const getSinglePickupDetail = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.SINGLE_PICKUP_DETAIL,
            payload: allData
        })
    }
}
export const pendingOrderList = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.PENDING_ORDER_LIST,
            payload: allData
        })
    }
}
export const settledOrderList = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.SETTLE_ORDER_LIST,
            payload: allData
        })
    }
}
export const searchOrdersList = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.SEARCH_ORDER_LIST,
            payload: allData
        })
    }
}
export const statementsAndInvoices = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.STATEMENTS_AND_INVOICES,
            payload: allData
        })
    }
}
export const getAllCustomerList = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.ALL_CUSTOMER_LIST,
            payload: allData
        })
    }
}
export const getAllCustomerListDisplay = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.ALL_CUSTOMER_LIST_DISPLAY,
            payload: allData
        })
    }
}
export const getCurrentCustomerAdded = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.PARTNER_CURRENT_CUSTOMER_ADDED,
            payload: allData
        })
    }
}
export const getAllHoldDeliveries = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.ALL_HOLD_DELIVERIES,
            payload: allData
        })
    }
}
export const getAllReturnsDeliveries = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.ALL_RETURNS_DELIVERIES,
            payload: allData
        })
    }
}
export const getNewRequestList = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.NEW_REQUEST_LIST,
            payload: allData
        })
    }
}
export const holdsOrderList = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.Hold_ORDER_LIST,
            payload: allData
        })
    }
}
export const holdsConfirmsOrderList = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.Hold_ORDER_CONFIRM_LIST,
            payload: allData
        })
    }
}
export const returnsOrderList = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.RETURN_ORDER_LIST,
            payload: allData
        })
    }
}
export const returnsConfirmsOrderList = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.RETURN_ORDER_CONFIRM_LIST,
            payload: allData
        })
    }
}
export const statementsAndInvoicesHold = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.STATEMENTS_AND_INVOICES_HOLDS,
            payload: allData
        })
    }
}
export const getProductExchangeItems = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.PRODUCT_EXCHANGE_ITEMS,
            payload: allData
        })
    }
}
export const getCustomerReplaceItems = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.CUSTOMER_REPLACE_ITEMS,
            payload: allData
        })
    }
}
export const getRequestImageDetail = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.REQUEST_IMAGE_DETAIL,
            payload: allData
        })
    }
}
export const getRequestEntryDetail = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.REQUEST_ENTRY_DETAIL,
            payload: allData
        })
    }
}
export const getAllProcessPickup = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.ALL_PROCESS_PICKUP,
            payload: allData
        })
    }
}
export const getAllPickupOrder = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.ALL_PICKUP_ORDER,
            payload: allData
        })
    }
}
export const getSinglePickupLocation = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.GET_SINGLE_PICKUP_LOCATION,
            payload: allData
        })
    }
}
export const getDeliveryPersonCurrentLocation = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.DELIVERY_PERSON_CURRENT_LOCATION,
            payload: allData
        })
    }
}
export const getPendingReturnStatement = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.PENDING_RETURN_STATEMENT,
            payload: allData
        })
    }
}
export const getApprovedReturnStatement = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.APPROVED_RETURN_STATEMENT,
            payload: allData
        })
    }
}
export const getAllBanner = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.ALL_BANNER_LIST,
            payload: allData
        })
    }
}
export const getAllNotice = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: VendorTypes.ALL_NOTICES_LIST,
            payload: allData
        })
    }
}

export const fetchPaymentReceivedDeliveries = () =>
    async (dispatch) => {
        const res = await axios.get('/partner/get/payment/received/pickups').catch((err) => {
             console.log(err)
         })
        dispatch({
            type: VendorTypes.FETCH_PAYMENT_RECEIVED_DELIVERIES,
            payload: res?.data
        })
    }
