import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {Row, Col, Modal, Button} from 'react-bootstrap';
import { useCookies } from "react-cookie";
import notification from "../includes/notification";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useHistory} from "react-router-dom";
import checkToken from "../../../utils/checkToken";
import config from "react-reveal/src/lib/globals";

const UploadFile = (props)=>{
    const history=useHistory();
    const [invoiceFiles, setInvoiceFiles] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const[loading,setLoading]=useState(false);
    const[formField,setFormField]=useState({
        invoices:[],
    });

    useEffect(() => {
        let AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        if(AccountStorage){
            checkToken(AccountStorage.token, 'Account_storage')
            setAuthorizationToken(AccountStorage.token);
        }
        }, []);

    const selectFiles = (event) => {
        setInvoiceFiles(event.target.files);
        const newField = {...formField}
        newField.invoices=[event.target.files];
        setFormField(newField);
      }

    const handleClose = () => setOpenModal(false);
    const handleOpen = () => setOpenModal(true);


    const makePayment = async () => {
        setLoading(true);
        handleClose();
        const deliveries = [];
        const returns = [];
        props.deliveries.map((data) => {
            deliveries.push(data.pickup_id)
        })
        props.returns.map((data) => {
            returns.push(data.id)
        })
        const pickups = props.pickups;
        const total_cod_received = props.paymentCalculations.total_cod_received;
        const total_delivery_charge = props.paymentCalculations.total_delivery_charge;
        const total_return_charge = props.paymentCalculations.total_return_charge;
        const total_pickup_charge = props.paymentCalculations.total_pickup_charge;
        const prev_add_deduct = parseFloat(props.paymentCalculations.prev_add_deduct);
        const reimbursement = props.reimbursement;
        const discount = props.discount;
        const payable = (total_cod_received-total_delivery_charge-total_return_charge-total_pickup_charge+reimbursement+prev_add_deduct+discount)
        const paid = parseFloat(props.paid);
        const add_deduct = payable-paid;

        if(Object.is(NaN, parseFloat(paid))){
            notification('danger', 'Paid amount should be integer');
            setLoading(false);
            return false;
       }

        if(payable > 0 && paid === 0){
            notification('danger', 'Paid amount cannot be zero');
            setLoading(false);
            return false;
        }

        const formData = new FormData();
        invoiceFiles.forEach(file=>{
          formData.append("invoice[]", file);
        });

        formData.append('deliveries', JSON.stringify(deliveries));
        formData.append('pickups', JSON.stringify(pickups));
        formData.append('returns', JSON.stringify(returns));
        formData.append('total_cod_received', total_cod_received);
        formData.append('total_delivery_charge', total_delivery_charge);
        formData.append('total_pickup_charge', total_pickup_charge);
        formData.append('return_deduction', total_return_charge);
        formData.append('reimbursement', reimbursement);
        formData.append('discount', discount);
        formData.append('payable', payable);
        formData.append('paid', paid);
        formData.append('add_deduct', add_deduct);

        const response = await axios.post('/account/make/partner/payment/statement', formData,  config({
               headers: {
                "content-type": "multipart/form-data"
              }
          })).catch((err) => {
            console.log(err.data)
        })
        setLoading(false);
        if(response?.data.status === true){
            notification('success', response?.data.message)
            setLoading(false);
            history.push('/account/Account_Division')
        }else {
            notification('danger', response?.data.message)
        }
    }


    return(
        <>
            <Modal show={openModal} onHide={handleClose}>
                <Modal.Header >
                  {/*<Modal.Title>Modal heading</Modal.Title>*/}
                </Modal.Header>
                <Modal.Body>
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <h6>Do you wish to continue?</h6>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Row style={{width:'100%'}}>
                        <Col lg={6}>
                            <Button variant="secondary" style={{backgroundColor:'#147298',border:'1px solid #147298',borderRadius:'5px',width:'100%'}} onClick={makePayment}>Continue</Button>
                        </Col>
                        <Col lg={6}>
                           <Button variant="secondary"  style={{backgroundColor:'red',border:'1px solid red',borderRadius:'5px',width:'100%'}} onClick={handleClose}>
                             Cancel
                          </Button>
                        </Col>
                    </Row>

                </Modal.Footer>
        </Modal>

           <div>
              <Row className="mx-5" >
                <Col lg={6}>
                    <h6>Attach Files:</h6>
                  <label className="btn btn-default p-0">

                    <input type="file" name="file" accept="image/*" multiple onChange={selectFiles} />
                  </label>
                </Col>
                <Col lg={6}>
                    <div className="d-flex justify-content-end">
                        {loading?
                            <>
                                <button
                                className="btn btn-success btn-sm"
                                // disabled={!selectedFiles}
                                style={{padding:'5px 15px'}} disabled={true}>
                                Processing..
                              </button>
                            </>:
                            <>
                                <button
                                    className="btn btn-success btn-sm"
                                    // disabled={!selectedFiles}
                                    onClick={handleOpen}
                                    style={{padding:'5px 15px'}}>
                                    Settle Payment
                                  </button>
                            </>
                        }

                    </div>
                </Col>
              </Row>
           </div>
        </>
    );
}
export default UploadFile