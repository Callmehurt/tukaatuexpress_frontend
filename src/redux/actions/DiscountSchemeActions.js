import axios from "axios";
import {DiscountActionTypes} from "../types/DiscountActionTypes";

export const fetchDiscountSchemes = () =>
     async (dispatch) => {
            await axios.get('/marketing/discount/schemes').then((res) => {
                dispatch({
                    type: DiscountActionTypes.FETCH_DISCOUNT_SCHEMES,
                    payload: res.data
                })
            }).catch((err) => {
                console.log(err)
            })
        }

export const fetchMarketerRegisteredPartners = () =>
     async (dispatch) => {
            await axios.get('/marketing/my/registered/partners').then((res) => {
                dispatch({
                    type: DiscountActionTypes.FETCH_REGISTERED_PARTNERS,
                    payload: res.data
                })
            }).catch((err) => {
                console.log(err)
            })
        }



export const submitDiscountScheme = (details) =>
    async () => {
        const res = await axios.post('/marketing/store/discount/scheme', {
            discountType: details.discountType,
            discountValue: details.discountValue
        }).catch((err) => {
            console.log(err)
        })

        return res;
    }


export const applyDiscountScheme = (details) =>
    async () => {
        const res = await axios.post('/marketing/apply/discount/scheme', {
            discount_type: details.discount_type,
            partner_id: details.partner_id
        }).catch((err) => {
            console.log(err)
        })

        return res;
    }


export const updateDiscountScheme = (details) =>
    async () => {
        const res = await axios.put('/marketing/update/discount/scheme', {
            discount_type: details.discount_type,
            partner_id: details.partner_id
        }).catch((err) => {
            console.log(err)
        })
        return res;
    }