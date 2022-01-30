import {adminStaffAuthTypes} from "../types/adminStaffAuthTypes";


    const initialState = {
        isAuthenticated: false,
        user: '',
    }


const adminStaffAuthReducer = (state = initialState, action) => {
     switch (action.type) {
        case adminStaffAuthTypes.AUTHENTICATE_ADMIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case adminStaffAuthTypes.LOGOUT_ADMIN:
            return {
                ...state,
                isAuthenticated: false,
                user: '',

            }
        default:
            return state;
    }
}

export default adminStaffAuthReducer;