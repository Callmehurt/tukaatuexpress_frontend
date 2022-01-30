import {MarketingAuthTypes} from "../types/MarketingAuthTypes";
import {MarketingTypes} from "../types/MarketingTypes";

export const marketingAuthenticate = (data) => {
    return(dispatch) => {
        dispatch({
            type: MarketingAuthTypes.AUTHENTICATE_MARKETING,
            payload: data
        })
    }
}

export const marketingLogout = (data) => {
     return(dispatch) => {
        dispatch({
            type: MarketingAuthTypes.LOGOUT_MARKETING,
        })
    }
}

export const getPartnerListMarketing=(data)=>{
    return(dispatch)=>{
         dispatch({
            type: MarketingTypes.PARTNER_LIST_MARKETING,
             payload: data
        })
    }
}
export const getBannerListMarketing=(data)=>{
    return(dispatch)=>{
         dispatch({
            type: MarketingTypes.BANNER_LIST_MARKETING,
             payload: data
        })
    }
}