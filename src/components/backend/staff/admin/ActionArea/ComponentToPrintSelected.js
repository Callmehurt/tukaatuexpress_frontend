import React, {useEffect, useState} from 'react';
import {Table,Row,Col} from 'react-bootstrap';
import {useSelector} from "react-redux";
// import LogoImage from './../../../../../logo.svg';
import LogoExpress from './../../../../../assets/logo-exp.png'
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import PrintAds1 from "../../../../../assets/print_ad_1.png";
import Barcode from "react-barcode";

export const ComponentToPrintSelected= React.forwardRef((props, ref)=>{
     const thisState = useSelector((state) => state.branchOperation);
    const printSelectedData = thisState.printSelectedData;
     const[printData,setPrintData]=useState([]);
    useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        console.log(staff_admin);
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
        // console.log(newPickupList);
        getPrintDataFunction();


    },[]);
    // useEffect(()=>{
    //     localStorage.removeItem('printDataSelect');
    // },[printData])
    const getPrintDataFunction=()=>{
        let printDataStorage = JSON.parse(localStorage.getItem('printDataSelect'));
        // setPrintData(printDataStorage);
        console.log(printData);
        printData.map((data)=>{
             console.log(data.data[0].props.children.key);
              console.log(data);
        });
        //  console.log(printData[0].data[0].props.children.key);
        console.log("printData");
    }

    return(
        <>
            <Row>
                <Col lg={12} style={{marginLeft:'10px'}}>
                    <div style={{display:'flex',placeContent:'center'}}>
                        <div ref={ref} className="p-3 pt-3 pb-5">
                            {/*<div>hello world</div>*/}
                                <Row className="componentToPrint" style={{width:'100%',display:'flex',fontSize:'12px',marginLeft:'5px'}}>                                {
                                    printSelectedData?
                                        <>
                                            { printSelectedData.map((items)=>(
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
                                                              <td colSpan="2" className="font_size_td">{items.data[4]}</td>
                                                          </tr>
                                                          <tr>
                                                              <td className="font_size_td">Phone</td>
                                                              <td colSpan="2" className="font_size_td">{items.data[3]}</td>
                                                          </tr>
                                                          <tr>
                                                              <td className="font_size_td">Address</td>
                                                              <td colSpan="2" className="font_size_td">{items.data[9]}</td>
                                                          </tr>
                                                          <tr>
                                                              <td className="font_size_td">COD Amt.</td>
                                                              <td colSpan="2" className="font_size_td">Rs. {items.data[6]}</td>
                                                          </tr>
                                                          <tr>
                                                              <td className="font_size_td">Order Info</td>
                                                              <td colSpan="2" className="font_size_td">
                                                                  {
                                                                      items.data[5].length>21?
                                                                          <>
                                                                              {items.data[5].substring(0,22)} ...
                                                                          </>:
                                                                          <>
                                                                              {items.data[5]}
                                                                          </>
                                                                  }

                                                              </td>
                                                          </tr>
                                                          <tr>
                                                              <td rowSpan="4">
                                                                  <div style={{paddingTop:'17px'}}>
                                                                    <Barcode value={items.data[0]} renderer={"img"} format="code128" height="30" width="1"  font="Roboto" fontSize="14" />
                                                                  </div>
                                                              </td>
                                                              <th colSpan="2" className="text-center">Sender Details:</th>
                                                          </tr>
                                                          <tr>
                                                              <td className="font_size_td">Name</td>
                                                              <td className="font_size_td">
                                                                  <span >
                                                                  { items.data[2].length>10?
                                                                      <div>
                                                                          <span>{items.data[2].substring(0,10)}..</span>
                                                                      </div>
                                                                      :
                                                                      <div>
                                                                          <span>{items.data[2]}</span>
                                                                      </div>
                                                                  }
                                                              </span></td>
                                                          </tr>
                                                          <tr>

                                                              <td className="font_size_td">Address</td>
                                                              <td className="font_size_td">
                                                                  <span >
                                                                  { items.data[12].length>10?
                                                                      <div>
                                                                          <span>{items.data[12].substring(0,10)}...</span>
                                                                      </div>
                                                                      :
                                                                      <div>
                                                                          <span>{items.data[12]}</span>
                                                                      </div>
                                                                  }
                                                              </span>
                                                                  </td>

                                                          </tr>
                                                          <tr>
                                                              <td className="font_size_td">Phone</td>
                                                              <td className="font_size_td">{items.data[11]}</td>
                                                          </tr>
                                                      </tbody>
                                                  </Table>
                                                    </Col>
                                                </>
                                            )) }
                                        </>:
                                        <>
                                            <div style={{display:'grid',placeItems:'center',height:'60vh'}}>
                                               <h1>Plz Check Data</h1>
                                            </div>
                                        </>
                                }
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
});
