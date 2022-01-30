import {deliveryStaffAuthTypes} from "../types/deliveryStaffAuthTypes";

const initialState = {
    assigned_Delivery:[],
    in_Bag_Delivery:[],
    on_TheWay_Delivery:[],
}

const deliveryStaffReducer = (state = initialState, action) => {
     switch (action.type) {
        case deliveryStaffAuthTypes.ASSIGNED_DELIVERY:
            return {
                ...state,
                isAuthenticated: true,
                assigned_Delivery: action.payload
            }
        default:
            return state;
    }
}

export default deliveryStaffReducer;