import React, {useEffect, useState, ReactDOM} from "react";
import {Row, Col, Form, Button, Spinner} from 'react-bootstrap';
import Select from 'react-select';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CreateCustomer from "../customer/createModal";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import axios from "axios";
import {bind} from "leaflet/dist/leaflet-src.esm";
import {loadPartnerList} from "../../../../redux/actions/loadPartnerList";
import notification from "../../includes/notification";


const CreatePickup = () => {

    let selectCustomerRef = null;
    let formRef = null;

    const [modalShow, setModalShow] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [partners, setPartner] = useState([]);
    const [formField, setFormField] = useState({
        customer_id: '',
        partner_id: '',
        type: '',
        weight:'',
        packet_name: '',
        cod: '',
        packet_replace: '',
        packet_exchange: '',
    });


    useEffect(() => {
        let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
        if(branch_detail){
          setAuthorizationToken(branch_detail.token);
        }
        loadCustomer();
        loadPartner();
    }, []);


     const handleForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
    }

    const selectChange = event => {
        console.log(event)
        if(event){
            const field = {...formField};
            field[event.name] = event.value;
            setFormField(field);
        }
    }

    const loadCustomer = async () => {
        await axios.get('/branch/customer/list')
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

    const loadPartner = async () => {
        await axios.get('/branch/vendor/list')
            .then((res) => {
                let partnerArr =[]
                res.data.map((data) => {
                    partnerArr.push({
                        value: data.id,
                        label: data.vendor_name,
                        name: 'partner_id'
                    });
                })
                setPartner(partnerArr)
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formField)
        setLoading(true);
        await axios.post('/branch/pickup/create', formField)
            .then((res) => {
                console.log(res)
                if(res.data.status === true){
                    notification('success', res.data.message);
                    setLoading(false);
                }else {
                    notification('success', res.data.message);
                }
            })
            .catch((err) => {
                console.log(err.response.data)
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


    const weights = [
        { value: '1', label: 'upto 1 Kg', name: 'weight'},
        { value: '2', label: 'upto 2 Kg', name: 'weight'},
        { value: '3', label: 'upto 3 Kg', name: 'weight'},
        { value: '4', label: 'upto 4 Kg', name: 'weight'},
        { value: '5', label: 'upto 5 Kg', name: 'weight'},
        { value: '6', label: 'upto 6 Kg', name: 'weight'},
        { value: '7', label: 'upto 7 Kg', name: 'weight'},
        { value: '8', label: 'upto 8 Kg', name: 'weight'},
        { value: '9', label: 'upto 9 Kg', name: 'weight'},
        { value: '10', label: 'upto 10 Kg', name: 'weight'},
        { value: '11', label: 'more than 10 Kg', name: 'weight'},
    ]

    const clearValue = () => {
            selectCustomerRef.select.clearValue();
            formRef.reset();
          };


    return (
        <>
            <CreateCustomer loadCustomer={() => loadCustomer()} show={modalShow} onHide={() => setModalShow(false)} />
            <Row className="justify-content-center">
                <Col lg={6}>
                    <div className="branch_new_pickup_area">
                        <button onClick={() => clearValue()}>click</button>
                        <Form onSubmit={(event) => handleSubmit(event)} ref={form => formRef = form}>
                            <Row>
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
                                                  defaultValue=""
                                                  isDisabled={false}
                                                  isLoading={false}
                                                  isClearable={false}
                                                  isRtl={false}
                                                  isSearchable={true}
                                                  name="customer"
                                                  placeholder="== Select Customer =="
                                                  options={customer}
                                                  onChange={(event) => selectChange(event)}
                                                />
                                            </Col>
                                            <Col lg={2}>
                                                <Button className="customBtn float-right" onClick={() => setModalShow(true)}>Add New</Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mt-4">
                                        <Form.Label>Partner</Form.Label>
                                        <Select
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
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mt-4">
                                            <Tabs
                                    defaultActiveKey="exchange"
                                    transition={false}
                                    className="mb-3"
                                      >
                                      <Tab eventKey="exchange" title="Product Exchange">
                                        <Select
                                              className="basic-single mt-2"
                                              classNamePrefix="select"
                                              defaultValue= ""
                                              isDisabled={false}
                                              isLoading={false}
                                              isClearable={false}
                                              isRtl={false}
                                              isSearchable={true}
                                              placeholder="== Choose record =="
                                              options={options}
                                              onChange={(event) => selectChange(event)}
                                            />
                                      </Tab>
                                      <Tab eventKey="replace" title="Customer Replace">
                                          <Select
                                              className="basic-single mt-2"
                                              classNamePrefix="select"
                                              defaultValue= ""
                                              isDisabled={false}
                                              isLoading={false}
                                              isClearable={false}
                                              isRtl={false}
                                              isSearchable={true}
                                              name="customer"
                                              placeholder="== Choose record =="
                                              options={options}
                                              onChange={(event) => selectChange(event)}
                                            />
                                      </Tab>
                                    </Tabs>
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
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
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mt-4">
                                        <Form.Label>Weight</Form.Label>
                                        <Select
                                              className="basic-single"
                                              classNamePrefix="select"
                                              isDisabled={false}
                                              isLoading={false}
                                              isClearable={false}
                                              isRtl={false}
                                              isSearchable={true}
                                              name="customer"
                                              placeholder="== Select Weight =="
                                              options={weights}
                                              onChange={(event) => selectChange(event)}
                                            />
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mt-4">
                                        <Form.Label>Item Description</Form.Label>
                                        <Form.Control type="text" name="packet_name" onChange={(event) => handleForm(event)}/>
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mt-4">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="text" name="cod" onChange={(event) => handleForm(event)}/>
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mt-4">
                                        {isLoading ? (
                                            <Button type="submit" className="customBtn"><Spinner size="sm" animation="border" /><span style={{marginLeft: '7px'}}>Submitting</span></Button>
                                        ) : (
                                        <Button type="submit" className="customBtn">Submit</Button>
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

export default CreatePickup;