import React, {useEffect} from 'react';
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useHistory} from "react-router-dom";
import {Row,Col} from 'react-bootstrap';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {entryOperatorAllImageRequestList} from './../../../redux/actions/EntryOperator'

const PickupImageRequest=()=>{
     const history = useHistory();
      const dispatch = useDispatch();
       const entryOperator = useSelector((state) => state.entryOperator);
       const allRequestImageList = entryOperator.allRequestImage;
    useEffect(()=>{
        let entryOperator = JSON.parse(localStorage.getItem('Entry_Operator'));
        if(entryOperator?.token){
          setAuthorizationToken(entryOperator.token);
        }else{
             history.push('/entry/login');
        }
        getImagePickupRequest();

    },[]);
    const pushEntryImage=(entryImageData)=>{
        history.push({
            pathname:'create/entry/image/pickup',
            state:{entryImage:entryImageData.image_url, entryImageData:entryImageData.request}

        })

    }
    const getImagePickupRequest=()=>{
        axios.get('entry_operator/get/image/requests')
            .then((res) => {
                console.log(res);
                dispatch(entryOperatorAllImageRequestList(res.data));

            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    return(
        <>
            <Row>
            {allRequestImageList.map((dataImage)=>(
                <>

                        <Col lg={2} className="pt-3">
                            <img src={dataImage[0]?.image_url} onClick={(event)=>pushEntryImage(dataImage[0])} className="img-fluid" />
                        </Col>


                </>
                ))}
            </Row>

        </>
    )
}
export default PickupImageRequest