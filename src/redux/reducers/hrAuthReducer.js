import {HrAdminAuthType} from "../types/HrAdminAuthType";

const initialState = {
    isAuthenticated: false,
    user: '',
}

const hrAuthReducer = (state = initialState, action) => {
     switch (action.type) {
        case HrAdminAuthType.AUTHENTICATE_HR:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case HrAdminAuthType.LOGOUT_HR:
            return {
                ...state,
                isAuthenticated: false,
                user:action.payload
            }
        default:
            return state;
    }
}

export default hrAuthReducer