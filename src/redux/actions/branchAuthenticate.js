import {BranchTypes} from "../types/branchAuthTypes";


export const branchAuthenticate = (branch) => {
    return(dispatch) => {
        dispatch({
            type: BranchTypes.AUTHENTICATE_BRANCH,
            payload: branch
        })
    }
}

export const branchLogout = () => {
     return(dispatch) => {
        dispatch({
            type: BranchTypes.LOGOUT_BRANCH,
        })
    }
}