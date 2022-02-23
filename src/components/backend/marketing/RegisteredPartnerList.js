import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchDiscountSchemes, fetchMarketerRegisteredPartners, applyDiscountScheme, updateDiscountScheme} from "../../../redux/actions/DiscountSchemeActions";
import MUIDataTable from "mui-datatables";
import checkToken from "../../../utils/checkToken";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useHistory} from "react-router-dom";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import Select from "react-select";
import notification from "../includes/notification";
import axios from "axios";

const RegisteredPartnerList = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const discountOptions = [];
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('add');
    const registeredPartners = useSelector((state) => state.discountSchemes.registeredPartners)
    const discountSchemeList = useSelector((state) => state.discountSchemes.discountSchemeList);
    discountSchemeList.map((dis) => {
        let op = {value: dis.id, label: dis.discount_type.concat(' - ', dis.discount_value)}
        discountOptions.push(op)
    })

    useEffect(() => {
        dispatch(fetchMarketerRegisteredPartners())
        dispatch(fetchDiscountSchemes())
    }, [])

     useEffect(() => {
        let marketingAdmin = JSON.parse(localStorage.getItem('marketingAdmin'));
        if(marketingAdmin?.token){
            checkToken(marketingAdmin?.token, 'marketingAdmin');
            setAuthorizationToken(marketingAdmin.token);
        }else{
            history.push('/marketing/login');
        }
    }, [])

        const columns = [
         {
            name: 'id',
            label: 'S.N',
            options: {
              filter: false,
              sort: true,
                 customBodyRender: (value, tableMeta, updateValue) => (
                      <>
                          <div style={{width:'100%',display:'flex',placeContent:'start'}}>{tableMeta.rowIndex+1}</div>
                      </>
                  )
             }
         },
        {
         name: "vendor_name",
         label: "Partner Name",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}}>{value}</div>
                  </>
              )
         }
        },

         {
         name: "vendor_phone",
         label: "Phone",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}}>{value}</div>
                  </>
              )
         }
        },

        {
         name: "vendor_email",
         label: "Email",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}}>{value}</div>
                  </>
              )
         }
        },
        {
         name: "address",
         label: "Address",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}}>{value}</div>
                  </>
              )
         }
        },
         {
         name: "discount_type",
         label: "Discount Type",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}}>
                          {registeredPartners[tableMeta.rowIndex].discount_type === null ? (
                              <>
                                  <span>-</span>
                              </>
                          ): (
                              <button className={'btn btn-sm btn-success'}><span style={{textTransform: 'capitalize'}}>{value}</span></button>
                          )}
                      </div>
                  </>
              )
         }
        },
        {
         name: "discount_value",
         label: "Discount Value",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}}>
                          {registeredPartners[tableMeta.rowIndex].discount_type === null ? (
                              <span className={'text-center'}>-</span>
                          ): (
                              <button className={'btn btn-sm btn-success'}><span>{value}</span></button>
                          )}
                      </div>
                  </>
              )
         }
        },
        {
         name: "id",
         label: "Action",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}}>
                          {registeredPartners[tableMeta.rowIndex].discount_type === null ? (
                              <>
                                  <button className={'btn btn-sm btn-primary'} onClick={() => onClickModal(value)}>Add Discount</button>
                              </>
                          ): (
                              <>
                                  <button className={'btn btn-sm btn-danger'} onClick={() => revokeDiscount(value)}>Revoke Discount</button>
                                  <button className={'btn btn-sm btn-primary'} style={{marginLeft: '10px'}} onClick={() => discountUpdateModal(value)}>Update Discount</button>
                              </>
                          )}
                      </div>
                  </>
              )
         }
        },

       ];

    const options = {
        searchOpen: false,
        filterType: 'textField',
        rowsPerPage: 50,
        rowsPerPageOptions: [10, 20, 50, 100, 500],
        fixedHeader: false,
        selectableRows: 'none',
        responsive: 'standard',
    }

    const [formField, setFormField] = useState({
        discount_type: '',
        partner_id: ''
    })

    const discountUpdateModal = (partner_id) =>{
        setOpenModal(true);
        setModalType('edit')
        const newValue = {...formField}
        newValue.partner_id = partner_id;
        setFormField(newValue);
    }

      const onClickModal = (partner_id) =>{
        setOpenModal(true);
        setModalType('add');
        const newValue = {...formField}
        newValue.partner_id = partner_id;
        setFormField(newValue);
    }

    const onCloseModal = ()=>{
        setOpenModal(false);
        const newValue = {...formField}
        newValue.partner_id = '';
        setFormField(newValue);
    }

    //discount type change function
    const typeChangeHandler = (event) => {
        const newValue = {...formField}
        newValue.discount_type = event.value;
        setFormField(newValue);
    }

    //apply discount
    const applyDiscount = () => {
        dispatch(applyDiscountScheme(formField)).then((res) => {
             if(res?.data.status === true){
                notification('success', res.data.message)
                onCloseModal();
                dispatch(fetchMarketerRegisteredPartners())
            }else {
                notification('danger', res.data.message)
            }
        })
    }

    //update discount
    const updateDiscount = () => {
         dispatch(updateDiscountScheme(formField)).then((res) => {
             if(res?.data.status === true){
                notification('success', res.data.message)
                onCloseModal();
                dispatch(fetchMarketerRegisteredPartners())
            }else {
                notification('danger', res.data.message)
            }
        })
    }

    //revoke discount
    const revokeDiscount = async (partner_id) => {
        const res = await axios.delete(`marketing/revoke/discount/scheme/${partner_id}`).catch((err) => {
            console.log(err)
        })
        if(res?.data.status === true){
            notification('success', res.data.message)
            dispatch(fetchMarketerRegisteredPartners())
        }else {
            notification('danger', res.data.message)
        }
    }

    return (
        <>
        <div>
             <MUIDataTable
                data={registeredPartners}
                columns={columns}
                options={options}
            />
        </div>

        <Modal show={openModal} onHide={onCloseModal} centered={true}>
                <Modal.Header >
                  {/*<Modal.Title>Modal heading</Modal.Title>*/}
                </Modal.Header>
                <Modal.Body>
                    <div style={{padding: '10px'}}>
                        <Form>
                        <label htmlFor="">Discount type:</label>
                        <Select
                              className="basic-single"
                              classNamePrefix="select"
                              defaultValue={''}
                              isDisabled={false}
                              isLoading={false}
                              isClearable={false}
                              isRtl={false}
                              isSearchable={false}
                              name="discountType"
                              placeholder={'== Select Discount Scheme =='}
                              options={discountOptions}
                              style={{width:'100% !important'}}
                              onChange={event => typeChangeHandler(event)}
                         />
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Row style={{width:'100%'}}>
                        <Col lg={6}>
                            {modalType === 'add' ? (
                                <Button variant="secondary" style={{backgroundColor:'#147298',border:'1px solid #147298',borderRadius:'5px',width:'100%'}} onClick={() => applyDiscount()}>Submit</Button>
                            ): (
                                <Button variant="secondary" style={{backgroundColor:'#147298',border:'1px solid #147298',borderRadius:'5px',width:'100%'}} onClick={() => updateDiscount()}>Submit</Button>
                            )}

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
    )
}

export default RegisteredPartnerList;