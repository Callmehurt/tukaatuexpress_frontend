import {AccountAuthTypes} from "../types/AccountAuthTypes";

const initialState = {
        isAuthenticated: false,
        user: '',
    }
const AccountAuthReducer=(state=initialState, action)=>{
    switch (action.type) {
            case AccountAuthTypes.AUTHENTICATE_ACCOUNT:
                return {
                    ...state,
                    isAuthenticated: true,
                    user: action.payload
                }
            case AccountAuthTypes.LOGOUT_ACCOUNT:
                return {
                    ...state,
                    isAuthenticated: false,
                    user: '',
                }
            default:
                return state;
        }
}

export default AccountAuthReducer