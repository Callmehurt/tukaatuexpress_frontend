import React, {useEffect, useState} from 'react'
import MUIDataTable from "mui-datatables";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import wareHouseLists from "../../../redux/actions/wareHouseList";
import {wareHouseListCount} from "../../../redux/actions/wareHouseListCount";
import notification from "../includes/notification";
import {AccountPettyCashApproved, AccountPettyCashPending} from "../../../redux/actions/AccountAdmin";
import LimitedPettyCashModal from "./LimitedPettyCashModal";
import RequestPettyCashModal from "../branch/DailyStatement/RequestPettyCashModal";
const PettyCashPendingDatatables=()=>{
      const dispatch = useDispatch();
     const accountAdmin = useSelector((state) => state.accountAdmin);
     const pettyCashPendingList = accountAdmin.PettyCashPendingList;
    // const [formField,setFormField]=useState({
    //     provided_cash:'',
    //     record_id:''
    // })
    const [limitedPettyShow,setLimitedPettyShow]=useState(false);
    const[recordID,setRecordID]=useState('');
    const ApprovedCash=async (id)=>{
        console.log(id);
        await axios.put(`account/approve/petty-cash/${id}`)
            .then((res) => {
                console.log(res);
               if(res.data.status === true){
                   notification('success', res.data.message);
                   getPettyCashPendingList();
               }else {
                   notification('danger', res.data.message)
               }
            })
            .catch((err) => {
                console.log(err.response.data);
            })

    }
    const getPettyCashPendingList=()=>{
            axios.get('/account/view/petty-cash/requests')
                    .then((res) => {
                        console.log(res);
                        dispatch(AccountPettyCashPending(res.data.pending_requests));
                         dispatch(AccountPettyCashApproved(res.data.approved_requests));

                    })
                    .catch((err) => {
                        console.log(err.response)
                    })
        }
        const onHidePettyCash=()=>{
          setLimitedPettyShow(false);
        }
        const ApprovedLimitedCash=async (id)=>{
           console.log(id);
           setRecordID(id);
            setLimitedPettyShow(true);

            //  const newField = {...formField}
            //      newField.id =id;
            //  setFormField(newField);
            // await axios.post('/account/approve/limited/petty-cash',ram)
            //     .then((res) => {
            //         console.log(res);
            //        if(res.data.status === true){
            //            notification('success', res.data.message);
            //            getPettyCashPendingList();
            //        }else {
            //            notification('danger', res.data.message)
            //        }
            //     })
            //     .catch((err) => {
            //         console.log(err.response.data);
            //     })
        }
     const columns = [
    {
     name: "branch_name",
     label: "Branch Name",
     options: {
      filter: true,
      sort: true,
     }
    },
     {
     name: "request_date",
     label: "Requested Date",
     options: {
      filter: true,
      sort: true,
     }
    },
     {
     name: "prev_petty_cash",
     label: "Previous Petty Cash",
     options: {
      filter: true,
      sort: true,
   }
   },
    {
     name: "requested_petty_cash",
     label: "Requested Petty Cash",
     options: {
      filter: true,
      sort: true,
   }
   },
    {
       label: 'Action',
         name: 'id',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  <div style={{width:'100%',display:'flex'}}>

                      <div style={{width:'50%'}}>
                            <button  style={{borderRadius:'5px',border:'1px solid #147298',backgroundColor:'#147298',color:'#fff',padding:'3px 10px'}} onClick={(event)=>ApprovedCash(value)}>Approve Cash</button>
                      </div>
                      <div style={{width:'50%'}}>
                          <button  style={{borderRadius:'5px',border:'1px solid #147298',backgroundColor:'#147298',color:'#fff',padding:'3px 10px'}} onClick={(event)=>ApprovedLimitedCash(value)}>Approve Limited Cash</button>

                      </div>
                  </div>
              </>
          )
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
  }
    return(
        <>
            <LimitedPettyCashModal show={limitedPettyShow} record={recordID} toggle={onHidePettyCash} />
            <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>All Statements</div></>}
            data={pettyCashPendingList}
            columns={columns}
            options={options}
           />
        </>
    )
}
export default PettyCashPendingDatatables