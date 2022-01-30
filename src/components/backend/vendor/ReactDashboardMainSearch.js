import React, {useEffect} from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {searchOrdersList} from './../../../redux/actions/vendor'

const ReactDashboardMainSearch=()=>{
   const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const vendor = useSelector((state) => state.vendor);
    const allDeliveries = vendor.allDeliveries;
    useEffect(()=>{
      let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        // console.log(staff_admin);
        if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }
        initialSearchBar();


    },[0]);

    const handleOnSelect = (item) => {
      dispatch(searchOrdersList(item));
  };
    const formatResult = (item,otherItems) => {
    // console.log(item);
    return(
        <>
            {/*<div style={{color:'#000'}}>{item}{otherItems}</div>*/}
            <div style={{color:'#000'}}>{item}</div>
        </>
    );
  };
    const handleOnSearch = (string, results) => {
        console.log(string.length);
       if(string.length<1){

            dispatch(searchOrdersList(''));

       }
  };

    const handleOnClear=()=>{
         dispatch(searchOrdersList(''));
    }
    const initialSearchBar=()=>{
        dispatch(searchOrdersList(''));
    }
    return(
        <>
            <ReactSearchAutocomplete
            items={allDeliveries}
            onSearch={handleOnSearch}
            // onHover={handleOnHover}
            onSelect={handleOnSelect}
            onClear={handleOnClear}
            showClear={handleOnClear}
            placeholder="Search by order name"
            // onFocus={handleOnFocus}
            fuseOptions={{ keys: ["packet_name","tex_code","cod"] }}
             resultStringKeyName="tex_code"
             // resultStringKeyName="packet_name"
            // autoFocus
            formatResult={formatResult}
            styling={{ zIndex: '2',color: "#000",hoverBackgroundColor: "#0000", }}
          />
        </>
    );
}
export default ReactDashboardMainSearch