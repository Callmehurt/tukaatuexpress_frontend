import React from 'react'
import PendingStatementDatatables from "./PendingStatementDatatables";
import ApprovedStatementDatatables from "./ApprovedStatementDatatables";
import Tab from "react-bootstrap/Tab";
import Datatables from "../../includes/datatable";
import Tabs from "react-bootstrap/Tabs";
import {useSelector} from "react-redux";

const DeliveryPersonStatement=()=>{
     const BranchDeliveryStatement = useSelector((state) => state.mainBranches);
        const ApprovedDeliveryStatements = BranchDeliveryStatement.ApprovedStatements;
        const PendingDeliveryStatements = BranchDeliveryStatement.PendingStatements;


    return(
        <>


            <Tabs
                    defaultActiveKey="new_pickups"
                    transition={false}
                    className="mb-0"
                      >
                      <Tab eventKey="new_pickups" title={<><div>Pending Statements<span>{PendingDeliveryStatements.length}</span></div></>}>
                        <div>
                            <PendingStatementDatatables />
                        </div>
                      </Tab>
                      <Tab eventKey="pickup_process" title={<><div>Approved Statements<span>{ApprovedDeliveryStatements.length}</span></div></>}>
                          <div>
                              <ApprovedStatementDatatables />
                          </div>
                      </Tab>
                    </Tabs>
        </>
    )
}
export default DeliveryPersonStatement