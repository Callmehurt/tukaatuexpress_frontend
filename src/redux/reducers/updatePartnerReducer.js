import {partnerTypes} from "../types/partnerTypes";
const initialState = {
    partnerUpdate: []
}
const updatePartnerReducer = (state = initialState, action) => {

    console.log(action.payload);
     switch (action.type) {
        case partnerTypes.UPDATE_PARTNER:
            return {
                ...state,
                partnerUpdate: action.payload,
            }


        default:
            return state;
    }

}

export default updatePartnerReducer;