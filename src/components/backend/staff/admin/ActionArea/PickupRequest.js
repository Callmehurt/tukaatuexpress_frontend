import React, {useEffect} from 'react';
import setAuthorizationToken from "./../../../../../utils/setAuthorizationToken";
import axios from "axios";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import OnProcessPickups from "./OnProcessPickups";
import CompletedPickups from "./CompletedPickups";
// import WarehouseDatatables from "./warehouseDatatables";
// import WarehouseSameDayDatatables from "./warehouseSameDayDatatables";
import PickupRequestDatatable from "./PickupRequestDatatable";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const PickupRequest =()=>{
     const history = useHistory();
    const thisState = useSelector((state) => state.branchOperation);
     const allProcessRequests=thisState.allProcessRequest;
     const allCompleteRequests=thisState.allCompleteRequest;
     const partnerRequest = thisState.partnerRequest;
    useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
        }else{
             history.push('/admin/login');
        }
        getNewPickupRequest();
    },[]);
    const getNewPickupRequest=()=>{
        axios.get('admin/partner/requests')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }
    return(
        <>
             <Tabs
            defaultActiveKey="pickupRequest"
            transition={false}
            className="mb-0 mt-3"
              >
                <Tab eventKey="pickupRequest" title={<><div style={{fontSize:'13px'}}>New Requests <span>
                    {
                        partnerRequest.length?
                            <>
                                {partnerRequest.length}
                            </>:
                            <>
                                0
                            </>
                    }
                </span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       {/*<WarehouseDatatables />*/}
                       <PickupRequestDatatable />
                   </div>
                </Tab>
                <Tab eventKey="proceedRequest" title={<><div style={{fontSize:'13px'}}>
                        On Process Pickups
                        <span>
                            {
                              allProcessRequests.length?
                                <>
                                    {allProcessRequests.length}
                                </>:
                                <>
                                    0
                                </>
                            }
                        </span>
                     </div>
                    </>} >
                   <div style={{minHeight:'150vh'}}>
                       {/*<WarehouseSameDayDatatables />*/}
                       <OnProcessPickups />
                   </div>
                </Tab>
                 <Tab eventKey="completedRequest" title={<><div style={{fontSize:'13px'}}>Completed Pickups<span>
                     {
                     allCompleteRequests.length?
                         <>
                             {allCompleteRequests.length}
                         </>:
                         <>
                             0
                         </>

                 }</span></div></>}>
                   <div style={{minHeight:'150vh'}}>
                       {/*<WarehouseSameDayDatatables />*/}
                      <CompletedPickups />
                   </div>
                </Tab>
            </Tabs>
        </>
    );
}

export default PickupRequest