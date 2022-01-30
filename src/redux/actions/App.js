import {AppTypes} from "../types/AppTypes";

export const getDomainServer = (data) => {
    return(dispatch) => {
        dispatch({
            type: AppTypes.URL_DOMAIN,
            payload: data
        })
    }
}