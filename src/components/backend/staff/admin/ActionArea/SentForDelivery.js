import React, {useEffect} from "react";
import AllHoldsDatatables from "./AllHoldsDatatables";
import Tab from "react-bootstrap/Tab";
import WarehouseDatatables from "./warehouseDatatables";
import Tabs from "react-bootstrap/Tabs";
import {useDispatch, useSelector} from "react-redux";
// import AllHoldsSameDayDatatables from "./AllHoldsSameDayDatatables";
import SentForDeliveryDatatables from "./SentForDeliveryDatatables";
import SentForDeliverySameDayDatatables from './SentForDeliverySameDayDatatables';
import AssignedDatatables from "./AssignedDatatables";
import AssignedSameDayDatatables from './AssignedSameDayDatatables'
import axios from "axios";
import {
    assignedList,
    assignedListSameDay,
    sentForDelivery,
    sentForDeliverySameDay
} from "../../../../../redux/actions/BranchOperation";
import {useHistory} from "react-router-dom";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";

const SentForDelivery =()=>{
      const history = useHistory();
     const dispatch = useDispatch();
       const thisState = useSelector((state) => state.branchOperation);
       const sentForDeliveriesSameDay = thisState.sentForDeliverySameDay;
       const sentForDeliveries = thisState.sentForDelivery;
        const assignedDeliveryList = thisState.assignedDeliveryList;
         const assignedDeliverySameDayList=thisState.assignedDeliverySameDayList;
         useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
         getAssigned();
        getAssignedSameDayDelivery();
        getSentForDelivery();
        getSentForSameDayDelivery();

    },[]);
         const  getAssigned =()=>{
        axios.get('/admin/pickup/assigned/list')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 dispatch(assignedList(res.data));
             })
             .catch((err) => {
                 console.log(err.response);
             });
    }
    const getAssignedSameDayDelivery=()=>{
            axios.get('/admin/pickup/sameday/assigned/list')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 dispatch(assignedListSameDay(res.data));
             })
             .catch((err) => {
                 console.log(err.response);
             });
        }
        const  getSentForDelivery =()=>{
        axios.get('/admin/pickup/on/way/list')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 dispatch(sentForDelivery(res.data));
             })
             .catch((err) => {
                 console.log(err.response);
             });
    }
    const  getSentForSameDayDelivery =()=>{
        axios.get('/admin/pickup/sameday/on/way/list')
             .then((res) => {
                 console.log(res);
                 console.log(res.data);
                 dispatch(sentForDeliverySameDay(res.data));
             })
             .catch((err) => {
                 console.log(err.response);
             });
    }

    return(
        <>
           {/*<div>All hold</div>*/}
            <Tabs
            defaultActiveKey="AssignedDatatables"
            transition={false}
            className="mb-0 mt-3"
              >
                <Tab eventKey="AssignedDatatables" title={<><div style={{fontSize:'13px'}}>Assigned Delivery of Standard <span>{assignedDeliveryList?.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <AssignedDatatables />
                   </div>
                </Tab>
                <Tab eventKey="AssignedSameDayDatatables" title={<><div style={{fontSize:'13px'}}>Assigned Delivery of Same Day <span>{assignedDeliverySameDayList.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <AssignedSameDayDatatables />
                   </div>
                </Tab>
                 <Tab eventKey="wareHouseListStandard" title={<><div style={{fontSize:'13px'}}>Sent For Delivery of Standard <span>{sentForDeliveries.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <SentForDeliveryDatatables />
                   </div>
                </Tab>
                <Tab eventKey="wareHouseListSameDay" title={<><div style={{fontSize:'13px'}}>Sent For Delivery of Same Day <span>{sentForDeliveriesSameDay.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <SentForDeliverySameDayDatatables />
                   </div>
                </Tab>
            </Tabs>
            {/*<AllHoldsDatatables />*/}

        </>
    )
}

export default SentForDelivery