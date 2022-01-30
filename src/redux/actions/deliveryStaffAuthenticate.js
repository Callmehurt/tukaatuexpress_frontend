import {deliveryStaffAuthTypes} from "../types/deliveryStaffAuthTypes";

export const deliveryStaffAuthenticate = (staff) => {
    return(dispatch) => {
        dispatch({
            type: deliveryStaffAuthTypes.AUTHENTICATE_STAFF,
            payload: staff
        })
    }
}