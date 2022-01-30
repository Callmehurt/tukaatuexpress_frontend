import React from "react";
import {useHistory} from 'react-router-dom'
import {Row,Col,Button} from 'react-bootstrap'


const PushHistoryOnly = () =>{
    const history = useHistory();
    const handleClickPush=()=>{
        history.push('/account/paymentcalculation');
    }
    return(
        <>
                     <Button variant="secondary" style={{backgroundColor:'#147298',border:'1px solid #147298',borderRadius:'5px',width:'100%'}} onClick={handleClickPush}>ok</Button>
        </>
    )
}
export default PushHistoryOnly