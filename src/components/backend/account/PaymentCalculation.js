import React,{useEffect,useState} from 'react';
import {Table,Row,Col,Form} from 'react-bootstrap';
import { useCookies } from "react-cookie";
import UploadFile from "./UploadFile";
import checkToken from "../../../utils/checkToken";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useDispatch, useSelector} from "react-redux";
import {fetchPartnerDeliveryDetails, clearPartnerDeliveryDetails} from "../../../redux/actions/PartnerPaymentAction";
import notification from "../includes/notification";

const PaymentCalculation=()=>{

    const dispatch = useDispatch();
    const [paymentCalculations, setPaymentCalculations] = useState({
        statement_num: '',
        prev_add_deduct: 0,
        total_cod_received: 0,
        total_delivery_charge: 0,
        total_pickup_charge: 0,
        total_return_charge: 0,
    });

    const [paidAmount, setPaidAmount] = useState(0);
    const [reimbursement, setReimbursement] = useState(0);
    const [nextAddDeduct, setNextAddDeduct] = useState(0);

    const [cookies, setCookie, removeCookie] = useCookies(['selected_pickups']);
    const pickupData = cookies.selected_pickups;

    const deliveredDeliveries = useSelector((state) => state.partnerPaymentDetails.deliveries);
    const returns = useSelector((state) => state.partnerPaymentDetails.returns);
    const pickups = useSelector((state) => state.partnerPaymentDetails.pickups);
    const otherCalculations = useSelector((state) => state.partnerPaymentDetails.calculationDetails);
    useEffect(()=>{
        let AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        if(AccountStorage){
            checkToken(AccountStorage.token, 'Account_storage')
            setAuthorizationToken(AccountStorage.token);
        }
        if(pickupData.length > 0){
            dispatch(fetchPartnerDeliveryDetails(pickupData))
        }
    },[pickupData]);

    useEffect(() => {
        return () => {
            removeCookie('selected_pickups');
            dispatch(clearPartnerDeliveryDetails())
        }
    }, []);

    useEffect(() => {
        setPaymentCalculations(otherCalculations)
    }, [otherCalculations])


    useEffect(() => {
        const totalTransferable = parseFloat(paymentCalculations.total_cod_received)+parseFloat(reimbursement)+parseFloat(paymentCalculations.prev_add_deduct)-parseFloat(paymentCalculations.total_delivery_charge)-parseFloat(paymentCalculations.total_return_charge)-parseFloat(paymentCalculations.total_pickup_charge);
        const forNextStat = totalTransferable-parseFloat(paidAmount);
        setNextAddDeduct(forNextStat);
        }, [paidAmount])

    const handlePaidChange = (event) => {
        const numbers = /^[0-9]+$/;
          if(event.target.value !== ''){
              if(event.target.value.match(numbers))
              {
                setPaidAmount(parseFloat(event.target.value));
              }
              else
              {
                  notification('danger', 'Please input numeric characters only')
                  return false;
              }
          }else {
              setPaidAmount(0)
          }
    }

    const handleReimbusermentChange = (event) => {
         const numbers = /^[0-9]+$/;
          if(event.target.value !== ''){
              if(event.target.value.match(numbers))
              {
                          setReimbursement(parseFloat(event.target.value))
              }
              else
              {
                  notification('danger', 'Please input numeric characters only')
                  return false;
              }
          }else {
              setReimbursement(0)
          }
    }

    return(
        <>
            <Row>
                <Col className="mx-5 my-5">
                     <div style={{width:'100%',display:'grid',placeContent:'center'}}>
                         <h5>
                             {
                                 Object.keys(deliveredDeliveries).length !== 0 ? (
                                     <>
                                     #{deliveredDeliveries[0].vendor_name.toUpperCase()}
                                     </>
                                 ) : (<></>)
                             }
                         </h5>
                     </div>
                    <Table striped bordered hover style={{borderRadius:'5px',}}>
                      <thead>
                        <tr>
                          <th>S.N</th>
                          <th>Tex Code</th>
                          <th>Delivered Date</th>
                          <th>Receiver Detail</th>
                           <th>Address</th>
                            <th>Charge(Rs)</th>
                          <th>COD</th>
                          <th>Product Name</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                          Object.keys(deliveredDeliveries).length === 0 ? (
                              <tr>
                                  <td colSpan={8} style={{textAlign: 'center'}}><h6>Loading...</h6></td>
                              </tr>

                          ): (
                              <>
                                  {deliveredDeliveries.map((record, index) => {
                                      return (
                                          <tr key={record.id}>
                                              <td>{index+1}</td>
                                              <td>{record.tex_code}</td>
                                              <td>{record.prompt_date}</td>
                                              <td>{record.customer_name} - {record.customer_phone}</td>
                                              <td>{record.customer_address}</td>
                                              <td>Rs. {record.delivery_charge}</td>
                                              <td>Rs. {record.cod_received}</td>
                                              <td>{record.packet_name}</td>
                                          </tr>
                                      )
                                  })}
                              </>
                          )
                      }
                      </tbody>
                    </Table>
            <Row >
                <Col lg={12}>
                    <div style={{width:'100%',display:'grid',placeContent:'center'}} ><h6 style={{fontSize:'16px'}}>Pickups</h6></div>
                </Col>
            </Row>

             <Table striped bordered hover >
                 <thead>
                 <tr>
                     <th>S.N</th>
                     <th>Request Code</th>
                     <th>Pickup Location</th>
                     <th>Request Date</th>
                     <th>Packets/ Orders</th>
                     <th>Charge</th>
                </tr>
                 </thead>
                 <tbody>
                 {
                     Object.keys(pickups).length === 0 ? (
                         <>
                             <tr>
                                 <td colSpan={6} style={{textAlign: 'center'}}><h6>No Pickups</h6></td>
                             </tr>
                         </>
                     ): (
                         <>
                             {pickups.map((data, index) => {
                                 return (
                                     <>
                                     <tr key={data.id}>
                                         <td>{index+1}</td>
                                         <td>{data.request_code}</td>
                                         <td>{data.partner_address}</td>
                                         <td>{data.request_date}</td>
                                         <td>{data.completed}</td>
                                         <td>{data.completed > 0 && data.completed < 4 ? (
                                             <>
                                             Rs. 50
                                             </>
                                         ): (
                                             <>Rs. 0</>
                                         )}</td>
                                     </tr>
                                     </>
                                 )
                             })}
                         </>
                     )
                 }
                 </tbody>
             </Table>
                  <Row >
                    <Col lg={12}>
                        <div style={{width:'100%',display:'grid',placeContent:'center'}} ><h6 style={{fontSize:'16px'}}>Return and Cancellation</h6></div>
                    </Col>
                </Row>
                    <Table striped bordered hover >
                       <thead>
                         <tr>
                    <th>S.N</th>
                  <th>Tex Code</th>
                  <th>Return Date</th>
                  <th>Remarks</th>
                  <th>Location</th>
                   <th>COD Amount</th>
                     <th>Product Name</th>
                  <th>Customer</th>
                  <th> Return Charge</th>
                </tr>
                       </thead>
                      <tbody>
                      {
                          Object.keys(returns).length === 0 ? (
                              <tr>
                                  <td colSpan={9} style={{textAlign: 'center'}}><h6>No Records</h6></td>
                              </tr>

                          ): (
                              <>
                                  {returns.map((record, index) => {
                                      return (
                                          <tr key={record.id}>
                                              <td>{index+1}</td>
                                              <td>{record.tex_code}</td>
                                              <td>{record.prompt_date}</td>
                                              <td>{record.delivery_remarks}</td>
                                              <td>{record.customer_address}</td>
                                              <td>Rs. {record.cod}</td>
                                              <td>{record.packet_name}</td>
                                              <td>{record.customer_name} - {record.customer_phone}</td>
                                              <td>Rs. {record.return_charge}</td>
                                          </tr>
                                      )
                                  })}
                              </>
                          )
                      }
                     </tbody>
                    </Table>
                    <Row >
                    <Col lg={12} style={{display:'none'}}>
                        <div style={{width:'100%',display:'grid',placeContent:'center'}} ><h6 style={{fontSize:'16px'}}>Packet Exchanged</h6></div>
                    </Col>
                </Row>
                    <Table striped bordered hover style={{display:'none'}} >
                      <thead>
                            <tr>
                                 <th>S.N</th>
                                  <th>Tex Code</th>
                                  <th>Location</th>
                                   <th>COD Amount</th>
                                  <th>Customer</th>
                            </tr>
                      </thead>
                         <tbody>
                         {/*Exchanged*/}
                      </tbody>
                    </Table>
                     <Table striped bordered hover>
                         <tbody>
                             <tr>
                                 <td rowSpan="10" colSpan="4" style={{minWidth:'200px'}}>
                                   <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'300px'}}>{paymentCalculations.statement_num}</div>
                                     {/*<span style={{display:'grid',placeContent:'center'}}>statement-11</span>*/}
                                 </td>
                                 <td rowSpan="2">
                                 </td>
                                  <td>Total COD Amount</td>
                                   <td >
                                       Rs. {paymentCalculations.total_cod_received}
                                   </td>
                             </tr>
                             <tr>
                                   <td>Total Delivery Charge</td>
                                   <td>Rs. {paymentCalculations.total_delivery_charge}</td>
                              </tr>
                             <tr >
                                 <td></td>
                                   <td>Total Pickup Charge</td>
                                   <td >Rs. {paymentCalculations.total_pickup_charge}</td>

                              </tr>

                             <tr>
                                   <td rowSpan="2">
                                       <span style={{display:'grid',placeContent:'center',alignItems:'center'}}>Paid by:Account</span>
                                   </td>
                                    <td>Reimbursements</td>
                                    <td >
                                        <input type="text"  style={{width:'100%',border:'none'}} value={reimbursement} onChange={(event) => handleReimbusermentChange(event)} />
                                    </td>
                               </tr>

                             <tr>
                                   <td>Return Charges</td>
                                    <td>Rs. {paymentCalculations.total_return_charge}</td>
                               </tr>
                             <tr>
                                    <td>Paid Date: {(new Date()).toDateString()}</td>
                                    <td>Add/ deduct from prev. Stat.</td>
                                    <td >Rs. {paymentCalculations.prev_add_deduct}</td>
                               </tr>
                             <tr>
                                   <td rowSpan="2"></td>
                                    <td >Total COD Transferable</td>
                                   <td>
                                       Rs. {parseFloat(paymentCalculations.total_cod_received)+parseFloat(reimbursement)+parseFloat(paymentCalculations.prev_add_deduct)-parseFloat(paymentCalculations.total_delivery_charge)-parseFloat(paymentCalculations.total_return_charge)-parseFloat(paymentCalculations.total_pickup_charge)}
                                   </td>
                               </tr>
                             <tr>
                                  <td>Total COD Transferred</td>
                                  <td>
                                      <input type="text" value={paidAmount} onChange={(event) => handlePaidChange(event)} />
                                  </td>
                             </tr>
                             <tr>
                                <th colSpan="1"></th>
                                <th>To add/ deduct on next Stat.</th>
                                <th>Rs. {parseFloat(paymentCalculations.total_cod_received)+parseFloat(reimbursement)+parseFloat(paymentCalculations.prev_add_deduct)-parseFloat(paidAmount)-parseFloat(paymentCalculations.total_delivery_charge)-parseFloat(paymentCalculations.total_return_charge)-parseFloat(paymentCalculations.total_pickup_charge)}</th>
                             </tr>
                         </tbody>
                     </Table>

                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <UploadFile paymentCalculations={paymentCalculations} deliveries={deliveredDeliveries} reimbursement={reimbursement} pickups={pickups} returns={returns} nextAddDeduct={nextAddDeduct} paid={paidAmount} />
                </Col>
            </Row>
        </>
    )
}
export default PaymentCalculation