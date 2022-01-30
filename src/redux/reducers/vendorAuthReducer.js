import {VendorAuthType} from "../types/VendorAuthType";

const initialState = {
    isAuthenticated: false,
    user: '',
}

const vendorAuthReducer = (state = initialState, action) => {
     switch (action.type) {
        case VendorAuthType.AUTHENTICATE_VENDOR:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case VendorAuthType.LOGOUT_VENDOR:
            return {
                ...state,
                isAuthenticated: false,
                user:action.payload
            }
        default:
            return state;
    }
}

export default vendorAuthReducer
