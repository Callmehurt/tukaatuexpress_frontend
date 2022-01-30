import React from 'react';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {Row,Col} from 'react-bootstrap'
import HoldOrders from "./HoldOrders";
import PaidOrders from "./PaidOrders";
import StatementAndInvoices from "./StatementAndInvoices";

const VendorHoldArea=()=>{

    return(
        <>
            <Row>
                <Col xs={12}>
             {/*<h6>Holds Area</h6>*/}
             <div className="pb-2">
                {/*<h6>vendor Account</h6>*/}
                    <Tabs
                    defaultActiveKey="holdOrders"
                    transition={false}
                    className="mb-0 mt-3"
                      >
                      <Tab eventKey="holdOrders" title={'Holds'}>
                        <div style={{minHeight:'150vh',paddingTop:'5px'}}>
                            <HoldOrders />
                        </div>
                      </Tab>
                      {/*<Tab eventKey="holdConfirmOrders" title="Confirms">*/}
                      {/*    <div style={{minHeight:'150vh'}}>*/}
                      {/*       <PaidOrders />*/}
                      {/*    </div>*/}
                      {/*</Tab>*/}
                      {/*  <Tab eventKey="statement&invoicesHolds" title="Statements">*/}
                      {/*  <div style={{minHeight:'150vh'}}>*/}
                      {/*     <StatementAndInvoices />*/}
                      {/*  </div>*/}
                      {/*</Tab>*/}
                    </Tabs>
            </div>
                    </Col>
        </Row>
            </>
    )
}
export default VendorHoldArea