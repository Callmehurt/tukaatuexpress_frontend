import React, {useEffect, useState} from 'react'
import {Row, Col, Form, Button, Spinner, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap'
import Select from "react-select";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {listen} from "dom-helpers";
import notification from "../../../includes/notification";
import AdminCreateCustomer from "../customer/createModal";
import {useHistory, useLocation} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {useDispatch, useSelector} from "react-redux";
import {
    getProductExchangeItemsOperation,
    getCustomerReplaceItemsOperation,
    getCurrentCustomerAddedOperation
} from './../../../../../redux/actions/BranchOperation'
import {getCurrentCustomerAdded, getProductExchangeItems} from "../../../../../redux/actions/vendor";
// import { yupResolver } from '@hookform/resolvers';
// import { yupResolver } from 'react-hook-form-resolvers';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import CreateCustomer from "../../../branch/customer/createModal";
// import {validationSuite} from "@hookform/resolvers/vest/src/__tests__/__fixtures__/data";
// import Select from 'react-select';

const AdminCreatepickups =()=>{
    const history = useHistory();
     const location=useLocation();
      const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();
     const branchOperation = useSelector((state) => state.branchOperation);
     const currentCustomerAddedOperation=branchOperation.currentCustomerAddedOperation;
    let selectCustomerRef = null;
    let selectPartnerRef = null;
    let formRef = null;
    let currDate= new Date();
    const[deliveryChargeIncluded,setDeliveryChargeIncluded]=useState(1);
    const [modalShow, setModalShow] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [date,setDate]=useState(new Date().getHours());
    const [second,setSecond]=useState(new Date().getSeconds());
    const [customer, setCustomer] = useState([]);
     const [currentCustomer, setCurrentCustomer] = useState('');
    const [partners, setPartner] = useState([]);
    const[checked,setChecked]=useState(false);
    const[custChecked,setCustChecked]=useState(false);
    const[exchange,setExchange]=useState('');
     const [exchangeCustomerField,setExchangeCustomerField]=useState(false);
    const [replaceCustomerField,setReplaceCustomerField]=useState(false);
    const [formerrors, setFormerrors ] = useState({});
    const [doubleClickCheck,setDoubleClickCheck]=useState(false);
     const [partnerSelected,setPartnerSelected]=useState(false);
    const [doubleClickCustomerCheck,setDoubleClickCustomerCheck]=useState(false);
    const [formFieldCustomer, setFormFieldCustomer] = useState({
        name: '',
        phone: '',
        address:''
    });
    const [formField, setFormField] = useState({
        customer_id: currentCustomer.value,
        partner_id: '',
        type: '',
        weight: '',
        packet_name: '',
        cod: '',
        packet_replace: '',
        packet_exchange: '',
        delivery_type: true,
        customer_charge_payable:0,
        // staff_id: '',

    });
    const [exchnageProductCustomer,setExchnageProductCustomer]=useState({
        value:'',
        label:'',
        // name:''
    });
    const loadCustomer = async () => {
        await axios.get('/admin/customer/list')
            .then((res) => {
                console.log(res);
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
                console.log(err.data);
            })
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
                console.log(err.response.data);
                console.log('error');
            })
    }
     setInterval(() =>{updateTime()}, 1000);
    useEffect(()=>{

         let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
         // console.log(staff_admin);
         // console.log('staff_admin');
        console.log('hello use');
         if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
         loadCustomer();
         loadPartner();
         console.log(formerrors);
         console.log(currDate);
         // setInterval(() => setDate(new Date().tolocalString()), 10000);
    },[])
    const updateTime=()=>{
        setDate(currDate.getHours());
        setSecond(currDate.getSeconds());
    }
    const selectChangePartner=(event)=>{

            const field = {...formField};
            field.partner_id = event.value;
            setFormField(field);
            if ( !!formerrors[event.name] ) setFormerrors({
             ...formerrors,
             [event.name]: null
            })
        let partner_id=event.value;
        console.log(partner_id);
         setPartnerSelected(true);
         axios.get(`/admin/get/return/exchange/${partner_id}`)
            .then((res) => {
                console.log(res)
                console.log(res.data);
                if (res.data) {
                            let productExchangePickups = res?.data.exchanges;
                            let productExchangePickupsList = [];
                            productExchangePickups.forEach((items,index)=>{
                            console.log('hello list');
                            let arrayObject = {
                                value: items.id,
                                label: items.packet_name + '(' + items.cod + ')',
                                name:'Product_exchange',
                                customer_id:items.customer_id,
                                customer_name:items.customer,
                                phone:items.customer_phone,
                            };
                            // let arrayObject_Customer = {
                            //     value:items.items.customer_id,
                            //     label:items.customer+'('+items.customer_phone+')',
                            // };
                            console.log(arrayObject);
                            // allCustomerDataList.value=items.id;
                            // allCustomerDataList.label=items.name+'('+items.phone+')';
                            productExchangePickupsList.push(arrayObject);
                            dispatch(getProductExchangeItemsOperation(productExchangePickupsList));

                            })
                        }
            })
            .catch((err) => {
                console.log(err.response)
            })
         // getProductExchange(partner_id);

    }
    const getProductExchange=(partner_id)=>{

        console.log('partner_id');
         axios.get(`/admin/get/return/exchange/${partner_id}`)
            .then((res) => {
                console.log(res)
                console.log(res.data);
                if (res.data) {
                            let productExchangePickups = res?.data.exchanges;
                            let productExchangePickupsList = [];
                            productExchangePickups.forEach((items,index)=>{
                            console.log('hello list');
                            let arrayObject = {
                                value: items.id,
                                label: items.packet_name + '(' + items.cod + ')',
                                name:'Product_exchange',
                                customer_id:items.customer_id,
                                customer_name:items.customer,
                                phone:items.customer_phone,
                            };
                            // let arrayObject_Customer = {
                            //     value:items.items.customer_id,
                            //     label:items.customer+'('+items.customer_phone+')',
                            // };
                            console.log(arrayObject);
                            // allCustomerDataList.value=items.id;
                            // allCustomerDataList.label=items.name+'('+items.phone+')';
                            productExchangePickupsList.push(arrayObject);
                            // dispatch(getProductExchangeItems(productExchangePickupsList));

                            })
                        }
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
    const FindFormErrors = () =>{
     console.log(formerrors);
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
    const onSubmit = async (event) => {
        // getDefaultDeliveryType();
        console.log(formField.delivery_type);
        console.log(formField);
       // await getDefaultDeliveryType();
         // event.preventDefault();
        const newErrors = FindFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
          // We got errors!
           setFormerrors(newErrors);
        } else {
         setLoading(true);

         await axios.post('/admin/pickup/create', formField)
            .then((res) => {
                console.log(res)
                if(res.data.status === true){
                    notification('success', res.data.message);
                    console.log(formField);
                    // clearform();
                    setLoading(false);
                    history.push('/staff/admin/pickups');
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
// const handleSubmit = async (event) => {
//         event.preventDefault();
//         console.log(formField);
//         selectCustomerRef.select.clearValue();
//         selectPartnerRef.select.clearValue();
//         formRef.reset();
//         setLoading(true);
//         await axios.post('/admin/pickup/create', formField)
//             .then((res) => {
//                 console.log(res)
//                 if(res.data.status === true){
//
//                     notification('success', res.data.message);
//
//                      // clearform();
//                      // setTimeout(clearValue,1000);
//                     console.log(formField);
//                     setLoading(false);
//                 }else {
//                     notification('success', res.data.message);
//                 }
//             })
//             .catch((err) => {
//                 console.log(err.response)
//             })
//
//     }
    const selectChange = event => {
        console.log(event)
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

        { value: 'nonfragile', label: 'Non-Fragile', name: 'type'},
        { value: 'fragile', label: 'Fragile', name: 'type'},
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
    const urgentDelivery =(event)=>{
     console.log('checkTest');
     let checkVariable = event.target.checked;

     console.log(checkVariable);
     if(checkVariable){
          const newField = {...formField}
          newField.delivery_type=0;
          console.log(newField.delivery_type);
          setFormField(newField);
          if ( !!formerrors[event.target.name] ) setFormerrors({
          ...formerrors,
          [event.target.name]: null
        })


     }
     // else{
     //     const newField = {...formField}
     //    newField[event.target.name] =checkVariable;
     //      if ( !!formerrors[event.target.name] ) setFormerrors({
     //      ...formerrors,
     //      [event.target.name]: null
     //    })
     // }


    }
    // date.toLocaleDateString('en-GB', {
    //              hour: 'numeric',
    //              second:'numeric',
    //              hour12:true,
    //           })
    const getCurrentCustomerCondition=()=>{
        setCurrentCustomer('')
    }
    const CustomerDisplay=()=>{
        // console.log(currentCustomer,'current');
        // set

        return(
            <>
                  <Col lg={10}>
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
    const initializeCustomerExchange=(event)=>{
        setDoubleClickCheck(false);
        if(doubleClickCustomerCheck){
             setDoubleClickCustomerCheck(false);
             setCustChecked(false);
             setExchange(2);
        }
        else{
         setChecked(false);
         setCustChecked(true);
         setExchangeCustomerField(false);
         let checkVariable = event.target.checked;
             if(checkVariable){
                setExchange(0);

             }
             setDoubleClickCustomerCheck(true);
        }
             // doubleClickCustomerCheck,setDoubleClickCustomerCheck
}
    const initializeProductExchange=(event)=>{
       console.log("clicked");
        if(doubleClickCheck){
            setDoubleClickCheck(false);
             setChecked(false);
             setExchange(2);
        }
        else{
            setChecked(true);
            setCustChecked(false);
            setReplaceCustomerField(false);
            let checkVariable = event.target.checked;
             if(checkVariable){
                 setExchange(1);
             }
             setDoubleClickCheck(true);
        }
    }
    const makeUncheckedProduct=()=>{
        setChecked(false);
         setExchange(' ');
}
    const makeUncheckedCustomer=()=>{
        setCustChecked(false);
         setExchange(' ');
}
    const selectChangeCustomerReplace=(event)=>{
       setReplaceCustomerField(true);
       console.log(event);
       console.log('event Data');
       const newField = {...formField}
              newField. partner_id = event. partner_id;
              newField.packet_name = event.packet_name;
              newField.type = event.type;
              newField.weight = event.weight;
              newField.cod = event.cod;
              newField.packet_replace = event.packet_replace;
              newField.delivery_type = event.delivery_type;
              newField.customer_charge_payable = event.customer_charge_payable;
              setFormField(newField);
              console.log(formField)
        // dispatch(getCurrentCustomerAdded(''));
}
    const selectChangeProductExchange=(event)=>{
        setExchangeCustomerField(true);
           const exchangeProductCustomer ={...exchnageProductCustomer};
             exchangeProductCustomer.value=event.customer_id;
             exchangeProductCustomer.label=event.customer_name+'('+event.phone+')';
             setExchnageProductCustomer(exchangeProductCustomer);
             console.log(exchangeProductCustomer);
              const newField = {...formField}
              newField.customer_id = event.customer_id;
              newField.packet_exchange=event.value;
              setFormField(newField);

             getProductExchangeCustomer();

}
    const getProductExchangeCustomer=()=>{
        dispatch(getCurrentCustomerAdded(exchnageProductCustomer));
    }
    //Create Modal
    const handleClose=()=>{
         setModalShow(false);
    }
    const handleLoginForm = event => {
        const newField = {...formFieldCustomer}
        newField[event.target.name] = event.target.value;
        setFormFieldCustomer(newField);
    }
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
     // else if(!cod.match(pattern)) newErrors.cod = 'Price must be in number'
     // // customer validation
     // if(!customer_id || customer_id ==='') newErrors.customer_id ='Customer must Required'

     // if(!partner_id || partner_id ==='') newErrors.partner_id ='Partner must Required'
     // if(!weight || weight ==='') newErrors.weight ='Weight must Required'
     // if(!type || type ==='') newErrors.type ='Type must Required'
     return newErrors
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
                           console.log(currentCustomer);
                           console.log("currentCustomer");
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
           {/*<CustomerDisplay />*/}
            <Row>
                {/*Modal Create Pickup*/}

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
                 {/*Modal Create Pickup End */}
                    {/*<AdminCreateCustomer loadCustomer={() => loadCustomer()} show={modalShow} onHide={() => setModalShow(false)} />*/}
                    <div className="d-flex justify-content-center mt-2 mb-5">
                           <Col lg={6}>
                                <Form onSubmit={handleSubmit(onSubmit)} ref={form => formRef = form}>
                                     <Row>
                                          <Col lg={12}>
                                                <Form.Group className="mt-4">
                                                    <Form.Label>Partner</Form.Label>
                                                    <Select
                                                        ref={ref => {
                                                                    selectPartnerRef = ref;
                                                                  }}
                                                          defaultValue=''
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                        isDisabled={false}
                                                        isLoading={false}
                                                        isClearable={false}
                                                        isRtl={false}
                                                        isSearchable={true}
                                                        placeholder="== Select Partner =="
                                                        options={partners}
                                                        onChange={(event) => selectChangePartner(event)}
                                                        />
                                                    {/*<Form.Control.Feedback type='invalid'>*/}
                                                    {/*    {formerrors.partner_id}*/}
                                                    {/*</Form.Control.Feedback>*/}
                                                    <Form.Label style={{color:'red',paddingLeft:'3px',paddingTop:'2px',}}>
                                                        {formerrors.partner_id}
                                                    </Form.Label>
                                                </Form.Group>
                                          </Col>
                                         {partnerSelected?
                                             <>
                                                   <Col lg={12}>
                                                     <Form.Group className="mt-0 mb-3">
                                                     <Form.Group as={Row} className="mb-3">

                                                              <Col xs={6}>

                                                                 <Form.Check  onClick={(event)=>initializeProductExchange(event)}
                                                                    type="radio"
                                                                    id="autoSizingCheckProduct"
                                                                    name="delivery_type2"
                                                                    className="mb-0 mt-2"
                                                                    label="Product Exchange"
                                                                    checked={checked}
                                                                    onDoubleClick={(event)=>makeUncheckedProduct()}
                                                                  />
                                                               </Col>
                                                              <Col xs={6}>

                                                                 <Form.Check onClick={(event)=>initializeCustomerExchange(event)}
                                                                     checked={custChecked}
                                                                    type="radio"
                                                                    id="autoSizingCheckCustomer"
                                                                    name="delivery_type1"
                                                                    className="mb-0 mt-2"
                                                                    label=" Replace Customer"
                                                                    onDoubleClick={(event)=>makeUncheckedCustomer()}
                                                                  />
                                                               </Col>

                                                    </Form.Group>
                                                    {exchange===1?
                                                        <>
                                                            <Select
                                                                className="basic-single mt-2"
                                                                classNamePrefix="select"
                                                                defaultValue=""
                                                                isDisabled={false}
                                                                isLoading={false}
                                                                isClearable={false}
                                                                isRtl={false}
                                                                isSearchable={true}
                                                                placeholder="== Choose exchange =="
                                                                // options={productExchangeItems}
                                                                 options={options}

                                                                onChange={(event) => selectChangeProductExchange(event)}
                                                            />
                                                        </>:
                                                        <>
                                                        </>
                                                    }
                                                    {exchange===0?
                                                        <>
                                                            <Select
                                                                className="basic-single mt-2"
                                                                classNamePrefix="select"
                                                                defaultValue=""
                                                                isDisabled={false}
                                                                isLoading={false}
                                                                isClearable={false}
                                                                isRtl={false}
                                                                isSearchable={true}
                                                                name="customer_replace"
                                                                placeholder="== Choose replace =="
                                                                // options={customerReplaceItems}
                                                                options={options}
                                                                onChange={(event) => selectChangeCustomerReplace(event)}
                                                            />
                                                        </>:
                                                        <>
                                                        </>
                                                    }
                                                </Form.Group>
                                                   </Col>
                                                   <Col lg={12}>
                                                 <div style={{display:'flex',justifyContent:'center'}}>
                                                     <p className="mb-0" style={{color:'red',fontSize:'15px'}}> Use above fields only if required. </p>
                                                 </div>
                                               <hr style={{borderStyle:'dashed',marginTop:'2px'}} />
                                          </Col>
                                             </>:
                                             <>
                                                  <Col lg={12}>
                                                 <div style={{display:'flex',justifyContent:'center'}}>
                                                     <p className="mb-0" style={{color:'red',fontSize:'15px'}}> There is only choice when partner is selected !!! </p>
                                                 </div>
                                               <hr style={{borderStyle:'dashed',marginTop:'2px'}} />
                                          </Col>

                                             </>
                                         }
                                         {exchangeCustomerField?
                                             <>
                                             </>:
                                             <>
                                                 {currentCustomer?
                                                     <>
                                                         <Col lg={12}>
                                                          <Form.Group>
                                                         <Form.Label>Customer:</Form.Label>
                                                         <Row>
                                                           <CustomerDisplay />
                                                         <Col lg={2}>
                                                              <Button className="customBtn float-right" onClick={() => setModalShow(true)}>Add New</Button>

                                                        </Col>

                                                    </Row>
                                                     </Form.Group>
                                                         </Col>
                                                     </>:
                                                     <>
                                                         <Col lg={12}>
                                                             <Form.Group>
                                                                 <Form.Label>Customer:</Form.Label>
                                                                 <Row>
                                                                <Col lg={10}>
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
                                                                 <Col lg={2}>
                                                                      <Button className="customBtn float-right" onClick={() => setModalShow(true)}>Add New</Button>

                                                                </Col>

                                                            </Row>
                                                             </Form.Group>
                                                         </Col>
                                                     </>
                                                 }

                                             </>
                                         }
                                         {replaceCustomerField?
                                             <>
                                             </>:
                                             <>
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
                                                    <Form.Label>Order Description</Form.Label>
                                                    <Form.Control  type="text"  name="packet_name" onChange={(event) => handleForm(event)}  isInvalid={ !!formerrors.packet_name }  />

                                                     <Form.Control.Feedback type='invalid'>
                                                        {formerrors.packet_name}
                                                    </Form.Control.Feedback>

                                                </Form.Group>
                                                 </Col>
                                                 <Col lg={12}>
                                                     <Form.Group className="mt-4">
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
                                                     </Form.Group>
                                                  </Col>
                                                 <Col lg={12}>
                                                   <Form.Group as={Row} className="mb-3">
                                                       <Col lg={4}>
                                                         <Form.Check onChange={(event)=>standardDelivery(event)}
                                                           defaultChecked
                                                            type="radio"
                                                            id="autoSizingCheckStandardDelivery"
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
                                                                            id="autoSizingCheckUrgentDeliveryDisable"
                                                                            name="delivery_type"
                                                                            className="mb-0 mt-3"
                                                                            label="Same Day Delivery"
                                                                            style={{cursor:'pointer'}}
                                                                       />
                                                                   {/*</OverlayTrigger>*/}
                                                               </>:
                                                               <>
                                                                   <Form.Check onChange={(event)=>urgentDelivery(event)}

                                                                            type="radio"
                                                                            id="autoSizingCheckUrgentDelivery"
                                                                            name="delivery_type"
                                                                            className="mb-0 mt-3"
                                                                            label="Same Day Delivery"
                                                                            style={{cursor:'pointer'}}
                                                                       />
                                                               </>
                                                           }
                                                       </Col>
                                                       <Col lg={4}>
                                                           <Form.Check onChange={(event)=>urgentDelivery(event)}
                                                                            disabled
                                                                            type="radio"
                                                                            id="autoSizingCheckExpressDelivery"
                                                                            name="delivery_type"
                                                                            className="mb-0 mt-3"
                                                                            label="Express Delivery"
                                                                            style={{cursor:'pointer'}}
                                                                       />
                                                       </Col>
                                                   </Form.Group>
                                                 </Col>
                                             </>
                                         }

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

                           </Col>


                    </div>
            </Row>

        </>

    )
}

export default AdminCreatepickups