import {NewPickupTypes} from "../types/NewPickupTypes";
 const newPickupListCount = (data) => {
     return(dispatch) => {
        dispatch({
            type: NewPickupTypes.NEW_PICK_LIST_COUNT,
            payload: data
        })
    }

}

export default newPickupListCount