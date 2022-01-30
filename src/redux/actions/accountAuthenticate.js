import {AccountAuthTypes} from "./../../redux/types/AccountAuthTypes"

export const accountAuthenticate = (account) => {
    return(dispatch) => {
        dispatch({
            type: AccountAuthTypes.AUTHENTICATE_ACCOUNT,
            payload: account
        })
    }
}

export const accountLogout = () => {
     return(dispatch) => {
        dispatch({
            type: AccountAuthTypes.LOGOUT_ACCOUNT,
        })
    }
}