import React, {useEffect, useState} from 'react';
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";

const ImageDisplayPickup=(props)=>{
    const[img_id,setImg_id]=useState(props.imgId);
    const[imageUrl,setImageUrl]=useState('');
    useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
        getImagePickupRequest();
    });
    const getImagePickupRequest=(img_id)=>{
        if(img_id){
            axios.get(`/admin/partner/pickup/request/detail/${img_id}`)
                    .then((res)=>{
                        console.log(res.data);
                        setImageUrl(res.data);
                        // dispatch(getPartnerRequestDetail(res.data));


                    })
            .catch((err)=>{
               console.log(err.response);
            })

        }
        else{
            console.log('wait for time');
        }

    }
    return(
        <>
            <h6>{img_id}</h6>
            <img src={imageUrl.image} className="img-fluid" />

        </>
    )
}
export default ImageDisplayPickup