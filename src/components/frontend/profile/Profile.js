import React, {useEffect, useState} from "react";
import {Spinner} from "react-bootstrap";
import axios from "axios";
import {useParams} from "react-router-dom";

const Profile = () => {

    const {card_num} = useParams();
    console.log(card_num)
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, [card_num])

    const loadProfile = async () => {
        const response = await axios.get(`/get/staff/profile/${card_num}`).catch((err) => {
            console.log(err)
        })
        console.log(response)
        if(response.data.status == true){
            setLoading(false)
            let ele = document.getElementById('profile');
            ele.innerHTML = response.data.profile;
            console.log(ele)
        }else {
            setLoading(false)
            let ele = document.getElementById('profile');
            ele.innerHTML = response.data.error;
        }
    }

    return (
        <>
        {isLoading ? (
            <>
                <div style={{height: '100%', width: '100%',display: 'grid', placeItems: 'center', paddingTop: '10rem'}}>
                    <h5>Loading...<Spinner animation="border" /></h5>
                </div>
            </>
        ) : (
         <>
           <div id="profile">
            </div>
         </>
        )}
        </>
    )
};

export default Profile;
