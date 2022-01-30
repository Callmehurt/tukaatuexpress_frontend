import {MainAdminTypes} from "../types/MainAdminTypes";

const initialState = {
    transferRatesList:[],
    editTransferRate:[],
    updateBranchDetail:[],
    pickupList:[],
    pickupAssignedList:[],
    pickupDeliveredList:[],
    pickupOnTheWayList:[],
    pickupAtWarehouse:[],
    branchListForInput:[],
    interTransferCountList:[],

}

const MainAdmin = (state = initialState, action) => {
    switch (action.type) {
        case MainAdminTypes.TRANSFER_RATE_LIST:
            return {
                ...state,
                transferRatesList: action.payload
            }
        case MainAdminTypes.EDIT_TRANSFER_RATE:
        return {
            ...state,
            editTransferRate: action.payload
        }
        case MainAdminTypes.UPDATE_BRANCH_DETAIL:
        return {
            ...state,
            updateBranchDetail: action.payload
        }
        case MainAdminTypes.PICKUPS_lIST:
        return {
            ...state,
            pickupList: action.payload
        }
        case MainAdminTypes.PICKUP_ASSIGNED_LIST:
        return {
            ...state,
            pickupAssignedList: action.payload
        }
        case MainAdminTypes.PICKUP_DELIVERED_LIST:
        return {
            ...state,
            pickupDeliveredList: action.payload
        }
        case MainAdminTypes.PICKUP_ON_THE_WAY_LIST:
        return {
            ...state,
            pickupOnTheWayList: action.payload
        }
        case MainAdminTypes.AT_WAREHOUSE_LIST:
        return {
            ...state,
            pickupAtWarehouse: action.payload
        }
        case MainAdminTypes.BRANCH_LIST_FOR_INPUT:
        return {
            ...state,
            branchListForInput: action.payload
        }
        case MainAdminTypes.INTER_TRANSFER_COUNT_LIST:
        return {
            ...state,
            interTransferCountList: action.payload
        }
        default:
            return state;
    }
}

export default MainAdmin;