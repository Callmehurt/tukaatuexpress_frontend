import React, {useEffect, useState} from "react";
import {fetchIDCardRecords} from "../../../../redux/actions/IDCardAction";
import {useDispatch, useSelector} from "react-redux";
import IDCardTable from "./IDCardTable";
import axios from "axios";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import showNotification from "../../includes/notification";
import checkToken from "../../../../utils/checkToken";

const IDCard = () => {

    const dispatch = useDispatch();

    const idCardList = useSelector((state) => state.idCard.idCardList);

    const [token, setToken] = useState('');

    useEffect(() => {
        dispatch(fetchIDCardRecords());
    }, [])

    useEffect(()=>{
        let hrAdmin = JSON.parse(localStorage.getItem('staff_hrAdmin'));
        if(hrAdmin){
            setToken(hrAdmin.token)
          setAuthorizationToken(hrAdmin.token);
        }

    },[]);

    const addIDCard = async () => {
        checkToken(token, 'staff_hrAdmin');
        await axios.get('/hr/add/id-card').then((res) => {
            if(res.data.status === true){
                 dispatch(fetchIDCardRecords());
                 showNotification('success', res.data.message);
            }else {
                 showNotification('danger', res.data.message);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
        <button className="btn btn-sm btn-primary mt-3 mb-3" onClick={() => addIDCard()}>Generate New Card</button>
        <IDCardTable list={idCardList}/>
        </>
    )
}

export default IDCard;