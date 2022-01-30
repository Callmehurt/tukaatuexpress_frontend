import React, {useEffect, useState} from "react";
import {Row, Col, Form, Button} from "react-bootstrap";
import VendorLocationMap from "../vendor/VendorLocationMap";
import axios from "axios";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import showNotification from "../../../includes/notification";
import {useDispatch} from "react-redux";
import {loadPartnerList} from "../../../../../redux/actions/loadPartnerList";

const VendorCreate = (props) => {
    const toggle = props.toggle;
    const dispatch = useDispatch();

    // useEffect(() => {
    //     let staffadmin = JSON.parse(localStorage.getItem('staff_admin'));
    //     console.log(staffadmin);
    //     if(staffadmin){
    //       setAuthorizationToken(staffadmin.token);
    //     }
    // },[]);

    const refreshTable = () => {
        axios.get('admin/vendor/list')
            .then((res) => {
                console.log(res);
                dispatch(loadPartnerList(res.data))
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }

    const [formField, setFormField] = useState({
        lat: '',
        lon: '',
        vendor_name: '',
        vendor_email: '',
        vendor_phone: '',
        vendor_bank: '',
        vendor_account: '',
        vendor_esewa: '',
        vendor_account_holder: '',
    });

     const handleForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
    }

    const submitForm = async (event) => {
         event.preventDefault();
         let staffadmin = JSON.parse(localStorage.getItem('staff_admin'));
        console.log(staffadmin.token);
        if(staffadmin){
          setAuthorizationToken(staffadmin.token);
        }
          let latLng = JSON.parse(localStorage.getItem('vendor_location'));
          if(latLng){
              const newField= {...formField};
             newField.lat = latLng.lat;
             newField.lon = latLng.lng;
             await createVendor(newField);
          }else {
              showNotification('warning', 'Please mark the location')
          }

    }


    const createVendor = async (field) => {
         console.log(field);

         await axios.post('admin/vendor/register', field)
             .then((res) => {
                 console.log(res);
                 if(res.data.status === false){
                     showNotification('danger', res.data.message);
                 }else{
                     localStorage.removeItem('vendor_location');
                     toggle(false);
                     refreshTable();
                     showNotification('success', res.data.message);
                 }
             })
             .catch((err) => {
                 console.log(err.response.data);
             });
    }

    return (
        <>
            <Row>
                <Col lg={12}>
                    <Form onSubmit={(event) => submitForm(event)}>
                    <Form.Group>
                        <Form.Control type="text" name="vendor_name" onChange={(event) => handleForm(event)} placeholder="Vendor name" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Control type="email" name="vendor_email" onChange={(event) => handleForm(event)} placeholder="Vendor email" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Control type="number" name="vendor_phone" onChange={(event) => handleForm(event)} placeholder="Vendor phone" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Control type="text" name="vendor_bank" onChange={(event) => handleForm(event)} placeholder="Bank name" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Control type="text" name="vendor_account" onChange={(event) => handleForm(event)} placeholder="Account number" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Control type="text" name="vendor_account_holder" onChange={(event) => handleForm(event)} placeholder="Account holder name" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Control type="number" name="vendor_esewa" onChange={(event) => handleForm(event)} placeholder="Esewa" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Label>Pickup Location</Form.Label>
                        <div style={{height: "200px", width: "100%"}}>
                            <VendorLocationMap state={formField} setFormField={setFormField.bind(this)}  />
                        </div>
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Button type="submit" className="customBtn" style={{float: 'right'}}>Create</Button>
                        <Button className="customBtn" style={{float: 'right', marginRight: '10px'}} onClick={() => toggle(false)}>Close</Button>
                    </Form.Group>
                </Form>
                </Col>
            </Row>
        </>
    )
}

export default VendorCreate;