import React from "react";
import {Row, Col, Button} from 'react-bootstrap';
import PartnerDatatable from "./partnerDatatable";
import VendorRegisterModal from "./VendorRegisterModal";

const Partners = () => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Row>
                <Col lg={12}>
                    {/*<VendorRegisterModal show={modalShow} onHide={() => setModalShow(false)}/>*/}
                    <div className="partner_area">
                        {/*<Button className="customBtn" onClick={() => setModalShow(true)} style={{marginTop: '1rem'}}>Register New Partner</Button>*/}
                        <div style={{marginTop: '2rem'}}>
                            <PartnerDatatable />
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Partners;