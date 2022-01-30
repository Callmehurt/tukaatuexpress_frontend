import {HrAdminTypes} from "../types/HrAdminTypes";

const initialState = {
      DeliveryList:[],
      deliveryPersonForCommission:[],
      allRolesLists:[],
      allEntryOperatorList:[],
      allMarketingList:[],

    }
    const HrAdminReducer=(state = initialState, action)=>{

         switch (action.type) {
            case HrAdminTypes.STAFF_DELIVERY_LIST:
                return {
                    ...state,
                    DeliveryList: action.payload
                }
                case HrAdminTypes.DELIVERY_PERSON_FOR_COMMISSION:
                return {
                    ...state,
                    deliveryPersonForCommission: action.payload
                }
                case HrAdminTypes.STAFF_ROLES:
                return {
                    ...state,
                    allRolesLists: action.payload
                }
                case HrAdminTypes.ENTRY_OPERATOR_LIST:
                return {
                    ...state,
                    allEntryOperatorList: action.payload
                }
                case HrAdminTypes.MARKETING_LIST:
                return {
                    ...state,
                    allMarketingList: action.payload
                }

            default:
                return state;
        }
    }

    export default HrAdminReducer