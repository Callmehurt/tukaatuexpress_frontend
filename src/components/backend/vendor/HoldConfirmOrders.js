import React from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const HoldConfirmOrders=()=>{
     const history = useHistory();
     const dispatch = useDispatch();
     const vendor = useSelector((state) => state.vendor);
     const holdConfirmsOrdersList=vendor.holdConfirmsOrdersList;
    return(
        <>
        </>
    )
}
export default HoldConfirmOrders