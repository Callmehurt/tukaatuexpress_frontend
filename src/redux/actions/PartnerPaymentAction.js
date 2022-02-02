import {PartnerPaymentTypes} from "../types/PartnerPaymentTypes";
import axios from "axios";

export const fetchPartnerDeliveryDetails = (deliveries) =>
    async (dispatch) => {
        const response = await axios.post('/account/partner/deliveries/details', {
                deliveries: deliveries
        }).catch((err) => {
                console.log(err)
        });
        console.log(response?.data)
        const calculationDetails = {
            statement_num: response?.data.statement_num,
            prev_add_deduct: response?.data.prev_add_deduct,
            total_cod_received: response?.data.total_cod_received,
            total_delivery_charge: response?.data.total_delivery_charge,
            total_pickup_charge: response?.data.total_pickup_charge,
            total_return_charge: response?.data.total_return_charge
        }
        dispatch({
            type: PartnerPaymentTypes.FETCH_DELIVERIES,
            payload: response.data?.deliveries
        });
        dispatch({
            type: PartnerPaymentTypes.FETCH_PICKUPS,
            payload: response.data?.pickups
        });
        dispatch({
            type: PartnerPaymentTypes.FETCH_RETURNS,
            payload: response.data?.returns
        });
        dispatch({
            type: PartnerPaymentTypes.FETCH_CALCULATION_DETAILS,
            payload: calculationDetails
        });

};

export const clearPartnerDeliveryDetails = () =>
    async (dispatch) => {
        dispatch({
            type: PartnerPaymentTypes.CLEAR_PAYMENT_DETAILS
        });
};