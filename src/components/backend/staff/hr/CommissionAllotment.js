import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import {HrAdminDeliveryPerson} from "../../../../redux/actions/HrAdmin";
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import notification from "../../includes/notification";
import {useHistory} from "react-router-dom";
import {deliveryPersonForCommission} from './../../../../redux/actions/HrAdmin'

const CommissionAllotment=()=>{
     const dispatch = useDispatch();
     const history = useHistory();
     const hrAdminState = useSelector((state) => state.hrAdmin);
     const hrDeliveryPersonForCommission = hrAdminState.deliveryPersonForCommission;
    const [isLoading, setLoading] = useState(false);
    const [formerrors, setFormerrors ] = useState({});
    const[formField,setFormField]=useState({
        staff_id:'',
        internal_commission:'',
        transfer_commission:'',
    });
    const FindFormErrors = () =>{
     console.log(formerrors);
     let pattern = /^(\d*)([,.]\d{0,2})?$/;
     // let phonePattern = /[^0-9]/g;
     // let EmailRegEx = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

     const {staff_id,internal_commission,transfer_commission} = formField
     const newErrors = {}
     // packet name validate
     if ( !staff_id ||staff_id === '' ) newErrors.staff_id = 'Staff must Required!'
     // else if ( name.length > 30 ) newErrors.name = 'Name is too long!'

     if ( !internal_commission|| internal_commission === '' ) newErrors.internal_commission = 'Internal Commission must Required'
     // else if (!phone.match(phonePattern) ) newErrors.phone = 'In Valid Number!'


     // price cod validation
     if ( !transfer_commission || transfer_commission === ''  ) newErrors.transfer_commission = 'Transfer commission must Required'
     // else if(!email.match(EmailRegEx)) newErrors.email = 'In Valid Email!'
     // customer validation

     // if(!address || address ==='') newErrors.address ='Address must Required'
     // if(!weight || weight ==='') newErrors.weight ='Weight must Required'
     // if(!type || type ==='') newErrors.type ='Type must Required'

     return newErrors
    }
    useEffect(()=>{
        let hrAdmin = JSON.parse(localStorage.getItem('staff_hrAdmin'));
        console.log(hrAdmin);
        if(hrAdmin){
          setAuthorizationToken(hrAdmin.token);
        }
        DeliveryPersonsFunc();
        console.log(hrDeliveryPersonForCommission);
        console.log('delivery Person');

    },[0])

     const DeliveryPersonsFunc =()=>{
         axios.get('/hr/get/delivery/person/commission')
            .then((res) => {
                console.log(res);
                console.log(res.data);
                console.log('res data');
                dispatch(deliveryPersonForCommission(res.data));
                // dispatch(wareHouseListCount(res.data.length));
            })
            .catch((err) => {
                console.log(err.response);
            })
    }
     const handleSubmit = async (event) => {

        event.preventDefault();
        console.log(formField);
        const newErrors = FindFormErrors();
         if ( Object.keys(newErrors).length > 0 ) {
          // We got errors!
           setFormerrors(newErrors);
        }
         else {
             setLoading(true);

             await axios.post('/hr/staff/allot/commission', formField)
                 .then((res) => {
                     console.log(res)
                     if (res.data.status === true) {
                         notification('success', res.data.message);
                         setLoading(false);
                          history.push('/hr/staff/list');
                     } else {
                         notification('danger', res.data.message);
                     }
                 })
                 .catch((err) => {
                     console.log(err.response)
                 })
         }


     }
    const staff=[
        { value: '2', label: 'John Doe2',name:'staff_id'},
        { value: '4', label: 'DeliveryStaff1',name:'staff_id'},
        { value: '5', label: 'DeliveryStaff2',name:'staff_id'},
    ];
     const handleForm = (event) => {
         const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
        if ( !!formerrors[event.target.name] ) setFormerrors({
          ...formerrors,
          [event.target.name]: null
        })

     }
     const selectChange =(event)=>{
         if(event){
            const field = {...formField};
            field.staff_id=event.value;
            field[event.name] = event.value;
            setFormField(field);
            if ( !!formerrors[event.name] ) setFormerrors({
             ...formerrors,
             [event.name]: null
            })

        }

     }
      const clearValue = () => {
            // selectCustomerRef.select.clearValue();
            // formRef.reset();
          };


    return(
        <>
             <Row className="justify-content-center pt-5">
                <Col lg={6}>
                    <div className="branch_new_pickup_area">
                        <Row>
                            <Col lg={12}><h5 className="mb-0">Staff Commission Allotment </h5></Col>
                        </Row>
                        <Form onSubmit={(event) => handleSubmit(event)} >
                            <Row>

                                <Col lg={12}>
                                    <Form.Group className="mt-4">
                                        <Form.Label>Staff :</Form.Label>
                                        <Select
                                              className="basic-single"
                                              classNamePrefix="select"
                                              isDisabled={false}
                                              isLoading={false}
                                              isClearable={false}
                                              isRtl={false}
                                              isSearchable={true}
                                              name="staff_id"
                                              placeholder="== Select Delivery Person =="
                                              // options={deliveryPersonList}
                                               options={hrDeliveryPersonForCommission}
                                              onChange={(event) => selectChange(event)}
                                            />
                                        <Form.Label style={{color:'red',paddingLeft:'3px',paddingTop:'2px',}}>
                                            {formerrors.staff_id}
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mt-4">
                                        <Form.Label>Internal Commission :</Form.Label>
                                        <Form.Control type="number" name="internal_commission" onChange={(event) => handleForm(event)} isInvalid={ !!formerrors.internal_commission } />
                                        <Form.Control.Feedback type='invalid'>
                                                    {formerrors.internal_commission}
                                         </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                 <Col lg={6}>
                                    <Form.Group className="mt-4">
                                        <Form.Label>Transfer Commission :</Form.Label>
                                        <Form.Control type="number" name="transfer_commission" onChange={(event) => handleForm(event)} isInvalid={ !!formerrors.transfer_commission } />
                                        <Form.Control.Feedback type='invalid'>
                                                    {formerrors.transfer_commission}
                                         </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mt-4">
                                        {isLoading ? (
                                            <Button type="submit" className="customBtn" style={{width:'100%',}}><Spinner size="sm" animation="border" /><span style={{marginLeft: '7px'}}>Submitting</span></Button>
                                        ) : (
                                        <Button type="submit" className="customBtn" style={{width:'100%',}}>Submit</Button>
                                        )}

                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Row>

        </>
    )
}
export default CommissionAllotment