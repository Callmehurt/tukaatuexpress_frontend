import {MainAdminAuthTypes} from "../types/MainAdminAuthTypes";

export const MainAdminAuthenticate = (mainAdmin) => {
    return(dispatch) => {
        dispatch({
            type: MainAdminAuthTypes.AUTHENTICATE_MAIN_ADMIN,
            payload: mainAdmin
        })
    }
}
export const MainAdminLogout = (mainAdmin) => {
    return(dispatch) => {
        dispatch({
            type: MainAdminAuthTypes.LOGOUT_MAIN_ADMIN,
            payload: mainAdmin
        })
    }
}