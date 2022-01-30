import {HrAdminTypes} from "../types/HrAdminTypes";

const initialState = {
    idCardList: [],
}

export const idCardReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case HrAdminTypes.SET_ID_CARD_LIST:
            return {...state, idCardList: payload};
        default:
            return state;
    }
}