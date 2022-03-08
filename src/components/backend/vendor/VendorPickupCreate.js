import React, {useEffect, useRef, useState} from 'react'
import {Row, Col, Form, Button, Spinner, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap'
import Select from "react-select";
import AsyncSelect from "react-select/async";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import setAuthorizationToken from "./../../../utils/setAuthorizationToken";
import axios from "axios";
import {getAllCustomerList, getCurrentCustomerAdded,getProductExchangeItems,getCustomerReplaceItems} from "../../../redux/actions/vendor";
import {useHistory, useLocation} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AdminCreateCustomer from "../staff/admin/customer/createModal";
import notification from "../includes/notification";
import {useDispatch, useSelector} from "react-redux";

const VendorPickupCreate=()=> {
    const history = useHistory();
     const vendor = useSelector((state) => state.vendor);
    const [allCustomerLists, setAllCustomerList] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState({});
    const currentCustomerAdded = vendor.currentCustomerAdded;
    const productExchangeItems = vendor.productExchangeItems;
    const customerReplaceItems = vendor.customerReplaceItems;
    const[reloadAllCustomer,setReloadAllCustomer]=useState(false);
    const[exchange,setExchange]=useState('');
     const[deliveryChargeIncluded,setDeliveryChargeIncluded]=useState(1);
     const[checked,setChecked]=useState(false);
     const[custChecked,setCustChecked]=useState(false);
     const [exchangeCustomerField,setExchangeCustomerField]=useState(false);
      const [replaceCustomerField,setReplaceCustomerField]=useState(false);
    const [customerDetails, setCustomerDetails] = useState({
       name: '',
       phone: '',
       address: ''
    });
    const [defaultCustomer, setDefaultCustomer] = useState('');

     const dispatch = useDispatch();
     const location=useLocation();
    const {register, handleSubmit, errors} = useForm();
    let selectCustomerRef = null;
    let selectPartnerRef = null;
    let formRef = null;
    let currDate = new Date();
    const [isLoading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date().getHours());
    const [second, setSecond] = useState(new Date().getSeconds());
    const [formerrors, setFormerrors] = useState({});
    const [customer, setCustomer] = useState({
        value:'',
        label:'',
    });
    const [modalShow, setModalShow] = useState(false);
    const[partnerID,setPartnerID]=useState('');
    const[currentAddCustomer,setCurrentAddCustomer]=useState(location.state?.customerData);
    const [formField, setFormField] = useState({
        customer_id: currentAddCustomer?.value,
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
    const [exchnageProductCustomer, setExchnageProductCustomer]=useState({
        value:'',
        label:'',
        // name:''
    });
    const [doubleClickCheck,setDoubleClickCheck]=useState(false);
     const [doubleClickCustomerCheck,setDoubleClickCustomerCheck]=useState(false);
    const getProductExchangeCustomer=()=>{
        dispatch(getCurrentCustomerAdded(exchnageProductCustomer));
    }
    useEffect(() => {
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        if (vendorDetail) {
            setAuthorizationToken(vendorDetail.token);
        }
         // dispatch(getCurrentCustomerAdded(''));
        // getAutoCustomer();
        getProductExchange();
        getPartnerID(vendorDetail.user?.id);
        getCustomerList();
        getCustomerReplace();
        setReloadAllCustomer(true);
    },[]);

    const getCustomerList = async () => {
       const res = await axios.get('/partner/customer/list')
            .catch((err) => {
                console.log(err.response)
            })
       if(await res.data){
             let allcustomerData =res?.data;
            let allCustomerDataList=[];
            allcustomerData.forEach((items,index)=>{
                let arrayObject={
                    value:items.id,
                    label: items.name.concat(' - ', items.phone),
                };
               allCustomerDataList.push( arrayObject);
            })
           setAllCustomerList(allCustomerDataList)
             // dispatch(getAllCustomerList(allCustomerDataList));
       }
    }
    const getCustomerReplace=()=>{
         let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
         let partner_id = vendorDetail.user?.id;
         axios.get(`/partner/get/customer/replace/${partner_id}`)
            .then((res) => {

                if (res.data) {
                    let customerReplacePickups = res?.data.customer_replace;
                    let customerReplacePickupsList = [];
                    customerReplacePickups.forEach((items,index)=>{
                    let arrayObject = {
                        value: items.id,
                        label: items.packet_name.concat(' - ', `Rs. ${items.cod}`).concat(' - ', items.customer),
                        name:'customer_replace',
                        partner_id:items.partner_id,
                        type: items.type,
                        weight:items.weight,
                        packet_name: items.packet_name,
                        cod: items.cod,
                        packet_replace: items.packet_replace,
                        packet_exchange: items.packet_exchange,
                        delivery_type:items.normal_delivery,
                        customer_charge_payable:items.customer_charge_payable,
                    };
                    customerReplacePickupsList.push(arrayObject);
                    dispatch(getCustomerReplaceItems(customerReplacePickupsList));
                    })
                }
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
    const getProductExchange=()=>{
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        let partner_id = vendorDetail.user?.id;
         axios.get(`/partner/get/return/exchange/${partner_id}`)
            .then((res) => {
                console.log(res)
                console.log(res.data);
                if (res.data) {
                    let productExchangePickups = res?.data.exchanges;
                    let productExchangePickupsList = [];
                    productExchangePickups.forEach((items,index)=>{
                    let arrayObject = {
                        value: items.id,
                        label: items.packet_name.concat(' - ', `Rs. ${items.cod}`).concat(' - ', items.customer),
                        name:'Product_exchange',
                        customer_id:items.customer_id,
                        customer_name:items.customer,
                        phone:items.customer_phone,
                    };
                    productExchangePickupsList.push(arrayObject);
                    dispatch(getProductExchangeItems(productExchangePickupsList));

                    })
                }
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
    const getPartnerID=(id)=>{
        setPartnerID(id);
         const field = {...formField};
            field.partner_id = id;
            setFormField(field);
    }
    setInterval(() => {
        updateTime()
    }, 1000);
    const updateTime = () => {
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
     else if(!cod.match(pattern)) newErrors.cod = 'Price must be in numbers only'
     // customer validation
     if(!customer_id || customer_id ==='') newErrors.customer_id ='Customer is Required'
     if(!partner_id || partner_id ==='') newErrors.partner_id ='Partner is Required'
     if(!weight || weight ==='') newErrors.weight ='Weight is Required'
        else if(!weight.match(decimalPattern)) newErrors.weight ='Weight must be in numbers and . only '
     if(!type || type ==='') newErrors.type ='Order Type is Required'


     return newErrors
    }
    const submitPickupDetails =(event) => {
        event.preventDefault();
        const newErrors = FindFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
          // We got errors!
           setFormerrors(newErrors);
        } else {
         setLoading(true);
         axios.post('/partner/pickup/create', formField)
            .then((res) => {
                if(res.data.status === true){
                    notification('success', res.data.message);
                    setLoading(false);
                    history.push('/vendor/Pickup_request_area');
                }else {
                    notification('success', res.data.message);
                }
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

  };
    const selectChange = event => {
        if (event) {
            const field = {...formField};
            // field.customer_id=event.value;
            field[event.name] = event.value;
            setFormField(field);
            if (!!formerrors[event.name]) setFormerrors({
                ...formerrors,
                [event.name]: null
            })
        }
    }
    const selectChangeCustomer = event => {
        if(event) {
            const field = {...formField};
            field.customer_id=event.value;
            field[event.name] = event.value;
            setFormField(field);
            setDefaultCustomer(event);
            if (!!formerrors[event.name]) setFormerrors({
                ...formerrors,
                [event.name]: null
            })
        }
    }
    const handleForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
        if (!!formerrors[event.target.name]) setFormerrors({
            ...formerrors,
            [event.target.name]: null
        })
    }
    const types = [
        {value: 'nonfragile', label: 'Non-Fragile', name: 'type'},
        {value: 'fragile', label: 'Fragile', name: 'type'},
    ]

    const clearform = () => {
        formRef.reset();
    }
    const Urgent = (event) => {
        console.log('checkTest');
        let checkVariable = event.target.checked;
        console.log(checkVariable);
        // if(checkVariable) {
        //     console.log('checked');
        // }
        // else{
        //      console.log('unchecked');
        // }
    }
    const addCustomer = () => {
         history.push({
           pathname: '/vendor/add_customer',
           // state: {messageID: id }
       });
    }
    // const [modalShow, setModalShow] = useState(false);
    const initializeProductExchange=(event)=>{
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
const getReplaceCustomer=()=>{
   dispatch(getCurrentCustomerAdded(exchnageProductCustomer));
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
const makeUncheckedProduct=()=>{
        setChecked(false);
         setExchange(' ');
}
const makeUncheckedCustomer=()=>{
        setCustChecked(false);
         setExchange(' ');
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
const selectChangeCustomerReplace=(event)=>{
       setReplaceCustomerField(true);
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

    const [openModal, setOpenModal] = useState(false);

    const onClickModal = () =>{
        setOpenModal(true);
    }
    const onCloseModal = ()=>{
        setOpenModal(false);
        const newData = {...customerDetails};
        newData.name = '';
        newData.phone = '';
        newData.address = '';
        setCustomerDetails(newData)
    }

    const handleCustomerDetailChange = (event) => {
        const newData = {...customerDetails};
        newData[event.target.name] = event.target.value;
        setCustomerDetails(newData)
    }

    const submitCustomerDetails = async () => {

        const regex = /^[0-9]+$/;
        const regex2 = /^[0-9]{10}$/;
        if(!customerDetails.phone.match(regex)){
            notification('danger', 'Characters are not allowed!')
            return false;
        }

        if(!customerDetails.phone.match(regex2)){
            notification('danger', 'Number should contain 10 digits')
            return false;
        }

        const res = await axios.post('/partner/customer/register', customerDetails).catch((err) => {
            console.log(err)
        })

        if(await res.data.status === true){
           const customers = res.data.customers;
           const options = [];
           customers.map((cus) => {
               let obj = {
                    value: cus.id,
                    label: cus.name.concat(' - ', cus.phone),
               }
               options.push(obj)
           })
            notification('success', res.data.message);
           const filterCustomer = customers.find((data) => data.phone === customerDetails.phone);
           setCurrentCustomer(filterCustomer);
           setAllCustomerList(options);
           onCloseModal();
        }else {
            notification('danger', res.data.message);
        }

    }


    useEffect(() => {
        if(Object.keys(currentCustomer).length > 0){
            const option = allCustomerLists.find((val) => val.value === currentCustomer.id);
            setDefaultCustomer(option);
            const field = {...formField};
            field.customer_id = option.value;
            setFormField(field)
        }
    }, [allCustomerLists])


    return (
        <>
            <div style={{height:'80vh',overflowY:'auto',overflowX:'hidden',padding:'10px'}}>
            {/*<h6>Vendor Pickup Create</h6>*/}
            <Row className="pl-2 pr-2">
                {/*<AdminCreateCustomer loadCustomer={() => loadCustomer()} show={modalShow} onHide={() => setModalShow(false)} />*/}
                <div className="d-flex justify-content-center mt-2 mb-5">
                    <Col lg={12}>
                        <Form ref={form => formRef = form}>
                            <Row>
                                <Col lg={12}>
                                    <Form.Group className="mt-0 mb-3">
                                         <Form.Group as={Row} className="mb-3">
                                                  <Col xs={6}>
                                                     <Form.Check  onClick={(event)=>initializeProductExchange(event)}
                                                        type="radio"
                                                        id="autoSizingCheckProduct"
                                                        name="delivery_type"
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
                                                    options={productExchangeItems}
                                                    onChange={(event) => selectChangeProductExchange(event)}
                                                />
                                            </>:
                                            <>
                                            </>
                                        }
                                        {exchange === 0?
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
                                                    options={customerReplaceItems}
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
                                { exchangeCustomerField ?
                                    <>
                                    </>:
                                    <>
                                        <Col lg={12}>
                                            <Form.Group className="mt-0">
                                                <Row>
                                                    <Col xs={6}><div className="mt-2"><Form.Label>Customer</Form.Label></div></Col>
                                                     {/*<Col xs={2}> <Button className="customBtn" style={{width:'97%',margin:'3px'}} onClick={()=>getReplaceCustomer()}>set</Button></Col>*/}
                                                    <Col xs={6}> <Button className="customBtn" style={{width:'97%',margin:'3px'}} onClick={()=>onClickModal()}>Add Customer</Button></Col>
                                                </Row>
                                                 <Select
                                                    className="basic-single mt-2"
                                                    classNamePrefix="select"
                                                    isDisabled={false}
                                                    isLoading={false}
                                                    isClearable={true}
                                                    isRtl={false}
                                                    isSearchable={true}
                                                    name="customer_id"
                                                    placeholder="== Select Customer  =="
                                                    options={allCustomerLists}
                                                    value={defaultCustomer}
                                                    onChange={(event) => selectChangeCustomer(event)}
                                                />

                                            </Form.Group>
                                        </Col>
                                    </>
                                }
                                {replaceCustomerField?
                                <>
                                </>:
                                <>
                                    <Col lg={12}>
                                    <Form.Group className="mt-4">
                                        <Form.Label>Type</Form.Label>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            defaultValue=""
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
                                        <Form.Label style={{color: 'red', paddingLeft: '3px', paddingTop: '2px',}}>
                                            {formerrors.type}
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                                    <Col xs={12} >
                                        <Form.Group className="mt-0" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Weight <span style={{color:'red'}}>( *Only in KG format. Eg. if 100gm = 0.1 )</span></Form.Label>
                                            <Form.Control autocomplete="off" type="text" name="weight"
                                                          onChange={(event) => handleForm(event)}
                                                          isInvalid={!!formerrors.weight} aria-describedby="weights" />

                                            <Form.Control.Feedback type='invalid'>
                                                {formerrors.weight}
                                            </Form.Control.Feedback>

                                        </Form.Group>
                                    </Col>
                                     {/*<Col xs={2} style={{paddingLeft:'0px'}}>*/}
                                     {/*    <div style={{display:'flex!important',alignItems:'end'}} className=" mt-4 pt-3">Kg</div>*/}
                                     {/*</Col>*/}

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
                                            {deliveryChargeIncluded===1?
                                                <>
                                                     <Form.Group className="mt-0">
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
                                        <Form.Group className="mt-4">
                                            <Form.Label>Order Description</Form.Label>
                                            <Form.Control autocomplete="off" type="text" name="packet_name"
                                                          onChange={(event) => handleForm(event)}
                                                          isInvalid={!!formerrors.packet_name}/>

                                            <Form.Control.Feedback type='invalid'>
                                                {formerrors.packet_name}
                                            </Form.Control.Feedback>

                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group as={Row} className="mb-3">

                                            <Col lg={4}>

                                                <Form.Check onChange={(event) => Urgent(event)}
                                                            defaultChecked
                                                            type="radio"
                                                            id="autoSizingCheckStandard"
                                                            name="urgent"
                                                            className="mb-0 mt-3"
                                                            label="Standard Delivery"
                                                />
                                            </Col>
                                            <Col lg={4}>

                                                {date >= 12 ? <>
                                                    <Form.Check onChange={(event) => Urgent(event)}
                                                                disabled
                                                                type="radio"
                                                                id="autoSizingCheckUrgent"
                                                                name="urgent"
                                                                className="mb-0 mt-3"
                                                                label="Same Day Delivery"
                                                                style={{cursor: 'pointer'}}
                                                    />
                                                </> : <>
                                                    <Form.Check onChange={(event) => Urgent(event)}
                                                                type="radio"
                                                                id="autoSizingCheckUrgent"
                                                                name="urgent"
                                                                className="mb-0 mt-3"
                                                                label="Same Day Delivery"
                                                    /></>}
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </>
                                }

                                <Col lg={12}>
                                    <Form.Group className="mt-4">
                                        {isLoading ? (
                                            <Button className="customBtn" style={{width:'97%',margin:'3px'}}><Spinner size="sm"
                                                                                   animation="border"/><span
                                                style={{marginLeft: '7px'}}>Submitting</span></Button>
                                        ) : (
                                            <Button type="submit" className="customBtn" style={{width:'97%',margin:'3px'}} onClick={(event) => submitPickupDetails(event)}>Submit</Button>
                                        )}

                                    </Form.Group>
                                </Col>

                            </Row>


                        </Form>

                    </Col>


                </div>
            </Row>
            </div>

            <Modal show={openModal} onHide={onCloseModal} centered={true}>
                <Modal.Header >
                  {/*<Modal.Title>Modal heading</Modal.Title>*/}
                </Modal.Header>
                <Modal.Body>
                    <div style={{padding: '10px'}}>
                        <Form>
                          <Form.Group>
                              <Form.Label>Full Name</Form.Label>
                              <Form.Control type="text" name="name" value={customerDetails.name} onChange={(event) => handleCustomerDetailChange(event)}  />
                          </Form.Group>
                           <Form.Group className="mt-3">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control type="text" name="phone" value={customerDetails.phone} onChange={(event) => handleCustomerDetailChange(event)}  />
                          </Form.Group>
                          <Form.Group className="mt-3">
                              <Form.Label>Address</Form.Label>
                              <Form.Control type="text" name="address" value={customerDetails.address} onChange={(event) => handleCustomerDetailChange(event)}  />
                          </Form.Group>
                      </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Row style={{width:'100%'}}>
                        <Col lg={6}>
                            <Button variant="secondary" onClick={() => submitCustomerDetails()} style={{backgroundColor:'#147298',border:'1px solid #147298',borderRadius:'5px',width:'100%'}}>Submit</Button>
                        </Col>
                        <Col lg={6}>
                           <Button variant="secondary"  style={{backgroundColor:'red',border:'1px solid red',borderRadius:'5px',width:'100%'}} onClick={onCloseModal}>
                             Cancel
                          </Button>
                        </Col>
                    </Row>

                </Modal.Footer>
        </Modal>
        </>
    );

}
export default VendorPickupCreate