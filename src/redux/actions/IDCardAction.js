import axios from "axios";
import {HrAdminTypes} from "../types/HrAdminTypes";
import checkToken from "../../utils/checkToken";

export const fetchIDCardRecords = () =>
    async (dispatch) => {
            let hrAdmin = JSON.parse(localStorage.getItem('staff_hrAdmin'));
            const token = hrAdmin.token;
            checkToken(token, 'staff_hrAdmin')
            const response = await axios.get('/hr/id-card/list', {
                 headers: {
                            'Authorization': `Bearer ${token}`
                    }
            }).catch((err) => {
                    console.log(err)
            });
            dispatch({
            type: HrAdminTypes.SET_ID_CARD_LIST,
            payload: response.data
            });

    }