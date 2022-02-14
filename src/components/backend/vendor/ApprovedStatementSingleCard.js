import React, {useState} from "react";
import {Card, Button, Modal, Row, Col, Table} from 'react-bootstrap';
import axios from "axios";
import notification from "../includes/notification";

const ApprovedStatementSingleCard = (props) => {

    const [openModal, setOpenModal] = useState(false);
    const [returns, setReturns] = useState([]);
    const [statement, setStatement] = useState({});

    const onClickModal = () =>{
        setOpenModal(true);
    }
    const onCloseModal = ()=>{
        setOpenModal(false);
        setTimeout(() => {
            setStatement({});
            setReturns([]);
        }, 1500)
    }

    const viewStatement = (statement_id) => {
        onClickModal();
        fetchReturnDetails(statement_id);
    }

    const fetchReturnDetails = async (statement_id) => {
        const res = await axios.get(`/partner/view/return/statement/${statement_id}`).catch((err) => {
            console.log(err)
        })
        setReturns(res?.data.returns);
        setStatement(res?.data.statement);
    }

    return (
        <>
           <Card style={{ width: '100%', marginBottom: '10px' }}>
              <Card.Body>
                <Card.Title>{props.item.statement_num}</Card.Title>
                <Card.Text>
                    <strong>Packets:</strong> {props.item.returns.split(',').length}
                    <br/>
                    <strong>Approved Date:</strong> {props.item.approved_date}
                </Card.Text>
                <button className={'btn btn-sm btn-primary'} onClick={() => viewStatement(props.item.id)}>View</button>
              </Card.Body>
            </Card>

              <Modal show={openModal} onHide={onCloseModal} size={'lg'} centered={true}>
                <Modal.Header >
                  <Modal.Title>{statement.statement_num}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{overflowX: 'auto'}}>
                        <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tex Code</th>
                          <th>Customer Details</th>
                          <th>Destination</th>
                          <th>Returned Date</th>
                          <th>Return Charge</th>
                        </tr>
                      </thead>
                      <tbody>
                      {Object.keys(returns).length === 0 ? (
                              <tr>
                                  <td colSpan={6} className='text-center'>Loading...</td>
                              </tr>
                          ): (
                              <>
                                  {returns.map((data, index) => {
                                     return (
                                         <tr key={data.tex_code}>
                                            <td>{index+1}</td>
                                            <td>{data.tex_code}</td>
                                            <td>{data.customer_name} - {data.customer_phone}</td>
                                            <td>{data.customer_address}</td>
                                            <td>{data.delivery_id === null ? data.updated_at : data.prompt_date}</td>
                                            <td>Rs. {data.return_charge}</td>
                                        </tr>
                                     )
                                  })}

                            <tr>
                                <td></td>
                              <td colSpan={4}><strong>Total</strong></td>
                              <td>
                                  <strong>Rs. {
                                      returns.reduce((total, obj) => parseInt(obj.return_charge) + total, 0)
                                  }
                                  </strong>
                              </td>
                            </tr>
                              </>
                          )}
                      </tbody>
                    </Table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Row style={{width:'100%'}}>
                        <Col lg={12}>
                           <Button variant="secondary"  style={{backgroundColor:'red',border:'1px solid red',borderRadius:'5px',width:'100%'}} onClick={onCloseModal}>
                             Close
                          </Button>
                        </Col>
                    </Row>

                </Modal.Footer>
        </Modal>
        </>
    )
}

export default ApprovedStatementSingleCard;