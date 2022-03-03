import ReactPaginate from "react-paginate";
import React, {
  useEffect,
  useState
} from 'react';
import {Button, Card, Col, Modal, Row, Table} from "react-bootstrap";
import Avatar from "react-avatar";
import moment from "moment";
import {AiFillEye} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {statementsAndInvoices} from "../../../redux/actions/vendor";


const Items = ({ currentItems, viewPaymentStatement, viewInvoicePdf }) => {
  return (
    <>
    {currentItems && currentItems.map((item) => (
      <>
        <Col lg={12}>
                <div>
                   <Card style={{cursor:'pointer'}} >
                      <Card.Body className="p-0">
                          <Row>
                              <Col xs={2} className="pl-0 pr-0">
                                  <div style={{
                                       display: 'grid',
                                       placeContent: 'center',
                                       alignItems: 'center',
                                       height: '104px'
                                   }}>
                                       <Avatar size="40" name={item.statement_num}
                                               round={true}/>
                                   </div>
                              </Col>
                              <Col xs={10} style={{paddingLeft:'0px',paddingRight:'0px'}}>
                                  <div className="pt-2">
                                          <h6 className="mb-1" style={{fontSize:'15px'}}>{item.statement_num}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}></span></h6>
                                      </div>
                                   <div>
                                          <Row>
                                              <Col xs={6}>
                                                   <span style={{fontSize:'14px'}}>Payment: Rs. {item.paid}</span>
                                              </Col>
                                              <Col xs={6}>
                                                  <span style={{fontSize:'14px'}}>
                                                      Date: {moment(item.statement_date).format('L')}
                                                  </span>
                                              </Col>
                                              <Col xs={6} className="pt-1 pb-2" >
                                                   <Button variant="outline-secondary" onClick={() => viewPaymentStatement(item.id)}><AiFillEye size={20} /> Statement</Button>
                                              </Col>
                                              <Col xs={6} className="pt-1 pb-2" >
                                                  {
                                                      item.invoices.split(',').map((inv) => {
                                                          return (
                                                              <Button variant="outline-secondary" onClick={() => viewInvoicePdf(inv)}> <AiFillEye size={20} /> Invoices </Button>
                                                          )
                                                      })
                                                  }
                                              </Col>
                                          </Row>

                                      </div>
                              </Col>
                          </Row>
                      </Card.Body>
                   </Card>
                </div>
            </Col>
      </>
    ))}
    </>
  );
}


const StatementAndInvoices = ({ itemsPerPage }) => {


  const dispatch = useDispatch();

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const items = useSelector((state) => state.vendor.statementAndInvoice);
  useEffect(() => {
    getStatementAndInvoice();
  },[])

  useEffect(() => {
    setCurrentItems(items)
  }, [items])

  const getStatementAndInvoice=()=>{
        axios.get('partner/my/statements')
                .then((res)=>{
                    dispatch(statementsAndInvoices(res.data));
                })
        .catch((err)=>{
           console.log(err.response.data);
        })

    }

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % items.length;
    setItemOffset(newOffset);
  };

   const [openModal, setOpenModal] = useState(false);
    const [statementDetail, setStatementDetail] = useState({});
    const [delivered, setDelivered] = useState([]);
    const [pickups, setPickups] = useState([]);
    const [returns, setReturns] = useState([]);

    const viewPaymentStatement = async (statement_id) => {
      const res = await axios.get(`/partner/get/payment/statement/detail/${statement_id}`).catch((err) => {
          console.log(err)
      })
    setStatementDetail(await res.data.statement)
    setDelivered(await res.data.delivered)
    setReturns(await res.data.returns)
    setPickups(await res.data.pickups)
    openStatementModal();
    }

    const openStatementModal = () =>{
        setOpenModal(true);
    }
    const closeStatementModal = ()=>{
        setOpenModal(false);
        setStatementDetail({});
        setDelivered([]);
        setPickups([]);
        setReturns([]);
    }

    const downloadPdf = (statement_id) => {
        axios.get(`/partner/download/${statement_id}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
            console.log(err)
        })
    }

    const viewInvoicePdf = (invoice_id) => {
        console.log(invoice_id);
        const url = `/invoice/viewer/${invoice_id}`
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }

  return (
    <>
      <Items currentItems={currentItems} viewPaymentStatement={viewPaymentStatement}  viewInvoicePdf={viewInvoicePdf}/>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />


      <Modal show={openModal} onHide={closeStatementModal} size={'xl'} centered={true}>
                <Modal.Header >
                  <Modal.Title>{statementDetail.statement_num}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{overflowX: 'auto', width: '100%', height: '100%'}}>
                        <Table bordered hover size="sm" style={{width: 'max-content'}}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tex Code</th>
                          <th>Delivered Date</th>
                          <th>Customer Details</th>
                          <th>Destination</th>
                          <th>Delivery Charge</th>
                          <th>COD Received</th>
                          <th>Packet Name</th>
                        </tr>
                      </thead>
                      <tbody>
                      {Object.keys(delivered).length === 0 ? (
                          <></>
                      ): (
                          delivered.map((data, index) => {
                              return (
                                  <tr>
                                      <td>{index + 1}</td>
                                      <td>{data.tex_code}</td>
                                      <td>{data.delivered_date}</td>
                                      <td>{data.customer_name} - {data.customer_phone}</td>
                                      <td>{data.customer_address}</td>
                                      <td>Rs. {data.delivery_charge}</td>
                                      <td>Rs. {data.cod_received}</td>
                                      <td>{data.packet_name}</td>
                                  </tr>
                              )
                          })
                      )}
                      </tbody>
                    </Table>
                        <Table bordered hover size="sm" style={{width: 'max-content'}}>
                            <thead>
                                <tr>
                                    <th colSpan={8} style={{textAlign: 'center', background: 'gainsboro'}}>Returns & Cancellation</th>
                                </tr>
                            </thead>
                          <thead>
                            <tr>
                              <th>S.N</th>
                              <th>Tex Code</th>
                              <th>Return Date</th>
                              <th>Customer Details</th>
                              <th>Destination</th>
                              <th>COD</th>
                              <th>Packet Name</th>
                              <th>Return Charge</th>
                            </tr>
                          </thead>
                          <tbody>
                          {Object.keys(returns).length === 0 ? (
                              <tr>
                                  <td colSpan={8} style={{textAlign: 'center'}}>No returns</td>
                              </tr>
                          ): (
                              returns.map((data, index) => {
                                  return (
                                      <tr>
                                          <td>{index+1}</td>
                                          <td>{data.tex_code}</td>
                                          <td>{data.return_date}</td>
                                          <td>{data.customer_name} - {data.customer_phone}</td>
                                          <td>{data.customer_address}</td>
                                          <td>{data.cod}</td>
                                          <td>{data.packet_name}</td>
                                          <td>Rs. {data.return_charge}</td>
                                      </tr>
                                  )
                              })
                          )}
                          </tbody>
                        </Table>
                        <Table bordered hover size="sm" style={{width: 'max-content'}}>
                            <thead>
                            <tr>
                                <th colSpan={6} style={{textAlign: 'center', background: 'gainsboro'}}>Pickups</th>
                            </tr>
                            </thead>
                            <thead>
                            <tr>
                                <th>S.N</th>
                                <th>Request Code</th>
                                <th>Location</th>
                                <th>Request Date</th>
                                <th>Completed</th>
                                <th>Charge</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(returns).length === 0 ? (
                                 <tr>
                                  <td colSpan={6} style={{textAlign: 'center'}}>No Pickups</td>
                              </tr>
                            ): (
                                pickups.map((data, index) => {
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{data.request_code}</td>
                                            <td>{data.partner_address}</td>
                                            <td>{data.created_at}</td>
                                            <td>{data.completed}</td>
                                            <td>Rs. {
                                                data.completed > 3 ? 0 : data.completed*50
                                            }</td>
                                        </tr>
                                    )
                                })
                            )}
                            </tbody>
                        </Table>
                        <Table bordered hover size="sm" style={{width: 'max-content'}}>
                            <tbody>
                            <tr>
                                <td colSpan={4}></td>
                                <td>Total COD Amount</td>
                                <td style={{width: '120px'}}>Rs. {statementDetail.total_cod_received}</td>
                            </tr>
                            <tr>
                                <td rowSpan={7} colSpan={3} style={{minWidth:'200px',position: 'relative'}}>
                                    <span
                                        style={{fontWeight: 'bold',position: 'absolute',top: '10%',left: '25%'}}>{statementDetail.statement_num}</span>
                                </td>
                                <td rowSpan={2}>
                                </td>
                                <td>Total Delivery Charge</td>
                                <td>Rs. {statementDetail.total_delivery_charge}</td>
                            </tr>
                            <tr>
                                <td>Reimbursements</td>
                                <td>Rs. {statementDetail.reinbursement}</td>
                            </tr>
                            <tr>
                                <td rowSpan={2}>
                                </td>
                                <td>Return Charges</td>
                                <td>Rs. {statementDetail.return_deduction}</td>
                            </tr>
                            <tr>
                                <td>Add/ deduct from prev. Stat.</td>
                                <td>Rs. {statementDetail.prev_add_deduct}</td>
                            </tr>
                            <tr>
                                <td>Paid Date: {statementDetail.statement_date}</td>
                                <td>Total Pickup Charge</td>
                                <td>Rs. {statementDetail.total_pickup_charge}</td>
                            </tr>
                            <tr>
                                <td rowSpan={2}></td>
                                <td>Discount</td>
                                <td>Rs. {statementDetail.discount}</td>
                            </tr>
                            <tr>
                                <td>
                                    {statementDetail.payable >= 0 ? 'Total COD Transferable' : 'Total Receivable'}
                                </td>
                                <td>Rs. {statementDetail.payable}</td>
                            </tr>
                            <tr>
                                <td colSpan={4}></td>
                                <td>Total COD Transferred</td>
                                <td>Rs. {statementDetail.paid}</td>
                            </tr>
                            <tr>
                                <td colSpan={4}></td>
                                <td>To add/ deduct on next Stat.</td>
                                <td>Rs. {statementDetail.add_deduct}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Row style={{width:'100%'}}>
                        <Col lg={6}>
                            <Button variant="primary"  style={{borderRadius:'5px',width:'100%'}} onClick={() => downloadPdf(statementDetail.id)}>
                             Download PDF
                          </Button>
                        </Col>
                        <Col lg={6}>
                            <Button variant="secondary"  style={{backgroundColor:'red',border:'1px solid red',borderRadius:'5px',width:'100%'}} onClick={closeStatementModal}>
                             Close
                          </Button>
                        </Col>
                    </Row>

                </Modal.Footer>
        </Modal>

<div>
</div>


    </>
  );
}

export default StatementAndInvoices;
