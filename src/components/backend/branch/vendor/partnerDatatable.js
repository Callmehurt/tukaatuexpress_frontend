import React, {useEffect, useState} from 'react'
import MUIDataTable from "mui-datatables";
import {Button, Spinner} from 'react-bootstrap'
import axios from "axios";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import {useSelector, useDispatch} from "react-redux";
import {loadPartnerList} from "../../../../redux/actions/loadPartnerList";
import notification from "../../includes/notification";
import {RiDeleteBin2Line} from 'react-icons/ri';
import {Confirm} from "react-st-modal";

const PartnerDatatable = () => {
    const dispatch = useDispatch();
    const thisState = useSelector((state) => state.partnerList);
    const partnerList = thisState.partnerList;

    useEffect(() => {
        let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
        if(branch_detail){
          setAuthorizationToken(branch_detail.token);
        }
        axios.get('/branch/partner/list')
            .then((res) => {
                console.log(res);
                dispatch(loadPartnerList(res.data))
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    },[]);


    const refreshTable = () => {
        axios.get('/branch/partner/list')
            .then((res) => {
                console.log(res);
                dispatch(loadPartnerList(res.data))
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }


    const removePartner = async (id) => {
        const result = await Confirm('Are you sure to continue?',
            'Confirm Removal');
        if (result) {
             await axios.delete(`/branch/vendor/destroy/${id}`)
                 .then((res) => {
                     console.log(res)
                     if(res.data.status === true){
                         refreshTable();
                         notification('success', res.data.message)
                     }else {
                         notification('danger', res.data.message)
                     }
                 })
                 .catch((err) => {
                     notification('danger', 'Encountered some technical error. Please contact IT Team!')
                     console.log(err.response);
                 })
        }
    }

    const columns = [
        {
         name: "vendor_name",
         label: "Partner Name",
         options: {
          filter: true,
          sort: true,
         }
        },
         {
         name: "vendor_email",
         label: "Email",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "vendor_phone",
         label: "Contact",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "vendor_bank",
         label: "Bank",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "vendor_account",
         label: "Account Number",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "vendor_account_holder",
         label: "Account Holder",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "vendor_esewa",
         label: "Esewa ID",
         options: {
          filter: true,
          sort: true,
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
                           <div style={{width:'50%',}}>
                               <button className="deleteBtn" onClick={() => removePartner(value)}><RiDeleteBin2Line/></button>
                           </div>
                            <div style={{width:'50%',}}>
                               <button className="deleteBtn" onClick={() => removePartner(value)}>Apply Scheme</button>
                           </div>
                       </div>
                  </>

              ),

            }
        }

       ];

const options = {
    searchOpen:false,
    filterType:'textField',
    fixedHeader:false,
    rowsPerPage:[100],
    rowsPerPageOptions:[10,20,50,100,500],
    selectableRows: 'none',

    // textLabels: {
    //     body: {
    //         noMatch: partnerList ?
    //             <Spinner animation="border" role="status">
    //               <span className="visually-hidden">Loading...</span>
    //             </Spinner> :
    //             'Sorry, there is no matching data to display',
    //     },
    // },
  };

    return (
        <div className="datatable_area">
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
