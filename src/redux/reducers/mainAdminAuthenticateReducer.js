import {MainAdminAuthTypes} from "../types/MainAdminAuthTypes";

const initialState = {
    isAuthenticated: false,
    user: '',
}

const mainAdminAuthenticate = (state = initialState, action) => {
    switch (action.type) {
        case MainAdminAuthTypes.AUTHENTICATE_MAIN_ADMIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case MainAdminAuthTypes.LOGOUT_MAIN_ADMIN:
        return {
            ...state,
            isAuthenticated: false,
            user: action.payload
        }

        default:
            return state;
    }
}

export default mainAdminAuthenticate;