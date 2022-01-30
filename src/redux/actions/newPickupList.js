import {NewPickupTypes} from "../types/NewPickupTypes";

export const NewPickupList = (data) => {
     return(dispatch) => {
        dispatch({
            type: NewPickupTypes.NEW_PICK_LIST,
            payload: data
        })
    }

}