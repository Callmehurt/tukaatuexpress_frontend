import {partnerTypes} from "../types/partnerTypes";

export const loadPartnerList = (data) => {
    return(dispatch) => {
        dispatch({
            type: partnerTypes.LOAD_PARTNER_LIST,
            payload: data
        })
    }
}