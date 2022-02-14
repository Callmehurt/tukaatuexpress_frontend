import './scss/_base.scss';
import React,{useState,useEffect} from "react";
import 'react-notifications-component/dist/theme.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// main Admin
import AdminLogin from "./components/backend/admin/AdminLogin";
import MainAdminDashboard from "./components/backend/admin/AdminDashboard";
import IsMainAdminPrivateRoute from "./components/privateComponent/MainAdminPrivateRoute";
import AdminBranchesList from "./components/backend/admin/branches/AdminBranchesList";
import BranchesCreate from "./components/backend/admin/branches/BranchesCreate";
import TransferRates from "./components/backend/admin/transferRates/TransferRates";
import Pickup from "./components/backend/admin/pickups/Pickup";
import PickupAssignList from "./components/backend/admin/ActionAreas/PickupAssignList";
import PickupOnTheWay from "./components/backend/admin/ActionAreas/PickupOnTheWay";
import PickupDelivered from "./components/backend/admin/ActionAreas/PickupDelivered";
import WareHouseDatatables from "./components/backend/admin/ActionAreas/WareHouseDatatables";
import MonthlyStatementComponent from "./components/backend/admin/monthlyStatements/MonthlyStatementComponent";
// import TransferCountSetter from "./components/backend/admin/transferRates/TransferCountSetter";
import TransferCountSetter from "./components/backend/admin/transferRates/TransferCountSetter";
import TransferDatatable from "./components/backend/admin/transferRates/TransferDatatable";
//Branch
import BranchLoginPage from "./components/backend/branch/loginPage";
import BranchPrivateRoute from "./components/privateComponent/branchPrivateRoute";
import BranchDashboard from "./components/backend/branch/dashboard";
import Pickups from "./components/backend/branch/pickup";
import CreatePickup from "./components/backend/branch/pickup/create";
import Partners from "./components/backend/branch/vendor";
import DeliveryPersonStatement from "./components/backend/branch/DeliveryStatement/DeliveryPersonStatement";
import DeliveryPerson from "./components/backend/branch/staffs/DeliveryPerson";
import DailyStatement from "./components/backend/branch/DailyStatement/DailyStatement";
import NewRequestPickup from "./components/backend/branch/pickup/NewRequestPickup";
import AllHoldsBranch from './components/backend/branch/ActionArea/AllHolds';
import AllReturnsBranch from "./components/backend/branch/ActionArea/AllReturns";
import TransferInsBranch from "./components/backend/branch/ActionArea/TransferIns";
import TransferOutsBranch from "./components/backend/branch/ActionArea/TransferOuts";

import ForPdfViewer from "./components/backend/branch/ForPdfViewer";

//Frontend
import About from "./components/frontend/pages/about";
import PageHome from "./components/frontend/pages/home";
import FrontendComponent from "./components/frontend/layout";
import Shipping from "./components/frontend/pages/shipping";
import Services from "./components/frontend/pages/services";
import ReactNotification from 'react-notifications-component';

//Staffs
import DeliveryLoginPage from "./components/backend/staff/Deliverylogin";
import IsDeliveryStaff from "./components/privateComponent/deliveryStaffPrivateRoute";
import DeliveryStaffDashboard from "./components/backend/staff/delivery/dashboard";
import AssignedDelivery from "./components/backend/staff/delivery/AssignedDelivery";
import ReceivedDelivery from "./components/backend/staff/delivery/ReceivedDelivery";
import DeliveredDelivery from "./components/backend/staff/delivery/DeliveredDelivery";
import CancelledDelivery from "./components/backend/staff/delivery/CancelledDelivery";
import HoldDelivery from "./components/backend/staff/delivery/HoldDelivery";
import HrStaffEntry from "./components/backend/staff/hr/HrStaffEntry";
import HrStaffMarketing from "./components/backend/staff/hr/HrStaffMarketing";
import HrStaffEntryCreate from "./components/backend/staff/hr/HrStaffEntryCreate";
import HrStaffMarketingCreate from "./components/backend/staff/hr/HrStaffMarketingCreate";


// Account
import AccountPrivateRoute from "./components/privateComponent/AccountPrivateRoute";
import AccountLogin from './components/backend/account/AccountLogin';
import AccountDashboard  from './components/backend/account/AcocuntDashboard';
import AccountDivision from "./components/backend/account/AccountDivision";
import AllStatements from "./components/backend/account/AllStatements";
import PettyCash from "./components/backend/account/PettyCash";
import AccountPickup from "./components/backend/account/AccountPickup";
import PaymentCalculation from "./components/backend/account/PaymentCalculation";
import AllPartners from "./components/backend/account/AllPartners";
import PartnerAllStatement from "./components/backend/account/PartnerAllStatement";
import AccountPartnerRequests from "./components/backend/account/AccountPartnerRequests";
import AccountBranchDailyStatementRequest from "./components/backend/account/AccountBranchDailyStatementRequest";

//Entry Operation
import EntryOperationLogin from "./components/backend/entryOperation/EntryOperationLogin";
import EntryImagePickupCreate from './components/backend/entryOperation/EntryImagePickupCreate';

// Vendor parts
import VendorPrivateRoute from "./components/privateComponent/VendorPrivateRoute";
import VendorPickUpArea from "./components/backend/vendor/VendorPickUpArea";
import VendorCreatePickup from "./components/backend/vendor/VendorCreatePickup";
import VendorAccount from "./components/backend/vendor/VendorAccount";
import RequestPickupImage from "./components/backend/vendor/RequestPickupImage";
import MessageList from "./components/backend/vendor/MessageList";
import MessageDetail from "./components/backend/vendor/MessageDetail";
import VendorPickupCreate from './components/backend/vendor/VendorPickupCreate';
import VendorPickupDetail from "./components/backend/vendor/VendorPickupDetail";
import MessageLayout from "./components/backend/staff/admin/Message/MessageLayout";
import VendorProfile from "./components/backend/vendor/VendorProfile";
import VendorProfileEdit from "./components/backend/vendor/VendorProfileEdit";
import VendorNotification from "./components/backend/vendor/VendorNotification";
import AddCustomerFromVendor from "./components/backend/vendor/AddCustomerFromVendor";
import PickupRequestArea from "./components/backend/vendor/PickupRequestArea";
import PickupImageRequestDetail from "./components/backend/vendor/PickupImageRequestDetail";
import VendorReturnsArea from "./components/backend/vendor/VendorReturnsArea";
import VendorHoldArea from "./components/backend/vendor/VendorHoldArea";
import RequestPickupImageCapture from "./components/backend/vendor/RequestPickupImageCapture";
import AllPartnerOrders from "./components/backend/vendor/AllPartnerOrders";
import ReactAllSearch from "./components/backend/vendor/ReactAllSearch";
import AllCustomerList from "./components/backend/vendor/AllCustomerList";
import PasswordChangeVendor from "./components/backend/vendor/PasswordChangeVendor";


//staffadmin
import StaffLoginPage from "./components/backend/staff/login";
import AdminStaffDashboard from "./components/backend/staff/admin/Admindashboard";
import IsAdminStaff from "./components/privateComponent/AdminPrivateRoute";
import AdminStaffpartners from "./components/backend/staff/admin/vendor";
import AdminStaffpickups from "./components/backend/staff/admin/pickup/pickup";
import AdminStaffCreatepickups from "./components/backend/staff/admin/pickup/create";
import AdminStaffWareHouse from "./components/backend/staff/admin/ActionArea/WareHouse";
import AdminStaffAllHold from "./components/backend/staff/admin/ActionArea/AllHold";
import AdminStaffAllReturns from "./components/backend/staff/admin/ActionArea/AllReturns";
import AdminStaffTransferIn from "./components/backend/staff/admin/ActionArea/TransferIn";
import AdminStaffTransferOut from "./components/backend/staff/admin/ActionArea/TransferOut";
import PartnerDetail from "./components/backend/staff/admin/vendor";
import AdminSentForDelivery from './components/backend/staff/admin/ActionArea/SentForDelivery';
import AdminAllDelivered from "./components/backend/staff/admin/ActionArea/AllDelivered";
import PickupRequest from "./components/backend/staff/admin/ActionArea/PickupRequest";
import ViewPickupRequestDetail from "./components/backend/staff/admin/ActionArea/ViewPickupRequestDetail";
import ImageEntryPickupCreate from "./components/backend/staff/admin/ActionArea/ImageEntryPickupCreate";
import SinglePickupDetail from "./components/backend/staff/admin/ActionArea/SinglePickupDetail";
import VendorReturnPickup from "./components/backend/staff/admin/vendor/VendorReturnPickup";


// staff HR
import HrLogin from  "./components/backend/staff/HrLogin";
import HrPrivateRoute from "./components/privateComponent/HrPrivateRoute";
import HrAdminDashboard from "./components/backend/staff/hr/HrAdminDashboard";
import HrStaffCreate from "./components/backend/staff/hr/HrStaffCreate";
import HrStaffList from "./components/backend/staff/hr/HrStaffList";
// import HrCommissionAllotment from "./components/backend/staff/hr/CommissionAllotment"
import IDCard from "./components/backend/staff/hr/IDCard";

import VendorDashboard from "./components/backend/vendor/VendorDashboard";
import {useDispatch, useSelector} from "react-redux";
// import UrlArray from "./includeArray/UrlArray";
import ViewPickupProceededRequestDetail
    from "./components/backend/staff/admin/ActionArea/ViewPickupProceededRequestDetail";
import {FullScreen,useFullScreenHandle} from "react-full-screen";

// Entry Operator
import EntryOperatorPrivateRoute from "./components/privateComponent/EntryOperatorPrivateRoute";
import EntryDashboard from './components/backend/entryOperation/Dashboard';
import EntryPickupRequest from './components/backend/entryOperation/PickupRequest';

//Marketing
import MarketingLogin from "./components/backend/marketing/MarketingLogin";
import MarketingPrivateRoute from "./components/privateComponent/MarketingPrivateRoute";
import MarketingDashboard from './components/backend/marketing/MarketingDashboard';
import MarketingPartner from "./components/backend/marketing/MarketingPartner";
import MarketingPartnerBanner from "./components/backend/marketing/MarketingPartnerBanner";
import MarketingNotices from "./components/backend/marketing/MarketingNotices";
import MarketingEvent from "./components/backend/marketing/MarketingEvent";


//Profile
import Profile from './components/frontend/profile/Profile';

function App() {

  return (
      <>
        <Router>
                  <div className="App">
                      <ReactNotification/>
                      <Switch>
                          {/*<Route path="/main_admin/login" component={AdminLogin} />*/}
                           <Route exact path="/main_admin" component={AdminLogin} />
                           <Route exact path="/main_admin/login" component={AdminLogin} />
                          <Route exact path="/branch/login" component={BranchLoginPage} />
                          <Route exact path="/branch" component={BranchLoginPage} />
                          <Route exact path="/admin/login" component={StaffLoginPage} />
                          <Route exact path="/delivery/login" component={DeliveryLoginPage} />
                          <Route exact path="/hr/login" component={HrLogin} />
                          <Route  exact  path="/account/login" component={AccountLogin} />
                           <Route  exact  path="/entry/login" component={EntryOperationLogin} />
                          <Route  exact  path="/marketing/login" component={MarketingLogin} />
                          <Route  exact path="/pdf_viewer" component={ForPdfViewer} />



                          <FrontendComponent path='/' exact component={PageHome}/>
                          <FrontendComponent path='/about'  exact component={About}/>
                          <FrontendComponent path='/services'  exact component={Services}/>
                          <FrontendComponent path='/shipping'  exact component={Shipping}/>

                          <HrPrivateRoute path='/hr/dashboard' exact  component={HrAdminDashboard} />
                          <HrPrivateRoute path='/hr/staff/create' exact component={HrStaffCreate} />
                          <HrPrivateRoute path="/hr/staff/list" exact  component={HrStaffList}  />
                          <HrPrivateRoute path="/hr/staff/entry_operator" exact  component={HrStaffEntry}  />
                          <HrPrivateRoute path="/hr/staff/marketing" exact  component={HrStaffMarketing}  />
                           <HrPrivateRoute path='/hr/staff/entry_create' exact component={HrStaffEntryCreate} />
                           <HrPrivateRoute path='/hr/staff/marketing_create' exact component={HrStaffMarketingCreate} />
                          <HrPrivateRoute path="/hr/id-card-list" exact component={IDCard}  />

                          <IsMainAdminPrivateRoute exact path="/mainadmin/dashboard" component={MainAdminDashboard} />
                          <IsMainAdminPrivateRoute exact path="/mainadmin/branches" component={AdminBranchesList} />
                          <IsMainAdminPrivateRoute exact path="/mainadmin/branch/create" component={BranchesCreate} />
                          <IsMainAdminPrivateRoute exact path="/mainadmin/branch/transfer_rates" component={TransferRates} />
                          <IsMainAdminPrivateRoute exact path="/mainadmin/branch/pickups" component={Pickup} />
                          <IsMainAdminPrivateRoute exact path="/mainadmin/branch/assigns" component={PickupAssignList} />
                          <IsMainAdminPrivateRoute exact path="/mainadmin/branch/ontheways" component={PickupOnTheWay} />
                           <IsMainAdminPrivateRoute exact path="/mainadmin/branch/Delivered" component={PickupDelivered} />
                           <IsMainAdminPrivateRoute exact path="/mainadmin/branch/Warehouse" component={WareHouseDatatables} />
                           {/*<IsMainAdminPrivateRoute exact path="/mainadmin/branch/transfer_table" component={TransferDatatable} />*/}
                           <IsMainAdminPrivateRoute exact path="/mainadmin/branch/transfer_table" component={TransferCountSetter} />
                          <IsMainAdminPrivateRoute exact path="/mainadmin/monthly_statement" component={MonthlyStatementComponent} />


                          <BranchPrivateRoute exact path="/branch/dashboard" component={BranchDashboard} />
                          <BranchPrivateRoute exact path="/branch/pickups" component={Pickups} />
                          <BranchPrivateRoute exact path="/branch/pickups-create" component={CreatePickup} />
                          <BranchPrivateRoute exact path="/branch/partners" component={Partners} />
                          <BranchPrivateRoute exact path="/branch/delivery_person_statement" component={DeliveryPersonStatement} />
                          <BranchPrivateRoute exact path="/branch/deliverypersons" component={DeliveryPerson} />
                          <BranchPrivateRoute exact path="/branch/daily_statement" component={DailyStatement} />
                          <BranchPrivateRoute exact path="/branch/newpickuplist" component={NewRequestPickup} />
                          <BranchPrivateRoute exact path="/branch/allholds" component={AllHoldsBranch} />
                          <BranchPrivateRoute exact path="/branch/allreturns" component={AllReturnsBranch} />
                          <BranchPrivateRoute exact path="/branch/transferins" component={TransferInsBranch} />
                          <BranchPrivateRoute exact path="/branch/transferouts" component={TransferOutsBranch} />

                          {/*DeliveryPersonStatement*/}



                          <IsDeliveryStaff exact path="/staff/delivery/dashboard" component={DeliveryStaffDashboard}/>
                          <IsDeliveryStaff exact path="/staff/delivery/assigned" component={AssignedDelivery}/>
                          <IsDeliveryStaff exact path="/staff/delivery/received" component={ReceivedDelivery}/>
                          <IsDeliveryStaff exact path="/staff/delivery/delivered" component={DeliveredDelivery}/>
                          <IsDeliveryStaff exact path="/staff/delivery/cancelled" component={CancelledDelivery}/>
                          <IsDeliveryStaff exact path="/staff/delivery/hold" component={HoldDelivery}/>


                          <IsAdminStaff exact path="/staff/admin/dashboard" component={AdminStaffDashboard} />

                          <IsAdminStaff exact path="/staff/admin/partners" component={AdminStaffpartners} />
                          <IsAdminStaff exact path="/staff/admin/pickups" component={AdminStaffpickups} />
                          <IsAdminStaff exact path="/staff/admin/create-pickups" component={AdminStaffCreatepickups} />
                          <IsAdminStaff exact path="/staff/admin/warehouse" component={AdminStaffWareHouse} />
                          <IsAdminStaff exact path="/staff/admin/allholds" component={AdminStaffAllHold} />
                          <IsAdminStaff exact path="/staff/admin/allreturns" component={AdminStaffAllReturns} />
                           <IsAdminStaff exact path="/staff/admin/transferin" component={AdminStaffTransferIn} />
                           <IsAdminStaff exact path="/staff/admin/transferout" component={AdminStaffTransferOut} />
                           <IsAdminStaff exact path="/staff/admin/partner" component={PartnerDetail} />
                           <IsAdminStaff exact path="/staff/admin/message" component={MessageLayout} />
                           <IsAdminStaff exact path="/staff/admin/sentfordelivery" component={AdminSentForDelivery} />
                           <IsAdminStaff exact path="/staff/admin/alldelivered" component={AdminAllDelivered} />
                           <IsAdminStaff exact path="/staff/admin/pickup_request" component={PickupRequest} />
                           <IsAdminStaff exact path="/staff/admin/pickup_request_detail" component={ViewPickupRequestDetail} />
                           <IsAdminStaff exact path="/staff/admin/proceeded_request_detail" component={ViewPickupProceededRequestDetail} />
                           <IsAdminStaff exact path="/staff/admin/pickup_create_image" component={ ImageEntryPickupCreate} />
                           <IsAdminStaff exact path="/staff/admin/pickup_detail" component={ SinglePickupDetail} />
                           <IsAdminStaff exact path="/staff/admin/partner/return/list/:partner_id" exact component={ VendorReturnPickup} />




                          {/*<AccountPrivateRoute path="/account/login" component={AccountLogin} />*/}
                          <AccountPrivateRoute exact path="/account/dashboard" component={AccountDashboard} />
                          <AccountPrivateRoute exact path="/account/account_division" component={AccountDivision} />
                          <AccountPrivateRoute exact path="/account/all_statements" component={AllStatements} />
                          <AccountPrivateRoute exact path="/account/all_partner" component={AllPartners} />
                          <AccountPrivateRoute exact path="/account/petty_cash" component={PettyCash} />
                          <AccountPrivateRoute exact path="/account/pickup" component={AccountPickup} />
                          <AccountPrivateRoute exact path="/account/partnerallstatements" component={PartnerAllStatement} />
                          <AccountPrivateRoute exact path="/account/paymentcalculation" component={PaymentCalculation} />
                          <AccountPrivateRoute exact path="/account/partner_requests" component={AccountPartnerRequests} />
                          <AccountPrivateRoute exact path="/account/branch_daily_statement_request" component={AccountBranchDailyStatementRequest} />

                          // entry Operator
                          <EntryOperatorPrivateRoute exact path="/entry_operation/dashboard" component={EntryDashboard} />
                          <EntryOperatorPrivateRoute exact path="/entry_operation/pickup_request" component={EntryPickupRequest} />
                          <EntryOperatorPrivateRoute exact path="/entry_operation/create/entry/image/pickup" component={EntryImagePickupCreate} />

                          //Marketing
                          <MarketingPrivateRoute exact path="/marketing/dashboard" component={MarketingDashboard} />
                          <MarketingPrivateRoute exact path="/marketing/partner" component={MarketingPartner} />
                          <MarketingPrivateRoute exact path="/marketing/banner" component={MarketingPartnerBanner} />
                          <MarketingPrivateRoute exact path="/marketing/notices" component={MarketingNotices} />
                          <MarketingPrivateRoute exact path="/marketing/events" component={MarketingEvent} />
                          {/*<MarketingPrivateRoute exact path="/marketing/events" component={MarketingNotices} />*/}



                          {/*vendor */}
                          <VendorPrivateRoute exact path="/vendor/dashboard" component={VendorDashboard} />
                          {/*<VendorPrivateRoute path="/vendor/search" component={VendorDashboardSearchTest} />*/}
                           <VendorPrivateRoute exact path="/vendor/pickup_area" component={VendorPickUpArea} />
                           <VendorPrivateRoute exact path="/vendor/create_pickup" component={VendorCreatePickup} />
                           <VendorPrivateRoute exact path="/vendor/account" component={VendorAccount} />
                          <VendorPrivateRoute exact path="/vendor/request_image" component={RequestPickupImage} />
                          <VendorPrivateRoute exact path="/vendor/message_list" component={MessageList} />
                          <VendorPrivateRoute exact path="/vendor/message_detail" component={ MessageDetail} />
                          <VendorPrivateRoute exact path="/vendor/request_pickup" component={ VendorPickupCreate} />
                          <VendorPrivateRoute exact path="/vendor/pickup_detail" component={ VendorPickupDetail} />
                          <VendorPrivateRoute exact path="/vendor/profile" component={VendorProfile} />
                           <VendorPrivateRoute exact path="/vendor/edit/profile" component={VendorProfileEdit} />
                          <VendorPrivateRoute exact path="/vendor/notification" component={VendorNotification} />
                           <VendorPrivateRoute exact path="/vendor/add_customer" component={AddCustomerFromVendor} />
                          <VendorPrivateRoute exact path="/vendor/Pickup_request_area" component={PickupRequestArea} />
                          <VendorPrivateRoute exact path="/vendor/Pickup_request_images" component={PickupImageRequestDetail} />
                          <VendorPrivateRoute exact path="/vendor/returns_area" component={VendorReturnsArea} />
                          <VendorPrivateRoute exact path="/vendor/hold_area" component={VendorHoldArea} />
                           <VendorPrivateRoute exact path="/vendor/Pickup_capture" component={RequestPickupImageCapture} />
                           <VendorPrivateRoute exact path="/vendor/partner_orders" component={AllPartnerOrders} />
                          <VendorPrivateRoute exact path="/vendor/all_search" component={ReactAllSearch} />
                          <VendorPrivateRoute exact path="/vendor/all_customer" component={AllCustomerList} />
                           <VendorPrivateRoute exact path="/vendor/change_password" component={PasswordChangeVendor} />


                           {/* Profile page */}
                           <Route path="/verified/employee/:card_num" component={Profile} />

                      </Switch>
                  </div>
              </Router>
      </>

  );
}

export default App;
