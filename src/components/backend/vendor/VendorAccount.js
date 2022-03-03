import React, {useEffect, useState} from 'react';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {Row, Col, Card, Form, Image,Button} from 'react-bootstrap';
// import VendorAccountDatatables from "./VendorAccountDatatables";
import PaymentRequestModal from "./PaymentRequestModal";
import PendingOrders from "./PendingOrders";
import PaidOrders from "./PaidOrders";
import StatementAndInvoices from "./StatementAndInvoices";
import axios from "axios";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useDispatch, useSelector} from "react-redux";
import {BsSearch} from 'react-icons/bs';
import{MdCancel} from 'react-icons/md';
import Fuse from "fuse.js";
import logoImage from "../../../logo.svg";
import {useHistory} from "react-router-dom";
import AssignDeliveryModal from "../staff/admin/ActionArea/Warehouseactions/AssignDeliveryModal";
import Avatar from "react-avatar";
import PaymentReceivedDeliveries from "./PaymentReceivedDeliveries";
import DeliveryItemCard from "./DeliveryItemCard";
import {fetchPaymentReceivedDeliveries} from "../../../redux/actions/vendor";

const options = {
      shouldSort: true,
      includeMatches: true,
      threshold: 0.0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      findAllMatches: true,
      keys: ["packet_name", "customer_phone","customer_name", "tex_code","cod","type"],
    };


const VendorAccount=()=>{

    // const [paymentReceivedDeliveries, setPaymentReceivedDeliveries] = useState([]);
    const dispatch = useDispatch();
    const[receivableAmount,setReceivableAmount]=useState('0');
       const history = useHistory();
     const vendor = useSelector((state) => state.vendor);
     const pendingOrdersList=vendor.pendingOrdersList;
     const settledOrdersList=vendor.settledOrdersList;
     const paymentReceivedDeliveries= vendor.paymentReceivedDeliveries;
      const statementAndInvoice=vendor.statementAndInvoice;
     const[activeSearchButton,setActiveSearchButton]=useState(false);
     const[searchListDisplay,setSearchListDisplay]=useState(3);
     const[paymentRequestShow,setPaymentRequestShow]=useState(false);


     const getAccountBalance=()=>{
        axios.get('/partner/account/balance')
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data);
                        setReceivableAmount(res.data);
                        // dispatch(pendingOrderList(res.data));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })
    }
    const getLastStatementCheck=()=>{
        axios.get('/partner/last/statemet/check')
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data);
                        console.log('last check')
                        // setReceivableAmount(res.data);
                        // dispatch(pendingOrderList(res.data));
                    })
            .catch((err)=>{
               console.log(err.response);
            })
    }

    //pending search start
    const [query, setQuery] = useState("");
     const fuse = new Fuse(pendingOrdersList, options);
      const results = fuse.search(query);
      const characterResults = query
        ? results.map((character) => character.item)
        : pendingOrdersList;
    const onSearch = ({ currentTarget })=>{
       setQuery(currentTarget.value);
       console.log(currentTarget.value);
    }
     //pending search end


    //Payment Received Deliveries search starts
    const [queryForReceived, setQueryForReceived] = useState('');
    const fuseForReceived = new Fuse(paymentReceivedDeliveries, options);
    const receivedSearchResult = fuseForReceived.search(queryForReceived);
    const onReceivedSearchResult = queryForReceived ? receivedSearchResult.map((item) => item.item): paymentReceivedDeliveries;
    console.log(onReceivedSearchResult)
    const onReceivedSearch = ({currentTarget}) => {
        setQueryForReceived(currentTarget.value)
        console.log(currentTarget.value);
    }

    //Payment Received Deliveries search ends




    useEffect(()=>{
       let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        // console.log(staff_admin);
        if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }
        getAccountBalance();
        getLastStatementCheck();
        dispatch(fetchPaymentReceivedDeliveries());
    },[]);


    //paid search start
    const [queryPaid, setQueryPaid] = useState("");
    const fusePaid = new Fuse(settledOrdersList, options);
      const resultsPaid = fusePaid.search(queryPaid);
      const characterResultsPaid = queryPaid
        ? resultsPaid.map((character) => character.item)
        : settledOrdersList;
    const onSearchPaid = ({ currentTarget })=>{
      setQueryPaid(currentTarget.value);
       console.log(currentTarget.value);
    }

     //paid search end
    //statement search start
      const [queryStatement, setQueryStatement] = useState("");
    const fuseStatement = new Fuse(statementAndInvoice, options);
      const resultsStatement = fuseStatement.search(queryStatement);
      const characterResultsStatement = queryPaid
        ? resultsStatement.map((character) => character.item)
        : statementAndInvoice;
    const onSearchStatement = ({ currentTarget })=>{
      setQueryStatement(currentTarget.value);
       console.log(currentTarget.value);
    }
     //paid search end
const activeSearch=()=>{
     if(activeSearchButton){
         setActiveSearchButton(false);
     }else{
          setActiveSearchButton(true);
     }

}
const activatePaymentModal=()=>{
    setPaymentRequestShow(true);
}
const getActiveSearch=(id)=>{
    console.log(id);
    setSearchListDisplay(id);
}
const getPickupDetail=(id)=>{
        history.push({
           pathname: '/vendor/pickup_detail',
           state: {pickupID: id }
       });
  }
  const onHidePaymentRequest=()=>{
      setPaymentRequestShow(false);
  }
    return(
        <>
            <PaymentRequestModal show={paymentRequestShow} toggle={onHidePaymentRequest} />
            <Row style={{paddingLeft:'20px',paddingRight:'20px',paddingTop:'17px'}}>
                {activeSearchButton ?
                    <>
                        {searchListDisplay===0?
                            <>
                                <Col xs={10} className="p-0">
                             <Card style={{borderRadius:'30px',border:'none'}}>
                                  <Card.Body className="p-2">
                                       <Form className="search">
                                           <Form.Control type="text" value={query} placeholder="Search all orders ..." onChange={onSearch} style={{borderRadius:'15px',}} />
                                          {/*<input type="text" value={query} onChange={onSearch} />*/}
                                      </Form>
                                  </Card.Body>
                              </Card>
                          </Col>
                            </>:
                            <>
                            </>

                        }
                        {searchListDisplay===1?
                            <>
                                <Col xs={10} className="p-0">
                             <Card style={{borderRadius:'30px',border:'none'}}>
                                  <Card.Body className="p-2">
                                       <Form className="search">
                                           <Form.Control type="text" value={queryPaid} placeholder="Search all orders ..." onChange={onSearchPaid} style={{borderRadius:'15px',}} />
                                          {/*<input type="text" value={query} onChange={onSearch} />*/}
                                      </Form>
                                  </Card.Body>
                              </Card>
                          </Col>
                            </>:
                            <>
                            </>

                        }
                        {searchListDisplay===2?
                            <>
                                <Col xs={10} className="p-0">
                             <Card style={{borderRadius:'30px',border:'none'}}>
                                  <Card.Body className="p-2">
                                       <Form className="search">
                                           <Form.Control type="text" value={queryStatement} placeholder="Search all orders ..." onChange={onSearchStatement} style={{borderRadius:'15px',}} />
                                          {/*<input type="text" value={query} onChange={onSearch} />*/}
                                      </Form>
                                  </Card.Body>
                              </Card>
                          </Col>
                            </>:
                            <>
                            </>
                        }

                        {searchListDisplay===3?
                            <>
                                <Col xs={10} className="p-0">
                             <Card style={{borderRadius:'30px',border:'none'}}>
                                  <Card.Body className="p-2">
                                       <Form className="search">
                                           <Form.Control type="text" value={queryForReceived} placeholder="Search all orders ..." onChange={onReceivedSearch} style={{borderRadius:'15px',}} />
                                      </Form>
                                  </Card.Body>
                              </Card>
                          </Col>
                            </>:
                            <>
                            </>
                        }
                    </>:
                    <>
                        <Col xs={10} className="p-0">
                             <Card style={{borderRadius:'5%',}}>
                                <Card.Body>
                                      <div style={{height:'30px'}}>
                                          <h6 className="text-center">Receivable Balance : Rs. {receivableAmount}</h6>
                                          {/*<h6 className="text-center">Rs. {receivableAmount}</h6>*/}
                                      </div>
                                        <div style={{display: 'flex', placeContent: 'center'}}>
                                               <Button variant="primary" style={{fontSize: '14px'}}
                                                    onClick={(event) => activatePaymentModal()}>Request a Payment</Button>
                                        </div>
                                </Card.Body>
                             </Card>
                        </Col>
                    </>
                }

                {activeSearchButton?
                    <>
                          <Col xs={2}>
                            <div style={{height:'30px',display:'flex',placeContent:'center',paddingTop:'12px'}}>
                        <div onClick={(event)=>{activeSearch()}}>

                          <MdCancel size={26} />
                        </div>
                    </div>

                          </Col>
                    </>:
                     <>
                        <Col xs={2}>
                          <div style={{height:'30px',display:'flex',placeContent:'center',paddingTop:'13px'}}>
                        <div onClick={(event)=>{activeSearch()}}>

                          <BsSearch size={26} />
                        </div>
                    </div>

                        </Col>
                    </>
                }

            </Row>
            <div className="px-2">
                {/*<h6>vendor Account</h6>*/}
                    <Tabs
                    defaultActiveKey="deliveredDeliveries"
                    transition={false}
                    className="mb-0 mt-3"
                      >
                      {/*  <Tab eventKey="pendingOrders" title={<><div onClick={()=>{getActiveSearch(0)}}>Pending <span>*/}
                      {/*       {*/}
                      {/*          pendingOrdersList.length?*/}
                      {/*              <>*/}
                      {/*                  {pendingOrdersList.length}*/}
                      {/*              </>:*/}
                      {/*              <>*/}
                      {/*                  0*/}
                      {/*              </>*/}
                      {/*      }*/}
                      {/*  </span></div></>} >*/}
                      {/*  <div style={{minHeight:'100vh'}}>*/}
                      {/*      {searchListDisplay===0 && query && activeSearchButton ?*/}
                      {/*          <>*/}
                      {/*              {characterResults.length?*/}
                      {/*                 <>*/}
                      {/*                     <div>*/}
                      {/*                {characterResults.map((character) => {*/}
                      {/*                    const {packet_name, type, customer_phone, cod,tex_code,customer_name} = character;*/}
                      {/*                    return (*/}
                      {/*                        <>*/}
                      {/*                            <Card onClick={(e)=>{e.preventDefault();getPickupDetail(character.id)}}>*/}
                      {/*                                    <Card.Body className="p-0">*/}
                      {/*                                        <Row>*/}
                      {/*                                            <Col xs={3} className="pl-0 pr-0">*/}
                      {/*                                                /!*<Image src={logoImage} roundedCircle />*!/*/}
                      {/*                                                <div style={{*/}
                      {/*                                                     display: 'grid',*/}
                      {/*                                                     placeContent: 'center',*/}
                      {/*                                                     alignItems: 'center',*/}
                      {/*                                                     height: '55px'*/}
                      {/*                                                 }}>*/}
                      {/*                                                     <Avatar size="40" name={character?.packet_name}*/}
                      {/*                                                             round={true}/>*/}
                      {/*                                                 </div>*/}
                      {/*                                            </Col>*/}
                      {/*                                            <Col xs={9} style={{paddingLeft: '0px', paddingRight: '0px'}}>*/}
                      {/*                                                <div className="pt-2">*/}
                      {/*                                                    <h6 className="mb-1">{character.tex_code}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}>(COD Rs.{character.cod})</span></h6>*/}

                      {/*                                                </div>*/}
                      {/*                                                <div>*/}
                      {/*                                                    <Row>*/}
                      {/*                                                       <Col xs={6}>*/}
                      {/*                                                           {*/}
                      {/*                                                               character.customer_name?*/}
                      {/*                                                                   <>*/}
                      {/*                                                                       <span style={{fontSize:'15px'}}>{ character.customer_name.length>13 ? <><span>{character.customer_name.substring(0,13)}...</span></>: <><span>{character.customer_name}</span></> }</span>*/}
                      {/*                                                                   </>:*/}
                      {/*                                                                   <>*/}

                      {/*                                                                   </>*/}
                      {/*                                                           }*/}
                      {/*                                                       </Col>*/}
                      {/*                                                       <Col xs={6}>*/}
                      {/*                                                        <span style={{fontSize:'14px'}}>Status: {character.status}</span>*/}
                      {/*                                                    </Col>*/}
                      {/*                                                    </Row>*/}

                      {/*                                                </div>*/}
                      {/*                                                /!*<div>*!/*/}
                      {/*                                                /!*    <p style={{fontSize: '15px'}}>{chatList.message}</p>*!/*/}

                      {/*                                                /!*</div>*!/*/}
                      {/*                                                /!*<div>*!/*/}
                      {/*                                                /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

                      {/*                                                /!*</div>*!/*/}
                      {/*                                                /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                      {/*                                            </Col>*/}
                      {/*                                        </Row>*/}
                      {/*                                    </Card.Body>*/}
                      {/*                                </Card>*/}
                      {/*                        </>*/}
                      {/*                    )*/}
                      {/*                })*/}
                      {/*                }*/}
                      {/*             </div>*/}

                      {/*                 </>:*/}
                      {/*                 <>*/}
                      {/*                     <Col xs={12}>*/}
                      {/*                         <div style={{height:'60vh',display:'grid',placeContent:'center',fontSize:'16px',fontWeight:'500'}}>No Orders Here...</div>*/}
                      {/*                      </Col>*/}
                      {/*                 </>*/}
                      {/*              }*/}

                      {/*          </>:*/}
                      {/*          <>*/}
                      {/*              <PendingOrders />*/}
                      {/*          </>*/}
                      {/*      }*/}


                      {/*  </div>*/}
                      {/*</Tab>*/}

                        <Tab eventKey="deliveredDeliveries" title={<><div onClick={() => getActiveSearch(3)}>
                            Delivered
                            <span>
                                {
                                    Object.keys(paymentReceivedDeliveries).length
                                }
                            </span>
                        </div></>}>
                          <div style={{minHeight:'100vh'}}>
                              {searchListDisplay === 3 && queryForReceived && activeSearchButton ? (
                                  <>
                                      {onReceivedSearchResult.length ? (
                                          <DeliveryItemCard deliveries={onReceivedSearchResult}/>
                                      ) : (
                                          <Col xs={12}>
                                              <div style={{
                                                  height: '60vh',
                                                  display: 'grid',
                                                  placeContent: 'center',
                                                  fontSize: '16px',
                                                  fontWeight: '500'
                                              }}>No Records Found...
                                              </div>
                                          </Col>
                                      )
                                      }
                                  </>
                              ) : (
                                  <PaymentReceivedDeliveries deliveries={paymentReceivedDeliveries}/>
                              )
                              }
                          </div>
                        </Tab>


                        <Tab eventKey="paidOrders" title={<><div onClick={()=>{getActiveSearch(1)}}>Paids <span>
                             {
                                settledOrdersList.length?
                                    <>
                                        {settledOrdersList.length}
                                    </>:
                                    <>
                                        0
                                    </>
                            }
                        </span></div></>}>
                          <div style={{minHeight:'100vh'}}>
                              {searchListDisplay ===1 && queryPaid && activeSearchButton?
                                <>
                                    {characterResultsPaid.length?
                                        <>
                                            <div>
                                          {characterResultsPaid.map((character) => {
                                              const {packet_name, type, customer_phone, cod,tex_code,customer_name} = character;
                                              return (
                                                  <>
                                                      <Card onClick={(e)=>{e.preventDefault();getPickupDetail(character.id)}}>
                                                              <Card.Body className="p-0">
                                                                  <Row>
                                                                      <Col xs={3} className="pl-0 pr-0">
                                                                          {/*<Image src={logoImage} roundedCircle />*/}
                                                                              <div style={{
                                                                               display: 'grid',
                                                                               placeContent: 'center',
                                                                               alignItems: 'center',
                                                                               height: '55px'
                                                                           }}>
                                                                               <Avatar size="40" name={character?.packet_name}
                                                                                       round={true}/>
                                                                           </div>

                                                                      </Col>
                                                                      <Col xs={9} style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                                          <div className="pt-2">
                                                                              <h6 className="mb-1">{character.tex_code}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}>(COD Rs.{character.cod})</span></h6>

                                                                          </div>
                                                                          <div>
                                                                              <Row>
                                                                                 <Col xs={6}>
                                                                                     {
                                                                                         character.customer_name?
                                                                                             <>
                                                                                                 <span style={{fontSize:'15px'}}>{ character.customer_name.length>13 ? <><span>{character.customer_name.substring(0,13)}...</span></>: <><span>{character.customer_name}</span></> }</span>
                                                                                             </>:
                                                                                             <>

                                                                                             </>
                                                                                     }
                                                                                 </Col>
                                                                                 <Col xs={6}>
                                                                                  <span style={{fontSize:'14px'}}>Status: {character.status}</span>
                                                                              </Col>
                                                                              </Row>

                                                                          </div>
                                                                          {/*<div>*/}
                                                                          {/*    <p style={{fontSize: '15px'}}>{chatList.message}</p>*/}

                                                                          {/*</div>*/}
                                                                          {/*<div>*/}
                                                                          {/*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*/}

                                                                          {/*</div>*/}
                                                                          {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                                                      </Col>
                                                                  </Row>
                                                              </Card.Body>
                                                          </Card>
                                                  </>
                                              )
                                          })
                                          }
                                   </div>
                                        </>:
                                        <>
                                             <Col xs={12}>
                                               <div style={{height:'60vh',display:'grid',placeContent:'center',fontSize:'16px',fontWeight:'500'}}>No Orders Here...</div>
                                            </Col>
                                        </>

                                    }

                                </>:
                                <>
                                     <PaidOrders />
                                </>
                            }

                          </div>
                      </Tab>
                        <Tab eventKey="statement&invoices" title={<><div onClick={()=>{getActiveSearch(2)}}>Statements & Invoices <span>
                             {
                                statementAndInvoice.length?
                                    <>
                                        {statementAndInvoice.length}
                                    </>:
                                    <>
                                        0
                                    </>
                            }
                        </span></div></>}>
                        <div style={{minHeight:'100vh'}}>
                            {searchListDisplay ===2 && queryStatement && activeSearchButton?
                                <>
                                    {characterResultsStatement.length?
                                        <>
                                             <div>
                                        {characterResultsStatement.map((character) => {
                                      const {packet_name, type, customer_phone, cod,tex_code,customer_name} = character;
                                      return (
                                          <>
                                              <Card onClick={(e)=>{e.preventDefault();getPickupDetail(character.id)}}>
                                                      <Card.Body className="p-0">
                                                          <Row>
                                                              <Col xs={3} className="pl-0 pr-0">
                                                                  {/*<Image src={logoImage} roundedCircle />*/}
                                                                  <div style={{
                                                                               display: 'grid',
                                                                               placeContent: 'center',
                                                                               alignItems: 'center',
                                                                               height: '55px'
                                                                           }}>
                                                                               <Avatar size="40" name={character?.packet_name}
                                                                                       round={true}/>
                                                                           </div>
                                                              </Col>
                                                              <Col xs={9} style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                                  <div className="pt-2">
                                                                      <h6 className="mb-1">{character.tex_code}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}>(COD Rs.{character.cod})</span></h6>

                                                                  </div>
                                                                  <div>
                                                                      <Row>
                                                                         <Col xs={6}>
                                                                             {
                                                                                 character.customer_name?
                                                                                     <>
                                                                                         <span style={{fontSize:'15px'}}>{ character.customer_name.length>13 ? <><span>{character.customer_name.substring(0,13)}...</span></>: <><span>{character.customer_name}</span></> }</span>
                                                                                     </>:
                                                                                     <>

                                                                                     </>
                                                                             }
                                                                         </Col>
                                                                         <Col xs={6}>
                                                                          <span style={{fontSize:'14px'}}>Status: {character.status}</span>
                                                                      </Col>
                                                                      </Row>

                                                                  </div>
                                                                  {/*<div>*/}
                                                                  {/*    <p style={{fontSize: '15px'}}>{chatList.message}</p>*/}

                                                                  {/*</div>*/}
                                                                  {/*<div>*/}
                                                                  {/*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*/}

                                                                  {/*</div>*/}
                                                                  {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                                              </Col>
                                                          </Row>
                                                      </Card.Body>
                                                  </Card>
                                          </>
                                      )
                                  })
                                         }

                                    </div>
                                        </>:
                                        <>
                                            <Col xs={12}>
                                               <div style={{height:'60vh',display:'grid',placeContent:'center',fontSize:'16px',fontWeight:'500'}}>No Orders Here...</div>
                                            </Col>
                                        </>
                                    }

                                </>:
                                <>
                                    <StatementAndInvoices itemsPerPage={8} />
                                </>
                                }
                        </div>
                      </Tab>
                    </Tabs>
            </div>
        </>
    )
}

export default VendorAccount