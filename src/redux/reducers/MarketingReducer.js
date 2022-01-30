import {MarketingTypes} from "../types/MarketingTypes";
// import {MarketingAuthTypes} from "../types/MarketingAuthTypes";

const initialState = {
    marketingPartnerList:[],
    marketingBannerList:[],
}

const MarketingReducer = (state = initialState, action) => {
    switch (action.type) {
        case MarketingTypes.PARTNER_LIST_MARKETING:
            return {
                ...state,
                marketingPartnerList: action.payload
            }
        case MarketingTypes.BANNER_LIST_MARKETING:
            return {
                ...state,
                marketingBannerList:action.payload
            }

        default:
            return state;
    }
}
export default MarketingReducer