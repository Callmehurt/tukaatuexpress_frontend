import {TransferTypes} from "../types/TransferTypes";
export const TransferIns=(data)=>{
    return(dispatch) => {
        dispatch({
            type: TransferTypes.TRANSFER_INS_LIST,
            payload: data
        })
    }
}
export const TransferInsSameDay=(data)=>{
    return(dispatch) => {
        dispatch({
            type: TransferTypes.TRANSFER_INS_LIST_SAME_DAY,
            payload: data
        })
    }
}
export const TransferInsCount=(data)=>{
    return(dispatch) => {
        dispatch({
            type: TransferTypes.TRANSFER_INS_COUNT,
            payload: data
        })
    }
}
export const TransferOuts=(data)=>{
    return(dispatch) => {
        dispatch({
            type: TransferTypes.TRANSFER_OUT_LIST,
            payload: data
        })
    }
}
export const TransferOutsSameDay=(data)=>{
    return(dispatch) => {
        dispatch({
            type: TransferTypes.TRANSFER_OUT_LIST_SAME_DAY,
            payload: data
        })
    }
}
export const TransferOutsCount=(data)=>{
    return(dispatch) => {
        dispatch({
            type: TransferTypes.TRANSFER_OUT_COUNT,
            payload: data
        })
    }
}
export const TransferAllBranch=(data)=>{
    return(dispatch) => {
        dispatch({
            type: TransferTypes.TRANSFER_ALL_BRANCH,
            payload: data
        })
    }
}