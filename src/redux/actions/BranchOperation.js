import {BranchOperationTypes} from './../types/BranchOperationTypes';
export const allHoldList = (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.All_Hold_list,
            payload:requestList
        })
    }
}
export const assignedList = (data) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.ASSIGNED_LIST,
            payload:data
        })
    }
}


export const allReturnList= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.ALL_RETURNS_LIST,
            payload:requestList
        })
    }
}
export const allHoldListSameDay = (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.All_Hold_list_SAME_DAY,
            payload:requestList
        })
    }
}
export const assignedListSameDay = (data) => {
    return(dispatch) => {
        dispatch({
             type: BranchOperationTypes.ASSIGNED_SAME_DAY_LIST,
           payload:data
        })
    }
}
export const allReturnListSameDay= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.ALL_RETURNS_LIST_SAME_DAY,
            payload:requestList
        })
    }
}
export const warehouseListSameDay= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.WAREHOUSE_PRODUCT_LIST_SAME_DAY,
            payload:requestList
        })
    }
}
export const transferInsListSameDay= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.TRANSFER_INS_LIST_SAME_DAY,
            payload:requestList
        })
    }
}
export const transferOutListSameDay= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.TRANSFER_OUT_LIST_SAME_DAY,
            payload:requestList
        })
    }
}
export const newPickupSameDay= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.NEW_PICK_SAME_DAY_LIST,
            payload:requestList
        })
    }
}
export const sentForDelivery= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.SENT_FOR_DELIVERY,
            payload:requestList
        })
    }
}
export const sentForDeliverySameDay= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.SENT_FOR_DELIVERY_SAME_DAY,
            payload:requestList
        })
    }
}
export const DeliveredList= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.DELIVERED_LIST,
            payload:requestList
        })
    }
}
export const DeliveredListSameDay= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.DELIVERED_LIST_SAME_DAY,
            payload:requestList
        })
    }
}
export const allPickupForMessage= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.ALL_PICKUP_LIST,
            payload:requestList
        })
    }
}
export const allProcessRequest= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.PROCESS_REQUEST_LIST,
            payload:requestList
        })
    }
}
export const allCompleteRequest= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.COMPLETE_REQUEST_LIST,
            payload:requestList
        })
    }
}
export const getMessageDetail= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.GET_MESSAGE_DETAIL,
            payload:requestList
        })
    }
}
// image Processing
export const getPartnerRequest= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.IMAGE_PARTNER_REQUEST,
            payload:requestList
        })
    }
}

export const getPartnerRequestDetail= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.IMAGE_PARTNER_REQUEST_DETAIL,
            payload:requestList
        })
    }
}
export const getPartnerProceededRequestDetail= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.IMAGE_PARTNER_PROCEEDED_REQUEST_DETAIL,
            payload:requestList
        })
    }
}
export const requestEntryDetailGetPartner= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.ENTRY_PARTNER_REQUEST_DETAIL,
            payload:requestList
        })
    }
}
export const requestProceededEntryDetailGetPartner= (requestList) => {
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.ENTRY_PARTNER_PROCEEDED_REQUEST_DETAIL,
            payload:requestList
        })
    }
}
export const getCurrentCustomerAddedOperation=(data)=>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.OPERATION_CURRENT_CUSTOMER_ADDED,
            payload:data
        })
    }
}
export const getPrintData=(data)=>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.PRINT_DATA_ORDER,
            payload:data
        })
    }
}
export const getIncomingCancels=(data)=>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.INCOMING_CANCEL_LIST,
            payload:data
        })
    }
}
export const getIncomingCancelsSameDay=(data)=>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.INCOMING_CANCEL_SAME_DAY_LIST,
            payload:data
        })
    }
}
export const getTransferOutsCompleteSameDay=(data)=>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.TRANSFER_OUTS_COMPLETE_SAME_DAY,
            payload:data
        })
    }
}

export const getTransferOutsComplete=(data)=>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.TRANSFER_OUTS_COMPLETE,
            payload:data
        })
    }
}
export const getProductExchangeItemsOperation = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.PRODUCT_EXCHANGE_ITEMS,
            payload: allData
        })
    }
}
export const getSinglePickupDetailOperation = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.SINGLE_PICKUP_DETAIL,
            payload: allData
        })
    }
}
export const getDetailCoordinate = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.SINGLE_PICKUP_DETAIL_COORDINATE,
            payload: allData
        })
    }
}
export const getCustomerReplaceItemsOperation = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.CUSTOMER_REPLACE_ITEMS,
            payload: allData
        })
    }
}
export const getPrintALlOrderData = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.PRINT_ALL_ORDER,
            payload: allData
        })
    }
}
export const getVendorReturnList = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.VENDOR_RETURN_LIST,
            payload: allData
        })
    }
}
export const getVendorReturnPendingStatement = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.VENDOR_RETURN_PENDING_STATEMENT,
            payload: allData
        })
    }
}
export const getVendorReturnApprovedStatement = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.VENDOR_RETURN_APPROVED_STATEMENT,
            payload: allData
        })
    }
}
export const getPrintSelectedData = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.PRINT_SELECTED_DATA,
            payload: allData
        })
    }
}
export const getSuperSearchData = (allData) =>{
    return(dispatch) => {
        dispatch({
            type: BranchOperationTypes.SUPER_SEARCH,
            payload: allData
        })
    }
}
