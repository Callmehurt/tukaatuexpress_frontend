import React from "react";
import {Modal, Button} from 'react-bootstrap';
import VendorCreate from "./create";

const VendorRegisterModal = (props) => {

  return (
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
        <VendorCreate toggle={props.onHide} />
      </Modal.Body>
    </Modal>
  );
}

export default VendorRegisterModal;