import React, {useEffect, useState} from 'react'
import {Row,Col,Form,Button,Spinner,OverlayTrigger,Tooltip} from 'react-bootstrap'
import Select from "react-select";
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
    const allCustomerLists = vendor.allCustomerList;
    const currentCustomerAdded=vendor.currentCustomerAdded;
    const productExchangeItems=vendor.productExchangeItems;
    const customerReplaceItems=vendor.customerReplaceItems;
    const[reloadAllCustomer,setReloadAllCustomer]=useState(false);
    const[exchange,setExchange]=useState('');
     const[deliveryChargeIncluded,setDeliveryChargeIncluded]=useState(1);
     const[checked,setChecked]=useState(false);
     const[custChecked,setCustChecked]=useState(false);
     const [exchangeCustomerField,setExchangeCustomerField]=useState(false);
      const [replaceCustomerField,setReplaceCustomerField]=useState(false);
     // const[customerExchange,setCustomerExchange]=useState(false);

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
    const [exchnageProductCustomer,setExchnageProductCustomer]=useState({
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
        console.log(vendorDetail);
        // console.log('staff_admin');
        console.log('hello use');
        if (vendorDetail) {
            setAuthorizationToken(vendorDetail.token);
        }
         // dispatch(getCurrentCustomerAdded(''));
        // getAutoCustomer();
        getProductExchange();
        getPartnerID(vendorDetail.user?.id);
        getCustomerList();
        getCustomerReplace();
        console.log(currentAddCustomer);
        console.log('currentAddCustomer');
        setReloadAllCustomer(true);
        console.log(partnerID);
        // console.log(formerrors);
        console.log(currDate);
        // setInterval(() => setDate(new Date().tolocalString()), 10000);
    },[]);
    // const getAutoCustomer=()=>{
    //     // const newField={...formField}
    //     // newField.customer_id=location.state?.customerData;
    //     // setFormField(newField);
    //     let addCustomerData=location.state?.customerData;
    //     let customerRecentAdd={
    //         value:addCustomerData.id,
    //         label:addCustomerData.name+"("+addCustomerData.phone+")",
    //     }
    //     setCurrentAddCustomer(customerRecentAdd);
    // }
    const getCustomerList=()=>{
        // setCurrentAddCustomer(allCustomerLists[0])
        axios.get('/partner/customer/list')
            .then((res) => {
                console.log(res)
                    console.log(formField);
                    if(res.data){
                        console.log('dispatch data');
                        let allcustomerData =res?.data;
                        let allCustomerDataList=[];
                        allcustomerData.forEach((items,index)=>{
                            console.log('hello list');
                            let arrayObject={
                                value:items.id,
                                label:items.name+'('+items.phone+')',
                            };
                            // allCustomerDataList.value=items.id;
                            // allCustomerDataList.label=items.name+'('+items.phone+')';
                           allCustomerDataList.push( arrayObject);

                        })
                        console.log(allCustomerDataList);
                        console.log('customer Data');
                         dispatch(getAllCustomerList(allCustomerDataList));

                    }
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
    const getCustomerReplace=()=>{
         let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
         let partner_id = vendorDetail.user?.id;
         console.log(partner_id);
        console.log('partner_id');
         axios.get(`/partner/get/customer/replace/${partner_id}`)
            .then((res) => {
                console.log(res)
                console.log(res.data);
                if (res.data) {
                            let customerReplacePickups = res?.data.customer_replace;
                            let customerReplacePickupsList = [];
                            customerReplacePickups.forEach((items,index)=>{
                            console.log('hello list');
                            let arrayObject = {
                                value: items.id,
                                label: items.packet_name + '(' + items.cod + ')',
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
                                // customer_id:items.customer_id,
                                // customer_name:items.customer,
                                // phone:items.customer_phone,
                            };
                            // let arrayObject_Customer = {
                            //     value:items.items.customer_id,
                            //     label:items.customer+'('+items.customer_phone+')',
                            // };
                            console.log(arrayObject);
                             console.log('array data');
                            // allCustomerDataList.value=items.id;
                            // allCustomerDataList.label=items.name+'('+items.phone+')';
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
        console.log(partner_id);
        console.log('partner_id');
         axios.get(`/partner/get/return/exchange/${partner_id}`)
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
     else if(!cod.match(pattern)) newErrors.cod = 'Price must be in numbers only'
     // customer validation
     if(!customer_id || customer_id ==='') newErrors.customer_id ='Customer is Required'

     if(!partner_id || partner_id ==='') newErrors.partner_id ='Partner is Required'
     if(!weight || weight ==='') newErrors.weight ='Weight is Required'
        else if(!weight.match(decimalPattern)) newErrors.weight ='Weight must be in numbers and . only '
     if(!type || type ==='') newErrors.type ='Order Type is Required'


     return newErrors
    }
    const onSubmit =(event) => {
        console.log(formField.delivery_type);
         console.log(formField);
         // event.preventDefault();
        const newErrors = FindFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
          // We got errors!
           setFormerrors(newErrors);
        } else {
         setLoading(true);
         console.log(formField);

         axios.post('/partner/pickup/create', formField)
            .then((res) => {
                console.log(res)
                if(res.data.status === true){
                    notification('success', res.data.message);
                    console.log(formField);
                    // clearform();
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
        console.log(event)
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
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
        console.log(event)
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        if (event) {
            const field = {...formField};
            field.customer_id=event.value;
            field[event.name] = event.value;
            setFormField(field);

             console.log(exchnageProductCustomer);
             console.log("exchnageProductCustomer");
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
    const options = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'}
    ]
    const types = [
        {value: 'nonfragile', label: 'Non-Fragile', name: 'type'},
        {value: 'fragile', label: 'Fragile', name: 'type'},
    ]
    const weights = [
        {value: '1', label: 'upto 1 Kg', name: 'weight'},
        {value: '2', label: 'upto 2 Kg', name: 'weight'},
        {value: '3', label: 'upto 3 Kg', name: 'weight'},
        {value: '4', label: 'upto 4 Kg', name: 'weight'},
        {value: '5', label: 'upto 5 Kg', name: 'weight'},
        {value: '6', label: 'upto 6 Kg', name: 'weight'},
        {value: '7', label: 'upto 7 Kg', name: 'weight'},
        {value: '8', label: 'upto 8 Kg', name: 'weight'},
        {value: '9', label: 'upto 9 Kg', name: 'weight'},
        {value: '10', label: 'upto 10 Kg', name: 'weight'},
        {value: '11', label: 'more than 10 Kg', name: 'weight'},
    ]
    const clearform = () => {
        console.log('clear form');
        // selectCustomerRef.select.clearValue();
        // selectPartnerRef.select.clearValue();
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
    const addCustomer=()=>{
         history.push({
           pathname: '/vendor/add_customer',
           // state: {messageID: id }
       });
    }
    // const [modalShow, setModalShow] = useState(false);
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
// const CurrentCustomerDisplay=()=>{
//         // console.log(currentAddCustomer);
//         return(
//             <>
//                {/*<Select*/}
//                {/*     className="basic-single mt-2"*/}
//                {/*     classNamePrefix="select"*/}
//                {/*     isDisabled={false}*/}
//                {/*     isLoading={false}*/}
//                {/*     isClearable={false}*/}
//                {/*     isRtl={false}*/}
//                {/*     isSearchable={true}*/}
//                {/*     name="customer_id"*/}
//                {/*     defaultValue={currentAddCustomer}*/}
//                {/*     // placeholder="== Choose  =="*/}
//                {/*     options={allCustomerLists}*/}
//                {/*     onChange={(event) => selectChangeCustomer(event)}*/}
//                {/* />*/}
//             </>
//         );
// }
    return (
        <>
            <div style={{height:'80vh',overflowY:'auto',overflowX:'hidden',padding:'10px'}}>
            {/*<h6>Vendor Pickup Create</h6>*/}
            <Row className="pl-2 pr-2">

                {/*<AdminCreateCustomer loadCustomer={() => loadCustomer()} show={modalShow} onHide={() => setModalShow(false)} />*/}
                <div className="d-flex justify-content-center mt-2 mb-5">
                    <Col lg={12}>
                        <Form onSubmit={handleSubmit(onSubmit)} ref={form => formRef = form}>
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
                                                    <Col xs={6}> <Button className="customBtn" style={{width:'97%',margin:'3px'}} onClick={()=>addCustomer()}>Add Customer</Button></Col>
                                                </Row>

                                                 <Select
                                                    className="basic-single mt-2"
                                                    classNamePrefix="select"
                                                    isDisabled={false}
                                                    isLoading={false}
                                                    isClearable={false}
                                                    isRtl={false}
                                                    isSearchable={true}
                                                    name="customer_id"
                                                    defaultValue={currentCustomerAdded}
                                                    // placeholder="== Choose  =="
                                                    options={allCustomerLists}
                                                    onChange={(event) => selectChangeCustomer(event)}
                                                />
                                                {/*<Form.Label>Customer</Form.Label>*/}
                                                {/*<Form.Control type="text" name="customer_id" Placeholder="Add New Customer"*/}
                                                {/*              readOnly*/}
                                                {/*              onChange={(event) => handleForm(event)}*/}
                                                {/*              isInvalid={!!formerrors.customer_id}/>*/}
                                                {/*<Form.Control.Feedback type='invalid'>*/}
                                                {/*    {formerrors.customer_id}*/}
                                                {/*</Form.Control.Feedback>*/}

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
                                                    {/*<OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Check out this avatar</Tooltip>}*/}
                                                    {/*>*/}
                                                    <Form.Check onChange={(event) => Urgent(event)}
                                                                disabled
                                                                type="radio"
                                                                id="autoSizingCheckUrgent"
                                                                name="urgent"
                                                                className="mb-0 mt-3"
                                                                label="Same Day Delivery"
                                                                style={{cursor: 'pointer'}}
                                                    />
                                                    {/*</OverlayTrigger>*/}
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
                                            <Button type="submit" className="customBtn" style={{width:'97%',margin:'3px'}}>Submit</Button>
                                        )}

                                    </Form.Group>
                                </Col>

                            </Row>


                        </Form>

                    </Col>


                </div>

            </Row>
            </div>
        </>
    );

}
export default VendorPickupCreate