import {DiscountActionTypes} from "../types/DiscountActionTypes";

const initialState = {
    discountSchemeList: [],
    registeredPartners: [],
    selectedDiscountScheme: {}
}

export const discountSchemeReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case DiscountActionTypes.FETCH_DISCOUNT_SCHEMES:
            return {...state, discountSchemeList: payload};
        case DiscountActionTypes.SELECT_DISCOUNT_SCHEME:
            return {...state, selectedDiscountScheme: payload};
        case DiscountActionTypes.FETCH_REGISTERED_PARTNERS:
            return {...state, registeredPartners: payload};
        default:
            return state;
    }
}