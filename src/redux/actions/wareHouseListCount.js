import {warehouseTypes} from "../types/warehouseTypes";

 export const wareHouseListCount = (data) => {
     return(dispatch) => {
        dispatch({
            type: warehouseTypes.WAREHOUSE_PRODUCT_LIST_COUNT,
            payload: data
        })
    }

}
export const assignDeliveryPerson = (data) => {
     return(dispatch) => {
        dispatch({
            type: warehouseTypes.ASSIGN_DELIVERY_PERSON,
            payload: data
        })
    }

}
