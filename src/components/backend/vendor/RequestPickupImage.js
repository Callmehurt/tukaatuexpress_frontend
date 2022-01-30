import React, {useEffect, useState} from 'react';
import Webcam from "react-webcam";
import {Row,Col,Button} from 'react-bootstrap';
import WebcamCapture from "./WebcamCapture";
import Tab from "react-bootstrap/Tab";
import VendorAccountDatatables from "./VendorAccountDatatables";
import Tabs from "react-bootstrap/Tabs";
import VendorCreatePickup from "./VendorCreatePickup";
import {useHistory} from "react-router-dom";



const RequestPickupImage=()=>{
     const history = useHistory();
    const [captureEnable, setCaptureEnable] = useState(false);
    const [showOpenBtn, setShowOpenBtn] = useState(false);
    const showOpenBtnFn = () => {
        setShowOpenBtn(true);
        setCaptureEnable(false);
    };
    const moveToCamera=()=>{
        history.push({
           pathname: '/vendor/Pickup_capture',
           // state: {messageID: id }
       });
    }
     return (

    // const [imageSend,setImageSend]=useState('');
    // const videoConstraints = {
    //   width: 576,
    //   height: 300,
    //   facingMode: "user"
    // };
    // useEffect(()=>{
    //     console.log(imageSend);
    // })
    //   const webcamRef = React.useRef(null);
    //
    //   const capture = React.useCallback(
    //     () => {
    //       const imageSrc = webcamRef.current.getScreenshot();
    //       setImageSend(imageSrc);
    //     },
    //     [webcamRef]
    //   );
    //
    // return(
    //     <>
    //         <Row>
    //             <Col lg={12}>
    //             <Webcam
    //                 audio={false}
    //                 height={300}
    //                 ref={webcamRef}
    //                 screenshotFormat="image/jpeg"
    //                 width={576}
    //                 videoConstraints={videoConstraints}
    //             />
    //             </Col>
    //             <Col lg={12}>
    //                 <div className="d-flex justify-content-center">
    //                      <Button style={{backgroundColor:'green'}} onClick={capture}>Capture photo</Button>
    //                 </div>
    //             </Col>
    //         </Row>
    //     </>
    // )
     <>
                    <Tabs
                    defaultActiveKey="new_pickups"
                    transition={false}
                    className="mb-0 mt-3"
                      >
                      <Tab eventKey="new_pickups" title="ImageFile">
                        <div style={{minHeight:'150vh'}}>
                            <VendorCreatePickup />
                        </div>
                      </Tab>
                      <Tab eventKey="pickup_process" title="Capture Image">
                          {/*<div style={{minHeight:'150vh'}}>*/}
                          {/*  <div*/}
                          {/*    style={{*/}
                          {/*      justifyContent: "center",*/}
                          {/*      textAlign: "center",*/}
                          {/*      background: "transparent",*/}
                          {/*      padding: "20px"*/}
                          {/*    }}*/}
                          {/*  >*/}
                          {/*    {showOpenBtn && (*/}
                          {/*      <Button*/}
                          {/*        variant="contained"*/}
                          {/*        color="primary"*/}
                          {/*        style={{ marginBottom: "20px" }}*/}
                          {/*        onClick={() => setCaptureEnable(true)}*/}
                          {/*      >*/}
                          {/*        Open Camera*/}
                          {/*      </Button>*/}
                          {/*    )}*/}
                          {/*    <Button*/}
                          {/*      style={{ marginBottom: "20px",color:'#fff' }}*/}
                          {/*      onClick={() => setCaptureEnable(true)}*/}
                          {/*    >*/}
                          {/*      Take a Picture*/}
                          {/*    </Button>*/}
                          {/*    {captureEnable && <WebcamCapture setShowOpenBtn={showOpenBtnFn} />}*/}
                          {/*  </div>*/}
                          {/*</div>*/}
                           <Row>
                               <Col xs={12}>
                                   <div style={{height:'60vh',display:'grid',placeContent:'center',fontSize:'16px',fontWeight:'500'}}>
                                       <Button
                                        style={{ marginBottom: "20px",color:'#fff' }}
                                        onClick={() => moveToCamera()}
                                      >
                                        Take a Picture
                                      </Button>
                                   </div>
                               </Col>
                           </Row>
                      </Tab>
                    </Tabs>
   </>
    );
}

export default RequestPickupImage