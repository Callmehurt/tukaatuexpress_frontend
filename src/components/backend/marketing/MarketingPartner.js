import React, {useEffect} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import PartnerDatatables from './PartnerDatatables';
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useHistory} from "react-router-dom";
import PartnerRegisterModal from "./PartnerRegisterModal";

const MarketingPartner=()=>{
     const history = useHistory();
      const [modalShow, setModalShow] = React.useState(false);
    useEffect(() => {
        let marketingAdmin = JSON.parse(localStorage.getItem('marketingAdmin'));
        console.log(marketingAdmin);
        if(marketingAdmin?.token){
          setAuthorizationToken(marketingAdmin.token);
        }else{
            history.push('/marketing/login');
        }
    },[]);

    return(
        <>
            <Row>
                <Col lg={12} className="pt-3">
                    <Button className="customBtn mb-3" onClick={() => setModalShow(true)} >Register New Partner</Button>
                    <PartnerRegisterModal show={modalShow} onHide={() => setModalShow(false)}/>
                    <PartnerDatatables />

                </Col>
            </Row>

        </>
    )
}
export default MarketingPartner