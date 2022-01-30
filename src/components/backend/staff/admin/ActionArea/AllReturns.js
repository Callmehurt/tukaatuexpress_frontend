import React from "react"
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AllReturnsDatatables from "./AllReturnsDatatables";
import AllReturnsSameDayDatatables from "./AllReturnsSameDayDatatables";
import IncomingCancelDatatables from "./IncomingCancelDatatables";
import {useSelector} from "react-redux";
import IncomingCancelSameDayDatatables from "./IncomingCancelSameDayDatatables";

const AllReturns = () =>{
    const thisState = useSelector((state) => state.branchOperation);
     const allReturnLists = thisState.allReturnList;
     const allReturnsListSameDay = thisState.allReturnsListSameDay;
      const allIncomingCancel=thisState.allIncomingCancel;
       const allIncomingCancelSameDay=thisState.allIncomingCancelSameDay;

    return(
        <>
            {/*<div>All returns</div>*/}
            <Tabs
            defaultActiveKey="wareHouseListStandard"
            transition={false}
            className="mb-0 mt-3"
              >
                <Tab eventKey="wareHouseListStandard" title={<><div style={{fontSize:'13px'}}>All Returns of Standard <span>{allReturnLists.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <AllReturnsDatatables />
                   </div>
                </Tab>
                <Tab eventKey="wareHouseListSameDay" title={<><div style={{fontSize:'13px'}}>All Returns of Same Day <span>{allReturnsListSameDay.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <AllReturnsSameDayDatatables />
                   </div>
                </Tab>
                <Tab eventKey="ncomingCancelsStandard" title={<><div style={{fontSize:'13px'}}>Incoming Cancels of Standard <span>{allIncomingCancel.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <IncomingCancelDatatables />
                   </div>
                </Tab>
                <Tab eventKey="incomingCancelsSameDay" title={<><div style={{fontSize:'13px'}}>Incoming Cancels of Same Day <span>{allIncomingCancelSameDay.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <IncomingCancelSameDayDatatables />
                   </div>
                </Tab>
            </Tabs>
        </>
    )
}

export default AllReturns