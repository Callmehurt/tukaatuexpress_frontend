import {partnerTypes} from "../types/partnerTypes";
export const updatePartner = (data) => {

    return(dispatch) => {
        dispatch({
            type: partnerTypes.UPDATE_PARTNER,
            payload: data
        })
    }
}