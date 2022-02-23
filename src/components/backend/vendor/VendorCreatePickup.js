import React, {useEffect, useState} from 'react';
import {Row, Col, Form, Button, Spinner} from 'react-bootstrap';
import axios from "axios";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import config from "react-reveal/src/lib/globals";
import notification from "../includes/notification";
import {useHistory} from "react-router-dom";


const VendorCreatePickup=()=>{
      const history = useHistory();
      const [selectedFiles, setSelectedFiles] = useState(undefined);
      const [loading,setLoading]=useState(false);
      const [formField,setFormField]=useState({
             images:[],
      });
      useEffect(()=>{
          let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
          if(vendorDetail){
                  setAuthorizationToken(vendorDetail.token);
          }
      },[]);
      const selectFiles = (event) => {
          setSelectedFiles(event.target.files);
      }
      const postToServer=()=>{
                  console.log(selectedFiles);
                  const imagesData = new FormData();
                    selectedFiles.forEach(file=>{
                      imagesData.append("images[]", file);
                    });
                    setLoading(true);
                  axios.post('partner/request/pickup', imagesData,
                      config({
                           headers: {
                            "content-type": "multipart/form-data"
                          }
                      })
                      )
                     .then((res) => {
                         if(res.data.status === true){
                            notification('success', res.data.message);
                            history.push('/vendor/Pickup_request_area');
                        }
                         else {
                            notification('danger', res.data.message);
                        }
                     })
                    .catch((err) => {
                         console.log(err.response);
                    });
      }

      return(
          <>
              <div style={{height:'100vh',display:'grid',placeContent:'center'}}>
                  <Row>
                      <Col lg={12}>
                           <h6 className="d-flex justify-content-center">Attach Files:</h6>
                          <div className="d-flex justify-content-end pt-2">

                                 <label className="btn btn-default p-0">
                                     <input type="file" name="file"  multiple onChange={selectFiles} />
                                </label>
                          </div>
                    </Col>
                      {selectedFiles?
                          <>
                              <Col lg={12}>
                                  <div className="d-flex justify-content-center pt-3">
                                      {loading?
                                          <>

                                              <button
                                                className="btn btn-success btn-sm"
                                                disabled={!formField}

                                                style={{padding:'5px 15px'}}>
                                                uploading ...
                                              </button>
                                          </>:
                                          <>
                                               <button
                                                className="btn btn-success btn-sm"
                                                disabled={!formField}
                                                onClick={postToServer}
                                                style={{padding:'5px 15px'}}>
                                                upload photos
                                              </button>
                                          </>

                                      }
                                  </div>
                              </Col>
                          </>:
                          <>

                          </>
                      }

                  </Row>
              </div>
          </>
      );
 }
export default VendorCreatePickup