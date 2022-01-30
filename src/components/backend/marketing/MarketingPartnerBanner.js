import React, {useState} from 'react';
import BannerDatatables from "./BannerDatatables";
import {Button,Row,Col,Form} from "react-bootstrap";
import axios from "axios";
import notification from "../includes/notification";
import {getBannerListMarketing} from "../../../redux/actions/Marketing";
import {useDispatch} from "react-redux";

const MarketingPartnerBanner=()=>{
     const dispatch = useDispatch();
    const [showBannerField,setShowBannerField]=useState(false);
    const[bannerUpload,setBannerUpload]=useState(false)

    const handleClickImage=(event)=>{
        console.log(event.target.value);

    }
    const[banner,setBanner]=useState([]);
     const selectFiles = (event) => {
          console.log(event.target.files);
         setBanner(event.target.files)
          // setInvoiceFiles(event.target.files);
          //  const newField = {...formField}
          //  // const newArray = array.push(invoiceFiles);
          //  newField.invoices=[event.target.files];
          //
          // setFormField(newField);

      }
      const getBannerList=()=>{
            axios.get('/marketing/list/banners')
            .then((res) => {
                console.log(res);
                dispatch(getBannerListMarketing(res.data));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
      const uploadFiles = () => {
          // console.log(formField);
          setBannerUpload(true);
          const imagesData = new FormData();
          imagesData.append('banner',banner[0]);
          console.log(banner);
          // axios.post("/account/make/partner/payment/statement", formField, {
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //   },
          // });
          console.log(imagesData);
          axios.post('/marketing/upload/banner',imagesData,{
                          headers: {
                          'Content-Type': 'multipart/form-data; '
                        }
                      })
            .then((res) => {
                console.log(res);

                console.log(res.data);
                if(res.data.status === true){
                    notification('success', res.data.message);
                    setBanner([]);
                    setShowBannerField(false);
                    getBannerList();


                    // console.log(formField);
                    // clearform();
                    // setLoading(false);
                    // history.push('/account/Account_Division');
                }else {
                    notification('success', res.data.message);
                     setBannerUpload(false);
                }
            })
            .catch((err) => {
                console.log(err.response)
            })


        // setMessage([]);
  };


    return(
        <>
            <Row>
                <Col lg={12} className="pb-4">
                    {showBannerField?<><Button className="customBtn" onClick={() => setShowBannerField(false)} style={{marginTop: '1rem'}}>Close Upload</Button>
                     </>:<>  <Button className="customBtn" onClick={() => setShowBannerField(true)} style={{marginTop: '1rem'}}>Upload Image</Button>
                     </>
                    }
                </Col>
                 {showBannerField?
                     <>
                        <Col lg={12} className="pt-5 pb-5" style={{backgroundColor:'#f7fafb'}}>

                               <Form>
                                   <h6 className="text-center">Attach Files:</h6>
                                   <div style={{display:'flex',placeContent:'center'}}>

                                          <label className="btn btn-default p-0 pl-5">

                                              <input defaultValue={banner} type="file" name="file" accept="image/*"  onChange={selectFiles} />
                                          </label>
                                   </div>
                                   <div style={{display:'flex',placeContent:'center'}}>
                                       {bannerUpload?
                                           <>
                                               <Button className="customBtn "  style={{marginTop: '1rem'}} >Submiting...</Button>

                                           </>:
                                           <>
                                               <Button className="customBtn "  style={{marginTop: '1rem'}} onClick={uploadFiles}>Submit</Button>

                                           </>

                                       }
                                   </div>
                               </Form>
                        </Col>
                      </>:
                     <>
                         <Col lg={12}>

                         </Col>
                     </>
                 }

                <Col lg={12}>
                      <BannerDatatables />
                </Col>
            </Row>
        </>
    )
}
export default MarketingPartnerBanner