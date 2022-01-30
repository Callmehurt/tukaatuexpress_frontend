import {EntryOperatorTypes} from './../types/EntryOperatorTypes';
const initialState = {
        allRequestImage:[],
        allEntryPickups:[],
    }

const EntryOperatorReducer=(state=initialState, action)=>{
    switch (action.type) {
            case EntryOperatorTypes.ALL_IMAGE_REQUEST:
                return {
                    ...state,
                    allRequestImage: action.payload
                }
            case EntryOperatorTypes.PICKUP_ENTRY_LIST:
            return {
                ...state,
                allEntryPickups: action.payload
            }
            default:
                return state;
        }
}

export default EntryOperatorReducer