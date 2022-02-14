import {PartnerReturnStatementTypes} from "../types/PartnerReturnStatementTypes";
import axios from "axios";
import notification from "../../components/backend/includes/notification";

export const fetchPartnerReturnDetails = (partner_id) =>
    async (dispatch) => {
        const response = await axios.get(`/admin/partner/packet/return/list/${partner_id}`).catch((err) => {
            console.log(err)
        });
        dispatch({
            type: PartnerReturnStatementTypes.FETCH_RETURNED_DELIVERIES,
            payload: response.data?.all_returns
        });
};

export const fetchPartnerReturnStatements = (partner_id) =>
    async (dispatch) => {
        const response = await axios.get(`/admin/partner/return/statement/list/${partner_id}`).catch((err) => {
            console.log(err)
        })
        dispatch({
            type: PartnerReturnStatementTypes.FETCH_PENDING_RETURN_STATEMENTS,
            payload: response.data?.pending
        });
        dispatch({
            type: PartnerReturnStatementTypes.FETCH_APPROVED_RETURN_STATEMENTS,
            payload: response.data?.approved
        })
    }


export const removePartnerReturnDetails = () =>
    async (dispatch) => {
        dispatch({
            type: PartnerReturnStatementTypes.REMOVE_DETAILS
        })
    }


export const makePartnerReturnStatement = (details) =>
    async (dispatch) => {
        const response = await axios.post(`/admin/make/partner/return/statement`, details).catch((err) => {
            console.log(err)
        })

        if(response.data?.status === true){
            dispatch(fetchPartnerReturnDetails(details.partner_id));
            dispatch(fetchPartnerReturnStatements(details.partner_id));
            notification('success', response.data?.message);
            return true;
        }else {
            notification('danger', response.data?.message);
            return false;
        }

    }


export const fetchSelectedReturnStatementDetail = (statement_id) =>
    async (dispatch) => {
        const res = await axios.get(`/admin/view/return/statement/${statement_id}`).catch((err) => {
            console.log(err)
        })

        dispatch({
            type: PartnerReturnStatementTypes.FETCH_SELECTED_STATEMENT_DELIVERIES,
            payload: res?.data
        })

        console.log(res)
    }


export const clearSelectedReturnStatementDetail = () =>
    async (dispatch) => {
        dispatch({
            type: PartnerReturnStatementTypes.CLEAR_SELECTED_STATEMENT_DELIVERIES
        })
    }