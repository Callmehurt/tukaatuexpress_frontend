import React from 'react';
import AllPartnersDatatables from "./AllPartnersDatatables";
import {Row,Col} from 'react-bootstrap'

const AllPartners =()=>{

    return(
        <>
            <Row>
                <Col>
                     {/*<h6>All Partner</h6>*/}
                     <AllPartnersDatatables />
                </Col>
            </Row>
        </>
    )
}
export default AllPartners