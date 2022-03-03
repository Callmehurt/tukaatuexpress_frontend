import React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import Avatar from "react-avatar";
import moment from "moment";
import {AiFillEye} from "react-icons/ai";

const StatementAndInvoices = () => {
    return (
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
                                       <Avatar size="40" name={'Statement-1'}
                                               round={true}/>
                                   </div>
                              </Col>
                              <Col xs={10} style={{paddingLeft:'0px',paddingRight:'0px'}}>
                                  <div className="pt-2">
                                          <h6 className="mb-1" style={{fontSize:'15px'}}>Statement NUm<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}></span></h6>
                                      </div>
                                   <div>
                                          <Row>
                                              <Col xs={6}>
                                                   <span style={{fontSize:'14px'}}>Payment: Rs. 1500</span>
                                              </Col>
                                              <Col xs={6}>
                                                  <span style={{fontSize:'14px'}}>
                                                      {/*Date: {moment(list?.statement_date).format('L')}*/}
                                                      Date: 2021-05-05
                                                  </span>
                                              </Col>
                                              <Col xs={6} className="pt-1 pb-2" >
                                                   <Button variant="outline-secondary"><AiFillEye size={20} /> Statement</Button>
                                              </Col>
                                              <Col xs={6} className="pt-1 pb-2" >
                                                  <Button variant="outline-secondary"> <AiFillEye size={20} /> Invoices </Button>
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
    )
}

export default StatementAndInvoices;