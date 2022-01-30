import React, {useEffect} from "react";
import {Modal, Button} from 'react-bootstrap';
import VendorEdit from "./edit";

const VendorEditModal = (props) => {
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
                          Update Details Of Stores
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/*<h1>{props.updata.data.id}</h1>*/}
                    <VendorEdit  toggle={props.onHide} />

                    </Modal.Body>
              </Modal>
         </>
    )
}
export default VendorEditModal;