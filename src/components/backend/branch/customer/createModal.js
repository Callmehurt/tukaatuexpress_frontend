import React, {useEffect, useState} from "react";
import {Modal, Button, Form} from 'react-bootstrap';
import axios from "axios";
import notification from "../../includes/notification";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";


const CreateCustomer = (props) => {

    useEffect(() => {
        let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
        if(branch_detail){
          setAuthorizationToken(branch_detail.token);
        }
        },[]);

    const [formField, setFormField] = useState({
        name: '',
        phone: '',
        address:''
    });

    const handleLoginForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
    }

    const submitForm = async (event) => {
        event.preventDefault();
        await axios.post('/branch/customer/register', formField)
            .then((res) => {
                console.log(res);
                if (res.data.status === true){
                    notification('success', res.data.message);
                    props.onHide();
                    props.loadCustomer();
                }else {
                    notification('danger', res.data.message);
                }
            })
    }

    return (
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Register New Customer
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={(event) => submitForm(event)}>
                  <Form.Group>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" name="name" value={formField.name} onChange={(event) => handleLoginForm(event)} required />
                  </Form.Group>
                   <Form.Group className="mt-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control type="text" name="phone" value={formField.phone} onChange={(event) => handleLoginForm(event)} required />
                  </Form.Group>
                  <Form.Group className="mt-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="text" name="address" value={formField.address} onChange={(event) => handleLoginForm(event)} required />
                  </Form.Group>
                  <Form.Group className="mt-3">
                      <Button className="customBtn" type="submit" style={{float: 'right'}}>Submit</Button>
                      <Button className="customBtn" style={{float: 'right', marginRight: '10px'}} onClick={props.onHide}>Close</Button>
                  </Form.Group>
              </Form>
          </Modal.Body>
        </Modal>
  );
}

export default CreateCustomer;