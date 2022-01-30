import React from 'react';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StatementRecordDatatables from "./StatementRecordDatatables";
import DailyStatementDatatables from "./DailyStatementDatatables";
import PendingDailyStatement from "./PendingDailyStatement";
import ApprovedDailyStatement from "./ApprovedDailyStatement";

const DailyStatement=()=>{

    return(
        <>
            {/*<h6>Daily Statements</h6>*/}
            <Tabs
                    defaultActiveKey="dailyStatement"
                    transition={false}
                    className="mb-3"
                      >
                      <Tab eventKey="dailyStatement" title="Daily Statement">
                        <div>
                            <DailyStatementDatatables />
                        </div>
                      </Tab>

                      <Tab eventKey="pendingDailyStatement" title="Pending Daily Statement">
                          <div>
                             <PendingDailyStatement />
                          </div>
                      </Tab>
                      <Tab eventKey="approvedDailyStatement" title="Approved Daily Statement">
                          <div>
                             <ApprovedDailyStatement />
                          </div>
                      </Tab>
                    </Tabs>
        </>
    )
}
export default DailyStatement