import React,{useEffect,useState} from 'react';
import {Table,Row,Col,Form} from 'react-bootstrap';
import { useCookies } from "react-cookie";
import UploadFile from "./UploadFile";

const PaymentCalculation=()=>{

const [cookies, setCookie] = useCookies();
const [deliveries,setDeliveries]= useState([]);
const [returns,setReturns]=useState('');
const[totalReturnCharge,setTotalReturnCharge]=useState();
const [exchanges,setExchanges]=useState([]);
const [totalCodAmount,setTotalCodAmount]=useState();
const [totalPayableAmount,setTotalPayableAmount]=useState('');
const [statementNum,setStatementNum]=useState('');
const[paid,setPaid]=useState('');
const [reinbursement,setReinbursement]=useState(0);
const [totalPickupCharge,setTotalPickupCharge]=useState(0);
const [pickups, setPickups] = useState([]);
const returnChargeHandle =(id)=>{
    console.log('handleForm');
}

const handleForm =()=>{
    console.log('handleForm');
}
const handlePaidAmount=(event)=>{
    console.log(event.target.value);
    setPaid(event.target.value);

}
const [prevAddDeduct,setPrevAddDeduct]=useState();
const [totalDeliveryCharge,setTotalDeliveryCharge]=useState();
let deliveriesData=cookies.paymentDeliveryData?.deliveries;
const[todayDate,setTodayDate]=useState('');
const[withReinbursementpayable,setWithReinbursementpayable]=useState(null);
useEffect(()=>{
    console.log(cookies.paymentDeliveryData);
    let paymentDeliveryDataStore= JSON.parse(localStorage.getItem('paymentDeliveryData'));
    console.log(paymentDeliveryDataStore);
    console.log(paymentDeliveryDataStore.deliveries);
     setDeliveries(paymentDeliveryDataStore.deliveries);
     setReturns(paymentDeliveryDataStore.returns);
     setPickups(paymentDeliveryDataStore.pickups);
     setExchanges(paymentDeliveryDataStore.exchanges);
     setTotalPickupCharge(paymentDeliveryDataStore.total_pickup_charge);
     setTotalCodAmount(paymentDeliveryDataStore.total_cod_received);
     setPrevAddDeduct(paymentDeliveryDataStore.prev_add_deduct);
     setStatementNum(paymentDeliveryDataStore.statement_num);
     setTotalDeliveryCharge(paymentDeliveryDataStore.total_delivery_charge);
     setTotalReturnCharge(paymentDeliveryDataStore.total_return_charge);
     setTotalPayableAmount((parseFloat(totalCodAmount)+parseFloat(prevAddDeduct)+parseFloat(reinbursement))-(parseFloat(totalDeliveryCharge)+parseFloat(totalReturnCharge)+parseFloat(totalPickupCharge)));
     console.log(deliveries);
      console.log("deliveries");
      console.log(totalPayableAmount);
      let today = new Date().toISOString().slice(0, 10);
      setTodayDate(today);
    console.log(totalPayableAmount);
},[totalPayableAmount,reinbursement]);

const handleReinbursement = (event)=>{
    console.log(event.target.value);
    setReinbursement(event.target.value);

}
const totalPayableFun= () => {
    setTotalPayableAmount(totalCodAmount-totalDeliveryCharge+prevAddDeduct+reinbursement);
}
    return(
        <>
            <Row>
                <Col className="mx-5 my-5">
                     <div style={{width:'100%',display:'grid',placeContent:'center'}}><h5>{deliveries?<>{deliveries[0]?.vendor_name.substring(0, 1).toUpperCase()+deliveries[0]?.vendor_name.slice(1)}</>:<>{deliveries[0]?.vendor_name.substring(0, 1).toUpperCase()+ deliveries[0]?.vendor_name.slice(1)}</>}</h5></div>
                         <Table striped bordered hover style={{borderRadius:'5px',}}>
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Tracking Id</th>
                  <th>Delivered Date</th>
                  <th>Receiver Name</th>
                   <th>Address</th>
                    <th>Charge(Rs)</th>
                  <th>COD</th>
                  <th>Product Name</th>
                </tr>
              </thead>
              <tbody>
                  { deliveries?.length >0 ?<>{deliveries.map((deliveries,index)=>(
                      <tr>
                          <td>{index+1}</td>
                          <td>{deliveries?.tex_code}</td>
                          <td>{deliveries?.entry_date}</td>
                           <td>{deliveries?.customer_name}<span> (<span>{deliveries?.customer_phone}</span>)</span></td>
                           {/*<td>{*/}
                           {/*   deliveries?.customer_phone*/}
                           {/*}</td>*/}

                          <td>{deliveries?.customer_address}</td>
                          <td>{deliveries?.delivery_charge}</td>
                          <td>{deliveries?.cod_received}</td>
                           <td>{deliveries?.packet_name}</td>
                          {/*<td>{deliveries?.approved_date}</td>*/}
                          {/*hi*/}
                      </tr>
                  ))}
                  </>:<>  <tr style={{padding:'25px'}}>
                            <td colSpan={8}>
                                 <div className="text-center" style={{width:'100%'}}>No Statement Founds</div>
                            </td>
                          </tr>
                      </>
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
                                     <tr>
                                         <td>{index+1}</td>
                                         <td>{data.request_code}</td>
                                         <td>{data.partner_address}</td>
                                         <td>{data.request_date}</td>
                                         <td>{data.completed}</td>
                                         <td>{data.completed >= 0 && data.completed < 4 ? (
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
                  <th>Order Id</th>
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

                          { returns?.length >0 ?<>{returns.map((deliveries,index)=>(
                                      <tr>
                                          <td>{index+1}</td>
                                          <td>{deliveries?.tex_code}</td>
                                          <td>{deliveries?.entry_date}</td>
                                          <td>{deliveries?.delivery_remarks}</td>
                                          <td>{deliveries?.customer_address}</td>
                                          <td>{deliveries?.cod}</td>

                                          <td>{deliveries?.packet_name}</td>

                                          <td>{deliveries?.customer_name}<span> (<span>{deliveries?.customer_phone}</span>)</span></td>
                                          <td>{deliveries?.return_charge}</td>

                                      </tr>
                                  ))}
                              </>:<>
                                    <tr style={{padding:'25px'}}>
                                        <td colSpan={8}>
                                          <div className="text-center" style={{width:'100%'}}>No Statement Founds</div>
                                        </td>
                                    </tr>
                                  </>
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

                              { exchanges?.length >0 ?<>{exchanges.map((deliveries,index)=>(
                                          <tr>
                                              <td>{index+1}</td>
                                              <td>{deliveries?.tex_code}</td>
                                               <td>{deliveries?.customer_address}</td>
                                              <td>{deliveries?.cod}</td>
                                              <td>{deliveries?.customer_name}</td>

                                          </tr>
                                      ))}
                                  </>:<>
                                          <tr style={{padding:'25px'}}>
                                              <td colSpan={5}>
                                                  <div className="text-center" style={{width:'100%'}}>No Statement Founds</div>
                                              </td>
                                          </tr>
                                      </>
                              }


                      </tbody>
                    </Table>
                     <Table striped bordered hover>
                         <tbody>
                             <tr>
                                 <td rowSpan="10" colSpan="4" style={{minWidth:'200px'}}>
                                   <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'300px'}}> {statementNum}</div>
                                     {/*<span style={{display:'grid',placeContent:'center'}}>statement-11</span>*/}
                                 </td>
                                 <td rowSpan="2">
                                 </td>
                                  <td>Total COD Amount</td>
                                   <td >
                                       {totalCodAmount}
                                   </td>
                             </tr>
                             <tr>
                                   <td>Total Delivery Charge</td>
                                   <td >{totalDeliveryCharge}</td>
                              </tr>
                             <tr >
                                 <td></td>
                                   <td>Total Pickup Charge</td>
                                   <td >{totalPickupCharge}</td>

                              </tr>

                             <tr>
                                   <td rowSpan="2">
                                       <span style={{display:'grid',placeContent:'center',alignItems:'center'}}>Paid by:Account</span>
                                   </td>
                                    <td>Reimbursements</td>
                                    <td >
                                        <input type="text"  style={{width:'100%',border:'none'}} onChange={(event)=>handleReinbursement(event)} />
                                    </td>
                               </tr>

                             <tr>
                                   <td>Return Charges</td>
                                    <td >{totalReturnCharge}</td>
                               </tr>
                             <tr>
                                    <td>Paid Date: {todayDate}</td>
                                    <td>Add/ deduct from prev. Stat.</td>
                                    <td >{prevAddDeduct}</td>
                               </tr>
                             <tr>
                                   <td rowSpan="2"></td>
                                    <td >Total COD Transferable</td>
                                   <td >
                                       {totalPayableAmount?<>{totalPayableAmount}</>:<>{(totalCodAmount+prevAddDeduct+reinbursement)-(totalDeliveryCharge+totalReturnCharge+totalPickupCharge)}</>}
                                   </td>
                               </tr>
                             <tr>
                                  <td>Total COD Transferred</td>
                                  <td>
                                      {totalCodAmount-(totalDeliveryCharge+totalReturnCharge+totalPickupCharge)>0?
                                          <>
                                             {/*<Form>*/}
                                                 <Form.Control onChange={(event)=>handlePaidAmount(event)} name="paid" type="text" placeholder="Paid amount" />
                                               {/*</Form>*/}
                                          </>:
                                          <>
                                              0
                                          </>
                                          }

                                  </td>
                             </tr>
                             <tr>
                                <th colSpan="1"></th>
                                <th>To add/ deduct on next Stat.</th>
                                <th >{totalPayableAmount-paid}</th>
                             </tr>
                         </tbody>
                     </Table>

                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <UploadFile totalReturnCharge={totalReturnCharge} reinbursement={reinbursement} totalPayable={totalPayableAmount} paid={paid} />
                </Col>
            </Row>
        </>
    )
}
export default PaymentCalculation