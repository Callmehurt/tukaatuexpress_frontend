import {TransferTypes} from "../types/TransferTypes";

const initialState = {
    NewTransferInsList: [],
    NewTransferInsListSameDay: [],
    NewTransferInsCount:'',
    NewTransferOutList:[],
    NewTransferOutListSameDay:[],
    NewTransferOutCount:'',
    transferAllBranch:[],
}

const TransferReducer = (state = initialState, action)=>{
    switch(action.type){
        case TransferTypes.TRANSFER_INS_LIST:
            return{
                ...state,
                NewTransferInsList: action.payload,
            }
        case TransferTypes.TRANSFER_INS_COUNT:
            return {
                ...state,
                NewTransferInsCount: action.payload,

            }
        case TransferTypes.TRANSFER_OUT_LIST:
        return{
            ...state,
            NewTransferOutList: action.payload,
        }

        case TransferTypes.TRANSFER_OUT_COUNT:
        return {
            ...state,
            NewTransferOutCount: action.payload,

        }
        case TransferTypes.TRANSFER_ALL_BRANCH:
        return {
            ...state,
            transferAllBranch: action.payload,

        }
        case TransferTypes.TRANSFER_INS_LIST_SAME_DAY:
        return {
            ...state,
            NewTransferInsListSameDay: action.payload,

        }
        case TransferTypes.TRANSFER_OUT_LIST_SAME_DAY:
        return {
            ...state,
            NewTransferOutListSameDay: action.payload,

        }

        default:
            return state;
    }
}

export default TransferReducer