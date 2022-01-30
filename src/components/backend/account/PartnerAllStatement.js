import React from 'react';
import {Row,Col} from 'react-bootstrap';
import PartnerAllStatementsDatatables from "./PartnerAllStatementsDatatables";


const PartnerAllStatement=()=>{

    return(
        <>
            <Row>
                <Col>
                    <h6>Partner All Statement</h6>
                     <PartnerAllStatementsDatatables />
                </Col>
            </Row>
        </>
    )
}

export default PartnerAllStatement