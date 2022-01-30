import {HrAdminTypes} from "../types/HrAdminTypes";
export const HrAdminDeliveryPerson = (deliveryPersons) =>{
    return(dispatch) => {
        dispatch({
            type: HrAdminTypes.STAFF_DELIVERY_LIST,
            payload: deliveryPersons
        })
    }
}
export const deliveryPersonForCommission = (data) => {
    return(dispatch) => {
        dispatch({
            type: HrAdminTypes.DELIVERY_PERSON_FOR_COMMISSION,
            payload: data
        })
    }
}
export const getAllRole = (data) => {
    return(dispatch) => {
        dispatch({
            type: HrAdminTypes.STAFF_ROLES,
            payload: data
        })
    }
}
export const getEntryOperatorList = (data) => {
    return(dispatch) => {
        dispatch({
            type: HrAdminTypes.ENTRY_OPERATOR_LIST,
            payload: data
        })
    }
}
export const getMarketingList = (data) => {
    return(dispatch) => {
        dispatch({
            type: HrAdminTypes.MARKETING_LIST,
            payload: data
        })
    }
}