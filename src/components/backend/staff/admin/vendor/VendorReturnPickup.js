import React from 'react';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {useSelector} from "react-redux";
import VendorReturnPickupList from "./VendorReturnPickupList";
import VendorReturnPickupPendingStatement from "./VendorReturnPickupPendingStatement";
import VendorReturnPickupApprovedStatement from "./VendorReturnPickupApprovedStatement";

const VendorReturnPickup=()=>{
     const branchOperation = useSelector((state) => state.branchOperation);
     const allVendorReturnList = branchOperation.allVendorReturnList;
     const vendorReturnPendingStatement=branchOperation.vendorReturnPendingStatement;
     const vendorReturnApprovedStatement=branchOperation.vendorReturnApprovedStatement;


    return(
        <>
             <Tabs
            defaultActiveKey="partnerAllReturns"
            transition={false}
            className="mb-0 mt-3"
              >
                <Tab eventKey="partnerAllReturns" title={<>
                       <div style={{fontSize:'13px'}}>
                            All Returns
                            <span>
                             {allVendorReturnList.all_returns?.length?
                                 <>
                                     {allVendorReturnList.all_returns?.length}
                                 </>
                                 :
                                 <>
                                     0
                                 </>
                             }
                             </span>
                       </div>
                    </>}
                >
                   <div>
                     <VendorReturnPickupList />
                   </div>
                </Tab>
                <Tab eventKey="partnerAllReturnPendingStatement" title={<><div style={{fontSize:'13px'}}>All Returns Pending Statements <span>{vendorReturnPendingStatement.length?
                    <>
                        {vendorReturnPendingStatement.length}
                    </>:
                    <>
                        0
                    </>
                }</span></div></>}>
                   <div>
                       <VendorReturnPickupPendingStatement />
                   </div>
                </Tab>
                  <Tab eventKey="partnerAllReturnApprovedStatement" title={<><div style={{fontSize:'13px'}}>All Returns Approved Statements <span>{vendorReturnApprovedStatement.length?<>{vendorReturnApprovedStatement.length}</>:<>0</>}</span></div></>}>
                   <div>
                       <VendorReturnPickupApprovedStatement />
                   </div>
                </Tab>
            </Tabs>

        </>
    )
}
export default VendorReturnPickup