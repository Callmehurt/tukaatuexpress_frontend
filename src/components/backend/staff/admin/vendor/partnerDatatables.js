import React, {useEffect, useState} from 'react'
import MUIDataTable from "mui-datatables";
import {Button, Spinner,Modal} from 'react-bootstrap'
import axios from "axios";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import {useSelector, useDispatch} from "react-redux";
import {loadPartnerList} from "../../../../../redux/actions/loadPartnerList";
import {ImLocation2} from 'react-icons/im'
import GetPartnerLocationModal from "./GetPartnerLocationModal";
import {useHistory} from "react-router-dom";

const PartnerDatatable = () => {
     const history = useHistory();
    const [locationShow, setLocationShow] = React.useState(false);
    // const [editData,setEditData] = React.useState('');
    const dispatch = useDispatch();
    const thisState = useSelector((state) => state.partnerList);
    const partnerList = thisState.partnerList;
    const[partnerId,setPartnerId]=useState('');
    useEffect(() => {
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
        }else{
            history.push('/admin/login');
        }
        axios.get('/admin/vendor/list')
            .then((res) => {
                dispatch(loadPartnerList(res.data))
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    },[]);


    const refreshTable = () => {
        axios.get('/admin/vendor/list')
            .then((res) => {
                console.log(res);
                dispatch(loadPartnerList(res.data))
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
    const partnerReturnList=(partner_id)=>{
       history.push(`/staff/admin/partner/return/list/${partner_id}`)

    }

    const columns = [
        {
         name: "vendor_name",
         label: "Partner Name",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}} onClick={(event)=>partnerReturnList(partnerList[tableMeta.rowIndex].id)} style={{cursor:'pointer'}}>{value}</div>
                  </>
              )
         }
        },
        {
         name: "return_count",
         label: "Unsettled returns",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}} onClick={(event)=>partnerReturnList(partnerList[tableMeta.rowIndex].id)} style={{cursor:'pointer'}}>{value}</div>
                  </>
              )
         }
        },
         {
         name: "vendor_email",
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
         name: "vendor_phone",
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
         name: "address",
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
            name: 'id',
            label: 'Address',
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex'}}>

                          <div style={{width:'50%',}}>
                                <button className="editBtn" onClick={()=> getLocation(value)}><ImLocation2 /></button>
                          </div>
                      </div>
                  </>
              )
            }
        },

       ];
    const getLocation=(partnerID)=>{
      setPartnerId(partnerID);
      setLocationShow(true);

    }

const options = {
    searchOpen:false,
    filterType:'textField',
    rowsPerPage: 100,
    rowsPerPageOptions: [10,20,50,100,500],
    fixedHeader:false,
    selectableRows: 'none',
    responsive:'standard',

  };

    return (
        <div className="datatable_area">
            <GetPartnerLocationModal show={locationShow} onHide={() => setLocationShow(false)} />
            <MUIDataTable
            // title={"Partner List"}
            data={partnerList}
            columns={columns}
            options={options}
            />
        </div>
    )
}

export default PartnerDatatable;
