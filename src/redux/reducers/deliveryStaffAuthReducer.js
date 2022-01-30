import {deliveryStaffAuthTypes} from "../types/deliveryStaffAuthTypes";

const initialState = {
    isAuthenticated: false,
    user: '',
}

const deliveryStaffAuthReducer = (state = initialState, action) => {
     switch (action.type) {
        case deliveryStaffAuthTypes.AUTHENTICATE_STAFF:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case deliveryStaffAuthTypes.LOGOUT_STAFF:
            return {
                ...state,
                isAuthenticated: false,
                user: '',
            }
        default:
            return state;
    }
}

export default deliveryStaffAuthReducer;