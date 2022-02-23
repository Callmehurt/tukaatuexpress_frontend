import {PartnerPaymentTypes} from "../types/PartnerPaymentTypes";

const initialState = {
    deliveries: [],
    pickups: [],
    returns: [],
    discountScheme: {},
    calculationDetails: {
        statement_num: '',
        prev_add_deduct: 0,
        total_cod_received: 0,
        total_delivery_charge: 0,
        total_pickup_charge: 0,
        total_return_charge: 0
    }
}

export const PartnerPaymentReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case PartnerPaymentTypes.FETCH_DELIVERIES:
            return {...state, deliveries: payload};
        case PartnerPaymentTypes.FETCH_PICKUPS:
            return {...state, pickups: payload};
        case PartnerPaymentTypes.FETCH_RETURNS:
            return {...state, returns: payload};
        case PartnerPaymentTypes.FETCH_DISCOUNT_SCHEME:
            return {...state, discountScheme: payload};
        case PartnerPaymentTypes.CLEAR_PAYMENT_DETAILS:
            return {...state,
                deliveries: [],
                pickups: [],
                returns: [],
                calculationDetails: {
                    statement_num: '',
                    prev_add_deduct: 0,
                    total_cod_received: 0,
                    total_delivery_charge: 0,
                    total_pickup_charge: 0,
                    total_return_charge: 0
                }
            };
        case PartnerPaymentTypes.FETCH_CALCULATION_DETAILS:
            return {...state, calculationDetails: {
                statement_num: payload.statement_num,
                prev_add_deduct: payload.prev_add_deduct,
                total_cod_received: payload.total_cod_received,
                total_delivery_charge: payload.total_delivery_charge,
                total_pickup_charge: payload.total_pickup_charge,
                total_return_charge: payload.total_return_charge,

                }};
        default:
            return state;
    }
}