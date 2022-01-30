import {deliveryStaffAuthTypes} from "../types/deliveryStaffAuthTypes";

export const AssignedDelivery = (data) => {
    return(dispatch) => {
        dispatch({
            type: deliveryStaffAuthTypes.ASSIGNED_DELIVERY,
            payload: data
        })
    }
}