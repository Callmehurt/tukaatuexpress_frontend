import {BranchOperationTypes} from "../types/BranchOperationTypes";

const initialState = {
      allHoldList:[],
      assignedDeliveryList:[],
      assignedDeliverySameDayList:[],
      allReturnList:[],
      allHoldsListSameDay:[],
      allReturnsListSameDay:[],
      warehouseListsSameDay:[],
      transferInsListsSameDay:[],
      transferOutListsSameDay:[],
      newPickupsSameDay:[],
      sentForDelivery:[],
      sentForDeliverySameDay:[],
      deliveredList:[],
      deliveredListSameDay:[],
      allPickUpsForMessage:[],
    MessageDisplay:[],
    partnerRequest:[],
    partnerRequestDetail:[],
    partnerProceededRequestDetail:[],
    entryDetailPartnerRequest:[],
    entryDetailPartnerProceededRequest:[],
    currentCustomerAddedOperation:'',
    allProcessRequest:[],
    allCompleteRequest:[],
    allPrintData:[],
    allIncomingCancel:[],
    allIncomingCancelSameDay:[],
    transferOutsComplete:[],
    transferOutsCompleteSameDay:[],
    productExchangeItemsOperation: [],
    CustomerReplaceItemsOperation:[],
    singlePickupDetailOperation:[],
    singlePickupDetailCoordinate:[],
    allPrintOrderData:[],
    allVendorReturnList:[],
    vendorReturnPendingStatement:[],
    vendorReturnApprovedStatement:[],
     printSelectedData:[],
    allSuperSearch:[],
    }
const BranchOperationReducer=(state=initialState, action)=>{
    switch (action.type) {
            case BranchOperationTypes.All_Hold_list:
                return {
                    ...state,
                   allHoldList: action.payload
                }
                 case BranchOperationTypes.SINGLE_PICKUP_DETAIL:
                return {
                    ...state,
                   singlePickupDetailOperation: action.payload
                }
                case BranchOperationTypes.SINGLE_PICKUP_DETAIL_COORDINATE:
                return {
                    ...state,
                   singlePickupDetailCoordinate: action.payload
                }
             case BranchOperationTypes.ASSIGNED_LIST:
                return {
                    ...state,
                   assignedDeliveryList: action.payload
                }

            case BranchOperationTypes.ASSIGNED_SAME_DAY_LIST:
            return {
                ...state,
               assignedDeliverySameDayList: action.payload
            }
            case BranchOperationTypes.All_Hold_list_SAME_DAY:
            return {
                ...state,
               allHoldsListSameDay: action.payload
            }
            case BranchOperationTypes.ALL_RETURNS_LIST:
            return {
                ...state,
                allReturnList: action.payload
                }
            case BranchOperationTypes.ALL_RETURNS_LIST_SAME_DAY:
            return {
                ...state,
                allReturnsListSameDay: action.payload
                }
            case BranchOperationTypes.WAREHOUSE_PRODUCT_LIST_SAME_DAY:
            return {
                ...state,
                warehouseListsSameDay: action.payload
                }
            case BranchOperationTypes.TRANSFER_INS_LIST_SAME_DAY:
            return {
                ...state,
                transferInsListsSameDay: action.payload
                }
            case BranchOperationTypes.TRANSFER_OUT_LIST_SAME_DAY:
            return {
                ...state,
                transferOutListsSameDay: action.payload
                }
            case BranchOperationTypes.NEW_PICK_SAME_DAY_LIST:
            return {
                ...state,
                newPickupsSameDay: action.payload
                }
            case BranchOperationTypes.SENT_FOR_DELIVERY:
            return {
                ...state,
                sentForDelivery: action.payload
                }
            case BranchOperationTypes.SENT_FOR_DELIVERY_SAME_DAY:
            return {
                ...state,
                sentForDeliverySameDay: action.payload
                }
            case BranchOperationTypes.DELIVERED_LIST:
            return {
                ...state,
                deliveredList: action.payload
                }
            case BranchOperationTypes.DELIVERED_LIST_SAME_DAY:
            return {
                ...state,
                deliveredListSameDay: action.payload
                }
            case BranchOperationTypes.ALL_PICKUP_LIST:
            return {
                ...state,
                allPickUpsForMessage: action.payload
                }
            case BranchOperationTypes.GET_MESSAGE_DETAIL:
            return {
                ...state,
                MessageDisplay: action.payload
                }
                case BranchOperationTypes.IMAGE_PARTNER_REQUEST:
                return {
                    ...state,
                    partnerRequest: action.payload
                    }
                case BranchOperationTypes.IMAGE_PARTNER_REQUEST_DETAIL:
                return {
                    ...state,
                    partnerRequestDetail: action.payload
                    }
                case BranchOperationTypes.IMAGE_PARTNER_PROCEEDED_REQUEST_DETAIL:
                return {
                    ...state,
                    partnerProceededRequestDetail: action.payload
                    }
                case BranchOperationTypes.ENTRY_PARTNER_REQUEST_DETAIL:
                return {
                    ...state,
                    entryDetailPartnerRequest: action.payload
                    }
                case BranchOperationTypes.ENTRY_PARTNER_PROCEEDED_REQUEST_DETAIL:
                return {
                    ...state,
                    entryDetailPartnerProceededRequest: action.payload
                    }
                    case BranchOperationTypes.OPERATION_CURRENT_CUSTOMER_ADDED:
                return {
                    ...state,
                    currentCustomerAddedOperation: action.payload
                    }
                 case BranchOperationTypes.PROCESS_REQUEST_LIST:
                return {
                    ...state,
                    allProcessRequest: action.payload
                    }
                    case BranchOperationTypes.COMPLETE_REQUEST_LIST:
                return {
                    ...state,
                    allCompleteRequest: action.payload
                    }
                    case BranchOperationTypes.PRINT_DATA_ORDER:
                return {
                    ...state,
                    allPrintData: action.payload
                    }
                     case BranchOperationTypes.INCOMING_CANCEL_LIST:
                return {
                    ...state,
                    allIncomingCancel: action.payload
                    }
                    case BranchOperationTypes.INCOMING_CANCEL_SAME_DAY_LIST:
                return {
                    ...state,
                    allIncomingCancelSameDay: action.payload
                    }
                case BranchOperationTypes.TRANSFER_OUTS_COMPLETE:
                return {
                    ...state,
                    transferOutsComplete: action.payload
                    }
                     case BranchOperationTypes.TRANSFER_OUTS_COMPLETE_SAME_DAY:
                return {
                    ...state,
                    transferOutsCompleteSameDay: action.payload
                    }
                    case BranchOperationTypes.PRODUCT_EXCHANGE_ITEMS:
                return {
                    ...state,
                    productExchangeItemsOperation: action.payload
                    }
                     case BranchOperationTypes.CUSTOMER_REPLACE_ITEMS:
                return {
                    ...state,
                    CustomerReplaceItemsOperation: action.payload
                    }
                    case BranchOperationTypes.PRINT_ALL_ORDER:
                return {
                    ...state,
                    allPrintOrderData: action.payload
                    }
                    case BranchOperationTypes.VENDOR_RETURN_LIST:
                return {
                    ...state,
                    allVendorReturnList: action.payload
                    }
                    case BranchOperationTypes.VENDOR_RETURN_PENDING_STATEMENT:
                return {
                    ...state,
                    vendorReturnPendingStatement: action.payload
                    }
                    case BranchOperationTypes.VENDOR_RETURN_APPROVED_STATEMENT:
                return {
                    ...state,
                    vendorReturnApprovedStatement: action.payload
                    }
                    case BranchOperationTypes.PRINT_SELECTED_DATA:
                return {
                    ...state,
                    printSelectedData: action.payload
                    }
                    case BranchOperationTypes.SUPER_SEARCH:
                return {
                    ...state,
                    allSuperSearch: action.payload
                    }
            default:
                return state;
        }
}

export default BranchOperationReducer