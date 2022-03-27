import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import {Table,Row,Col} from 'react-bootstrap';
import {useSelector} from "react-redux";
// import LogoImage from './../../../../../logo.svg';
import LogoExpress from './../../../../../assets/logo-exp.png'
import PrintAds1 from './../../../../../assets/print_ad_1.png'
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import Barcode from "react-barcode";

export const ComponentToPrint= React.forwardRef((props, ref)=>{
     const thisState = useSelector((state) => state.newpickuplist);
    const newPickupList = thisState.NewPickupList;
    const branchOperation = useSelector((state) => state.branchOperation);
    const allPrintOrderData=branchOperation.allPrintOrderData;
     const[printData,setPrintData]=useState([]);
    useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        console.log(staff_admin);
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
        console.log(newPickupList);
        getPrintDataFunction();

    },[]);
    const getPrintDataFunction=()=>{
        let printDataStorage = JSON.parse(localStorage.getItem('printData'));
        setPrintData(printDataStorage);
        console.log(printData);
        console.log("printData");
    }

    return(
        <>
            <div>
            {allPrintOrderData?
                <>
                     <Row>
                       <Col lg={12} style={{marginLeft:'10px'}}>
                    <div style={{display:'flex',placeContent:'center'}}>
                        <div ref={ref} className="p-3 pt-3 pb-5">
                            <Row className="componentToPrint" style={{width:'100%',display:'flex',fontSize:'12px',marginLeft:'5px'}}>

                                {
                                    allPrintOrderData.map((items)=>(
                                        <>
                                            <Col lg={4} style={{maxWidth: '33.33333%',paddingBottom:'70px',paddingTop:'20px',paddingLeft:'25px',paddingRight:'25px'}}>
                                                  <Table  bordered hover >

                                                      <tbody>
                                                          <tr>
                                                              <td>
                                                                      <div style={{display:'flex',placeContent:'start'}}>
                                                                        <img src={LogoExpress}  className="img-fluid mt-2" style={{height:'52px'}} />
                                                                      </div>
                                                              </td>
                                                              <td colSpan="2">

                                                                                 <div style={{display:'flex',placeContent:'center'}}>
                                                                                       <img src={PrintAds1}  className="img-fluid mt-2" style={{height:'50px'}} />
                                                                                 </div>



                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td className="font_size_td">Customer</td>
                                                              <td colSpan="2" className="font_size_td">{items.customer_name}</td>
                                                          </tr>
                                                          <tr>
                                                              <td className="font_size_td">Phone</td>
                                                              <td colSpan="2" className="font_size_td">{items.customer_phone}</td>
                                                          </tr>
                                                          <tr>
                                                              <td className="font_size_td">Address</td>
                                                              <td colSpan="2" className="font_size_td">{items.customer_address}</td>
                                                          </tr>
                                                          <tr>
                                                              <td className="font_size_td">COD Amt.</td>
                                                              <td colSpan="2" className="font_size_td">Rs. {items.cod}</td>
                                                          </tr>
                                                          <tr>
                                                              <td className="font_size_td">Order Info</td>
                                                              <td colSpan="2" className="font_size_td">
                                                                  {
                                                                      items.packet_name.length>21?
                                                                          <>
                                                                              {items.packet_name.substring(0,22)} ...
                                                                          </>:
                                                                          <>
                                                                              {items.packet_name}
                                                                          </>
                                                                  }

                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td rowSpan="4">
                                                                  <div style={{paddingTop:'17px'}}>
                                                                      {items.normal_delivery === 0 ? 'Same Day Delivery' : ''}
                                                                    <Barcode value={items.tex_code} renderer={"img"} format="code128" height="30" width="1"  font="Roboto" fontSize="14" />
                                                                  </div>
                                                              </td>
                                                              <th colSpan="2" className="text-center">Sender Details:</th>
                                                          </tr>
                                                          <tr>
                                                              <td className="font_size_td">Name</td>
                                                              <td className="font_size_td">
                                                                  <span >
                                                                  { items.vendor_name.length>10?
                                                                      <div>
                                                                          <span>{items.vendor_name.substring(0,10)}..</span>
                                                                      </div>
                                                                      :
                                                                      <div>
                                                                          <span>{items.vendor_name}</span>
                                                                      </div>
                                                                  }
                                                              </span></td>
                                                          </tr>
                                                          <tr>

                                                              <td className="font_size_td">Address</td>
                                                              <td className="font_size_td">
                                                                  <span >
                                                                  { items.customer_address.length>10?
                                                                      <div>
                                                                          <span>{items.customer_address.substring(0,10)}...</span>
                                                                      </div>
                                                                      :
                                                                      <div>
                                                                          <span>{items.customer_address}</span>
                                                                      </div>
                                                                  }
                                                              </span>
                                                                  </td>

                                                          </tr>
                                                          <tr>
                                                              <td className="font_size_td">Phone</td>
                                                              <td className="font_size_td">{items.vendor_mobile}</td>
                                                          </tr>
                                                      </tbody>
                                                  </Table>
                                             </Col>
                                        </>
                                    ))
                                }

                            </Row>
                        </div>
                    </div>
                </Col>
                      </Row>
                </>:
                <>
                    <Row>
                      <Col lg={12} style={{marginLeft:'10px'}}>
                        <div style={{display:'flex',placeContent:'center'}}>
                          <div ref={ref} className="p-3 pt-3 pb-5">
                              No Data
                          </div>
                        </div>
                      </Col>
                    </Row>
                </>
            }



        </div>
        </>
    )
});
const encodeBarcode = reactElement => {
    return (
      "data:image/png;base64," +
      ReactDOMServer.renderToStaticMarkup(reactElement)
    );
  };
