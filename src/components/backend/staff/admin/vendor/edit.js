import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import VendorLocationMap from "./VendorLocationMap";
import axios from "axios";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import {useDispatch, useSelector} from "react-redux";
import showNotification from "../../../includes/notification";
import {loadPartnerList} from "../../../../../redux/actions/loadPartnerList";
import {updatePartner} from "../../../../../redux/actions/updatePartner";

const VendorEdit = (props) =>{
    const toggle = props.toggle;
    const dispatch = useDispatch();
     const thisState = useSelector((state) => state.updatePartner);
     const partnerUpdate = thisState.partnerUpdate;
     console.log(partnerUpdate);
    // console.log(props.editformdata.vendor_name);
    // console.log(props.editformdata.data.vendor_bank);
    // const [updateFormField, setUpdateFormField] = useState({
    //     lat: '',
    //     lon: '',
    //     vendor_name:partnerUpdate.vendor_name,
    //     vendor_email:partnerUpdate.vendor_email,
    //     vendor_phone:partnerUpdate.vendor_phone,
    //     vendor_bank:partnerUpdate.vendor_bank,
    //     vendor_account:partnerUpdate.vendor_account,
    //     vendor_esewa:partnerUpdate.vendor_esewa,
    //     vendor_account_holder:partnerUpdate.vendor_account_holder,
    // });





     const handleForm = event => {
        const newField = {...partnerUpdate}
        newField[event.target.name] = event.target.value;
        dispatch(updatePartner(newField));
        // setUpdateFormField(newField);
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
              const newField= {...partnerUpdate};
             newField.lat = latLng.lat;
             newField.lon = latLng.lng;
             newField.vendor_id = newField.id;
             console.log(newField);
             await updateVendor(newField);
          }else {
              showNotification('warning', 'Please mark the location')
          }

    }
     const updateVendor = async (field) => {
         console.log(field);

         await axios.post('admin/vendor/detail/update', field)
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
    return(
        <>
           <Row>
                <Col lg={12}>
                    <Form onSubmit={(event) => submitForm(event)}>
                    <Form.Group>
                        <Form.Control type="text" value={partnerUpdate.vendor_name} name="vendor_name" onChange={(event) => handleForm(event)} placeholder="Vendor name" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Control type="email" value={partnerUpdate.vendor_email} name="vendor_email" onChange={(event) => handleForm(event)} placeholder="Vendor email" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Control type="number" value={partnerUpdate.vendor_phone} name="vendor_phone" onChange={(event) => handleForm(event)} placeholder="Vendor phone" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Control type="text" value={partnerUpdate.vendor_bank}  name="vendor_bank" onChange={(event) => handleForm(event)} placeholder="Bank name" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Control type="text" value={partnerUpdate.vendor_account}  name="vendor_account" onChange={(event) => handleForm(event)} placeholder="Account number" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Control type="text" value={partnerUpdate.vendor_account_holder}  name="vendor_account_holder" onChange={(event) => handleForm(event)} placeholder="Account holder name" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Control type="number"  value={partnerUpdate.vendor_esewa}  name="vendor_esewa" onChange={(event) => handleForm(event)} placeholder="Esewa" required />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Label>Pickup Location</Form.Label>
                        <div style={{height: "200px", width: "100%"}}>
                            <VendorLocationMap   />
                        </div>
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Button type="submit" className="customBtn" style={{float: 'right'}}>Update</Button>
                        <Button className="customBtn" style={{float: 'right', marginRight: '10px'}} onClick={() => toggle(false)}>Close</Button>
                    </Form.Group>
                </Form>
                </Col>
            </Row>
        </>

    )
}
export default VendorEdit