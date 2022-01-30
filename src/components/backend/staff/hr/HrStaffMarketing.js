import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {RiFileAddFill} from "react-icons/ri";
import MarketingDatatables from "./MarketingDatatables";

const HrStaffMarketing=()=>{

    return(
        <>
            <Link to="/hr/staff/marketing_create"> <Button  className="mt-3" style={{border:'1px solid #147298',borderRadius:'10px',backgroundColor:'#147298',color:'#fff',marginBottom:'15px',left:'20px'}}><RiFileAddFill size={20}/><span style={{fontSize:'15px',paddingLeft:'8px',marginTop:'5px',zIndex:'99',}}>Add New Marketing</span></Button> </Link>

           <MarketingDatatables />
        </>
    )
}
export default HrStaffMarketing