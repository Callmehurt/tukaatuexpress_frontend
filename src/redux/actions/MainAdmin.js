import {MainAdminTypes} from "../types/MainAdminTypes";

export const transferRateList = (data) => {
    return(dispatch) => {
        dispatch({
            type: MainAdminTypes.TRANSFER_RATE_LIST,
            payload: data
        })
    }
}
export const editTransferRate = (data) => {
    return(dispatch) => {
        dispatch({
            type: MainAdminTypes.EDIT_TRANSFER_RATE,
            payload: data
        })
    }
}
export const updateBranchDetail = (data) => {
    return(dispatch) => {
        dispatch({
            type: MainAdminTypes.UPDATE_BRANCH_DETAIL,
            payload: data
        })
    }
}
export const pickupsList = (data) => {
    return(dispatch) => {
        dispatch({
            type: MainAdminTypes.PICKUPS_lIST,
            payload: data
        })
    }
}

export const pickupsAssignedList = (data) => {
    return(dispatch) => {
        dispatch({
            type: MainAdminTypes.PICKUP_ASSIGNED_LIST,
            payload: data
        })
    }
}
export const pickupsDeliveredList = (data) => {
    return(dispatch) => {
        dispatch({
            type: MainAdminTypes.PICKUP_DELIVERED_LIST,
            payload: data
        })
    }
}
export const pickupsOnTheWayList = (data) => {
    return(dispatch) => {
        dispatch({
            type: MainAdminTypes.PICKUP_ON_THE_WAY_LIST,
            payload: data
        })
    }
}
export const wareHouseList = (data) => {
    return(dispatch) => {
        dispatch({
            type: MainAdminTypes.AT_WAREHOUSE_LIST,
            payload: data
        })
    }
}
export const BranchListForInput = (data) => {
    return(dispatch) => {
        dispatch({
            type: MainAdminTypes.BRANCH_LIST_FOR_INPUT,
            payload: data
        })
    }
}
export const interTransferCountList = (data) => {
    return(dispatch) => {
        dispatch({
            type: MainAdminTypes.INTER_TRANSFER_COUNT_LIST,
            payload: data
        })
    }
}
// export const MainAdminLogout = (mainAdmin) => {
//     return(dispatch) => {
//         dispatch({
//             type: MainAdminTypes.LOGOUT_MAIN_ADMIN,
//             payload: mainAdmin
//         })
//     }
// }