import React from 'react';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import PendingOrders from "./PendingOrders";
import PaidOrders from "./PaidOrders";
import StatementAndInvoices from "./StatementAndInvoices";
import PendingReturnOrders from "./PendingReturnOrders";
import ConfirmedReturnOrders from "./ConfirmedReturnOrders";
import ReturnStatements from "./ReturnStatements";

const VendorReturnsArea=()=>{

    return(
        <>
            {/*<h6>Returns Area</h6>*/}
            <div className="pb-2">
                {/*<h6>vendor Account</h6>*/}
                    <Tabs
                    defaultActiveKey="returnsOrders"
                    transition={false}
                    className="mb-0 mt-3"
                      >
                      <Tab eventKey="returnsOrders" title={'Pending'}>
                        <div style={{minHeight:'150vh',paddingTop:'5px'}}>
                            <PendingReturnOrders />
                        </div>
                      </Tab>
                      <Tab eventKey="returnsConfirmOrders" title="Confirmed">
                          <div style={{minHeight:'150vh'}}>
                             <ConfirmedReturnOrders />
                          </div>
                      </Tab>
                      <Tab eventKey="statement&invoicesReturns" title="Statements">
                            <div style={{minHeight:'150vh'}}>
                               <ReturnStatements />
                            </div>
                      </Tab>
                    </Tabs>
            </div>

        </>
    )
}
export default VendorReturnsArea