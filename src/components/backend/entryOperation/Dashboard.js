import React, {useEffect} from 'react';
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useHistory} from "react-router-dom";

const Dashboard=()=>{
     const history = useHistory();
    useEffect(()=>{
        let entryOperator = JSON.parse(localStorage.getItem('Entry_Operator'));
        if(entryOperator?.token){
          setAuthorizationToken(entryOperator.token);
        }else{
             history.push('/entry/login');
        }
    },[]);

    return(
        <>
            {/*<h5>Dashboard Entry</h5>*/}
        </>
    )
}
export default Dashboard