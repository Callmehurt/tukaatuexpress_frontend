import {EntryOperatorAuthTypes} from './../types/EntryOperatorAuthTypes';
import {EntryOperatorTypes} from './../types/EntryOperatorTypes';

export const entryOperatorAuthenticate = (data) => {
    return(dispatch) => {
        dispatch({
            type: EntryOperatorAuthTypes.AUTHENTICATE_ENTRY_OPERATOR,
            payload: data
        })
    }
}
export const entryOperatorLogout = () => {
     return(dispatch) => {
        dispatch({
            type: EntryOperatorAuthTypes.LOGOUT_ENTRY_OPERATOR,
        })
    }
}
export const entryOperatorAllImageRequestList = (data) => {
     return(dispatch) => {
        dispatch({
            type: EntryOperatorTypes.ALL_IMAGE_REQUEST,
            payload:data
        })
    }
}
export const entryOperatorGetEntryPickups = (data) => {
     return(dispatch) => {
        dispatch({
            type: EntryOperatorTypes.PICKUP_ENTRY_LIST,
            payload:data
        })
    }
}