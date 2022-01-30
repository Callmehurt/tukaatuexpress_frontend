import React, {useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import {Button, Spinner,Modal} from 'react-bootstrap';
import axios from "axios";
import setAuthorizationToken from "./../../../utils/setAuthorizationToken";
import {useSelector, useDispatch} from "react-redux";
import {ImLocation2} from 'react-icons/im';
// import GetPartnerLocationModal from "./GetPartnerLocationModal";
import {useHistory} from "react-router-dom";
import {getPartnerListMarketing} from "../../../redux/actions/Marketing";
import showNotification from "../includes/notification";

const PartnerDatatables=()=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const[partnerId,setPartnerId]=useState('');
    const [partnerList,setPartnerList]=useState('');
    const[registeringLead,setRegisteringLead]=useState(false);
    const[registerLeadID,setRegisterLeadID]=useState('');
    const marketingStore = useSelector((state) => state.marketing);
    const marketingPartnerList=marketingStore.marketingPartnerList;
    useEffect(() => {
        let marketingAdmin = JSON.parse(localStorage.getItem('marketingAdmin'));
        console.log(marketingAdmin);
        if(marketingAdmin?.token){
          setAuthorizationToken(marketingAdmin.token);
        }else{
            history.push('/marketing/login');
        }
        getPartnerList();
    },[]);
    const getPartnerList=()=>{
            axios.get('/marketing/my/registered/leads')
            .then((res) => {
                console.log(res);
                setPartnerList(res.data);
                dispatch(getPartnerListMarketing(res.data));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
    const registerAsPartner =(lead_id)=>{
        setRegisterLeadID(lead_id);
        setRegisteringLead(true);
        axios.get(`/marketing/register/partner/${lead_id}`)
            .then((res) => {
                console.log(res);
                getPartnerList();
                 if(res.data.status === false) {
                     showNotification('danger', res.data.message);
                      setRegisteringLead(false);
                 }
                 else{
                     showNotification('success', res.data.message);
                 }

            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
    const moveToEvent=(id)=>{
        history.push({
            pathname:'/marketing/events',
            state:{
                leadID:id,
            }
        })

    }
     const columns = [
        {
         name: "store_name",
         label: "Partner Name",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}} onClick={(event)=>moveToEvent(tableMeta.rowData[4])}  style={{cursor:'pointer'}}>{value}</div>
                  </>
              )
         }
        },
         {
         name: "partner_name",
         label: "Owner Name",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}} onClick={(event)=>moveToEvent(tableMeta.rowData[4])}  style={{cursor:'pointer'}}>{value}</div>
                  </>
              )
         }
        },
         {
         name: "partner_email",
         label: "Email",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}}>{value}</div>
                  </>
              )
         }
        },
        {
         name: "partner_phone",
         label: "Contact",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}}>{value}</div>
                  </>
              )
         }
        },
         {
         name: "store_address",
         label: "Address",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}}>{value}</div>
                  </>
              )
         }
        },
         {
         name: "registered",
         label: "Registered",
         options: {
          filter: true,
          sort: true,
             display:false,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}}>{value}</div>
                  </>
              )
         }
        },
        {
            name: 'id',
            label: 'Action',
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex'}}>
                          {tableMeta.rowData[5]==0?
                              <>
                                  <div style={{width:'50%',}}>
                                      {registeringLead?
                                          <>
                                              <Button variant="outline-warning" >Registering...</Button>

                                          </>:
                                          <>
                                              <Button variant="outline-warning" onClick={(event)=>registerAsPartner(value)}>Register</Button>

                                          </>

                                      }
                                     {/*<button className="editBtn" onClick={(event)=>registerAsPartner(value)} >Register</button>*/}
                                 </div>
                              </>:
                              <>
                                  <div style={{width:'50%',}}>
                                      <Button variant="outline-success">Registered</Button>
                                  </div>
                              </>
                          }

                      </div>
                  </>
              )
            }
        },

       ];
    const options = {
        searchOpen: false,
        filterType: 'textField',
        rowsPerPage: 50,
        rowsPerPageOptions: [10, 20, 50, 100, 500],
        fixedHeader: false,
        selectableRows: 'none',
        responsive: 'standard',
  };

    return(
        <>
            {/*<h5>Partner Datatables</h5>*/}
            <MUIDataTable
            // title={"Partner List"}
            data={marketingPartnerList}
            columns={columns}
            options={options}
            />

        </>
    );
}
export default PartnerDatatables
