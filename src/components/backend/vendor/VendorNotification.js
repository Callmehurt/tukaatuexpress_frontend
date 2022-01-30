import React,{useEffect} from 'react';
import {Card, Col, Image, Row} from "react-bootstrap";
import logoImage from "../../../logo.svg";
import {useHistory} from "react-router-dom";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {pendingOrderList} from "../../../redux/actions/vendor";

const VendorNotification=()=>{
    useEffect(()=>{
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        console.log(vendorDetail);
        // console.log('staff_admin');
        console.log('hello use');
        if (vendorDetail) {
            setAuthorizationToken(vendorDetail.token);
        }
        getNotificationList();
    });

     const history = useHistory();
    const arrayNotification=[
        {id:'0',packet_name:'Gift',tex_code:'tex_000056'},
        {id:'1',packet_name:'Gift',tex_code:'tex_000057'},
        {id:'2',packet_name:'Gift',tex_code:'tex_000058'},
        {id:'3',packet_name:'Gift',tex_code:'tex_000059'},
        {id:'4',packet_name:'Gift',tex_code:'tex_000060'},
        {id:'5',packet_name:'Gift',tex_code:'tex_000061'},
    ];
    const getNotificationList=()=>{
        axios.get('/partner/notifications')
            .then((res) => {
                console.log(res);
                console.log(res.data);
                console.log(res.data[0].data.tex_code);
                 console.log('data check');
                 // dispatch(pendingOrderList(res.data));
            })
            .catch((err) => {
                console.log(err.response);
            })
    }
    const getMessageDetail=(id)=>{
        console.log(id);
        history.push({
           pathname: '/vendor/pickup_detail',
           state: {pickupID: id }
       });

    }

    return(
        <>
            {/*<h6>Vendor Notification</h6>*/}
            <div style={{height:'80vh',overflowY:'auto',overflowX:'hidden'}}>
                    <Row>
                        { arrayNotification.map((arrayNotification,index)=>(
                            <>
                            <Col lg={12}>
                                {/*<a onclick={(e)=>{e.preventDefault();getMessageDetail(2);}}>*/}

                                <div>

                                   <Card onClick={(e)=>{e.preventDefault();getMessageDetail(arrayNotification.id)}}>
                                      <Card.Body className="p-0">
                                          <Row>
                                              <Col xs={3} className="pl-0 pr-0">
                                                  <Image src={logoImage} roundedCircle />
                                              </Col>
                                              <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>
                                                  <div className="pt-2">
                                                      <h6 className="mb-1">{arrayNotification.packet_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({arrayNotification.tex_code})</span></h6>
                                                  </div>
                                                   <div>
                                                       <p style={{fontSize:'15px'}}>Recent Message Show</p>

                                                  </div>
                                                  {/*<div>*/}
                                                  {/*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*/}

                                                  {/*</div>*/}
                                                  {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                              </Col>
                                          </Row>
                                      </Card.Body>
                                   </Card>
                                </div>
                                {/*</a>*/}
                            </Col>
                            </>
                            ))  }
                        {/*<Col lg={12}>*/}
                        {/*    /!*<a onclick={(e)=>{e.preventDefault();getMessageDetail(2);}}>*!/*/}

                        {/*    <div>*/}

                        {/*       <Card onClick={(e)=>{e.preventDefault();getMessageDetail(1)}}>*/}
                        {/*          <Card.Body className="p-0">*/}
                        {/*              <Row>*/}
                        {/*                  <Col xs={3} className="pl-0 pr-0">*/}
                        {/*                      <Image src={logoImage} roundedCircle />*/}
                        {/*                  </Col>*/}
                        {/*                  <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                        {/*                      <div className="pt-2">*/}
                        {/*                          <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                        {/*                      </div>*/}
                        {/*                       <div>*/}
                        {/*                           <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                        {/*                      </div>*/}
                        {/*                      /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                        {/*                  </Col>*/}
                        {/*              </Row>*/}
                        {/*          </Card.Body>*/}
                        {/*       </Card>*/}
                        {/*    </div>*/}
                        {/*    /!*</a>*!/*/}
                        {/*</Col>*/}
                    {/*    <Col lg={12}>*/}
                    {/*        <div>*/}
                    {/*           <Card onClick={(e)=>{e.preventDefault();getMessageDetail(2)}}>*/}
                    {/*              <Card.Body className="p-0">*/}
                    {/*                  <Row>*/}
                    {/*                      <Col xs={3} className="pl-0 pr-0">*/}
                    {/*                          <Image src={logoImage} roundedCircle />*/}
                    {/*                      </Col>*/}
                    {/*                      <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                    {/*                          <div className="pt-2">*/}
                    {/*                              <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                    {/*                          </div>*/}
                    {/*                           <div>*/}
                    {/*                               <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                    {/*                          </div>*/}
                    {/*                          /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                    {/*                      </Col>*/}
                    {/*                  </Row>*/}
                    {/*              </Card.Body>*/}
                    {/*           </Card>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*   <Col lg={12}>*/}
                    {/*        <div>*/}
                    {/*           <Card onClick={(e)=>{e.preventDefault();getMessageDetail(3)}}>*/}
                    {/*              <Card.Body className="p-0">*/}
                    {/*                  <Row>*/}
                    {/*                      <Col xs={3} className="pl-0 pr-0">*/}
                    {/*                          <Image src={logoImage} roundedCircle />*/}
                    {/*                      </Col>*/}
                    {/*                      <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                    {/*                          <div className="pt-2">*/}
                    {/*                              <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                    {/*                          </div>*/}
                    {/*                           <div>*/}
                    {/*                               <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                    {/*                          </div>*/}
                    {/*                          /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                    {/*                      </Col>*/}
                    {/*                  </Row>*/}
                    {/*              </Card.Body>*/}
                    {/*           </Card>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col lg={12}>*/}
                    {/*        <div>*/}
                    {/*           <Card onClick={(e)=>{e.preventDefault();getMessageDetail(4)}}>*/}
                    {/*              <Card.Body className="p-0">*/}
                    {/*                  <Row>*/}
                    {/*                      <Col xs={3} className="pl-0 pr-0">*/}
                    {/*                          <Image src={logoImage} roundedCircle />*/}
                    {/*                      </Col>*/}
                    {/*                      <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                    {/*                          <div className="pt-2">*/}
                    {/*                              <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                    {/*                          </div>*/}
                    {/*                           <div>*/}
                    {/*                               <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                    {/*                          </div>*/}
                    {/*                          /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                    {/*                      </Col>*/}
                    {/*                  </Row>*/}
                    {/*              </Card.Body>*/}
                    {/*           </Card>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col lg={12}>*/}
                    {/*        <div>*/}
                    {/*           <Card onClick={(e)=>{e.preventDefault();getMessageDetail(5)}}>*/}
                    {/*              <Card.Body className="p-0">*/}
                    {/*                  <Row>*/}
                    {/*                      <Col xs={3} className="pl-0 pr-0">*/}
                    {/*                          <Image src={logoImage} roundedCircle />*/}
                    {/*                      </Col>*/}
                    {/*                      <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                    {/*                          <div className="pt-2">*/}
                    {/*                              <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                    {/*                          </div>*/}
                    {/*                           <div>*/}
                    {/*                               <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                    {/*                          </div>*/}
                    {/*                          /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                    {/*                      </Col>*/}
                    {/*                  </Row>*/}
                    {/*              </Card.Body>*/}
                    {/*           </Card>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col lg={12}>*/}
                    {/*        <div>*/}
                    {/*           <Card onClick={(e)=>{e.preventDefault();getMessageDetail(6)}}>*/}
                    {/*              <Card.Body className="p-0">*/}
                    {/*                  <Row>*/}
                    {/*                      <Col xs={3} className="pl-0 pr-0">*/}
                    {/*                          <Image src={logoImage} roundedCircle />*/}
                    {/*                      </Col>*/}
                    {/*                      <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                    {/*                          <div className="pt-2">*/}
                    {/*                              <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                    {/*                          </div>*/}
                    {/*                           <div>*/}
                    {/*                               <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                    {/*                          </div>*/}
                    {/*                          /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                    {/*                      </Col>*/}
                    {/*                  </Row>*/}
                    {/*              </Card.Body>*/}
                    {/*           </Card>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col lg={12}>*/}
                    {/*        <div>*/}
                    {/*           <Card onClick={(e)=>{e.preventDefault();getMessageDetail(7)}}>*/}
                    {/*              <Card.Body className="p-0">*/}
                    {/*                  <Row>*/}
                    {/*                      <Col xs={3} className="pl-0 pr-0">*/}
                    {/*                          <Image src={logoImage} roundedCircle />*/}
                    {/*                      </Col>*/}
                    {/*                      <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                    {/*                          <div className="pt-2">*/}
                    {/*                              <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                    {/*                          </div>*/}
                    {/*                           <div>*/}
                    {/*                               <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                    {/*                          </div>*/}
                    {/*                          /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                    {/*                      </Col>*/}
                    {/*                  </Row>*/}
                    {/*              </Card.Body>*/}
                    {/*           </Card>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col lg={12}>*/}
                    {/*        <div>*/}
                    {/*           <Card onClick={(e)=>{e.preventDefault();getMessageDetail(8)}}>*/}
                    {/*              <Card.Body className="p-0">*/}
                    {/*                  <Row>*/}
                    {/*                      <Col xs={3} className="pl-0 pr-0">*/}
                    {/*                          <Image src={logoImage} roundedCircle />*/}
                    {/*                      </Col>*/}
                    {/*                      <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                    {/*                          <div className="pt-2">*/}
                    {/*                              <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                    {/*                          </div>*/}
                    {/*                           <div>*/}
                    {/*                               <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                    {/*                          </div>*/}
                    {/*                          /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                    {/*                      </Col>*/}
                    {/*                  </Row>*/}
                    {/*              </Card.Body>*/}
                    {/*           </Card>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col lg={12}>*/}
                    {/*        <div>*/}
                    {/*           <Card onClick={(e)=>{e.preventDefault();getMessageDetail(9)}}>*/}
                    {/*              <Card.Body className="p-0">*/}
                    {/*                  <Row>*/}
                    {/*                      <Col xs={3} className="pl-0 pr-0">*/}
                    {/*                          <Image src={logoImage} roundedCircle />*/}
                    {/*                      </Col>*/}
                    {/*                      <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                    {/*                          <div className="pt-2">*/}
                    {/*                              <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                    {/*                          </div>*/}
                    {/*                           <div>*/}
                    {/*                               <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                    {/*                          </div>*/}
                    {/*                          /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                    {/*                      </Col>*/}
                    {/*                  </Row>*/}
                    {/*              </Card.Body>*/}
                    {/*           </Card>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col lg={12}>*/}
                    {/*        <div>*/}
                    {/*           <Card onClick={(e)=>{e.preventDefault();getMessageDetail(10)}}>*/}
                    {/*              <Card.Body className="p-0">*/}
                    {/*                  <Row>*/}
                    {/*                      <Col xs={3} className="pl-0 pr-0">*/}
                    {/*                          <Image src={logoImage} roundedCircle />*/}
                    {/*                      </Col>*/}
                    {/*                      <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                    {/*                          <div className="pt-2">*/}
                    {/*                              <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                    {/*                          </div>*/}
                    {/*                           <div>*/}
                    {/*                               <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                    {/*                          </div>*/}
                    {/*                          /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                    {/*                      </Col>*/}
                    {/*                  </Row>*/}
                    {/*              </Card.Body>*/}
                    {/*           </Card>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col lg={12}>*/}
                    {/*    <div>*/}
                    {/*       <Card onClick={(e)=>{e.preventDefault();getMessageDetail(11)}}>*/}
                    {/*          <Card.Body className="p-0">*/}
                    {/*              <Row>*/}
                    {/*                  <Col xs={3} className="pl-0 pr-0">*/}
                    {/*                      <Image src={logoImage} roundedCircle />*/}
                    {/*                  </Col>*/}
                    {/*                  <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                    {/*                      <div className="pt-2">*/}
                    {/*                          <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                    {/*                      </div>*/}
                    {/*                       <div>*/}
                    {/*                           <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                    {/*                      </div>*/}
                    {/*                      /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                    {/*                  </Col>*/}
                    {/*              </Row>*/}
                    {/*          </Card.Body>*/}
                    {/*       </Card>*/}
                    {/*    </div>*/}
                    {/*</Col>*/}
                    {/*    <Col lg={12}>*/}
                    {/*    <div>*/}
                    {/*       <Card onClick={(e)=>{e.preventDefault();getMessageDetail(2)}}>*/}
                    {/*          <Card.Body className="p-0">*/}
                    {/*              <Row>*/}
                    {/*                  <Col xs={3} className="pl-0 pr-0">*/}
                    {/*                      <Image src={logoImage} roundedCircle />*/}
                    {/*                  </Col>*/}
                    {/*                  <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                    {/*                      <div className="pt-2">*/}
                    {/*                          <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                    {/*                      </div>*/}
                    {/*                       <div>*/}
                    {/*                           <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                    {/*                      </div>*/}
                    {/*                      /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                    {/*                  </Col>*/}
                    {/*              </Row>*/}
                    {/*          </Card.Body>*/}
                    {/*       </Card>*/}
                    {/*    </div>*/}
                    {/*</Col>*/}
                    {/*    <Col lg={12}>*/}
                    {/*    <div>*/}
                    {/*       <Card onClick={(e)=>{e.preventDefault();getMessageDetail(2)}}>*/}
                    {/*          <Card.Body className="p-0">*/}
                    {/*              <Row>*/}
                    {/*                  <Col xs={3} className="pl-0 pr-0">*/}
                    {/*                      <Image src={logoImage} roundedCircle />*/}
                    {/*                  </Col>*/}
                    {/*                  <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                    {/*                      <div className="pt-2">*/}
                    {/*                          <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                    {/*                      </div>*/}
                    {/*                       <div>*/}
                    {/*                           <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                    {/*                      </div>*/}
                    {/*                      /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                    {/*                  </Col>*/}
                    {/*              </Row>*/}
                    {/*          </Card.Body>*/}
                    {/*       </Card>*/}
                    {/*    </div>*/}
                    {/*</Col>*/}
                    {/*    <Col lg={12}>*/}
                    {/*    <div>*/}
                    {/*       <Card onClick={(e)=>{e.preventDefault();getMessageDetail(2)}}>*/}
                    {/*          <Card.Body className="p-0">*/}
                    {/*              <Row>*/}
                    {/*                  <Col xs={3} className="pl-0 pr-0">*/}
                    {/*                      <Image src={logoImage} roundedCircle />*/}
                    {/*                  </Col>*/}
                    {/*                  <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                    {/*                      <div className="pt-2">*/}
                    {/*                          <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                    {/*                      </div>*/}
                    {/*                       <div>*/}
                    {/*                           <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                    {/*                      </div>*/}
                    {/*                      /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                    {/*                  </Col>*/}
                    {/*              </Row>*/}
                    {/*          </Card.Body>*/}
                    {/*       </Card>*/}
                    {/*    </div>*/}
                    {/*</Col>*/}
                    {/*    <Col lg={12}>*/}
                    {/*    <div>*/}
                    {/*       <Card onClick={(e)=>{e.preventDefault();getMessageDetail(2)}}>*/}
                    {/*          <Card.Body className="p-0">*/}
                    {/*              <Row>*/}
                    {/*                  <Col xs={3} className="pl-0 pr-0">*/}
                    {/*                      <Image src={logoImage} roundedCircle />*/}
                    {/*                  </Col>*/}
                    {/*                  <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                    {/*                      <div className="pt-2">*/}
                    {/*                          <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                    {/*                      </div>*/}
                    {/*                       <div>*/}
                    {/*                           <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                    {/*                      </div>*/}
                    {/*                      /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                    {/*                  </Col>*/}
                    {/*              </Row>*/}
                    {/*          </Card.Body>*/}
                    {/*       </Card>*/}
                    {/*    </div>*/}
                    {/*</Col>*/}
                    {/*    <Col lg={12}>*/}
                    {/*    <div>*/}
                    {/*       <Card onClick={(e)=>{e.preventDefault();getMessageDetail(2)}}>*/}
                    {/*          <Card.Body className="p-0">*/}
                    {/*              <Row>*/}
                    {/*                  <Col xs={3} className="pl-0 pr-0">*/}
                    {/*                      <Image src={logoImage} roundedCircle />*/}
                    {/*                  </Col>*/}
                    {/*                  <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                    {/*                      <div className="pt-2">*/}
                    {/*                          <h6 className="mb-1">Gazabko Online Shopping</h6>*/}
                    {/*                      </div>*/}
                    {/*                       <div>*/}
                    {/*                           <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                    {/*                      </div>*/}
                    {/*                      /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                    {/*                  </Col>*/}
                    {/*              </Row>*/}
                    {/*          </Card.Body>*/}
                    {/*       </Card>*/}
                    {/*    </div>*/}
                    {/*</Col>*/}


                    </Row>

            </div>
        </>
    )
}

export default VendorNotification