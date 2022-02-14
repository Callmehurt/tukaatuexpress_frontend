import React, {useEffect} from 'react';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {useDispatch, useSelector} from "react-redux";
import VendorReturnPickupList from "./VendorReturnPickupList";
import VendorReturnPickupPendingStatement from "./VendorReturnPickupPendingStatement";
import VendorReturnPickupApprovedStatement from "./VendorReturnPickupApprovedStatement";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import {useHistory, useParams} from "react-router-dom";
import {fetchPartnerReturnDetails, fetchPartnerReturnStatements, removePartnerReturnDetails} from "../../../../../redux/actions/partnerReturnStatementAction";

const VendorReturnPickup=()=>{

    const {partner_id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const partnerReturnDeliveries = useSelector((state) => state.partnerReturnDetails.returnDeliveries);
    const partnerPendingReturnStatements = useSelector((state) => state.partnerReturnDetails.pendingReturnStatements);
    const partnerApprovedReturnStatements = useSelector((state) => state.partnerReturnDetails.approvedReturnStatements);

    useEffect(()=>{
         let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
         if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
         }else{
            history.push('/admin/login');
         }

         return () => {
             dispatch(removePartnerReturnDetails());
         }

     },[]);

    useEffect(() => {
        if(partner_id && partner_id !== ''){
            dispatch(fetchPartnerReturnDetails(partner_id));
            dispatch(fetchPartnerReturnStatements(partner_id))
        }
    }, [partner_id])


    return(
        <>

             <Tabs
            defaultActiveKey="partnerAllReturns"
            transition={false}
            className="mb-0 mt-3"
              >
                <Tab eventKey="partnerAllReturns" title={<>
                       <div style={{fontSize:'13px'}}>
                            All Returns
                            <span>
                                {Object(partnerReturnDeliveries).length}
                             </span>
                       </div>
                    </>}
                >
                   <div>
                     <VendorReturnPickupList returns={partnerReturnDeliveries} />
                   </div>
                </Tab>
                <Tab eventKey="partnerAllReturnPendingStatement" title={<><div style={{fontSize:'13px'}}>All Returns Pending Statements
                    <span>
                        {Object(partnerPendingReturnStatements).length}
                    </span></div></>}>
                   <div>
                       <VendorReturnPickupPendingStatement statements={partnerPendingReturnStatements} />
                   </div>
                </Tab>
                  <Tab eventKey="partnerAllReturnApprovedStatement" title={<><div style={{fontSize:'13px'}}>All Returns Approved Statements
                      <span>
                          {Object(partnerApprovedReturnStatements).length}
                      </span></div></>}>
                   <div>
                       <VendorReturnPickupApprovedStatement statements={partnerApprovedReturnStatements} />
                   </div>
                </Tab>
            </Tabs>

        </>
    )
}
export default VendorReturnPickup