import {NewPickupTypes} from '../types/NewPickupTypes'

const initialState = {
    NewPickupList: [],
    NewPickupListCount:'',
}

const NewPickupListReducer = (state = initialState, action)=>{
    switch(action.type){
        case NewPickupTypes.NEW_PICK_LIST:
            return{
                ...state,
                NewPickupList: action.payload,
            }
        case NewPickupTypes.NEW_PICK_LIST_COUNT:
            return {
                ...state,
                NewPickupListCount: action.payload,

            }

        default:
            return state;
    }
}

export default NewPickupListReducer