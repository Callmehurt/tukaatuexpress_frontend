import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {returnsOrderList} from "../../../redux/actions/vendor";
import Tab from "react-bootstrap/Tab";
import PendingReturnOrders from "./PendingReturnOrders";
import ConfirmedReturnOrders from "./ConfirmedReturnOrders";
import Tabs from "react-bootstrap/Tabs";
import PendingReturnStatement from './PendingReturnStatement';
import ApprovedReturnStatement from "./ApprovedReturnStatement";

const ReturnStatements=()=>{
     const history = useHistory();
     const dispatch = useDispatch();
     const vendor = useSelector((state) => state.vendor);
      useEffect(()=>{
         let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
            if(vendorDetail){
              setAuthorizationToken(vendorDetail.token);
            }
            getReturnStatementList();
     },[]);
       const getReturnStatementList=()=>{
            axios.get('/partner/my/return/statements')
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data);
                        // dispatch(returnsOrderList(res.data));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })

        }

    return(
        <>

            <Tabs
                    defaultActiveKey="pendingReturnStatement"
                    transition={false}
                    className="mb-0 mt-3"
                      >
                      <Tab eventKey="pendingReturnStatement" title={'Pending stat.'}>
                        <div >
                            <PendingReturnStatement />
                        </div>
                      </Tab>
                      <Tab eventKey="ApprovedReturnStatement" title="Approved stat.">
                          <div >
                             <ApprovedReturnStatement />
                          </div>
                      </Tab>
            </Tabs>
        </>
    )
}
export default ReturnStatements