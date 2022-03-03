import React, {useEffect, useState} from 'react';
import {Card, Col, Image, Row,Button} from "react-bootstrap";
import logoImage from "../../../logo.svg";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {statementsAndInvoices} from "../../../redux/actions/vendor";
import Avatar from "react-avatar";
import StatementPdfViewer from "./StatementPdfViewer";
import {Viewer, Worker} from "@react-pdf-viewer/core";
import {defaultLayoutPlugin} from "@react-pdf-viewer/default-layout";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {AiFillEye,AiFillCloseCircle} from "react-icons/ai";
import moment from 'moment';

const StatementAndInvoices=()=>{
    const history = useHistory();
     const dispatch = useDispatch();
       const vendor = useSelector((state) => state.vendor);
       const appSetting=useSelector((state)=>state.appSetting);
       const urlDomain=appSetting.urlDomain;
        const statementAndInvoice=vendor.statementAndInvoice;
        const[statementViewActive,setStatementViewActive]=useState(false);
        const[statementView,setStatementView]=useState('');
        const [invoicesShow, setInvoicesShow] = useState(false);
        const [invoiceFiles, setInvoiceFiles] = useState(undefined);
        const [viewInvoicesFile,setViewInvoicesFile]=useState([]);
        const [viewInvoicesPdf,setViewInvoicesPdf]=useState([]);
        const [showInvoicesToggle,setShowInvoicesToggle]=useState(false);
        const defaultLayoutPluginInstance = defaultLayoutPlugin();
        useEffect(()=>{
         let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
            // console.log(staff_admin);
            if(vendorDetail){
              setAuthorizationToken(vendorDetail.token);
            }
            getStatementAndInvoice();
            console.log(statementView);

     },[statementView]);
        const getStatementAndInvoice=()=>{
            axios.get('partner/my/statements')
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data);
                        dispatch(statementsAndInvoices(res.data));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })

        }
        const closeStatement=()=>{
             setStatementViewActive(false);
             setStatementView('');
        }
        const getStatementDetail=(statement)=>{
            setStatementViewActive(true);
            console.log(statement);
            let urlStatement=urlDomain+statement;
            setStatementView(urlStatement);
         }
         const getInvoicesDetail=(id)=>{
             setShowInvoicesToggle(true);
            let str = id;
            let ViewInvoicesData=[];
            let ViewInvoicesPdfData=[];
              let arr=[];
               arr.push(str.split(','));
               if(arr[0].length===1){
                       axios.get(`/partner/view/invoice/${id}`)
                        .then((res) => {
                            console.log(res);
                            console.log(res.data);
                            if(res.data.endsWith(".pdf")){
                                 ViewInvoicesPdfData.push(res.data);
                            }else{
                                 ViewInvoicesData.push(res.data);
                            }


                        })
                       .catch((err) => {
                        console.log(err.response);
                    });
               }
               else{
                   arr[0].map((items)=>{
                       axios.get(`/partner/view/invoice/${items}`)
                        .then((res) => {
                            console.log(res);
                            console.log(res.data);
                           if(res.data.endsWith(".pdf")){
                                 ViewInvoicesPdfData.push(res.data);
                            }else{
                                 ViewInvoicesData.push(res.data);
                            }
                            console.log(ViewInvoicesData);
                        })
                       .catch((err) => {
                        console.log(err.response);
                    });
                   })

               }
               console.log(ViewInvoicesData,+'view Invoice Data');
               setViewInvoicesFile(ViewInvoicesData);
               setViewInvoicesPdf(ViewInvoicesPdfData)
                console.log(viewInvoicesFile,+'view Invoice state');
                console.log(ViewInvoicesPdfData,+'view Invoice pdf state');
               // setInvoicesShow(true);
               setShowInvoicesToggle(true);
  }


    return(
        <>

              <div style={{height:'60vh',overflowY:'auto',overflowX:'hidden'}}>
                      <div>
                          {
                            showInvoicesToggle?
                                <>
                                    <Row>
                                        <Col xs={12}>
                                             <div style={{display:'flex',justifyContent:'end'}}>
                                               <Button className="mt-3" variant="primary" onClick={(event)=>{setShowInvoicesToggle(false)}}> close Invoice</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    {viewInvoicesFile.length?<>
                                                {
                                                    viewInvoicesFile.map((item)=>(
                                                        <>
                                                            <Row>
                                                                <Col lg={12}>
                                                                    <div style={{display:'flex',placeContent:'center',}}>
                                                                       <img src={item} className="img-fluid" alt="invoices" />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </>
                                                    ))
                                                }

                                            </>:<>
                                                {/*<h5>Pdf View</h5>*/}
                                                {console.log(viewInvoicesPdf,'InvoicesPdf')}
                                                {viewInvoicesPdf[0]?
                                                    <>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div style={{display:'flex',placeContent:'center',paddingBottom:'10px'}}>
                                                                     <div style={{width:'100vw',display:'flex',placeContent:'center'}}>
                                                                     <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.9.359/build/pdf.worker.js">
                                                                        <div
                                                                            style={{
                                                                                height: '300px',
                                                                                width: 'auto',
                                                                                marginLeft: 'auto',
                                                                                marginTop:'0px',
                                                                                marginRight: 'auto',
                                                                            }}
                                                                        >
                                                                            <Viewer
                                                                                fileUrl={viewInvoicesPdf[0]}
                                                                                plugins={[defaultLayoutPluginInstance]}
                                                                            />
                                                                        </div>
                                                                </Worker>
                                                        </div>

                                                                </div>

                                                            </Col>
                                                        </Row>

                                                    </>:
                                                    <>
                                                    </>

                                                }

                                            </>
                                    }

                                </>:
                                <>
                                </>
                          }
                      </div>
                      <div>
                          {statementViewActive?
                              <>
                                  <Row>
                                      <Col xs={12}>
                                          <div style={{display:'flex',placeContent:'end'}}>
                                              <Button variant="outline-danger" onClick={(event)=>{closeStatement()}} style={{borderRadius:'20px',width:'65px',height:'65px'}}><AiFillCloseCircle size={25} /></Button>
                                          </div>
                                      </Col>
                                  </Row>
                                  {statementView?
                                      <>
                                          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.9.359/build/pdf.worker.js">
                                                <div
                                                    style={{
                                                        height: '70vh',
                                                        width: 'auto',
                                                        marginLeft: 'auto',
                                                        marginTop:'10px',
                                                        marginRight: 'auto',
                                                    }}
                                                >
                                                    <Viewer
                                                        fileUrl={statementView}
                                                        plugins={[defaultLayoutPluginInstance]}
                                                    />
                                                </div>
                                        </Worker>
                                      </>:
                                      <>
                                      </>
                                  }
                              </>:
                              <>
                              </>
                          }
                      </div>


                        <div>

                            {statementAndInvoice.length?<>
                                {
                                    statementAndInvoice.map((list)=>(
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
                                                                       <Avatar size="40" name={list.statement_num}
                                                                               round={true}/>
                                                                   </div>
                                                              </Col>
                                                              <Col xs={10} style={{paddingLeft:'0px',paddingRight:'0px'}}>
                                                                  <div className="pt-2">
                                                                          <h6 className="mb-1" style={{fontSize:'15px'}}>{list.statement_num}<span style={{fontSize:'15px',fontWeight:'500',paddingLeft:'5px'}}></span></h6>
                                                                      </div>
                                                                   <div>
                                                                          <Row>
                                                                              <Col xs={6}>
                                                                                   <span style={{fontSize:'14px'}}>Payment: Rs. {list.paid}</span>
                                                                                 {/*<span style={{fontSize:'15px'}}>{ list.customer_name.length>13 ? <div><span>{list.customer_name.substring(0,13)}...</span></div>: <div><span>{list.customer_name}</span></div> }</span>*/}
                                                                              </Col>
                                                                              <Col xs={6}>
                                                                                  <span style={{fontSize:'14px'}}>Date: {moment(list?.statement_date).format('L')}</span>
                                                                              </Col>
                                                                              <Col xs={6} className="pt-1 pb-2" >
                                                                                   <Button variant="outline-secondary" onClick={(e)=>{e.preventDefault(); getStatementDetail(list.statement)}}><AiFillEye size={20} /> Statement</Button>
                                                                              </Col>
                                                                              <Col xs={6} className="pt-1 pb-2" >
                                                                                  {list.invoices?
                                                                                      <>
                                                                                          <Button variant="outline-secondary" onClick={(event)=>{ getInvoicesDetail(list.invoices)}}> <AiFillEye size={20} /> Invoices </Button>
                                                                                      </>:
                                                                                      <>
                                                                                      </>

                                                                                  }
                                                                              </Col>
                                                                          </Row>

                                                                      </div>
                                                                  {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                                              </Col>
                                                          </Row>
                                                      </Card.Body>
                                                   </Card>
                                                </div>
                                            </Col>
                                        </>
                                    ))

                                }
                                </>: <>
                                    <Col xs={12}>
                                        <div style={{height:'60vh',display:'grid',placeContent:'center',fontSize:'16px',fontWeight:'500'}}>No Orders Here...</div>
                                    </Col>
                                </>
                            }
                        </div>
            </div>
        </>
    );

}

export default StatementAndInvoices