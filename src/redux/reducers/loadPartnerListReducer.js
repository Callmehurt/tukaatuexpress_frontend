import {partnerTypes} from "../types/partnerTypes";

const initialState = {
    partnerList: []
}

const loadPartnerListReducer = (state = initialState, action) => {
     switch (action.type) {
        case partnerTypes.LOAD_PARTNER_LIST:
            return {
                ...state,
                partnerList: action.payload,
            }
        case partnerTypes.REFRESH_PARTNER_LIST:
            return {
                ...state,
                partnerList: action.payload,
            }
        default:
            return state;
    }
}

export default loadPartnerListReducer;