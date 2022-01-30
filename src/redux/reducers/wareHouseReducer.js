import {warehouseTypes} from "../types/warehouseTypes";

const initialState = {
    WareHouseList: [],
    WareHouseListCount:'',
    deliveryPersonForAssign:[],

}
const wareHouseReducer = (state = initialState, action) => {

    console.log(action.payload);
     switch (action.type) {
        case warehouseTypes.WAREHOUSE_PRODUCT_LIST:
            return {
                ...state,
                WareHouseList: action.payload,
            }

         case warehouseTypes.WAREHOUSE_PRODUCT_LIST_COUNT:
             return {
                 ...state,
                 WareHouseListCount:action.payload
             }
         case warehouseTypes.ASSIGN_DELIVERY_PERSON:
         return {
             ...state,
             deliveryPersonForAssign:action.payload
         }

        default:
            return state;
    }

}

export default wareHouseReducer;