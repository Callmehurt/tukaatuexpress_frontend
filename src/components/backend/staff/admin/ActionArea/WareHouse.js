import React from "react"
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs"
import WarehouseDatatables from "../ActionArea/warehouseDatatables"
import {useDispatch, useSelector} from "react-redux";
import WarehouseSameDayDatatables from "./warehouseSameDayDatatables";


const WareHouse = () => {
    const dispatch = useDispatch();
    const WareHouse = useSelector((state) => state.warehouseList);
    const branchOperation = useSelector((state) => state.branchOperation);
    const wareHousecount = WareHouse.WareHouseListCount;
    const warehouseListsSameDay = branchOperation.warehouseListsSameDay;

    return(
        <>


            <Tabs
            defaultActiveKey="wareHouseListStandard"
            transition={false}
            className="mb-0 mt-3"
              >
                <Tab eventKey="wareHouseListStandard" title={<><div style={{fontSize:'13px'}}>At Warehouse of Standard <span>{wareHousecount}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <WarehouseDatatables />
                   </div>
                </Tab>
                <Tab eventKey="wareHouseListSameDay" title={<><div style={{fontSize:'13px'}}>At Warehouse of Same Day <span>{warehouseListsSameDay.length}</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       <WarehouseSameDayDatatables />
                   </div>
                </Tab>
            </Tabs>

        </>
    )

}
export default WareHouse