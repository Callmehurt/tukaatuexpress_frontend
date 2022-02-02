import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {Row,Col} from 'react-bootstrap';
import { useCookies } from "react-cookie";
import notification from "../includes/notification";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useHistory} from "react-router-dom";

const UploadFile=(props)=>{
    const history=useHistory();
      const [cookies, setCookie] = useCookies();
      const [totalPayableAmount,setTotalPayableAmount]=useState('');
      const [invoiceFiles, setInvoiceFiles] = useState(undefined);
      const [progressInfos, setProgressInfos] = useState({ val: [] });
      const [message, setMessage] = useState([]);
      const [fileInfos, setFileInfos] = useState([]);
      const[loading,setLoading]=useState(false);
      const progressInfosRef = useRef(null);
      const[formField,setFormField]=useState({
          deliveries:[],
          pickups:[],
          returns:[],
          total_cod_received:'',
          total_delivery_charge:'',
          total_pickup_charge:'',
          payable:'',
          paid:0,
          add_deduct:0,
          reinbursement:0,
          return_deduction:0,
          invoices:[],


      });
      const totalPayableFun=()=>{
         setTotalPayableAmount(cookies.paymentDeliveryData?.total_cod_received-cookies.paymentDeliveryData?.total_delivery_charge);
       }
      useEffect(() => {
          let AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        if(AccountStorage){
          setAuthorizationToken(AccountStorage.token);
        }
        totalPayableFun();
        initialFormField();
      }, []);
      useEffect(()=>{
            let paymentDeliveryDataStore= JSON.parse(localStorage.getItem('paymentDeliveryData'));
           const newField = {...formField}
            newField.paid=props.paid;
            newField.reinbursement=props.reinbursement;
           newField.payable=props.totalPayable;
           newField.return_deduction=props.totalReturnCharge;
           newField.total_pickup_charge=paymentDeliveryDataStore?.total_pickup_charge;
           let allDelivery=paymentDeliveryDataStore?.deliveries;
            let allReturns=paymentDeliveryDataStore?.returns;
            newField.pickups=paymentDeliveryDataStore?.pickups;
           allDelivery.map((items)=>{
               newField.deliveries.push(items.pickup_id);
           })
           allReturns.map((items)=>{
                newField.returns.push(items.id);
           })

          newField.total_cod_received=paymentDeliveryDataStore?.total_cod_received;
          newField.total_delivery_charge=paymentDeliveryDataStore?.total_delivery_charge;
          let totalReturnCharge=paymentDeliveryDataStore?.total_return_charge;
           newField.add_deduct=newField.payable-newField.paid;
           setFormField(newField);
      },[props])
      const initialFormField=()=>{
              let paymentDeliveryDataStore= JSON.parse(localStorage.getItem('paymentDeliveryData'));
           const newField = {...formField}
            newField.paid=props.paid;
            newField.payable=props.totalPayable;
            newField.return_deduction=props.totalReturnCharge;
            newField.reinbursement=props.reinbursement;
             newField.total_pickup_charge=paymentDeliveryDataStore?.total_pickup_charge;
           let allDelivery=paymentDeliveryDataStore?.deliveries;
            let allReturns=paymentDeliveryDataStore?.returns;
             newField.pickups=paymentDeliveryDataStore?.pickups;
           allDelivery.map((items)=>{
               newField.deliveries.push(items.pickup_id);
           })
           allReturns.map((items)=>{
                newField.returns.push(items.id);
           })

          newField.total_cod_received=paymentDeliveryDataStore?.total_cod_received;
          newField.total_delivery_charge=paymentDeliveryDataStore?.total_delivery_charge;
          let totalReturnCharge=paymentDeliveryDataStore?.total_return_charge;
           console.log( newField.paid);
           newField.add_deduct=newField.payable-newField.paid;
           setFormField(newField);

          setFormField(newField);

      }
      const selectFiles = (event) => {
          setInvoiceFiles(event.target.files);
           const newField = {...formField}
           newField.invoices=[event.target.files];

          setFormField(newField);

      }
        // setProgressInfos({ val: [] });
      const uploadFiles = () => {
          setLoading(true);
          axios.post('/account/make/partner/payment/statement', formField)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                if(res.data.status === true){
                    notification('success', res.data.message);
                    deletePrintDataStorage();
                    history.push('/account/Account_Division');
                    setLoading(false);
                }else {
                    notification('danger', res.data.message);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err.response)
            })
          // .....

        setMessage([]);
  };
      const deletePrintDataStorage=()=>{
        let paymentDeliveryDataStore= JSON.parse(localStorage.getItem('paymentDeliveryData'));
        if(paymentDeliveryDataStore){
            localStorage.removeItem('paymentDeliveryData');
        }
    }
//   const upload = (file) => {
//       // console.log(formField);
//       let formData = new FormData();
//
//       formData.append("file", file);
//
//       return axios.post("/account/make/partner/payment/statement", formField, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
// };

//   const getFiles = () => {
//   return (axios.get("/files"));
// };
    return(
        <>
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
                                Settle Payment
                              </button>
                            </>:
                            <>
                                <button
                                    className="btn btn-success btn-sm"
                                    // disabled={!selectedFiles}
                                    onClick={uploadFiles}
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