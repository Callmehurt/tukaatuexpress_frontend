import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import {Button, Col, Image, Modal, Row, Form} from "react-bootstrap";
import {MdDelete} from "react-icons/md";
import Select from "react-select";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useHistory} from "react-router-dom";
import checkToken from "../../../utils/checkToken";
import {useDispatch, useSelector} from "react-redux";
import {fetchDiscountSchemes, submitDiscountScheme} from "../../../redux/actions/DiscountSchemeActions";
import notification from "../includes/notification";
import axios from "axios";

const Discounts = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const discountSchemeList = useSelector((state) => state.discountSchemes.discountSchemeList);

    useEffect(() => {
        let marketingAdmin = JSON.parse(localStorage.getItem('marketingAdmin'));
        if(marketingAdmin?.token){
            checkToken(marketingAdmin?.token, 'marketingAdmin');
            setAuthorizationToken(marketingAdmin.token);
        }else{
            history.push('/marketing/login');
        }
        dispatch(fetchDiscountSchemes())
    }, [])

    const discountOptions = [
      { value: 'percentage', label: 'Percentage' },
      { value: 'fixed', label: 'Fixed' },
    ]

    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [selectedScheme, setSelectedScheme] = useState('');
    const [formField, setFormField] = useState({
        discountType: discountOptions[0].value,
        discountValue: ''
    })
    const [selectDefault, setSelectDefault] = useState(discountOptions[0])

    const onClickModal = () =>{
        setOpenModal(true);
        setModalType('add');
        const newValue = {...formField}
        newValue.discountType = discountOptions[0].value;
        setFormField(newValue);
    }
    const onCloseModal = ()=>{
        setOpenModal(false);
        const newValue = {...formField}
        newValue.discountValue = '';
        setFormField(newValue);
    }

    const deleteDiscountScheme = async (scheme_id) => {
        const res = axios.delete(`/marketing/delete/discount/scheme/${scheme_id}`).catch((err) => {
            console.log(err)
        })
        if((await res).data.status === true){
            notification('success', (await res).data.message);
            dispatch(fetchDiscountSchemes())
        }else {
            notification('danger', (await res).data.message);
        }

    }

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
         name: "discount_type",
         label: "Discount Type",
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
         name: "discount_value",
         label: "Discount Value",
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
         name: "id",
         label: "Action",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}}>
                          <button className={'btn btn-sm btn-danger'} onClick={() => deleteDiscountScheme(value)}>Remove</button>
                          <button className={'btn btn-sm btn-primary'} style={{marginLeft: '10px'}} onClick={() => openUpdateModal(discountSchemeList[tableMeta.rowIndex].discount_type, value)}>Update</button>
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

    const typeChangeHandler = (event) => {
        const newValue = {...formField}
        newValue.discountType = event.value;
        setFormField(newValue);
    }
     const valueChangeHandler = (event) => {
        const newValue = {...formField}
        newValue.discountValue = event.target.value;
        setFormField(newValue);
    }

    const submitDiscount = () => {
        dispatch(submitDiscountScheme(formField)).then((res) => {
            if(res?.data.status === true){
                notification('success', res.data.message)
                onCloseModal();
                dispatch(fetchDiscountSchemes())
            }else {
                notification('danger', res.data.message)
            }
        })
    }

    const openUpdateModal = (current_value, id) => {
        setOpenModal(true)
        setModalType('edit');
        const filter = discountOptions.filter((val) => val.value === current_value);
        setSelectDefault(filter[0]);
        const newForm = {...formField};
        newForm.discountType = filter[0].value;
        newForm.discountValue = discountSchemeList.find((data) => data.id === id).discount_value;
        setFormField(newForm);
        setSelectedScheme(id);
    }

    const updateDiscountScheme = async () => {
        const detail = {
            discount_type: formField.discountType,
            discount_value: formField.discountValue,
            discount_id: selectedScheme
        }
        const res = await axios.put('/marketing/update/discount/detail', detail).catch((err) => {
            console.log(err)
        })
        if((await res).data.status === true){
            notification('success', (await res).data.message);
            dispatch(fetchDiscountSchemes())
            onCloseModal();
        }else {
            notification('danger', (await res).data.message);
        }
    }

    return (
        <>
        <div style={{marginTop: '3rem'}}>
            <button className={'btn btn-sm btn-primary mb-3'} onClick={onClickModal}>Add Discount Scheme</button>
            <MUIDataTable
                data={discountSchemeList}
                columns={columns}
                options={options}
            />

             <Modal show={openModal} onHide={onCloseModal} centered={true}>
                <Modal.Header >
                  {/*<Modal.Title>Modal heading</Modal.Title>*/}
                </Modal.Header>
                <Modal.Body>
                    <div style={{padding: '10px'}}>
                        <Form>
                            <label htmlFor="">Discount type:</label>
                            {modalType === 'add' ? (
                                <Select
                              className="basic-single"
                              classNamePrefix="select"
                              defaultValue={discountOptions[0]}
                              isDisabled={false}
                              isLoading={false}
                              isClearable={false}
                              isRtl={false}
                              isSearchable={false}
                              name="discountType"
                              options={discountOptions}
                              style={{width:'100% !important'}}
                              onChange={event => typeChangeHandler(event)}
                         />
                                ): (
                                    <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  defaultValue={selectDefault}
                                  isDisabled={false}
                                  isLoading={false}
                                  isClearable={false}
                                  isRtl={false}
                                  isSearchable={false}
                                  name="discountType"
                                  options={discountOptions}
                                  style={{width:'100% !important'}}
                                  onChange={event => typeChangeHandler(event)}
                         />
                            )}
                        <label htmlFor="" style={{marginTop: '15px'}}>Discount Value:</label>
                            <Form.Control type="text" onChange={(event) => valueChangeHandler(event)} value={formField.discountValue}/>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Row style={{width:'100%'}}>
                        <Col lg={6}>
                            {modalType === 'add'? (
                            <Button variant="secondary" style={{backgroundColor:'#147298',border:'1px solid #147298',borderRadius:'5px',width:'100%'}} onClick={submitDiscount}>Submit</Button>
                            ): (
                            <Button variant="secondary" style={{backgroundColor:'#147298',border:'1px solid #147298',borderRadius:'5px',width:'100%'}} onClick={updateDiscountScheme}>Update</Button>
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

        </div>
        </>
    )
}

export default Discounts;