import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {useSelector} from "react-redux";
import AllDeliveredDatatables from "./AllDeliveredDataTables";
import AllDeliveredSameDayDatatables from "./AllDeliveredSameDayDatatables";


const AllDelivered =()=>{
       const thisState = useSelector((state) => state.branchOperation);
       const deliveredList = thisState.deliveredList;
        const deliveredListSameDay = thisState.deliveredListSameDay;

    return(
        <>
           {/*<div>All hold</div>*/}
            <Tabs
            defaultActiveKey="wareHouseListStandard"
            transition={false}
            className="mb-0 mt-3"
              >
                <Tab eventKey="wareHouseListStandard" title={<><div style={{fontSize:'13px'}}>Delivered of Standard <span>{deliveredList.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <AllDeliveredDatatables />
                   </div>
                </Tab>
                <Tab eventKey="wareHouseListSameDay" title={<><div style={{fontSize:'13px'}}>Delivered of Same Day <span>{deliveredListSameDay.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <AllDeliveredSameDayDatatables />
                   </div>
                </Tab>
            </Tabs>
            {/*<AllHoldsDatatables />*/}

        </>
    )
}

export default AllDelivered