import {HrAdminAuthType} from "../types/HrAdminAuthType";

export const hrAuthenticate = (data) => {
    return(dispatch) => {
        dispatch({
            type: HrAdminAuthType.AUTHENTICATE_HR,
            payload: data
        })
    }
}
export const hrLogout = (data) => {
    return(dispatch) => {
        dispatch({
            type: HrAdminAuthType.LOGOUT_HR,
            payload: data
        })
    }
}