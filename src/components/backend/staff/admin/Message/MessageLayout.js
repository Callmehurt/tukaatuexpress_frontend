import React, {useEffect, useState,useRef } from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import ReactModal from 'react-modal-resizable-draggable';
import * as moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import MessageSendSystem from "./MessageSendSystem";
import {RiCloseCircleLine} from 'react-icons/ri'
import axios from "axios";
import {getMessageDetail} from "../../../../../redux/actions/BranchOperation";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import showNotification from "../../../includes/notification";
import Avatar from "react-avatar";


const MessageLayout=(props)=>{
     const dispatch = useDispatch();
     const toggle= props.toggle;
     // const initialModal=(37+'%');
     const { innerWidth: width, innerHeight: height } = window;
     const branchOperation = useSelector((state) => state.branchOperation);
     const MessageDisplay = branchOperation.MessageDisplay;
     const [pickupID,setPickupID]=useState('');
      const messagesEndRef = useRef(null);
     const[closeMessage,setCloseMessage]=useState(false);
     // const[pickup_id,setPickup_id]=useState('');
    const scrollSpan= useRef();
     useEffect(()=>{
         let staffAdmin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staffAdmin){
          setAuthorizationToken(staffAdmin.token);
        }
        console.log(props.pickupID);
        console.log('pickup ID');
        getMessage(props.pickupID);
        // getLoadId();
        scrollToBottom();
        // if (messagesEndRef) {
        //   messagesEndRef.current.addEventListener('DOMNodeInserted', event => {
        //     const { currentTarget: target } = event;
        //     target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        //   });
        // }
       // scrollSpan.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

     },[props.pickupID]);
      // const ref = React.createRef<HTMLDivElement>();
    // const getLoadId=()=>{
    //
    // }
    const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
  }

     const getMessage=(pickup_id)=>{
           // setPickup_id(data);
           console.log(pickup_id+'pickupId');
           console.log('get message')
            // if(pickup_id){
            //     axios.get(`/admin/get/pickup/comment/${pickup_id}`)
            //         .then((res)=>{
            //               console.log(res);
            //              // showNotification('success', res.data.message);
            //               dispatch(getMessageDetail(res.data));
            //         })
            //     .catch((err)=>{
            //        console.log(err.response);
            //     })
            //
            // }
            // else{
            //     console.log('no pickup_id')
            // }


    }

    return(
        <>

            <ReactModal {...props}
                    initWidth={320}
                    initHeight={400}
                    onFocus={() => console.log("Modal is clicked")}
                    className={"message_modal"}
                    onRequestClose={closeMessage}
                    top={height-410}
                    left={width-400}
                    isOpen={props.show}
            >
                <div style={{position:'absolute',top:'0px',display:'grid',placeContent:'center',height:'50px',paddingLeft:'10px',zIndex:'5',width:'100%'}}>
                    <Row style={{width:'320px'}}>
                        <Col lg={8}>
                            <h6 className="pt-2"><span> <Avatar size="30" name={MessageDisplay[0]?.productname}  round={true}/></span> <span className="pl-2" style={{fontSize:'14px'}}>{ MessageDisplay[0]?.texcode }</span></h6>
                        </Col>
                         <Col lg={2}>
                            {/*<h6>My Modal{pickupID}</h6>*/}
                        </Col>
                        <Col lg={2}>
                            <Button onClick={()=>toggle(false)} style={{zIndex:'5',padding:'5px'}}><RiCloseCircleLine /></Button>
                        </Col>
                    </Row>
                </div>
                <div className="body" ref={messagesEndRef}  id="messageBoxLayout" style={{flexBasis:'0px',display:'flex',flexDirection:'column',overflowY:'auto'}}>
                    {/*<div style={{display:'flex',flexDirection:'column-reverse'}}>*/}
                         { MessageDisplay.map((messageList)=>(
                             <>

                                 {
                                    (() => {
                                       if (messageList.partner_id!=null){
                                            return (
                                                <>
                                                    <Row>

                                                        <Col xs={8}>

                                                            <div className="ml-2 pt-2">
                                                                <p className="mb-0" style={{backgroundColor:'#afa6ed',color:'#161616',marginLeft:'7px',borderRadius:'20px',padding:'5px 9px',lineHeight:'20px',fontSize:'14px'}}><span>{messageList.message}</span><br /><span style={{fontSize:'12px'}}>{moment(messageList.created_at).format("ddd, MMM Do YYYY, h:mm A")}</span></p>
                                                                <p style={{color:'#161616',marginLeft:'7px',borderRadius:'20px',padding:'0px 9px',lineHeight:'15px',fontSize:'12px'}}>From Partner</p>

                                                            </div>
                                                       </Col>
                                                        <Col xs={4}>

                                                        </Col>
                                                    </Row>
                                                </>
                                            );
                                       }

                                       if (messageList.delivery_person!=null) {
                                           return (
                                                <>
                                                    <Row>

                                                    <Col xs={8}>

                                                        <div className="ml-2 pt-2">
                                                            <p className="mb-0" style={{backgroundColor:'#afa6ed',color:'#161616',marginLeft:'7px',borderRadius:'20px',padding:'5px 9px',lineHeight:'20px',fontSize:'14px'}}><span>{messageList.message}</span><br /><span style={{fontSize:'12px'}}>{moment(messageList.created_at).format("ddd, MMM Do YYYY, h:mm A")}</span></p>
                                                            <p style={{color:'#161616',marginLeft:'7px',borderRadius:'20px',padding:'0px 9px',lineHeight:'15px',fontSize:'12px'}}>From Delivery Person</p>

                                                        </div>
                                                   </Col>
                                                    <Col xs={4}>

                                                    </Col>
                                                    </Row>
                                                </>
                                            );
                                       }
                                       if(messageList.branch_staff!=null){
                                            return (
                                                <>
                                                    <Row>
                                                      <Col xs={4}>

                                                      </Col>
                                                      <Col xs={8}>

                                                        <div className="ml-2 pt-2">
                                                            <p className="mb-0" style={{backgroundColor:'#afa6ed',color:'#161616',marginLeft:'7px',borderRadius:'20px',padding:'5px 9px',lineHeight:'20px',fontSize:'14px'}}><span>{messageList.message}</span><br /><span style={{fontSize:'12px'}}>{moment(messageList.created_at).format("ddd, MMM Do YYYY, h:mm A")}</span></p>
                                                            <p style={{color:'#161616',marginLeft:'7px',borderRadius:'20px',padding:'0px 9px',lineHeight:'15px',fontSize:'12px'}}>From Texos</p>

                                                        </div>
                                                      </Col>

                                                    </Row>
                                                </>
                                            );

                                       }
                                       else{
                                           return (
                                                <>
                                                    <Row>
                                                     <Col xs={2}>
                                                     </Col>
                                                    <Col xs={8}>

                                                        <div className="ml-2 pt-2" >
                                                            <p className="mb-0" style={{backgroundColor:'#dad6fd',color:'#161616',marginLeft:'7px',borderRadius:'20px',padding:'5px 9px',lineHeight:'20px',fontSize:'14px',textAlign:'center'}}><span>{messageList.message}</span><br /><span style={{fontSize:'12px'}}>{moment(messageList.created_at).format("ddd, MMM Do YYYY, h:mm A")}</span></p>
                                                            {/*<p style={{color:'#161616',marginLeft:'7px',borderRadius:'20px',padding:'0px 9px',lineHeight:'15px',fontSize:'12px'}}>From Tukaatu Express System</p>*/}

                                                        </div>
                                                   </Col>
                                                    <Col xs={2}>
                                                     </Col>
                                                        </Row>

                                                </>
                                            );
                                       }
                                    })()
                                  }
                             </>
                         ))}
                    {/*</div>*/}

                   {/*<div ref={messagesEndRef} />*/}
                </div>
                <MessageSendSystem />
            </ReactModal>
        </>
    );
}
export default MessageLayout