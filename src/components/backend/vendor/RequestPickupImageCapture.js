import React, {useState,useEffect} from 'react';
import {Row,Col,Button} from 'react-bootstrap';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import "react-html5-camera-photo/build/css/index.css";
import { SRLWrapper } from "simple-react-lightbox";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useHistory} from "react-router-dom";
import axios from "axios";
import config from "react-reveal/src/lib/globals";
import notification from "../includes/notification";
import {TiDelete} from 'react-icons/ti';
import EmptyImage from './../../../logo.svg';

const RequestPickupImageCapture=()=>{
        const history = useHistory();
        const[facingBoolValue,setFacingBoolValue]=useState(1);
        const[imageButtonLoading,setImageButtonLoading]=useState(false);
        const[count,setCount]=useState(0);
        const[cameraDisable,setCameraDisable]=useState(false);
        const[facingModeString,setFacingModeString]=useState('FACING_MODES.ENVIRONMENT');
        const[imageDisplay,setImageDisplay]=useState([]);
        const [blobImage,setBlobImage]=useState([]);
        useEffect(()=>{
        let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
          if(vendorDetail){
                  setAuthorizationToken(vendorDetail.token);
          }
          else{
              history.push('/');
          }
        },[]);
        const handleTakePhoto = (dataUri) =>{

        // const captureImages={...imageDisplay}
        //     captureImages.image.push(dataUri);
            console.log(dataUri);
            let imagesData = dataURItoBlob(dataUri);
            // let filesImage =
            const imageFile = new File([imagesData], count+'.png');
            setBlobImage(oldBlobArray => [...oldBlobArray, imageFile]);
            setCount(count+1);
            console.log(blobImage);
            setImageDisplay(oldArray => [...oldArray, dataUri]);
            // Do stuff with the photo...
            console.log('takePhoto');
            console.log(imageDisplay);
        }
        const dataURItoBlob =(dataURI)=>{
            let byteString = atob(dataURI.split(',')[1]);
            // separate out the mime component
              let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
              let ab = new ArrayBuffer(byteString.length);
              let ia = new Uint8Array(ab);
              for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
              }
              let blob = new Blob([ab], {type: "image/png"});
              return blob;
        }
        const makeGallery=()=>{
            if(cameraDisable){
               setCameraDisable(false);
            }
            else{
                setCameraDisable(true);
            }

        }
        const OpenAgainToCamera=()=>{
            setCameraDisable(false);
        }
        const submitData = () =>{
                   console.log(blobImage);
                   console.log('blobImage');
                   const imagesData = new FormData();
                    blobImage.forEach(file=>{
                        console.log(file);
                      imagesData.append("images[]", file);
                    });
                    console.log(imagesData);
                  //    console.log('images Data');
                  // console.log('selected files');
                  // const formData = new FormData();
                  // formData.append('images[]',{images});
                  axios.post('partner/request/pickup', imagesData,
                      config({
                           headers: {
                            "content-type": "multipart/form-data"
                          }
                      })
                      )
                     .then((res) => {
                         console.log('Upload success');
                         console.log(res);
                         if(res.data.status === true){
                            notification('success', res.data.message);
                            // console.log(formField);
                            // clearform();
                            // setLoading(false);
                            history.push('/vendor/Pickup_request_area');
                        }else {
                            notification('danger', res.data.message);
                        }
                         console.log(res.data);
                          // console.log(res.data);
                     })
                    .catch((err) => {
                         console.log(err.response);
                    });
      }
        const getArrayValue=(id)=>{
            console.log(id);
             console.log('remove value');
            let removeArray=blobImage;
            let RemoveString=imageDisplay;
            console.log(removeArray[id]);
            let filtered = [];
            let sendData=[];
            for (let i = 0; i < removeArray.length; i++) {
                if (removeArray[i]!=removeArray[id]) {
                    filtered.push(RemoveString[i]);
                    sendData.push(removeArray[i]);
                }
                else{
                     // const imagesData = new FormData();
                     // let emptyImage='data:image/png;base64,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';
                     // // imagesData.append("images[]", EmptyImage);
                     // filtered.push(emptyImage);
                }
            }
            setBlobImage(sendData);
            setImageDisplay(filtered);

             // let filtered = removeArray.filter(function(value, index, arr){
             //   return value[index]==id;
             // });
             console.log(filtered);
             console.log('filtered');

        }

    return(
        <>


            {cameraDisable?
                <>
                    <Button variant="primary" onClick={(event)=>OpenAgainToCamera()}>Open Camera</Button>

                </>:
                <>

                </>
             }
            {cameraDisable?
                <>
                    {blobImage?
                        <>
                            {imageButtonLoading?
                                    <>
                                        <Button variant="primary">Upload Loading ...</Button>

                                    </>:
                                    <>
                                        <Button variant="primary" onClick={(event)=>submitData()}>Upload Photo</Button>

                                    </>
                                }
                        </>:
                        <>
                        </>

                    }



                </>:
                <>

                </>
            }
            {cameraDisable?
                <>
                </>:
                <>
                    <Row>
                          <Col xs={12}>
                            <div style={{height:'71vh',paddingLeft:'5px',paddingRight:'5px',position:'relative'}}>
                            {/*<BootstrapSwitchButton onChange={(event)=>changeFacingMode()} checked={true} width="75" onlabel="Back" offlabel="Front" onstyle="info" />*/}
                                 <Camera
                                     style={{borderRadius:'15px'}}
                                     // isFullscreen={true}
                                     imageCompression = {0.97}
                                     idealFacingMode = {FACING_MODES.ENVIRONMENT}
                                     isImageMirror={false}
                                     sizeFactor={1}
                                      imageType = {IMAGE_TYPES.PNG}
                                     idealResolution = {{width: 375, height: 482}}
                                     onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                                 />
                                <div style={{width:'100%',position:'absolute',top:'10px',}}>
                                    <Button variant="primary" onClick={(event)=>makeGallery()}>View Gallery</Button>
                                </div>

                        </div>
                          </Col>
                    </Row>
                </>

            }
            {cameraDisable?
                <>
                    <SRLWrapper>
                        <Row  style={{maxHeight:'75vh',width:'100%',overflowX:'auto',display:'flex',flexDirection:'row',marginTop:'0px',paddingLeft:'10px',paddingRight:'0px'}}>

                {imageDisplay?
                    <>
                        {
                            imageDisplay.map((items,index)=>(

                                <>
                                   <Col xs={4} className="pt-2 pr-0" >
                                         <div style={{position:'relative',display:'flex'}}>
                                               <a href={items}  style={{display:'flex',position:'relative'}}>
                                                    <div style={{paddingLeft:'5px',paddingRight:'5px'}}>
                                                        <img src={items} className="img-fluid" style={{paddingTop:'0px',borderRadius:'15px'}} />
                                                    </div>
                                               </a>
                                               <div style={{position:'absolute',top:'5px',right:'5px'}}>
                                                       <Button variant="danger" className="p-0" onClick={(event)=>getArrayValue(index)}><TiDelete size={20} /></Button>
                                               </div>
                                         </div>
                                  </Col>
                                </>
                            ))
                        }

                    </>:
                    <>
                         <Col xs={3}>
                           <div style={{paddingLeft:'5px',paddingRight:'5px',height:'300px',width:'300px',borderStyle:"dashed"}}>
                              No Image
                           </div>

                        </Col>
                    </>
                }


        </Row>
                    </SRLWrapper>
                </> :
                <>
                    <SRLWrapper>
                        <Row  style={{maxHeight:'20vh',width:'100%',overflowX:'auto',display:'flex',flexDirection:'row',flexWrap:'initial',marginTop:'0px',height:'100px',paddingLeft:'10px'}}>

                            {imageDisplay?
                            <>
                                {
                                    imageDisplay.map((items,index)=>(
                                        <>
                                           <Col xs={2} className="p-0">
                                               <div style={{position:'relative',display:'flex'}}>
                                                   <a href={items}  style={{display:'flex',position:'relative'}}>
                                                    <div style={{paddingLeft:'5px',paddingRight:'5px'}}>
                                                        <img src={items} className="img-fluid" style={{paddingTop:'0px',borderRadius:'15px'}} />
                                                    </div>
                                                   </a>

                                               </div>
                                          </Col>
                                        </>
                                    ))
                                }

                            </>:
                            <>
                                 <Col xs={3}>
                                   <div style={{paddingLeft:'5px',paddingRight:'5px',height:'300px',width:'300px',borderStyle:"dashed"}}>
                                    No Image
                                </div>

                                </Col>
                            </>
                            }


                       </Row>
                    </SRLWrapper>
                </>
            }
            </>
    );
}
export default RequestPickupImageCapture