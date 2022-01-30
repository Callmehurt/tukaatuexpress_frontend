import React from "react";
import AllHoldsDatatables from "./AllHoldsDatatables";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {useSelector} from "react-redux";
import AllHoldsSameDayDatatables from "./AllHoldsSameDayDatatables";

const AllHold =()=>{
       const thisState = useSelector((state) => state.branchOperation);
       const allHoldsListSameDay = thisState.allHoldsListSameDay;
        const allHoldLists = thisState.allHoldList;

    return(
        <>
           {/*<div>All hold</div>*/}
            <Tabs
            defaultActiveKey="wareHouseListStandard"
            transition={false}
            className="mb-0 mt-3"
              >
                <Tab eventKey="wareHouseListStandard" title={<><div style={{fontSize:'13px'}}>All Holds of Standard <span>{allHoldLists.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <AllHoldsDatatables />
                   </div>
                </Tab>
                <Tab eventKey="wareHouseListSameDay" title={<><div style={{fontSize:'13px'}}>All Holds of Same Day <span>{allHoldsListSameDay.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <AllHoldsSameDayDatatables />
                   </div>
                </Tab>
            </Tabs>
            {/*<AllHoldsDatatables />*/}

        </>
    )
}

export default AllHold