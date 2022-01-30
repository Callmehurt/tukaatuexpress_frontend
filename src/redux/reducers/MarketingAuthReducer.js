import {MarketingAuthTypes} from "../types/MarketingAuthTypes";

const initialState = {
    isAuthenticated: false,
    user: '',
}

const MarketingAuthReducer = (state = initialState, action) => {
     switch (action.type) {
        case MarketingAuthTypes.AUTHENTICATE_MARKETING:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case MarketingAuthTypes.LOGOUT_MARKETING:
            return {
                ...state,
                isAuthenticated: false,
                user:action.payload
            }
        default:
            return state;
    }
}

export default MarketingAuthReducer