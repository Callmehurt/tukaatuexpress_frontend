import React, {useState,useEffect} from 'react';
import {useLocation} from "react-router-dom";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {Row,Col} from 'react-bootstrap';
import {getMessageDetail} from './../../../redux/actions/vendor';
import {useDispatch, useSelector} from "react-redux";
import MessageSend from "./MessageSend";
import ScrollToBottom,{useScrollToBottom,useSticky} from 'react-scroll-to-bottom';

import * as moment from 'moment'

const MessageDetail=()=>{
    const dispatch = useDispatch();
    const location = useLocation();
    const scrollToBottom = useScrollToBottom();
      const [sticky] = useSticky();
    const vendor = useSelector((state) => state.vendor);
    const pickupMessageDetail = vendor.pickupMessageDetail;
    // const [createdAt,setCreatedAt]=useState('');
    const[messageID,setMessageID]=useState(location.state?.messageID);
    useEffect(()=>{
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        // console.log(staff_admin);
        if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }
        getMessage();
    },[0]);
    const getMessage=()=>{
             axios.get(`/partner/get/pickup/comment/${messageID}`)
                    .then((res)=>{
                        console.log(res.data);
                        dispatch(getMessageDetail(res.data));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })

    }
  //   scrollToMyRef = () => {
  //   const scroll =
  //     this.chatContainer.current.scrollHeight -
  //     this.chatContainer.current.clientHeight;
  //   this.chatContainer.current.scrollTo(0, scroll);
  // };


    return(
        <>
            {/*<h6>MessageDetail{messageID}</h6>*/}
            <scrollToBottom>
                <div className="pt-3"  style={{height:'75vh',overflowY:'auto',overflowX:'hidden'}}>
                { pickupMessageDetail.map((messageList)=>(
                        <>
                            {
                               (() => {
                                   if (messageList.partner_id!=null){
                                        return (
                                            <>
                                                <Row>
                                                <Col xs={4}>

                                                </Col>
                                                <Col xs={8}>

                                                    <div className="ml-2 pt-1 pb-1">
                                                        <p className="mb-0" style={{backgroundColor:'#afa6ed',color:'#161616',marginLeft:'7px',borderRadius:'20px',padding:'5px 9px',lineHeight:'20px',fontSize:'14px',textAlign:'center'}}><span>{messageList.message}</span><br /><span style={{fontSize:'12px'}}>{moment(messageList.created_at).format("ddd, MMM Do YYYY, h:mm A")}</span></p>
                                                        <p style={{color:'#161616',marginLeft:'7px',borderRadius:'20px',padding:'0px 9px',lineHeight:'15px',fontSize:'12px'}}>From You</p>

                                                    </div>
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

                                                    <div className="ml-2 pt-1 pb-1">
                                                        <p className="mb-0" style={{backgroundColor:'#afa6ed',color:'#161616',marginLeft:'7px',borderRadius:'20px',padding:'5px 9px',lineHeight:'20px',fontSize:'14px',textAlign:'center'}}><span>{messageList.message}</span><br /><span style={{fontSize:'12px'}}>{moment(messageList.created_at).format("ddd, MMM Do YYYY, h:mm A")}</span></p>
                                                        <p style={{color:'#161616',marginLeft:'7px',borderRadius:'20px',padding:'0px 9px',lineHeight:'15px',fontSize:'12px'}}>From Delivery Person</p>

                                                    </div>
                                               </Col>
                                                <Col xs={4}>

                                                </Col>
                                                </Row>
                                            </>
                                        );
                                   }
                                   if (messageList.branch_staff!=null) {
                                       return (
                                            <>
                                                <Row>

                                                <Col xs={8}>

                                                    <div className="ml-2 pt-1 pb-1">
                                                        <p className="mb-0" style={{backgroundColor:'#afa6ed',color:'#161616',marginLeft:'7px',borderRadius:'20px',padding:'5px 9px',lineHeight:'20px',fontSize:'14px',textAlign:'center'}}><span>{messageList.message}</span><br /><span style={{fontSize:'12px'}}>{moment(messageList.created_at).format("ddd, MMM Do YYYY, h:mm A")}</span></p>
                                                        <p style={{color:'#161616',marginLeft:'7px',borderRadius:'20px',padding:'0px 9px',lineHeight:'15px',fontSize:'12px'}}>From {messageList.staff_name}</p>

                                                    </div>

                                               </Col>
                                                <Col xs={4}>

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

                                                    <div className="ml-2 pt-1 pb-1">
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
            </div>
            </scrollToBottom>
            <MessageSend />
        </>
    );
}
export default MessageDetail