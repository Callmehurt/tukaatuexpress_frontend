import {AppTypes} from "../types/AppTypes";

const initialState = {
    urlDomain:'',
}
const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case AppTypes.URL_DOMAIN:
            return {
                ...state,
                urlDomain: action.payload
            }
        default:
            return state;
    }
}

export default AppReducer;