import React from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import PartnerCreate from "./PartnerCreate";
import Select from "react-select";

const PartnerRegisterModal=(props)=>{

    return(
        <>
            <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>
          Register New Vendor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PartnerCreate toggle={props.onHide} />
      </Modal.Body>
    </Modal>
        </>
    )
}
export default PartnerRegisterModal