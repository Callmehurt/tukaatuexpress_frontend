import {AdminBranchesType} from "../types/AdminBranchesType"
export const AdminBranches=(branches)=>{
    return(dispatch) => {
        dispatch({
            type: AdminBranchesType.MAIN_ADMIN_BRANCHES,
            payload: branches
        })
    }
}
export const AdminBranchUpdate=(branchUpdate)=>{
     return(dispatch) => {
        dispatch({
            type: AdminBranchesType.MAIN_ADMIN_BRANCHES_UPDATE,
            payload: branchUpdate
        })
    }
}