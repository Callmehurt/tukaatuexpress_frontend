import React, {useEffect} from 'react'
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {TransferOuts, TransferOutsCount} from "../../../../../redux/actions/Trasnfer";
import TransferOutRequest from "./TransferOutRequest";
import TransferOutRequestSameDay from "./TransferOutRequestSameDay";
import TransferOutsComplete from "./TransferOutsComplete";
import TransferOutsCompleteSameDay from "./TransferOutsCompleteSameDay";


const TransferOut=()=>{
      const dispatch = useDispatch();
       const transferOutSelect = useSelector((state) => state.transfer);
        const branchOperation = useSelector((state) => state.branchOperation);
       const transferOutCount = transferOutSelect.NewTransferOutCount;
        const transferOutListSameDay = transferOutSelect.NewTransferOutListSameDay;
        const transferOutsComplete= branchOperation.transferOutsComplete;
        const transferOutsCompleteSameDay=branchOperation.transferOutsCompleteSameDay;
      useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        console.log(staff_admin);
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
        // console.log('fetch api');
        axios.get('admin/pickup/transfer/outs')
            .then((res) => {
                dispatch(TransferOuts(res.data));
                dispatch(TransferOutsCount(res.data.length));
            })
            .catch((err) => {
                console.log(err.response?.data);
                // console.log('error transfer ins')
            })
    },[0]);

    return(
        <>
            {/*<h4>Transfer Out</h4>*/}
            <Tabs
            defaultActiveKey="outgoingStandard"
            transition={false}
            className="mb-0 mt-3"
              >
                <Tab eventKey="outgoingStandard" title={<><div style={{fontSize:'13px'}}>Outgoing On Process of Standard<span>{transferOutCount}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       {/*<h6>Outgoing on Process</h6>*/}
                       <TransferOutRequest />
                   </div>
                </Tab>
                <Tab eventKey="outgoingSameDay" title={<><div style={{fontSize:'13px'}}>Outgoing On Process of Same Day<span>{transferOutListSameDay.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <TransferOutRequestSameDay />
                   </div>
                </Tab>
                 <Tab eventKey="outgoingComplete" title={<><div style={{fontSize:'13px'}}>Outgoing Complete Process <span>{transferOutsComplete.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <TransferOutsComplete />
                   </div>
                </Tab>
                <Tab eventKey="outgoingCompleteSameDay" title={<><div style={{fontSize:'13px'}}>Outgoing Complete Process of Same Day<span>{transferOutsCompleteSameDay.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <TransferOutsCompleteSameDay />
                   </div>
                </Tab>
            </Tabs>
        </>
    )
}
export default TransferOut