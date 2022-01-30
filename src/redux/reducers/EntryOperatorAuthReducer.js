import {EntryOperatorAuthTypes} from './../types/EntryOperatorAuthTypes';

const initialState = {
        isAuthenticated: false,
        user: '',
    }
const EntryOperatorAuthReducer=(state=initialState, action)=>{
    switch (action.type) {
            case EntryOperatorAuthTypes.AUTHENTICATE_ENTRY_OPERATOR:
                return {
                    ...state,
                    isAuthenticated: true,
                    user: action.payload
                }
            case EntryOperatorAuthTypes.LOGOUT_ENTRY_OPERATOR:
                return {
                    ...state,
                    isAuthenticated: false,
                    user: '',
                }
            default:
                return state;
        }
}

export default EntryOperatorAuthReducer