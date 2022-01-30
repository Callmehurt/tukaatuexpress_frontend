import React,{useEffect} from 'react'
import Tab from "react-bootstrap/Tab";
import WarehouseDatatables from "./warehouseDatatables";
import Tabs from "react-bootstrap/Tabs";
// import {useEffect} from "react";
import axios from "axios";
import showNotification from "../../../includes/notification";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import{TransferIns,TransferInsCount} from "../../../../../redux/actions/Trasnfer";
import {useDispatch, useSelector} from "react-redux";
import TransferOutRequest from "./TransferOutRequest";
import TransferInsRequest from "./TransferInsRequest";
import TransferInsRequestSameDay from "./TransferInsRequestSameDay";

const TransferIn=()=>{
    const dispatch = useDispatch();
    const transferInsSelect = useSelector((state) => state.transfer);
    const transferInsCount = transferInsSelect.NewTransferInsCount;
     const transferInsListSameDay = transferInsSelect.NewTransferInsListSameDay;
    useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        console.log(staff_admin);
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
        // console.log('fetch api');
        axios.get('admin/pickup/transfer/ins')
            .then((res) => {
                console.log(res.data);
                dispatch(TransferIns(res.data));
                dispatch(TransferInsCount(res.data.length));
                console.log('transfer ins data');
            })
            .catch((err) => {
                console.log(err.response?.data);
                // console.log('error transfer ins')
            })
    },[]);

    return(
        <>
            {/*<h5>Transfer In</h5>*/}
            <Tabs
            defaultActiveKey="incomingStandard"
            transition={false}
            className="mb-0 mt-3"
              >
                <Tab eventKey="incomingStandard" title={<><div style={{fontSize:'13px'}}>Incoming On Process of Standard<span>{transferInsCount}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <TransferInsRequest />
                   </div>
                </Tab>
                <Tab eventKey="wareHouseSameDay" title={<><div style={{fontSize:'13px'}}>Incoming On Process of Same Day <span>{transferInsListSameDay.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                        <TransferInsRequestSameDay />
                   </div>
                </Tab>
            </Tabs>
        </>
    )
}
export default TransferIn