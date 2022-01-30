import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row, Spinner,FormCheck} from "react-bootstrap";
import Select from "react-select";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import notification from "../../includes/notification";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import {useHistory} from "react-router-dom";
import {getAllRole} from './../../../../redux/actions/HrAdmin'
import {useDispatch, useSelector} from "react-redux";

const HrStaffCreate = () =>{
    const history = useHistory();
      const dispatch = useDispatch();
      const hrAdminState = useSelector((state) => state.hrAdmin);
      const allRolesLists=hrAdminState.allRolesLists;
    let selectCustomerRef = null;
    let formRef = null;
    const [modalShow, setModalShow] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [branches, setBranches] = useState([]);
    const [formerrors, setFormerrors ] = useState({});
    const [formField, setFormField] = useState({
        name: '',
        phone: '',
        email: '',
        role:'',
        salary:'',
        // commission_type:1,
        percentage_commission:0,
        distance_commission:1,
        branch_id: '',
        internal_commission:null,
        transfer_commission:null,
        address:'',
        distance_commission_rate:null,
    });
    useEffect(()=>{
        let hrAdmin = JSON.parse(localStorage.getItem('staff_hrAdmin'));
        // console.log('hello use');
         if(hrAdmin){
          setAuthorizationToken(hrAdmin.token);
        }
         loadBranches();
         getRole();
    },[])
    const loadBranches = async () => {
        await axios.get('/hr/branch/list')
            .then((res) => {
                let branchesArr =[];
                res.data.map((data) => {
                    branchesArr.push({
                        value: data.id,
                        label: data.name,
                        name: 'branch_id'
                    });
                })
                // console.log(res.data);
                setBranches(branchesArr);
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
    const handleForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        console.log(newField.distance_commission_rate);
        console.log(newField.internal_commission);
        console.log(newField.transfer_commission);
        if(newField.distance_commission_rate===''){
            newField[event.target.name] =null;
        }
        if(newField.internal_commission===''){
            newField[event.target.name] =null;
        }
        if(newField.transfer_commission===''){
            newField[event.target.name] =null;
        }
        setFormField(newField);
        if ( !!formerrors[event.target.name] ) setFormerrors({
          ...formerrors,
          [event.target.name]: null
        })
    }
    const FindFormErrors = () =>{
     console.log(formerrors);
     let pattern = /^(\d*)([,.]\d{0,2})?$/;
     // let phonePattern = /[^0-9]/g;
     let EmailRegEx = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

     const {name,phone,email,address,weight,type,salary} = formField
     const newErrors = {}
     // packet name validate
     if ( !name || name === '' ) newErrors.name = 'Name must Required!'
     else if ( name.length > 30 ) newErrors.name = 'Name is too long!'
     if ( !salary || salary === '' ) newErrors.salary = 'Salary must Required!'

     if ( !phone || phone === '' ) newErrors.phone = 'Phone number must Required'
     // else if (!phone.match(phonePattern) ) newErrors.phone = 'In Valid Number!'


     // price cod validation
     if ( !email || email === ''  ) newErrors.email = 'Email must Required'
     else if(!email.match(EmailRegEx)) newErrors.email = 'In Valid Email!'
     // customer validation

     if(!address || address ==='') newErrors.address ='Address must Required'
     // if(!weight || weight ==='') newErrors.weight ='Weight must Required'
     // if(!type || type ==='') newErrors.type ='Type must Required'

     return newErrors
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

             await axios.post('/hr/staff/register', formField)
                 .then((res) => {
                     console.log(res)
                     if (res.data.status === true) {
                         notification('success', res.data.message);
                         setLoading(false);
                          history.push('/hr/staff/list');
                     } else {
                         notification('danger', res.data.message);
                         setLoading(false);
                     }
                 })
                 .catch((err) => {
                     console.log(err.response.data)
                 })
         }

    }
    const selectChange = event => {
        console.log(event)
        if(event){
            const field = {...formField};
            field[event.name] = event.value;
            // if(formField.role===''){
            //     field.role = event.value;
            //
            // }
            setFormField(field);
             if ( !!formerrors[event.name] ) setFormerrors({
             ...formerrors,
             [event.name]: null
            })
        }
    }
    const SelectRoleChange=(event)=>{
        console.log(event);
        if(event) {
            const field = {...formField};
            field.role = event.value;
            setFormField(field);
        }
    }
    const clearValue = () => {
            selectCustomerRef.select.clearValue();
            formRef.reset();
          };
    const roles = [
        { value: 'admin', label: 'admin',name:'role'},
        { value: 'delivery', label: 'delivery',name:'role'},

    ]
    const weights = [
        { value: '1', label: 'Itahari Branch',name:'branch_id'},
        { value: '2', label: 'Kathmandu Branch',name:'branch_id'},
        { value: '3', label: 'Damak Branch',name:'branch_id'},
        { value: '4', label: 'Dharan Branch',name:'branch_id'},
        { value: '5', label: 'Biratnagar Branch',name:'branch_id'},
    ]
    const initializeCommissionTypePercentage=(event)=>{
         console.log('checkTest percentage');
         let checkVariable = event.target.checked;
         if(checkVariable){
             const newField = {...formField}
             newField.percentage_commission=1;
             newField.distance_commission=0;
            console.log(newField.percentage_commission);
             console.log(newField.distance_commission);
           setFormField(newField);

         }
    }
    const initializeCommissionTypeDistance=(event)=>{
         console.log('checkTest percentage');
         let checkVariable = event.target.checked;
         if(checkVariable){
             const newField = {...formField}
             newField.distance_commission=1;
             newField.percentage_commission=0;
            console.log(newField.distance_commission);
            console.log(newField.percentage_commission);
           setFormField(newField);

         }
    }
    const getRole=()=>{
        axios.get('/hr/role/list')
                 .then((res) => {
                     console.log(res);
                      if(res.data){
                           let allRoles =res?.data;
                            let allRolesList=[];
                            allRoles.forEach((items,index)=>{
                            console.log('hello list');

                            let arrayObject={
                                value:items.name,
                                label:items.name,
                            };
                            // allCustomerDataList.value=items.id;
                            // allCustomerDataList.label=items.name+'('+items.phone+')';
                                if(arrayObject.value=='hr_admin'){

                                }else{
                                     allRolesList.push( arrayObject);
                                     dispatch(getAllRole(allRolesList));
                                }
                            // allRolesList.push( arrayObject);
                            // dispatch(getAllRole(allRolesList));

                        })
                      }
                 })
                 .catch((err) => {
                     console.log(err.response)
                 })
    }

    return(
        <>

             <Row className="justify-content-center">
                <Col lg={6}>
                    <div className="branch_new_pickup_area mt-3">
                        <Row>
                            <Col lg={12}>
                                <h6 className="mb-0 text-center" style={{fontSize:'17px',}}>Please Create Employee !!!</h6>
                            </Col>
                        </Row>
                        <Form onSubmit={(event) => handleSubmit(event)} ref={form => formRef = form}>
                            <Row>
                                <Col lg={12}>
                                    <Form.Group className="mt-2">
                                        <Form.Label className="mb-0">Name :</Form.Label>
                                        <Form.Control type="text" name="name" onChange={(event) => handleForm(event)} isInvalid={ !!formerrors.name }/>
                                         <Form.Control.Feedback type='invalid'>
                                                    {formerrors.name}
                                         </Form.Control.Feedback>
                                    </Form.Group>

                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mt-2">
                                        <Form.Label className="mb-0">Phone :</Form.Label>
                                        <Form.Control type="text" name="phone" onChange={(event) => handleForm(event)} isInvalid={ !!formerrors.phone } />
                                        <Form.Control.Feedback type='invalid'>
                                                    {formerrors.phone}
                                         </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mt-2">
                                        <Form.Label className="mb-0">Email :</Form.Label>
                                        <Form.Control type="email" name="email" onChange={(event) => handleForm(event)} isInvalid={ !!formerrors.email }/>
                                        <Form.Control.Feedback type='invalid'>
                                                    {formerrors.email}
                                         </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mt-2">
                                        <Form.Label className="mb-0">Address :</Form.Label>
                                        <Form.Control type="text" name="address" onChange={(event) => handleForm(event)} isInvalid={ !!formerrors.address }/>
                                        <Form.Control.Feedback type='invalid'>
                                                    {formerrors.address}
                                         </Form.Control.Feedback>

                                    </Form.Group>
                                </Col>
                               <Col lg={12}>
                                    <Form.Group className="mt-2">
                                        <Form.Label className="mb-0">Role :</Form.Label>
                                        <Select
                                              className="basic-single"
                                              classNamePrefix="select"
                                              isDisabled={false}
                                              isLoading={false}
                                              isClearable={false}
                                              isRtl={false}
                                              isSearchable={true}
                                              name="role"
                                              placeholder="== Select Roles =="
                                              options={allRolesLists}
                                              onChange={(event) => SelectRoleChange(event)}
                                            />
                                    </Form.Group>
                                </Col>
                                {
                                    formField.role ==='delivery'?
                                        <>
                                            <Col lg={12}>
                                              <Form.Group as={Row} className="mb-3">
                                                  <Col lg={6}>

                                                     <Form.Check onChange={(event)=>initializeCommissionTypePercentage(event)}
                                                        type="radio"
                                                        id="autoSizingCheck"
                                                        name="delivery_type"
                                                        className="mb-0 mt-2"
                                                        label="Percentage Commission"
                                                      />
                                                   </Col>
                                                  <Col lg={6}>

                                                     <Form.Check onChange={(event)=>initializeCommissionTypeDistance(event)}
                                                        defaultChecked
                                                        type="radio"
                                                        id="autoSizingCheck"
                                                        name="delivery_type"
                                                        className="mb-0 mt-2"
                                                        label="Per Distance Commission"
                                                      />
                                                   </Col>
                                              </Form.Group>
                                           </Col>
                                        </>:
                                        <>
                                        </>

                                }
                                {
                                     formField.role ==='delivery'?
                                         <>
                                             {formField.distance_commission===1 ?
                                                <>
                                                    <Col lg={12}>
                                                        <Form.Group className="mt-0">
                                                            <Form.Label className="mb-0">Distance Commission Rate :</Form.Label>
                                                            <Form.Control type="text" name="distance_commission_rate" onChange={(event) => handleForm(event)} isInvalid={ !!formerrors.address }/>
                                                        </Form.Group>
                                                    </Col>
                                                </>:
                                                <>
                                                </>
                                             }
                                             {formField.percentage_commission===1?
                                                 <>
                                                     <Col lg={6}>
                                                         <Form.Group className="mt-2">
                                                            <Form.Label className="mb-0">Internal Commission (%):</Form.Label>
                                                            <Form.Control type="text" name="internal_commission" onChange={(event) => handleForm(event)} isInvalid={ !!formerrors.address }/>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <Form.Group className="mt-0">
                                                            <Form.Label className="mb-0">External Commission (%) :</Form.Label>
                                                            <Form.Control type="text" name="transfer_commission" onChange={(event) => handleForm(event)} isInvalid={ !!formerrors.address }/>
                                                        </Form.Group>

                                                    </Col>
                                                 </>:
                                                 <>

                                                 </>

                                             }

                                         </>:
                                         <>


                                         </>
                                }
                                <Col lg={12}>
                                    <Form.Group className="mt-2">
                                        <Form.Label className="mb-0">Salary :</Form.Label>
                                        <Form.Control type="number" name="salary" onChange={(event) => handleForm(event)} isInvalid={ !!formerrors.salary }/>
                                        <Form.Control.Feedback type='invalid'>
                                                    {formerrors.salary}
                                         </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mt-2">
                                        <Form.Label className="mb-0">Branch :</Form.Label>
                                        <Select
                                              className="basic-single"
                                              classNamePrefix="select"
                                              isDisabled={false}
                                              isLoading={false}
                                              isClearable={false}
                                              isRtl={false}
                                              isSearchable={true}
                                              name="customer"
                                              placeholder="== Select Branch =="
                                              options={branches}
                                              onChange={(event) => selectChange(event)}
                                            />
                                    </Form.Group>
                                </Col>
                                {/*<Col lg={6}>*/}
                                {/*    <Form.Group className="mt-4">*/}
                                {/*        <Form.Label>Internal Commission :</Form.Label>*/}
                                {/*        <Form.Control type="number" name="internal_commission" onChange={(event) => handleForm(event)} />*/}
                                {/*        /!*<Form.Control.Feedback type='invalid'>*!/*/}
                                {/*        /!*            {formerrors.email}*!/*/}
                                {/*        /!* </Form.Control.Feedback>*!/*/}
                                {/*    </Form.Group>*/}
                                {/*</Col>*/}
                                {/* <Col lg={6}>*/}
                                {/*    <Form.Group className="mt-4">*/}
                                {/*        <Form.Label>Transfer Commission :</Form.Label>*/}
                                {/*        <Form.Control type="number" name="transfer_commission" onChange={(event) => handleForm(event)} />*/}
                                {/*        /!*<Form.Control.Feedback type='invalid'>*!/*/}
                                {/*        /!*            {formerrors.email}*!/*/}
                                {/*        /!* </Form.Control.Feedback>*!/*/}
                                {/*    </Form.Group>*/}
                                {/*</Col>*/}
                                <Col lg={12}>
                                    <Form.Group className="mt-4">
                                        {isLoading ? (
                                            <Button  className="customBtn" style={{width:'100%',}}><Spinner size="sm" animation="border" /><span style={{marginLeft: '7px'}}>Submitting</span></Button>
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
export default HrStaffCreate;