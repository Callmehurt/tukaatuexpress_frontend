import React, {useEffect, useState} from 'react'
import MUIDataTable from "mui-datatables";
// import {RiDeleteBin2Line} from "react-icons/ri";
import {useSelector, useDispatch} from "react-redux";
// import {BiEdit} from "react-icons/bi";
import setAuthorizationToken from "./../../../utils/setAuthorizationToken";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
// import axios from "axios";
// import {ImBoxRemove} from "react-icons/im";
import {getAccountPartnerPaymentStatementList} from './../../../redux/actions/AccountAdmin';
import {Button, Col, Modal, Row} from "react-bootstrap";
import {AiFillEye} from "react-icons/ai";
import notification from "../includes/notification";
import config from "react-reveal/src/lib/globals";
import {Viewer, Worker} from "@react-pdf-viewer/core";
import {defaultLayoutPlugin} from "@react-pdf-viewer/default-layout";

const PaymentStatementDatatables = ()=> {
    const history=useHistory();
    const dispatch = useDispatch();
     const location=useLocation();
      const accountAdmin = useSelector((state) => state.accountAdmin);
      const allPartnerPaymentStatements=accountAdmin.allPartnerPaymentStatements;
      const [show, setShow] = useState(false);
       const [invoicesShow, setInvoicesShow] = useState(false);
      const [invoiceFiles, setInvoiceFiles] = useState(undefined);
      const [viewInvoicesFile,setViewInvoicesFile]=useState([]);
      const [viewInvoicesPdf,setViewInvoicesPdf]=useState([]);
      const [showInvoicesToggle,setShowInvoicesToggle]=useState(false);
      const[formField,setFormField]=useState({
          // invoice:[],
          statement_id:'',
      })

  const handleClose = () => setShow(false);
  const handleInvoiceClose = () => {
      setInvoicesShow(false)
      // setViewInvoicesFile([]);
  };

    // const thisState = useSelector((state) => state.newpickuplist);
    // const newPickupList = thisState.NewPickupList;
    // const [pickupList,setPickupList]= useState(false);

    useEffect(()=>{
        let AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        console.log(AccountStorage);
        if(AccountStorage){
          setAuthorizationToken(AccountStorage.token);
        }
        getAllStatement();
        console.log(viewInvoicesFile);
    },[]);
    useEffect(()=>{
        let AccountStorage = JSON.parse(localStorage.getItem('Account_storage'));
        console.log(AccountStorage);
        if(AccountStorage){
          setAuthorizationToken(AccountStorage.token);
        }
        loadInvoices()

    },[loadInvoices])

    const getAllStatement=()=>{
         let partner_id=location.state?.partnerId;
         console.log(partner_id+'partner id statement');
          axios.get(`/account/get/partner/payment/statement/list/${partner_id}`)
            .then((res) => {
                console.log(res);
                dispatch(getAccountPartnerPaymentStatementList(res.data));
            })
            .catch((err) => {
                console.log(err.response);
            })
    }
    const onInvoiceUpload=(statement_id)=>{
             const newField={...formField}
             newField.statement_id=statement_id;
             setFormField(newField);
             setShow(true);

    }
    const uploadFiles = () => {
        console.log(formField);
        console.log(invoiceFiles);

         const imagesData = new FormData();
                    invoiceFiles.forEach(file=>{
                        console.log(file);
                        imagesData.append('statement_id',formField.statement_id)
                      imagesData.append("invoices[]", file);
                    });
        // ......
        // setLoading(true);
        axios.post('/account/upload/partner/payment/statement/invoice', imagesData,
            config({
                           headers: {
                            "content-type": "multipart/form-data"
                          }
                      }))
          .then((res) => {
              console.log(res);
              console.log(res.data);
              if(res.data.status === true){
                  notification('success', res.data.message);
                  getAllStatement();
                  // setLoading(false);
                  history.push('/account/Account_Division');
              }else {
                  notification('success', res.data.message);
                  // setLoading(false);
              }
          })
          .catch((err) => {
              console.log(err.response)
          })
    }

   const columns = [
        {
         name: "statement_num",
         label: "Statement No.",
         options: {
          filter: true,
          sort: true,
         }
        },
         {
         name: "statement_date",
         label: "S. Date",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "deliveries",
         label: "T Deliver.",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => {
                  let str = value;
                  let arr=[];
                   arr.push(str.split(','));
                   console.log(arr);
                  return arr[0].length;

             }
         }
        },
        {
         name: "return",
         label: "T. Retur.",
         options: {
          filter: true,
          sort: true,
             display:false,
         }
        },
       {
         name: "exchanges",
         label: "T. Exchanges",
         options: {
          filter: true,
          sort: true,
              display:false,
         }
        },
       {
         name: "payable",
         label: "Payable",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "paid",
         label: "Paid",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "add_deduct",
         label: "Add/ Deduct on N. S.",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "return_deduction",
         label: "Ret. Deduc.",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "invoices",
         label: "View Inv.",
         options: {
          filter: true,
          sort: true,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                          {value?
                              <>
                                  <div style={{width:'50%',display:'flex',justifyContent:'center'}}>
                                    <Button variant="outline-primary" className="pb-1 pt-1" onClick={() => viewPdfInvoices(value)}> <AiFillEye size={20} /> </Button>
                                  </div >

                              </>:
                              <>
                              </>
                          }
                          {/*<div style={{width:'50%',display:'flex',justifyContent:'center'}}>*/}
                          {/*    <Button variant="outline-primary" className="pb-1 pt-1" onClick={() => viewPdfInvoices(value)}> <AiFillEye size={20} /> </Button>*/}
                          {/*</div >*/}
                          {value?
                              <>
                                  <div style={{width:'50%',display:'flex',justifyContent:'center'}}>
                                       <Button variant="outline-primary" className="pb-1 pt-1" onClick={(event)=>{onInvoiceUpload(tableMeta.rowData[10])}} >

                                           Reupload
                                       </Button>
                                  </div>
                              </>:
                              <>
                                  <Button variant="outline-primary" className="pb-1 pt-1" onClick={(event)=>{onInvoiceUpload(tableMeta.rowData[10])}}>

                                           upload
                                  </Button>
                              </>

                          }


                      </div>
                  </>
              )
         }
        },
        {
            name: 'id',
            label: 'view stat.',
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                           <Button variant="outline-primary" className="pb-1 pt-1" onClick={() => viewPdfStatement(value)}> <AiFillEye size={20} /> </Button>

                      </div>


                  </>
              )
            }
        }

       ];
    const viewPdfStatement =(statement_id)=>{
        console.log(statement_id);
        axios.get(`/account/get/partner/payment/statement/${statement_id}`,{
              responseType: 'blob',
             Accept: 'application/pdf',
        })
        .then(response => {
            console.log(response.data);
            const file = new Blob(
              [response.data],
              {type: 'application/pdf'});
            console.log(file);
            const fileURL = URL.createObjectURL(file);
            // const link = document.createElement('a');
            // link.href = fileURL;
            // link.setAttribute('staffs.pdf');
            // document.body.appendChild(link);
            // link.click();
        //Open the URL on new Window
            window.open(fileURL);
        })
       .catch(error => {
        console.log(error);
    });
  }
  const viewPdfInvoices=(invoice_id)=>{

        console.log(invoice_id);
        let str = invoice_id;
        let ViewInvoicesData=[];
        let ViewInvoicesPdfData=[];
          let arr=[];
           arr.push(str.split(','));
           console.log(arr);
           if(arr[0].length===1){
                   axios.get(`/account/get/statement/invoice/${invoice_id}`)
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
                   axios.get(`/account/get/statement/invoice/${items}`)
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
           setInvoicesShow(true);
           setShowInvoicesToggle(true);



  }
   const selectFiles = (event) => {
          console.log(event.target.files);
          setInvoiceFiles(event.target.files);
          //  const newField = {...formField}
          //  // const newArray = array.push(invoiceFiles);
          //  // newField.invoice=[event.target.files];
          //
          // setFormField(newField);

      }
   const deliveredData = () => {
         // axios.get('/admin/pickup/list')
         //    .then((res) => {
         //        console.log(res);
         //        dispatch(NewPickupList(res.data));
         //        dispatch(NewPickupListCount(res.data.length));
         //    })
         //    .catch((err) => {
         //        console.log(err.response.data);
         //    })

   }
   // const ViewInvoiceFunc=()=>{
   //
   //      return(
   //          <>
   //              {
   //                          viewInvoicesFile.map((item)=>(
   //                              <>
   //                                  <Row>
   //                                      <Col lg={12}>
   //                                          <div style={{display:'flex',placeContent:'center'}}>
   //                                             <img src={item} className="img-fluid" alt="invoices" />
   //                                          </div>
   //                                      </Col>
   //                                  </Row>
   //                              </>
   //                          ))
   //                      }
   //          </>
   //      );
   //
   // }
    const loadInvoices=(event)=>{
      console.log(viewInvoicesFile);
    }

    const options = {
    searchOpen:false,
    filterType:'textField',
    fixedHeader:false,
    rowsPerPage:[100],
    rowsPerPageOptions:[10,20,50,100,500],
    selectableRows: 'none',
  }
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return(
        <>
            {showInvoicesToggle?
                <>
                    <Row>
                        <Col lg={6}>
                        </Col>
                        <Col lg={6}>
                            <div style={{display:'flex',justifyContent:'end'}}>
                               <Button className="mt-3" variant="primary" onClick={(event)=>{setShowInvoicesToggle(false)}}> close Invoice</Button>
                            </div>
                        </Col>
                    </Row>
                </>:
                <>
                </>
            }

                    {
                        showInvoicesToggle?
                            <>
                                {viewInvoicesFile.length?<>
                                            {
                                                viewInvoicesFile.map((item)=>(
                                                    <>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div style={{display:'flex',placeContent:'center'}}>
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
                                                                 <div style={{width:'500px',display:'flex',placeContent:'center'}}>
                                                                 <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.9.359/build/pdf.worker.js">
                                                                    <div
                                                                        style={{
                                                                            height: '500px',
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

           <MUIDataTable
            // title={"New Pickup List"}
            data={allPartnerPaymentStatements}
            columns={columns}
            options={options}
           />
            <Modal show={show} onHide={handleClose}>
            <Modal.Header >
              <Modal.Title>Upload Invoices</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="mx-5" >
                    <Col lg={6}>
                        <h6>Attach Files:</h6>
                      <label className="btn btn-default p-0">

                        <input type="file" name="file" accept="image/*" multiple onChange={selectFiles} />
                      </label>
                    </Col>
                </Row>


            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={uploadFiles}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

            <Modal show={invoicesShow} onHide={handleInvoiceClose}>
            <Modal.Header className="pb-0">
              <Modal.Title><h6 className="mb-0">Invoices
                  {/*({viewInvoicesFile.length})*/}
              </h6></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {console.log(viewInvoicesFile)}
                {/*{viewInvoicesFile?*/}
                {/*    <>*/}
                        {/*there is image*/}
                        {/*/!*<img src={viewInvoicesFile[0]} alt="invoices"/>*!/*/}
                        {/* <Button variant="secondary" onClick={(event)=>loadInvoices(event)}>Secondary</Button>*/}
                        {/* <img src={viewInvoicesFile[0]} className="img-fluid" alt="invoices" />*/}
                        {/*{*/}
                        {/*    viewInvoicesFile.map((item)=>(*/}
                        {/*        <>*/}
                        {/*            <Row>*/}
                        {/*                <Col lg={12}>*/}
                        {/*                    <div style={{display:'flex',placeContent:'center'}}>*/}
                        {/*                       <img src={item} className="img-fluid" alt="invoices" />*/}
                        {/*                    </div>*/}
                        {/*                </Col>*/}
                        {/*            </Row>*/}
                        {/*        </>*/}
                        {/*    ))*/}
                        {/*}*/}
                {/*{ViewInvoiceFunc}*/}
                    {/*</>:*/}
                    {/*<>*/}
                    {/*    there is not image available*/}
                    {/*</>*/}
                {/*}*/}
                <h5>Do You want to view Invoice ?</h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleInvoiceClose}>
                ok
              </Button>
            </Modal.Footer>
          </Modal>
        </>
    )
}

export default PaymentStatementDatatables