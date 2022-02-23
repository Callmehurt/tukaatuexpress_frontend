import {PartnerPaymentTypes} from "../types/PartnerPaymentTypes";
import axios from "axios";

export const fetchPartnerDeliveryDetails = (deliveries) =>
    async (dispatch) => {
        const response = await axios.post('/account/partner/deliveries/details', {
                deliveries: deliveries
        }).catch((err) => {
                console.log(err)
        });
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


export const fetchPartnerDiscountScheme = (partner_id) =>
    async (dispatch) => {
        const res = await axios.get(`/account/partner/discount/scheme/${partner_id}`).catch((err) => {
            console.log(err)
        })
        dispatch({
            type: PartnerPaymentTypes.FETCH_DISCOUNT_SCHEME,
            payload: await res.data
        })
    }

export const clearPartnerDeliveryDetails = () =>
    async (dispatch) => {
        dispatch({
            type: PartnerPaymentTypes.CLEAR_PAYMENT_DETAILS
        });
};