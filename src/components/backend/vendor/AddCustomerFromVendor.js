import React, {useEffect, useState} from 'react';
import {Button, Form,Row,Col} from "react-bootstrap";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import notification from "../includes/notification";
import Select from "react-select";
import {getAllCustomerList,getCurrentCustomerAdded} from "../../../redux/actions/vendor";
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";

const AddCustomerFromVendor=()=>{
     const history = useHistory();
     const dispatch = useDispatch();
     const vendor = useSelector((state) => state.vendor);
     const allCustomerLists = vendor.allCustomerList;
     let formRef = null;
     const[loading,setLoading]=useState(false);
     const [formerrors, setFormerrors] = useState({});
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
     // packet name validate
     if ( !name || name === '' ) newErrors.name = ' Name is empty!'
     else if ( name.length < 5 ) newErrors.name = 'Minimum 5 Characters '
     if(!phone || phone === '') newErrors.phone = 'Number is Empty '
     else if ( phone.length >phoneLength|| phone.length < phoneLength) newErrors.phone = 'Invalid Phone Number'
     // price cod validation
     if ( !address || address === '') newErrors.address = 'Address is Empty'
     // else if(!cod.match(pattern)) newErrors.cod = 'Price must be in number'
     // // customer validation
     // if(!customer_id || customer_id ==='') newErrors.customer_id ='Customer must Required'

     // if(!partner_id || partner_id ==='') newErrors.partner_id ='Partner must Required'
     // if(!weight || weight ==='') newErrors.weight ='Weight must Required'
     // if(!type || type ==='') newErrors.type ='Type must Required'
     return newErrors
    }
     useEffect(()=>{
         let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        console.log(vendorDetail);
        // console.log('staff_admin');
        console.log('hello use');
        if (vendorDetail) {
            setAuthorizationToken(vendorDetail.token);
        }
        getCustomerList();

     },[0]);
     const getDispatchData=()=>{
          dispatch(getCurrentCustomerAdded(' '));
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
    const submitForm = (event) => {
        event.preventDefault();
        const newErrors = FindFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
          // We got errors!
           setFormerrors(newErrors);
        } else {
            axios.post('/partner/customer/register', formField)
                .then((res) => {
                    if (res.data.status === true) {
                        getCustomerList();
                        notification('success', res.data.message);
                            setLoading(true);
                        if(Array.isArray(res.data.data))
                        {
                            // let allCurrentCustomerData = res.data.data[0];
                            let allCurrentCustomerData = res.data.data[0];
                            let allCurrentCustomerDataList = [];
                            // allcustomerData.forEach((items,index)=>{
                            let arrayObject = {
                                value: allCurrentCustomerData.id,
                                label: allCurrentCustomerData.name + '(' + allCurrentCustomerData.phone + ')',
                            };
                            allCurrentCustomerDataList.push( arrayObject);
                            dispatch(getCurrentCustomerAdded(allCurrentCustomerDataList));
                           history.push({
                            pathname: '/vendor/request_pickup',
                            state: {customerData: arrayObject}
                        });


                        }else{
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
                            allCurrentCustomerDataList.push( arrayObject);
                            dispatch(getCurrentCustomerAdded(allCurrentCustomerDataList));

                            // })
                            //  history.push({
                            //     pathname: '/vendor/request_pickup',
                            //     state: {customerData: allCustomerLists[0] }
                            // });
                            // history.push('/vendor/request_pickup');
                           history.push({
                            pathname: '/vendor/request_pickup',
                            state: {customerData: arrayObject}
                        });
                           }

                        // props.onHide();
                        // props.loadCustomer();

                    } else {
                        notification('danger', res.data.message);
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                })
        }
    }
    const getCustomerList=()=>{
        axios.get('/partner/customer/list')
            .then((res) => {
                console.log(res)
                    console.log(formField);
                    if(res.data){
                        clearform();
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
                        // dispatch(getCurrentCustomerAdded(allCustomerDataList[0]));
                        dispatch(getAllCustomerList(allCustomerDataList));

                    }
            })
            .catch((err) => {
                console.log(err.response)
            })
    }
    const moveToEntry=()=>{
         history.push({
           pathname: '/vendor/request_pickup',
           // state: {customerData: allCustomerLists[0] }
       });
    }
    const selectChange = event => {
        console.log(event)
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        if (event) {
            const field = {...formField};
            field[event.name] = event.value;
            setFormField(field);

        }
    }
    const clearform = () => {
        console.log('clear form');
        // selectCustomerRef.select.clearValue();
        // selectPartnerRef.select.clearValue();
        formRef.reset();
    }
    return(
        <>
            <Row style={{paddingLeft:'10px',paddingRight:'10px'}}>
               <Form onSubmit={(event) => submitForm(event)} ref={form => formRef = form}>
                  <Form.Group>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" name="name" value={formField.name} onChange={(event) => handleForm(event)}  isInvalid={!!formerrors.name} />
                      <Form.Control.Feedback type='invalid'>
                                            {formerrors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                   <Form.Group className="mt-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control type="text" name="phone" value={formField.phone} onChange={(event) => handleForm(event)} isInvalid={!!formerrors.phone}  />
                       <Form.Control.Feedback type='invalid'>
                                            {formerrors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mt-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="text" name="address" value={formField.address} onChange={(event) => handleForm(event)} isInvalid={!!formerrors.address}  />
                      <Form.Control.Feedback type='invalid'>
                                            {formerrors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                   <Col xs={12}>
                       <div style={{display:'flex',justifyContent:'center'}}>


                          <Form.Group className="mt-3">
                              {loading?
                                  <>
                                      <Button className="customBtn"  style={{float: 'center',width:'80vw'}}>Submited</Button>

                                  </>
                                  :
                                  <>
                                      <Button className="customBtn" type="submit" style={{float: 'center',width:'80vw'}}>Submit</Button>
                                  </>
                                  }
                          </Form.Group>
                       </div>
                   </Col>
              </Form>
            </Row>
        </>
    )
}
export default AddCustomerFromVendor