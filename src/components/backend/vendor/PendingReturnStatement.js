import React, {useEffect} from 'react';
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {getApprovedReturnStatement, returnsOrderList} from "../../../redux/actions/vendor";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPendingReturnStatement} from './../../../redux/actions/vendor';
import {Card, Col, Row,Button} from "react-bootstrap";
import Avatar from "react-avatar";
import notification from "../includes/notification";

const PendingReturnStatement=()=>{
    const history = useHistory();
     const dispatch = useDispatch();
     const vendor = useSelector((state) => state.vendor);
     const allPendingReturnStatement = vendor.allPendingReturnStatement;
    useEffect(()=>{
         let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
            // console.log(staff_admin);
            if(vendorDetail){
              setAuthorizationToken(vendorDetail.token);
            }
            getPendingReturnStatementList();


     },[]);
    const approveReturnStatement =(stat_id)=>{
        axios.put(`/partner/approve/return/statement/${stat_id}`)
                    .then((res)=>{
                        console.log(res);
                        if(res.data.status===true){
                             notification('success', res.data.message);
                            getPendingReturnStatementList();
                        }else{
                           notification('danger', res.data.message);
                        }
                        // console.log(res.data.pending);
                        // dispatch(getPendingReturnStatement(res.data.pending));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })
    }
    const getPendingReturnStatementList=()=>{
            axios.get('/partner/my/return/statements')
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data.pending);
                        dispatch(getPendingReturnStatement(res.data.pending));
                         dispatch(getApprovedReturnStatement(res.data.approved));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })

        }
    return(
        <>
            {/*<h6>Pending Return Statement</h6>*/}
            {allPendingReturnStatement.length ? <>
                           {
                               allPendingReturnStatement.map((list) => (
                                   <>
                                       <Col lg={12}>
                                           {/*<a onclick={(e)=>{e.preventDefault();getMessageDetail(2);}}>*/}

                                           <div>

                                               <Card onClick={(e) => {
                                                   e.preventDefault();
                                                   // getOrderDetail(list.id)
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
                                                                   <Avatar size="40" name={list.statement_num}
                                                                           round={true}/>
                                                               </div>

                                                               {/*<Image src={logoImage} roundedCircle />*/}
                                                           </Col>
                                                           <Col xs={9}
                                                                style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                                               <div className="pt-2">
                                                                   <h6 className="mb-1">{list.statement_num}<span style={{
                                                                       fontSize: '15px',
                                                                       fontWeight: '500',
                                                                       paddingLeft: '5px'
                                                                   }}>
                                                                   </span>
                                                                   </h6>
                                                               </div>
                                                               <div>

                                                                   <Row>
                                                                       <Col xs={6}>
                                                                           {/*<span*/}
                                                                           {/*    style={{fontSize: '14px'}}>{list.customer_name}</span>*/}
                                                                           {/*<span style={{fontSize:'15px'}}>{ list.customer_name.length>13 ? <div><span>{list.customer_name.substring(0,13)}...</span></div>: <div><span>{list.customer_name}</span></div> }</span>*/}
                                                                           <Button className="pt-0 pb-0" style={{fontSize:'14px'}} variant="outline-secondary" onClick={(event)=>approveReturnStatement(list.id)}>Approve</Button>
                                                                       </Col>
                                                                       <Col xs={6}>
                                                                           <span
                                                                               style={{fontSize: '14px'}}>Status: {list.approve_status==0?<>Unapproved</>:<>Approved</>}</span>
                                                                       </Col>
                                                                   </Row>

                                                               </div>
                                                               {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                                           </Col>
                                                       </Row>
                                                   </Card.Body>
                                               </Card>
                                           </div>
                                           {/*</a>*/}
                                       </Col>
                                   </>
                               ))

                           }

                       </> : <>
                           <Col xs={12}>
                               <div style={{
                                   height: '60vh',
                                   display: 'grid',
                                   placeContent: 'center',
                                   fontSize: '16px',
                                   fontWeight: '500'
                               }}>No Orders Here...
                               </div>
                           </Col>
                       </>
                       }
        </>
    )
}
export default PendingReturnStatement