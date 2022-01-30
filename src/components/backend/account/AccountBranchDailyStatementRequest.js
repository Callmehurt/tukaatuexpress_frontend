import React, {useEffect} from 'react';
import {Row,Col} from 'react-bootstrap';
import BranchDailyStatementRequestPending from "./BranchDailyStatementRequestPending";
import BranchDailyStatementRequestApprove from './../account/BranchDailyStatementRequestApprove'
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useDispatch, useSelector} from "react-redux";
import {
    AccountApprovedBranchDailyStatement,
    getAccountPendingBranchDailyStatement
} from "../../../redux/actions/AccountAdmin";

const AccountBranchDailyStatementRequest=()=>{
     const dispatch = useDispatch();
     const accountAdmin = useSelector((state) => state.accountAdmin);
       const accountPendingBranchDailyStatement=accountAdmin.accountPendingBranchDailyStatement;
        const accountApprovedBranchDailyStatement=accountAdmin.accountApprovedBranchDailyStatement;
    useEffect(()=>{
       const AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        if(AccountStorage){
            setAuthorizationToken(AccountStorage.token);

        }
        getBranchStatementPending();
        getBranchStatementApproved();
    },[]);
    const getBranchStatementApproved=()=>{
    axios.get('/account/get/branch/approved/daily/statements')
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    dispatch(AccountApprovedBranchDailyStatement(res.data));
                    })
                .catch((err) => {
                    console.log(err.response)
                })
 }
    const getBranchStatementPending=()=>{
    axios.get('/account/get/branch/pending/daily/statements')
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    dispatch(getAccountPendingBranchDailyStatement(res.data));
                    })
                .catch((err) => {
                    console.log(err.response)
                })
 }



    return(
        <>
            <Row>
                <Col lg={12}>
                    <Tabs
                    defaultActiveKey="pendingRequestStatement"
                    transition={false}
                    className="mb-0 mt-3"
                      >
                        <Tab eventKey="pendingRequestStatement" title={<><div>Pending D. Stat. Request <span>{accountPendingBranchDailyStatement.length?<>{accountPendingBranchDailyStatement.length}</>:<>0</>}</span></div></>}>
                           <div style={{minHeight:'150vh'}}>
                                <BranchDailyStatementRequestPending />
                           </div>
                        </Tab>
                        <Tab eventKey="approvedRequestStatement" title={<><div>Approved D. Stat. Request <span>{accountApprovedBranchDailyStatement.length?<>{accountApprovedBranchDailyStatement.length}</>:<>0</>}</span></div></>}>
                           <div style={{minHeight:'150vh'}}>
                               <BranchDailyStatementRequestApprove />
                           </div>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </>

    );
}
export default AccountBranchDailyStatementRequest