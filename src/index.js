import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import {Provider} from "react-redux";
import store from "./redux/store/store";
import {branchAuthenticate} from "./redux/actions/branchAuthenticate";
import {deliveryStaffAuthenticate} from "./redux/actions/deliveryStaffAuthenticate";
import {adminStaffAuthenticate} from "./redux/actions/adminStaffAuthenticate";
import {hrAuthenticate} from "./redux/actions/hrAuthenticate";
import{MainAdminAuthenticate} from "./redux/actions/MainAdminAuthenticate";
import {accountAuthenticate} from "./redux/actions/accountAuthenticate";
import {vendorAuthenticate} from "./redux/actions/vendorAuthenticate";
import {entryOperatorAuthenticate} from './redux/actions/EntryOperator';
import {marketingAuthenticate} from './redux/actions/Marketing';
import { CookiesProvider } from "react-cookie";
import SimpleReactLightbox from 'simple-react-lightbox';
import {PusherProvider, useChannel, useEvent} from "@harelpls/use-pusher";



// axios.defaults.baseURL = 'http://207.180.250.139/backend/public/api';
// axios.defaults.baseURL = 'https://texos.tukaatu.com/api';
// axios.defaults.baseURL = 'https://tukaatuexpress.com/backend/public/api';


axios.defaults.baseURL = 'http://127.0.0.1:8000/api';


// axios.defaults.baseURL = 'https://test.rastriyasecondaryschool.edu.np/api';



let mainAdmin = JSON.parse(localStorage.getItem('main_admin'));
if(mainAdmin){
    store.dispatch(MainAdminAuthenticate(mainAdmin.user));
}

let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
if(branch_detail){
    store.dispatch(branchAuthenticate(branch_detail.user));
}

const staff_delivery = JSON.parse(localStorage.getItem('staff_delivery'));
if(staff_delivery){
    store.dispatch(deliveryStaffAuthenticate(staff_delivery.user));
}

const staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
if(staff_admin){
    store.dispatch(adminStaffAuthenticate(staff_admin.user));
}

const staff_hrAdmin = JSON.parse(localStorage.getItem('staff_hrAdmin'));
if(staff_hrAdmin){
    store.dispatch(hrAuthenticate(staff_hrAdmin.user));
}

const AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
if(AccountStorage){
   store.dispatch(accountAuthenticate(AccountStorage.user));
}
const vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
if(vendorDetail){
   store.dispatch(vendorAuthenticate(vendorDetail.user));
}
const entryOperator= JSON.parse(localStorage.getItem('Entry_Operator'));
console.log(entryOperator+'entry operator index');
if(entryOperator){
   store.dispatch(entryOperatorAuthenticate(entryOperator.user));
}

const marketingAdmin= JSON.parse(localStorage.getItem('marketingAdmin'));
if(marketingAdmin){
    store.dispatch(marketingAuthenticate(marketingAdmin.user));
}

ReactDOM.render(
  // <React.StrictMode>
      <Provider store={store}>
          <CookiesProvider>
               <SimpleReactLightbox>
                    {/*<PusherProvider {...config}>*/}
                       <App />
                    {/*</PusherProvider>*/}
               </SimpleReactLightbox>
          </CookiesProvider>
      </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
