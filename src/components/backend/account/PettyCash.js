import React, {useEffect} from 'react'
import PettyCashApprovedDatatables from "./PettyCashApprovedDatatables";
import Tab from "react-bootstrap/Tab";
import WarehouseDatatables from "../staff/admin/ActionArea/warehouseDatatables";
import Tabs from "react-bootstrap/Tabs";
import PettyCashPendingDatatables from "./PettyCashPendingDatatables";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {AccountPettyCashApproved,AccountPettyCashPending} from "../../../redux/actions/AccountAdmin";
import {useDispatch, useSelector} from "react-redux";

const PettyCash=()=>{
    const dispatch = useDispatch();
     const accountAdmin = useSelector((state) => state.accountAdmin);
    const pettyCashApprovedList = accountAdmin.PettyCashApprovedList;
    const pettyCashPendingList = accountAdmin.PettyCashPendingList;
    useEffect(()=>{

      let AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
      if(AccountStorage){
        setAuthorizationToken(AccountStorage.token);
      }
      // console.log(AccountStorage);
      getPettyCashRequestList();

    },[])
    const getPettyCashRequestList=()=>{
        axios.get('/account/view/petty-cash/requests')
                .then((res) => {
                    console.log(res);
                    dispatch(AccountPettyCashApproved(res.data.approved_requests));
                    dispatch(AccountPettyCashPending(res.data.pending_requests));

                })
                .catch((err) => {
                    console.log(err.response)
                })
    }
    return(
        <>
            {/*<h6>Petty Cash</h6>*/}
            <Tabs
            defaultActiveKey="pendingPetty"
            transition={false}
            className="mb-0 mt-3"
              >
                <Tab eventKey="pendingPetty" title={<><div>Pending Petty Cash <span>{pettyCashPendingList.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                          <PettyCashPendingDatatables />
                   </div>
                </Tab>
                <Tab eventKey="approvedPetty" title={<><div>Approved Petty Cash <span>{pettyCashApprovedList.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <PettyCashApprovedDatatables />
                   </div>
                </Tab>
            </Tabs>

        </>
    )
}
export default PettyCash