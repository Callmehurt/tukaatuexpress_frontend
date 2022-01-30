import {warehouseTypes} from "../types/warehouseTypes";

  const wareHouseList = (data) => {
     return(dispatch) => {
        dispatch({
            type: warehouseTypes.WAREHOUSE_PRODUCT_LIST,
            payload: data
        })
    }

}

export default wareHouseList