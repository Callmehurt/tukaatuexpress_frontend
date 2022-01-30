import {combineReducers} from 'redux';
import branchAuthReducer from '../reducers/branchAuthReducer';
import deliveryStaffAuthReducer from "./deliveryStaffAuthReducer";
import loadPartnerListReducer from "./loadPartnerListReducer";
import adminStaffAuthReducer from "./adminStaffAuthReducer";
import updatePartnerReducer from "./updatePartnerReducer";
import NewPickupListReducer from "./newPickupListReducer";
import wareHouseReducer from "./wareHouseReducer";
import hrAuthReducer from "./hrAuthReducer";
import deliveryStaffReducer from "./deliveryStaffReducer";
import mainAdminAuthenticateReducer from "./mainAdminAuthenticateReducer";
import AdminBranchesReducer from "./AdminBranchesReducer";
import HrAdminReducer from "./HrAdminReducer";
import TransferReducer from "./TransferReducer";
import MainBranchesReducer from "./MainBranchesReducer";
import AccountAuthReducer from "./AccountAuthReducer";
import AccountAdminReducer from "./AccountAdminReducer";
import vendorAuthReducer from './vendorAuthReducer';
import VendorReducer from './VendorReducer';
import MainAdminReducer from "./MainAdminReducer";
import BranchOperationReducer from "./BranchOperationReducer";
import AppReducer from "./AppReducer";
import {monthlyStatementReducer} from "./monthlyStatementReducer";
import {idCardReducer} from "./IDCardReducer";

//Entry Operator
import EntryOperatorAuthReducer from "./EntryOperatorAuthReducer";
import EntryOperatorReducer from "./EntryOperatorReducer";

import MarketingAuthReducer from "./MarketingAuthReducer";
import MarketingReducer from "./MarketingReducer";

const rootReducer = combineReducers({

    mainAdminAuth:mainAdminAuthenticateReducer,
    mainAdmin:MainAdminReducer,
    adminBranches:AdminBranchesReducer,
    monthlyStatementDetails: monthlyStatementReducer,

    branchAuth: branchAuthReducer,
    mainBranches: MainBranchesReducer,

    deliveryStaffAuth: deliveryStaffAuthReducer,
    deliveryStaff:deliveryStaffReducer,

    partnerList: loadPartnerListReducer,
    updatePartner: updatePartnerReducer,
    adminStaffAuth: adminStaffAuthReducer,
    newpickuplist: NewPickupListReducer,
    warehouseList: wareHouseReducer,
    transfer:TransferReducer,
    branchOperation:BranchOperationReducer,

    hrAuth:hrAuthReducer,
    hrAdmin:HrAdminReducer,

    accountAuth:AccountAuthReducer,
    accountAdmin:AccountAdminReducer,

    vendorAuth:vendorAuthReducer,
    vendor:VendorReducer,

    appSetting:AppReducer,

    entryOperatorAuth:EntryOperatorAuthReducer,
    entryOperator:EntryOperatorReducer,

    marketingAuth:MarketingAuthReducer,
    marketing:MarketingReducer,

    idCard: idCardReducer


})

export default rootReducer;