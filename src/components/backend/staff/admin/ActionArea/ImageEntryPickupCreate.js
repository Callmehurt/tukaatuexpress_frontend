import React, {useEffect, useState} from 'react';
import {Row, Col, Form, Button, Spinner, Modal} from 'react-bootstrap';
import {useHistory, useLocation} from "react-router-dom";
import Select from "react-select";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import notification from "../../../includes/notification";
import {useForm} from "react-hook-form";
import {MdCropRotate} from 'react-icons/md';
import AddCustomerModal from './../customer/createModal';
import AdminCreateCustomer from "./../customer/createModal";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentCustomerAddedOperation} from "../../../../../redux/actions/BranchOperation";

const ImageEntryPickupCreate=()=>{
      const history = useHistory();
       const dispatch = useDispatch();
     const location=useLocation();
      const { register, handleSubmit, errors } = useForm();
     let selectCustomerRef = null;
    let selectPartnerRef = null;
    let formRef = null;
    let currDate= new Date();
    const [modalShow, setModalShow] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [date,setDate]=useState(new Date().getHours());
    const [second,setSecond]=useState(new Date().getSeconds());
    const [customer, setCustomer] = useState([]);
    const [partners, setPartner] = useState([]);
    const [formerrors, setFormerrors ] = useState({});
    const[imageRequestID,setImageRequestID]=useState(location.state?.imageRequestID);
    const[deliveryChargeIncluded,setDeliveryChargeIncluded]=useState(1);
    const branchOperation = useSelector((state) => state.branchOperation);
    const currentCustomerAddedOperation=branchOperation.currentCustomerAddedOperation;
    const [formField, setFormField] = useState({
        customer_id: '',
        partner_id: location.state.requestData.partner_id,
        type: '',
        weight:'',
        packet_name: '',
        cod: '',
        delivery_type: true,
        customer_charge_payable:0,
        request_id:location.state.requestData.id,
        img_id:location.state.image_idData,
        received_status:location.state.received_status,

        // staff_id: '',
    });
    useEffect(()=>{

         let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
         // console.log(staff_admin);
         // console.log('staff_admin');
         if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
        }else{
             history.push('/admin/login');
        }
         loadCustomer();
         loadPartner();
         getImageId();

    },[]);
    const getImageId=()=>{
          const newField = {...formField}
           // newField[event.target.name] = event.target.value;
           newField.img_id=location.state.image_idData;
           newField.request_id=location.state.requestData.id;
          setFormField(newField);
    }
    const updateTime=()=>{
        setDate(currDate.getHours());
        setSecond(currDate.getSeconds());
    }
    const FindFormErrors = () =>{
     let pattern = /^(\d*)([,.]\d{0,2})?$/;
      let decimalPattern=/^(\d+(\.\d+)?)$/;
     const {packet_name,cod,customer_id,partner_id,weight,type} = formField
     const newErrors = {}
     // packet name validate
     if ( !packet_name || packet_name === '' ) newErrors.packet_name = 'Packet Name is empty!'
     else if ( packet_name.length > 30 ) newErrors.packet_name = 'name is too long!'
     // price cod validation
     if ( !cod || cod === ''  ) newErrors.cod = 'Price is empty'
     else if(!cod.match(pattern)) newErrors.cod = 'Price must be in number'
     // customer validation
     if(!customer_id || customer_id ==='') newErrors.customer_id ='Customer is Required'

     if(!partner_id || partner_id ==='') newErrors.partner_id ='Partner is Required'
     if(!weight || weight ==='') newErrors.weight ='Weight is Required'
          else if(!weight.match(decimalPattern)) newErrors.weight ='Weight must be in numbers and . only '
     if(!type || type ==='') newErrors.type ='Order Type is Required'

     return newErrors
    }
    const initializeDcFromCustomer=(event)=>{
        let checkVariable = event.target.checked;
         if(checkVariable){
            setDeliveryChargeIncluded(0);
             const field = {...formField};
            // field.customer_id=event.value;
            field.customer_charge_payable =1;
             setFormField(field);
         }
    }
    const initializeCodIncluded=(event)=>{
            let checkVariable = event.target.checked;
             if(checkVariable){
               setDeliveryChargeIncluded(1);
               const field = {...formField};
                // field.customer_id=event.value;
                field.customer_charge_payable =0;
                setFormField(field);

             }
    }
    const onSubmit = async (event) => {
        const newErrors = FindFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
           setFormerrors(newErrors);
        } else {
         setLoading(true);

         await axios.post('/admin/pickup/create/by/image', formField)
            .then((res) => {
                console.log(res)
                if(res.data.status === true){
                    notification('success', res.data.message);
                    console.log(formField);
                    setLoading(false);
                    history.push({
                        pathname:'/staff/admin/proceeded_request_detail',
                        state:{requestID:imageRequestID}
                    });
                }else {
                    notification('success', res.data.message);
                }
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

  };
    const getDefaultDeliveryType=()=>{
        const newField = {...formField}
            newField.delivery_type=1;
              console.log(newField.delivery_type);
            setFormField(newField);
    }
    const selectChange = event => {
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        if(event){
            const field = {...formField};
            field[event.name] = event.value;
            setFormField(field);
            if ( !!formerrors[event.name] ) setFormerrors({
             ...formerrors,
             [event.name]: null
            })
        }
    }
    const handleForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
         if ( !!formerrors[event.target.name] ) setFormerrors({
          ...formerrors,
          [event.target.name]: null
        })
    }
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
    const types = [
        { value: 'fragile', label: 'Fragile', name: 'type'},
        { value: 'nonfragile', label: 'Non-Fragile', name: 'type'},
    ]
    const clearform = () => {
    console.log('clear form');
    // selectCustomerRef.select.clearValue();
    // selectPartnerRef.select.clearValue();
    formRef.reset();
 }
    const standardDelivery =(event)=> {
            console.log('checkTest');
            let checkVariable = event.target.checked;

            console.log(checkVariable);
            if (checkVariable) {
                const newField = {...formField}
                newField.delivery_type=1;
                  console.log(newField.delivery_type);
                setFormField(newField);
                if (!!formerrors[event.target.name]) setFormerrors({
                    ...formerrors,
                    [event.target.name]: null
                })

            }
        }
    const urgentDelivery =(event)=> {
        console.log('checkTest');
        let checkVariable = event.target.checked;
        console.log(checkVariable);
        if (checkVariable) {
            const newField = {...formField}
            newField.delivery_type = 0;
            console.log(newField.delivery_type);
            setFormField(newField);
            if (!!formerrors[event.target.name]) setFormerrors({
                ...formerrors,
                [event.target.name]: null
            })


        }
    }
    const[requestData,setRequestData]=useState(location.state?.requestData);
    setInterval(() =>{updateTime()}, 1000);
    const[rotateImage,setRotateImage]=useState(0)
    const loadCustomer = async () => {
        await axios.get('/admin/customer/list')
            .then((res) => {
                let cusArr =[]
                res.data.map((data) => {
                    cusArr.push({
                        value: data.id,
                        label: data.name+' - '+data.phone,
                        name: 'customer_id'
                    });
                })
                setCustomer(cusArr)
            })
            .catch((err) => {
                console.log(err)
            })
}
    const makeRotation=()=>{
         setRotateImage(rotateImage+90)
    }
    const loadPartner = async () => {
    await axios.get('/admin/vendor/list')
        .then((res) => {
            let partnerArr =[]
            res.data.map((data) => {
                partnerArr.push({
                    value: data.id,
                    label: data.vendor_name,
                    name: 'partner_id'
                });
            })
            setPartner(partnerArr);
        })
        .catch((err) => {
            console.log(err.response);
            console.log('error');
        })
}

    // Modal Create
     const [formFieldCustomer, setFormFieldCustomer] = useState({
        name: '',
        phone: '',
        address:''
    });
    const handleClose=()=>{
         setModalShow(false);
    }
    const handleLoginForm = event => {
        const newField = {...formFieldCustomer}
        newField[event.target.name] = event.target.value;
        setFormFieldCustomer(newField);
    }
    const [currentCustomer, setCurrentCustomer] = useState('');
    const FindFormErrorsCustomer = () =>{
     console.log(formerrors);
     let pattern = /^(\d*)([,.]\d{0,2})?$/;
     // let numberPattern=^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$;
     const {name,address,phone} = formFieldCustomer;
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
     return newErrors
    }
    const getCurrentCustomerCondition=()=>{
        setCurrentCustomer('')
    }
    const CustomerDisplay=()=>{

        return(
            <>
                  <Col lg={7}>
                    <Select
                             ref={ref => {
                            selectCustomerRef = ref;
                          }}
                          className="basic-single"
                          classNamePrefix="select"
                          defaultValue={currentCustomer}
                          isDisabled={false}
                          isLoading={false}
                             onFocus={(event)=>getCurrentCustomerCondition(event)}
                          isClearable={false}
                          isRtl={false}
                          isSearchable={true}
                          name="customer"
                          placeholder="== Select Customer =="
                          options={customer}
                          onChange={(event) => selectChange(event)}
                             isInvalid={ !!formerrors.customer_id }
                        />
                    {/*<Form.Control.Feedback type='invalid'>*/}
                    {/*    {formerrors.customer_id}*/}
                    {/*</Form.Control.Feedback>*/}
                    <Form.Label style={{color:'red',paddingLeft:'3px',paddingTop:'2px',}}>
                        {formerrors.customer_id}
                    </Form.Label>

                </Col>
            </>
        )
    }
    const submitForm =(event) => {
        event.preventDefault();
         const newErrors = FindFormErrorsCustomer();
         if ( Object.keys(newErrors).length > 0 ) {
          // We got errors!
           setFormerrors(newErrors);
        } else {
            axios.post('/admin/customer/register', formFieldCustomer)
                .then((res) => {
                    console.log(res);
                    if (res.data.status === true){

                        notification('success', res.data.message);
                        // onHide();
                        // handleClose();
                        setModalShow(false);

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
                            console.log('arrayObject');
                            // allCurrentCustomerData.push(arrayObject);

                            // allCustomerDataList.value=items.id;
                            // allCustomerDataList.label=items.name+'('+items.phone+')';
                            // allCustomerDataList.push( arrayObject);
                           setCurrentCustomer(arrayObject);
                           const field = {...formField};
                            field.customer_id = arrayObject.value;
                            setFormField(field);
                            dispatch(getCurrentCustomerAddedOperation(arrayObject));
                            loadCustomer();

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
            {/*<AddCustomerModal loadCustomer={() => loadCustomer()} show={modalShow} onHide={() => setModalShow(false)}  />*/}
            <Row>
                {/*Modal Add Customer*/}
                        <Modal
                               show={modalShow} onHide={handleClose}
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
                                          <Button className="customBtn" style={{float: 'right', marginRight: '10px'}} onClick={handleClose}>Close</Button>
                                      </Form.Group>
                                  </Form>
                              </Modal.Body>
                        </Modal>
                <Col lg={6}>
                    <div style={{paddingLeft:'25px',paddingRight:'25px'}}>
                         <Form onSubmit={handleSubmit(onSubmit)}  ref={form => formRef = form}>
                                         <Row>
                                             <Col lg={12}>
                                                        <Row>
                                                            <Col lg={12}>

                                                                {currentCustomer?
                                                                     <>
                                                                         <Row>
                                                                             <Col lg={12}>
                                                                              <Form.Group>
                                                                             <Form.Label>Customer:</Form.Label>
                                                                             <Row>
                                                                               <CustomerDisplay />
                                                                             <Col lg={4}>
                                                                                  <Button className="customBtn float-right" onClick={() => setModalShow(true)}>Add New</Button>

                                                                            </Col>

                                                                        </Row>
                                                                         </Form.Group>
                                                                             </Col>
                                                                         </Row>
                                                                     </>:
                                                                     <>
                                                                      <Row>
                                                                         <Col lg={12}>
                                                                             <Form.Group>
                                                                                 <Form.Label>Customer:</Form.Label>
                                                                                 <Row>
                                                                                <Col lg={7}>
                                                                                    <Select
                                                                                             ref={ref => {
                                                                                            selectCustomerRef = ref;
                                                                                          }}
                                                                                          className="basic-single"
                                                                                          classNamePrefix="select"
                                                                                          defaultValue={currentCustomer}
                                                                                          isDisabled={false}
                                                                                          isLoading={false}
                                                                                          isClearable={false}
                                                                                          isRtl={false}
                                                                                          isSearchable={true}
                                                                                          name="customer"
                                                                                          placeholder="== Select Customer =="
                                                                                          options={customer}
                                                                                          onChange={(event) => selectChange(event)}
                                                                                             isInvalid={ !!formerrors.customer_id }
                                                                                        />
                                                                                    {/*<Form.Control.Feedback type='invalid'>*/}
                                                                                    {/*    {formerrors.customer_id}*/}
                                                                                    {/*</Form.Control.Feedback>*/}
                                                                                    <Form.Label style={{color:'red',paddingLeft:'3px',paddingTop:'2px',}}>
                                                                                        {formerrors.customer_id}
                                                                                    </Form.Label>

                                                                                </Col>
                                                                                 <Col lg={5}>
                                                                                      <Button className="customBtn float-right" onClick={() => setModalShow(true)}>Add New</Button>

                                                                                </Col>

                                                                            </Row>
                                                                             </Form.Group>
                                                                         </Col>
                                                                      </Row>
                                                                     </>
                                                                 }

                                                            </Col>
                                                        </Row>
                                             </Col>
                                              <Col lg={12} className="d-none">
                                                    <Form.Group className="mt-4">
                                                        <Form.Label>Partner</Form.Label>
                                                        <Select
                                                            ref={ref => {
                                                                        selectPartnerRef = ref;
                                                                      }}
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            defaultValue= ""
                                                            isDisabled={false}
                                                            isLoading={false}
                                                            isClearable={false}
                                                            isRtl={false}
                                                            isSearchable={true}
                                                            placeholder="== Select Partner =="
                                                            options={partners}
                                                            onChange={(event) => selectChange(event)}
                                                            />
                                                        {/*<Form.Control.Feedback type='invalid'>*/}
                                                        {/*    {formerrors.partner_id}*/}
                                                        {/*</Form.Control.Feedback>*/}
                                                        <Form.Label style={{color:'red',paddingLeft:'3px',paddingTop:'2px',}}>
                                                            {formerrors.partner_id}
                                                        </Form.Label>
                                                    </Form.Group>
                                              </Col>

                                              <Col lg={6}>
                                                    <Form.Group className="mt-4">
                                                        <Form.Label>Type</Form.Label>
                                                        <Select
                                                              className="basic-single"
                                                              classNamePrefix="select"
                                                              defaultValue= ""
                                                              isDisabled={false}
                                                              isLoading={false}
                                                              isClearable={false}
                                                              isRtl={false}
                                                              isSearchable={true}
                                                              name="customer"
                                                              placeholder="== Select Type =="
                                                              options={types}
                                                              onChange={(event) => selectChange(event)}
                                                            />
                                                        <Form.Label style={{color:'red',paddingLeft:'3px',paddingTop:'2px',}}>
                                                                {formerrors.type}
                                                            </Form.Label>
                                                        </Form.Group>
                                              </Col>

                                             <Col lg={6}>
                                                <Form.Group className="mt-4">
                                                    <Form.Label>Weight <span style={{color:'red'}}>( *Only in KG format. Eg. if 100gm = 0.1 )</span></Form.Label>
                                                    <Form.Control  type="text" name="weight" onChange={(event) => handleForm(event)} isInvalid={ !!formerrors.weight }/>
                                                   <Form.Control.Feedback type='invalid'>
                                                         {formerrors.weight}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                             </Col>
                                             <Col lg={12}>
                                                    <Form.Group className="mt-4">
                                                        <Form.Label>Item Description</Form.Label>
                                                        <Form.Control type="text"    name="packet_name" onChange={(event) => handleForm(event)}  isInvalid={ !!formerrors.packet_name }  />

                                                         <Form.Control.Feedback type='invalid'>
                                                            {formerrors.packet_name}
                                                        </Form.Control.Feedback>

                                                    </Form.Group>
                                              </Col>
                                               <Col lg={12}>
                                                  <Form.Group className="mt-3 mb-1">
                                                    <Form.Group as={Row} className="mb-2">
                                                      <Col xs={6}>

                                                         <Form.Check onChange={(event)=>initializeCodIncluded(event)}
                                                             defaultChecked={true}
                                                            type="radio"
                                                            id="autoSizingCheckCodInc"
                                                            name="Cod"
                                                            className="mb-0 mt-2"
                                                            label="COD inc. DC"
                                                          />
                                                       </Col>
                                                      <Col xs={6}>

                                                         <Form.Check onChange={(event)=>initializeDcFromCustomer(event)}

                                                            type="radio"
                                                            id="autoSizingCheckCodExc"
                                                            name="Cod"
                                                            className="mb-0 mt-2"
                                                            label=" COD Exc. DC"
                                                          />
                                                       </Col>
                                            </Form.Group>
                                            {/*<Tabs*/}
                                            {/*    defaultActiveKey="exchange"*/}
                                            {/*    transition={false}*/}
                                            {/*    className="mb-3"*/}
                                            {/*>*/}
                                            {/*    <Tab eventKey="exchange" title="Product Exchange">*/}
                                            {deliveryChargeIncluded===1?
                                                <>
                                                     <Form.Group className="mt-0">
                                            {/*<Form.Label>COD Including Delivery Charge</Form.Label>*/}
                                                        <Form.Control autocomplete="off" type="text" name="cod" placeholder="COD Including Delivery Charge" onChange={(event) => handleForm(event)}
                                                                      isInvalid={!!formerrors.cod}/>
                                                        <Form.Control.Feedback type='invalid'>
                                                            {formerrors.cod}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </>:
                                                <>
                                                </>
                                            }
                                            {deliveryChargeIncluded===0?
                                                <>
                                                   <Form.Group className="mt-0">
                                                        {/*<Form.Label>COD Excluding Delivery Charge</Form.Label>*/}
                                                        <Form.Control autocomplete="off" type="text" name="cod" placeholder="COD Excluding Delivery Charge" onChange={(event) => handleForm(event)}
                                                                      isInvalid={!!formerrors.cod}/>
                                                        <Form.Control.Feedback type='invalid'>
                                                            {formerrors.cod}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </>:
                                                <>
                                                </>
                                            }

                                                {/*</Tab>*/}
                                                {/*<Tab eventKey="replace" title="Customer Replace">*/}

                                            {/*    </Tab>*/}
                                            {/*</Tabs>*/}
                                        </Form.Group>
                                        {/*<Form.Group className="mt-4">*/}
                                        {/*    <Form.Label>COD</Form.Label>*/}
                                        {/*    <Form.Control type="text" name="cod" onChange={(event) => handleForm(event)}*/}
                                        {/*                  isInvalid={!!formerrors.cod}/>*/}
                                        {/*    <Form.Control.Feedback type='invalid'>*/}
                                        {/*        {formerrors.cod}*/}
                                        {/*    </Form.Control.Feedback>*/}
                                        {/*</Form.Group>*/}
                                    </Col>
                                             <Col lg={12}>
                                                   <Form.Group as={Row} className="mb-3">

                                                       <Col lg={4}>

                                                         <Form.Check onChange={(event)=>standardDelivery(event)}
                                                           defaultChecked
                                                            type="radio"
                                                            id="autoSizingCheck"
                                                            name="delivery_type"
                                                            className="mb-0 mt-3"
                                                            label="Standard Delivery"
                                                          />
                                                       </Col>
                                                       <Col lg={4}>

                                                           { date>=12?<>
                                                                {/*<OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Check out this avatar</Tooltip>}*/}
      {/*>*/}
                                                                       <Form.Check onChange={(event)=>urgentDelivery(event)}
                                                                            disabled
                                                                            type="radio"
                                                                            id="autoSizingCheck"
                                                                            name="delivery_type"
                                                                            className="mb-0 mt-3"
                                                                            label="Same Day Delivery"
                                                                            style={{cursor:'pointer'}}
                                                                       />
                                                                   {/*</OverlayTrigger>*/}
                                                               </>:<>
                                                               <Form.Check onChange={(event)=>urgentDelivery(event)}
                                                                type="radio"
                                                                id="autoSizingCheck"
                                                                name="delivery_type"
                                                                className="mb-0 mt-3"
                                                                label="Same Day Delivery"
                                                              /></> }
                                                       </Col>
                                                       <Col lg={4}>
                                                           <Form.Check onChange={(event)=>urgentDelivery(event)}
                                                                            disabled
                                                                            type="radio"
                                                                            id="autoSizingCheck"
                                                                            name="delivery_type"
                                                                            className="mb-0 mt-3"
                                                                            label="Express Delivery"
                                                                            style={{cursor:'pointer'}}
                                                                       />
                                                       </Col>
                                                   </Form.Group>
                                             </Col>
                                             <Col lg={12}>
                                                <Form.Group className="mt-4">
                                                    {isLoading ? (
                                                        <Button className="customBtn" style={{width:'100%'}}><Spinner size="sm" animation="border" /><span style={{marginLeft: '7px'}}>Submitting</span></Button>
                                                    ) : (
                                                    <Button type="submit" className="customBtn" style={{width:'100%'}}>Submit</Button>
                                                    )}

                                                </Form.Group>
                                              </Col>
                                         </Row>
                         </Form>
                    </div>
                </Col>
                <Col lg={6}>
                   <div style={{position:'relative',display:'flex'}}>
                      <img src={requestData.img_url} style={{transform:`rotate(${rotateImage}deg)`}} className="img-fluid pt-3" />
                    <div onClick={makeRotation} style={{position:'absolute',display:'flex',top:'0px'}}><MdCropRotate style={{color:'#147298'}} size={20} /></div>
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default ImageEntryPickupCreate