import React, {useEffect} from 'react';
import setAuthorizationToken from "./../../../utils/setAuthorizationToken";
import axios from "axios";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import PickupImageRequest from "./PickupImageRequest";
import EntryPickupDatatables from "./EntryPickupDatatables";

const PickupRequest =()=>{
     const history = useHistory();
      const entryOperator = useSelector((state) => state.entryOperator);
       const allEntryPickups=entryOperator.allEntryPickups;
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
            <Tabs
            defaultActiveKey="pickupRequest"
            transition={false}
            className="mb-0 mt-3"
              >
                <Tab eventKey="pickupRequest" title={<><div style={{fontSize:'13px'}}>New Requests <span>
                    {/*{*/}
                    {/*    partnerRequest.length?*/}
                    {/*        <>*/}
                    {/*            {partnerRequest.length}*/}
                    {/*        </>:*/}
                    {/*        <>*/}
                    {/*            0*/}
                    {/*        </>*/}
                    {/*}*/}0
                </span></div></>}>

                    <PickupImageRequest />
                </Tab>
                 <Tab eventKey="pickupEntryList" title={<><div style={{fontSize:'13px'}}>New Entry List <span>
                    {
                        allEntryPickups.length?
                            <>
                                {allEntryPickups.length}
                            </>:
                            <>
                                0
                            </>
                    }
                </span></div></>}>

                    <EntryPickupDatatables />
                </Tab>
            </Tabs>

        </>
    )

}
export default PickupRequest