import {useEffect, useRef, useState} from "react";
import Webcam from "react-webcam";
import {Image,Row,Col} from 'react-bootstrap';
import Button from "@material-ui/core/Button";
import imageCompression from "browser-image-compression";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";

const WebcamCapture = (props) => {
  const {setShowOpenBtn} = props;
  const [disableCapture, setDisableCapture] = useState(true);
  const [screenShots, setScreenShots] = useState([]);
  const [screenSendData, setScreenSendData] = useState([]);
  useEffect(()=>{
      let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
            // console.log(staff_admin);
      if(vendorDetail){
              setAuthorizationToken(vendorDetail.token);
      }
  })

  const webcamRef = useRef(null);
  const reCapture=async()=>{
        setScreenSendData('');
        // capture();
  }
  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
    console.log('imageSrc');
    // const newFile = imageCompression.getFilefromDataUrl(
    //   imageSrc,
    //   "image.png",
    //   new Date().getTime()
    // );
    // console.log(newFile);
    console.log('newFile');
    const compressedFile = imageCompression(imageSrc, {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 700,
      useWebWorker: true
    });
    console.log(compressedFile);
    setScreenSendData(compressedFile);
    console.log('compressedFile');
    // const blob = imageCompression.getDataUrlFromFile(compressedFile);
    // console.log(blob);
    // setScreenShots((prevState) => [...prevState, blob]);
      // setScreenShots(compressedFile);
  };

  const showOpenbtn = () => {
    setShowOpenBtn();
  };
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
//   function b64toBlob(b64Data, contentType, sliceSize) {
//         contentType = contentType || '';
//         sliceSize = sliceSize || 512;
//
//         let byteCharacters = atob(b64Data);
//         let byteArrays = [];
//
//         for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//             let slice = byteCharacters.slice(offset, offset + sliceSize);
//
//             let byteNumbers = new Array(slice.length);
//             for (let i = 0; i < slice.length; i++) {
//                 byteNumbers[i] = slice.charCodeAt(i);
//             }
//
//             let byteArray = new Uint8Array(byteNumbers);
//
//             byteArrays.push(byteArray);
//         }
//
//       let blob = new Blob(byteArrays, {type: contentType});
//       return blob;
// }
  const upload=()=>{
    console.log(screenShots);
     console.log('screenshot');
     console.log(screenSendData);
     console.log('screenSendData');
    let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
        // console.log(staff_admin);
        if(vendorDetail){
          setAuthorizationToken(vendorDetail.token);
        }
       // let imageUrl=screenShots[0];
       //  // let imageDataUrl=imageUrl.split("'");
       //  let block = imageUrl.split(";");
       //  let contentType=block[0].split(":")[1];
       //  let realData = block[1].split(",")[1];
       //  let imagesData = b64toBlob(realData, contentType);
       //  console.log(contentType);
       //  console.log(realData);
       // console.log(imagesData);
      if(screenSendData){

    let form_data = new FormData();
      form_data.append('images[]',screenSendData,'png');
    //   console.log(form_data);
    //   const imageForm=form_data.get('captureImage');
    //   screenSendData
    axios.post('partner/request/pickup',form_data,
                      {
                          headers: {
                          'Accept': 'image/png',
                          'content-type': 'file.type'
                        }
                      })
                     .then((res) => {
                         console.log(res);

                         console.log('Upload success');
                     })
                    .catch((err) => {
                         console.log(err.response);

                    });
    }
      else{
          console.log('clicked piture in empty');
      }
  }
  return (
      <>
                <Dialog
                    open={open}
                    fullScreen
                    onClose={handleClose}>
                  <div style={{ justifyContent: "center", textAlign: "center" }}>
                    <div style={{ padding: "0px" }}>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        minScreenshotHeight={200}
                        screenshotQuality={1}
                        minScreenshotWidth={100}
                        forceScreenshotSourceSize
                        onUserMediaError={showOpenbtn}
                        onUserMedia={() => {
                          setDisableCapture(false);
                        }}

                        height={"100%"}
                        width={"100%"}
                        screenshotFormat="image/png"
                        videoConstraints={{
                          height: 1080,
                          width: 1920,
                          facingMode: "environment"
                        }}
                      />
                    </div>
                    <div style={{ margin: "20px" }}>
                      {screenShots.map((item, index) => {
                        return (
                          <span style={{ marginRight: "10px",width:'100%',height:'100%',overflow:'hidden' }} key={index}>
                              {/*<img src={item} className="img-fluid" alt={index}></img>*/}
                              <Image src={item} alt={index} fluid />
                          </span>
                        );
                      })}

                            {/*<img src={screenShots[0]}></img>*/}

                    </div>
                      <Row>
                          <Col>
                              <div style={{ marginTop: "15px" }}>
                                  {
                                      screenSendData?<>
                                                      <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={reCapture}
                                                disabled={disableCapture}
                                              >
                                                ReCapture
                                              </Button>
                                             </>:<>
                                                  <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={capture}
                                                        disabled={disableCapture}
                                                      >
                                                        Capture
                                                      </Button>
                                                </>
                                  }
                                  {/*<Button*/}
                                  {/*  variant="contained"*/}
                                  {/*  color="primary"*/}
                                  {/*  onClick={capture}*/}
                                  {/*  disabled={disableCapture}*/}
                                  {/*>*/}
                                  {/*  Capture*/}
                                  {/*</Button>*/}
                              </div>
                          </Col>
                          <Col>
                              <div style={{ marginTop: "15px" }}>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={upload}
                                    disabled={disableCapture}
                                  >
                                   Upload
                                  </Button>
                              </div>
                          </Col>
                          <Col>
                              <div style={{ marginTop: "15px" }}>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleClose}
                                    disabled={disableCapture}
                                  >
                                  close
                                  </Button>
                              </div>
                          </Col>

                      </Row>

                  </div>
                </Dialog>
          </>
  );
};
export default WebcamCapture
