import {VendorAuthType} from "./../types/VendorAuthType";

export const vendorAuthenticate = (data) => {
    return(dispatch) => {
        dispatch({
            type: VendorAuthType.AUTHENTICATE_VENDOR,
            payload: data
        })
    }
}
export const vendorLogout = (data) => {
    return(dispatch) => {
        dispatch({
            type: VendorAuthType.LOGOUT_VENDOR,
            payload: data
        })
    }
}