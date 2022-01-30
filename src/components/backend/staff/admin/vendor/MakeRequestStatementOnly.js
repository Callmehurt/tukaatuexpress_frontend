import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import axios from "axios";

const MakeRequestStatementOnly=()=>{
    const[loading,setLoading]=useState(false);
    const handleClickPush=()=>{
        setLoading(true);
        axios.post('/admin/make/partner/return/statement')
            .then((res) => {
                console.log(res);
                setLoading(false);

            })
            .catch((err) => {
                console.log(err.response.data);
                 setLoading(false);
            })
    }
    return(
        <>
            {loading?<>
                            <Button variant="secondary" style={{backgroundColor:'#147298',border:'1px solid #147298',borderRadius:'5px',width:'100%'}} onClick={handleClickPush}>Make Statement</Button>

                </>:
                <>
                                <Button variant="secondary" style={{backgroundColor:'#147298',border:'1px solid #147298',borderRadius:'5px',width:'100%'}} disabled={true}>Make Statement</Button>

                </>

        }
        </>
    )
}
export default MakeRequestStatementOnly