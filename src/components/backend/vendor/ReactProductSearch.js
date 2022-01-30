import React, {useEffect, useState} from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import{Row,Col,Form} from 'react-bootstrap';
import {useHistory, useLocation} from "react-router-dom";
import {AiFillCheckCircle} from 'react-icons/ai';
import {useDispatch, useSelector} from "react-redux";
import {searchOrdersList} from './../../../redux/actions/vendor'
import Select from "react-select";

const ReactProductSearch=()=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const location=useLocation();
    const [searchSelectItem,setSearchSelectItem]=useState('packet_name');
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
    const initialSearchBar=()=>{
        dispatch(searchOrdersList(''));
    }
    const handleOnSelect = (item) => {
        console.log('search order List');
      dispatch(searchOrdersList(item));
      console.log(item);
    };
    const formatResult = (item,otherItems) => {
    console.log(item);
     console.log(otherItems);
    console.log("item search result");
    return(
        <>
            <Row style={{width:'100%'}}>
                <Col xs={10}>
                  <span>{item}</span>
                </Col>
                <Col xs={2}>
                  <span> <AiFillCheckCircle style={{color:'green'}} /> </span>
                </Col>

            </Row>
        </>
    );
  };
    const handleOnSearch = (string, results) => {
        // console.log(string.length);
       if(string.length<1){

            dispatch(searchOrdersList(''));

       }
  };
    const options = [
        {value: 'packet_name', label: 'packet_name',name:'searchSelect'},
        {value: 'tex_code', label: 'tex_code',name:'searchSelect'},
        {value: 'payment_status', label: 'payment_status',name:'searchSelect'}
    ]

    const handleOnClear=()=>{
         dispatch(searchOrdersList(''));
    }
    const selectChange = event => {
         setSearchSelectItem(event.value);

    }

    return(
        <>
            <Row>

                <Col xs={3}>
                    <Select
                        className="basic-single mt-2"
                        classNamePrefix="select"
                        defaultValue={options[0]}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        placeholder="== Choose  =="
                        options={options}
                        onChange={(event) => selectChange(event)}
                    />

                </Col>
                <Col xs={9}>
                        <ReactSearchAutocomplete
                        items={allDeliveries}
                        onSearch={handleOnSearch}
                        // onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onClear={handleOnClear}
                        showClear={handleOnClear}
                        placeholder="Search by order name"
                        // onFocus={handleOnFocus}
                        fuseOptions={{ keys: ["packet_name", "tex_code","payment_status"] }}
                         resultStringKeyName={searchSelectItem}
                        // autoFocus
                        formatResult={formatResult}

                        styling={{ zIndex: '2',color: "#000",hoverBackgroundColor: "#0000", }}
                        />
                </Col>

            </Row>

        </>
    );
}
export default ReactProductSearch