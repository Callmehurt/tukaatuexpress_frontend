import {BranchTypes} from "../types/branchAuthTypes";

const initialState = {
    isAuthenticated: false,
    user: '',
}

const branchAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case BranchTypes.AUTHENTICATE_BRANCH:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case BranchTypes.LOGOUT_BRANCH:
            return {
                ...state,
                isAuthenticated: false,
                user: ''
            }
        default:
            return state;
    }
}

export default branchAuthReducer;