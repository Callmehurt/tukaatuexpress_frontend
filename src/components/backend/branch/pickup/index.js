import React from 'react'
import {Link} from 'react-router-dom';
import {Col, Row, Button} from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import Datatables from "../../includes/datatable";

const Pickups = () => {
    const props_count=10;
    const count_div = <div>New Pickup Request <span>{props_count}</span></div>;
    return (
        <Row>
            <Col lg={12}>
                <div className="pickup_management_area">
                    <Link to="/branch/pickups-create"><Button className="customBtn">Add Pickup</Button></Link>
                    <Tabs
                    defaultActiveKey="new_pickups"
                    transition={false}
                    className="mb-3"
                      >
                      <Tab eventKey="new_pickups" title={count_div}>
                        <div>
                            <Datatables />
                        </div>
                      </Tab>
                      <Tab eventKey="pickup_process" title="Processed Request">
                          <div>
                              <h6>New tab</h6>
                          </div>
                      </Tab>
                    </Tabs>
                    </div>
            </Col>
        </Row>
    )
}

export default Pickups;
