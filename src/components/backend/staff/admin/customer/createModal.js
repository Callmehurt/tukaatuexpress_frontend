import React, {useEffect, useState} from "react";
import {Modal, Button, Form} from 'react-bootstrap';
import axios from "axios";
import notification from "../../../includes/notification";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import {getCurrentCustomerAddedOperation} from "../../../../../redux/actions/BranchOperation";
import {useDispatch} from "react-redux";

const AdminCreateCustomer = (props) =>{
     const dispatch = useDispatch();
    const [formerrors, setFormerrors] = useState({});
     useEffect(() => {
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
        },[]);

    const [formField, setFormField] = useState({
        name: '',
        phone: '',
        address:''
    });
    const FindFormErrors = () =>{
     console.log(formerrors);
     let pattern = /^(\d*)([,.]\d{0,2})?$/;
     // let numberPattern=^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$;
     const {name,address,phone} = formField;
     const newErrors = {}
         let phoneLength=10;
     let addressLength=3;
     // packet name validate
     if ( !name || name === '' ) newErrors.name = ' Name is empty!'
     else if ( name.length < 5 ) newErrors.name = 'Minimum 5 Characters '
     if(!phone || phone === '') newErrors.phone = 'Number is Empty '
     else if ( phone.length >phoneLength|| phone.length < phoneLength) newErrors.phone = 'Invalid Phone Number'
     // price cod validation
     if ( !address || address === '') newErrors.address = 'Address is Empty'
     else if ( address.length < addressLength ) newErrors.address = 'Minimum 3 Characters '
     // else if(!cod.match(pattern)) newErrors.cod = 'Price must be in number'
     // // customer validation
     // if(!customer_id || customer_id ==='') newErrors.customer_id ='Customer must Required'

     // if(!partner_id || partner_id ==='') newErrors.partner_id ='Partner must Required'
     // if(!weight || weight ==='') newErrors.weight ='Weight must Required'
     // if(!type || type ==='') newErrors.type ='Type must Required'
     return newErrors
    }

    const handleLoginForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
    }

    const submitForm =(event) => {
        event.preventDefault();
         const newErrors = FindFormErrors();
         if ( Object.keys(newErrors).length > 0 ) {
          // We got errors!
           setFormerrors(newErrors);
        } else {
            axios.post('/admin/customer/register', formField)
                .then((res) => {
                    console.log(res);
                    if (res.data.status === true){

                        notification('success', res.data.message);
                        props.onHide();
                        props.loadCustomer();
                            console.log('history push data');
                            let allCurrentCustomerData = res.data.data;
                            console.log(allCurrentCustomerData);
                            console.log("allCurrentCustomerData");
                            let allCurrentCustomerDataList = [];
                            // allcustomerData.forEach((items,index)=>{
                            console.log('hello list');
                            let arrayObject = {
                                value: allCurrentCustomerData.id,
                                label: allCurrentCustomerData.name + '(' + allCurrentCustomerData.phone + ')',
                            };
                            console.log(arrayObject);
                            // allCustomerDataList.value=items.id;
                            // allCustomerDataList.label=items.name+'('+items.phone+')';
                            // allCustomerDataList.push( arrayObject);
                            dispatch(getCurrentCustomerAddedOperation(arrayObject));

                            // })
                            //  history.push({
                            //     pathname: '/vendor/request_pickup',
                            //     state: {customerData: allCustomerLists[0] }
                            // });
                            // history.push('/vendor/request_pickup');
                    }else {
                        notification('danger', res.data.message);
                    }
                })
        }
    }

    return(
        <>
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
                      <Form.Control type="text" name="name" value={formField.name} onChange={(event) => handleLoginForm(event)} isInvalid={!!formerrors.name} />
                      <Form.Control.Feedback type='invalid'>
                                            {formerrors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                   <Form.Group className="mt-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control type="text" name="phone" value={formField.phone} onChange={(event) => handleLoginForm(event)} isInvalid={!!formerrors.phone} />
                       <Form.Control.Feedback type='invalid'>
                                            {formerrors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mt-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="text" name="address" value={formField.address} onChange={(event) => handleLoginForm(event)} isInvalid={!!formerrors.address} />
                      <Form.Control.Feedback type='invalid'>
                                            {formerrors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mt-3">
                      <Button className="customBtn" type="submit" style={{float: 'right'}}>Submit</Button>
                      <Button className="customBtn" style={{float: 'right', marginRight: '10px'}} onClick={props.onHide}>Close</Button>
                  </Form.Group>
              </Form>
          </Modal.Body>
        </Modal>
        </>
    )

}
export default AdminCreateCustomer