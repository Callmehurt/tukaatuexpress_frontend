import React, {useEffect,useState} from 'react';
import {Row, Col, Card, Image, Form} from 'react-bootstrap';
import logoImage from './../../../logo.svg';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import {VendorAllDeliveries} from "../../../redux/actions/vendor";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {allMessageList} from './../../../redux/actions/vendor'
import {useDispatch, useSelector} from "react-redux";
import useWindowSize from "../../../use-window-size";
import Fuse from "fuse.js";
import Avatar from "react-avatar";
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

const MessageList=()=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const vendor = useSelector((state) => state.vendor);
    const allMessageLists = vendor.allMessageList;
    const [allMessages,setAllMessages]=useState('');
    // const [deliveryChatList,setDeliveryChatList]=useState('');

    useEffect(()=>{
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        // console.log(staff_admin);
        if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }
        getAllList();
        console.log(allMessages);
        console.log("allMessages");
        // console.log(deliveryChatList);
    },[0]);
    const [query, setQuery] = useState("");
    const [messageListSearch,setMessageListSearch]=useState('');
     const fuse = new Fuse(allMessages, options);
      const results = fuse.search(query);
      const characterResults = query
        ? results.map((character) => character.item)
        : allMessages;
      const onSearch = ({ currentTarget })=>{
       setQuery(currentTarget.value);
       console.log(currentTarget.value);
    }
    const getAllList=()=>{
        axios.get('/partner/get/pickup/comment')
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                dispatch(allMessageList(res.data));
                let messageResData=res.data;
                let MessageOnlyFromResData=[];
                messageResData.map((items)=>{
                    MessageOnlyFromResData.push(items.message);
                })
                setAllMessages(MessageOnlyFromResData);
            })
            .catch((err)=>{
               console.log(err.response.data);
            })
    }
    const getMessageDetail=(id)=>{
        console.log(id);
        history.push({
           pathname: '/vendor/message_detail',
           state: {messageID: id }
       });
    }
    const windowsSize = useWindowSize();
  const isMobile=576;
  console.log(windowsSize);
  if (windowsSize.width<=isMobile) {
      return (
          <>
              <div style={{height: '80vh', overflowY: 'auto', overflowX: 'hidden'}}>
                  <Row>
                      <Col xs={12}>
                           <div className="pt-2 ">
                              <Card style={{borderRadius:'30px',border:'none'}}>
                                  <Card.Body className="p-2">
                                       <Form className="search">
                                           <Form.Control type="text" value={query} placeholder="Search all orders ..." onChange={onSearch} style={{borderRadius:'15px',}} />
                                          {/*<input type="text" value={query} onChange={onSearch} />*/}
                                      </Form>
                                  </Card.Body>
                              </Card>

                            {/*<ReactDashboardMainSearch />*/}
                          </div>
                         </Col>
                      {/*{allMessageLists?*/}
                      {/*<>*/}
                      {/*</>:*/}
                      {/*<>*/}
                      {/*</>*/}
                      {/*}*/}
                      {query.length>0?
                          <>
                              {
                                  characterResults.length?
                                      <>
                                          <Col lg={12} style={{paddingLeft:'10px',paddingRight:'10px',paddingBottom:'7px',paddingTop:'5px'}}>
                                             <div>
                                  {characterResults.map((character) => {
                                      const {packet_name, type, customer_phone, cod,tex_code,customer_name} = character;
                                      return (
                                          <>
                                              <Card onClick={(e)=>{e.preventDefault();getMessageDetail(character.id)}}>
                                                      <Card.Body className="p-0">
                                                          <Row>
                                                              <Col xs={3} className="pl-0 pr-0">
                                                                   <div style={{
                                                                                       display: 'grid',
                                                                                       placeContent: 'center',
                                                                                       alignItems: 'center',
                                                                                       height: '55px'
                                                                                   }}>
                                                                                       <Avatar size="40" name={character.packet_name}
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
                                           </Col>

                                      </>:
                                      <>
                                           <Col xs={12}>
                                             <div style={{height:'60vh',display:'grid',placeContent:'center',fontSize:'16px',fontWeight:'500'}}>No Orders Here...</div>
                                            </Col>

                                      </>
                              }
                          </>:
                          <>
                          </>
                      }
                      {query.length?
                          <>
                          </> :
                          <>
                              {allMessageLists.map((chatList, index) => (
                                <>
                                   <Col lg={12}>
                                  {/*<a onclick={(e)=>{e.preventDefault();getMessageDetail(2);}}>*/}
                                  <div>
                                      <Card onClick={(e) => {
                                          e.preventDefault();
                                          getMessageDetail(chatList.message?.pickup_id);
                                      }}>
                                          <Card.Body className="p-0">
                                              <Row>
                                                  <Col xs={3} className="pl-0 pr-0">
                                                      <div style={{
                                                                                       display: 'grid',
                                                                                       placeContent: 'center',
                                                                                       alignItems: 'center',
                                                                                       height: '55px'
                                                                                   }}>
                                                                                       <Avatar size="40" name={chatList.message?.packet_name}
                                                                                               round={true}/>
                                                                                   </div>
                                                  </Col>
                                                  <Col xs={9} style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                      <div className="pt-2">
                                                          <h6 className="mb-1">{chatList.message?.tex_code}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}>(COD Rs.{chatList.message?.cod})</span></h6>

                                                      </div>
                                                      <div>
                                                          <Row>
                                                             <Col xs={6}>
                                                               {/*<span style={{fontSize:'15px'}}>{ chatList.customer_name.length>13 ? <><span>{chatList.customer_name.substring(0,13)}...</span></>: <><span>{chatList.customer_name}</span></> }</span>*/}
                                                             </Col>
                                                             <Col xs={6}>
                                                              <span style={{fontSize:'14px'}}>Status: {chatList.message?.status}</span>
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
                                  </div>
                                  {/*</a>*/}
                              </Col>
                                 </>
                               ))}
                          </>
                      }

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
  else{
       return (
          <>
              <div style={{height: '80vh', overflowY: 'auto', overflowX: 'hidden'}}>
                  <Row>
                      <Col xs={12}>
                           <div className="pt-2 ">
                              <Card style={{borderRadius:'30px',border:'none'}}>
                                  <Card.Body className="p-2">
                                       <Form className="search">
                                           <Form.Control type="text" value={query} placeholder="Search all orders ..." onChange={onSearch} style={{borderRadius:'15px',}} />
                                          {/*<input type="text" value={query} onChange={onSearch} />*/}
                                      </Form>
                                  </Card.Body>
                              </Card>

                            {/*<ReactDashboardMainSearch />*/}
                          </div>
                         </Col>
                      {/*{allMessageLists?*/}
                      {/*<>*/}
                      {/*</>:*/}
                      {/*<>*/}
                      {/*</>*/}
                      {/*}*/}
                      {query.length>0?
                          <>
                              {
                                  characterResults.length?
                                      <>
                                          <Col lg={12} style={{paddingLeft:'10px',paddingRight:'10px',paddingBottom:'7px',paddingTop:'5px'}}>
                                             <div>
                                  {characterResults.map((character) => {
                                      const {packet_name, type, customer_phone, cod,tex_code,customer_name} = character;
                                      return (
                                          <>
                                              <Card onClick={(e)=>{e.preventDefault();getMessageDetail(character.id)}}>
                                                      <Card.Body className="p-0">
                                                          <Row>
                                                              <Col lg={2} className="pl-0 pr-0">
                                                                   <div style={{
                                                                       display: 'grid',
                                                                       placeContent: 'center',
                                                                       alignItems: 'center',
                                                                       height: '55px'
                                                                   }}>
                                                                       <Avatar size="40" name={character.packet_name}
                                                                               round={true}/>
                                                                   </div>
                                                              </Col>
                                                              <Col lg={10} style={{paddingLeft: '0px', paddingRight: '0px'}}>
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
                                           </Col>

                                      </>:
                                      <>
                                           <Col xs={12}>
                                             <div style={{height:'60vh',display:'grid',placeContent:'center',fontSize:'16px',fontWeight:'500'}}>No Orders Here...</div>
                                            </Col>

                                      </>
                              }
                          </>:
                          <>
                          </>
                      }
                      {query.length?
                          <>
                          </> :
                          <>
                              {allMessageLists.map((chatList, index) => (
                                <>
                                   <Col lg={12}>
                                  {/*<a onclick={(e)=>{e.preventDefault();getMessageDetail(2);}}>*/}
                                  <div>
                                      <Card onClick={(e) => {
                                          e.preventDefault();
                                          getMessageDetail(chatList.message?.pickup_id);
                                      }}>
                                          <Card.Body className="p-0">
                                              <Row>
                                                  <Col lg={2} className="pl-0 pr-0">
                                                                      <div style={{
                                                                                       display: 'grid',
                                                                                       placeContent: 'center',
                                                                                       alignItems: 'center',
                                                                                       height: '55px'
                                                                                   }}>
                                                                                       <Avatar size="40" name={chatList.message?.packet_name}
                                                                                               round={true}/>
                                                                                   </div>                                                  </Col>
                                                  <Col xs={10} style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                      <div className="pt-2">
                                                          <h6 className="mb-1">{chatList.message?.tex_code}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}>(COD Rs.{chatList.message?.cod})</span></h6>

                                                      </div>
                                                      <div>
                                                          <Row>
                                                             <Col xs={6}>
                                                               <span style={{fontSize:'15px'}}>{ chatList.message?.message.length>45 ? <><span>{chatList.message?.message.substring(0,45)}...</span></>: <><span>{chatList.message?.message}</span></> }</span>
                                                             </Col>
                                                             <Col xs={6}>
                                                              <span style={{fontSize:'14px'}}>Status: {chatList.message?.status}</span>
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
                                  </div>
                                  {/*</a>*/}
                              </Col>
                                 </>
                               ))}
                          </>
                      }

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
}
export default MessageList