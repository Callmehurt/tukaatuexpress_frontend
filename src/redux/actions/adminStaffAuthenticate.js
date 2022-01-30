
import {adminStaffAuthTypes} from "../types/adminStaffAuthTypes";
export const adminStaffAuthenticate = (admin) => {
    return(dispatch) => {
        dispatch({
            type: adminStaffAuthTypes.AUTHENTICATE_ADMIN,
            payload: admin
        })
    }
}
export const adminStaffLogout = (admin) => {
    return(dispatch) => {
        dispatch({
            type: adminStaffAuthTypes.LOGOUT_ADMIN,
            payload: admin
        })
    }
}