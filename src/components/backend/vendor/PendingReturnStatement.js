import React, {useEffect} from 'react';
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {getApprovedReturnStatement, returnsOrderList} from "../../../redux/actions/vendor";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPendingReturnStatement} from './../../../redux/actions/vendor';
import StatementItem from "./SingleStatementCard";
import {Col} from "react-bootstrap";

const PendingReturnStatement=()=>{
    const history = useHistory();
     const dispatch = useDispatch();
     const vendor = useSelector((state) => state.vendor);
     const allPendingReturnStatement = vendor.allPendingReturnStatement;
    useEffect(()=>{
         let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
            if(vendorDetail){
              setAuthorizationToken(vendorDetail.token);
            }
            getPendingReturnStatementList();

     },[]);

    const getPendingReturnStatementList = () =>{
             axios.get('/partner/my/return/statements')
                    .then((res)=>{
                        dispatch(getPendingReturnStatement(res.data.pending));
                         dispatch(getApprovedReturnStatement(res.data.approved));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })

        }
    return(
        <>
            {Object.keys(allPendingReturnStatement).length === 0 ? (
                <Col xs={12}>
                   <div style={{
                       height: '60vh',
                       display: 'grid',
                       placeContent: 'center',
                       fontSize: '16px',
                       fontWeight: '500'
                   }}>No statements found
                   </div>
                </Col>
            ): (
                <>
                    {allPendingReturnStatement.map((data, index) => {
                        return (
                            <>
                                <StatementItem item={data} pendingStatementFetching={getPendingReturnStatementList} />
                            </>
                        )
                    })}
                </>
            )}
        </>
    )
}
export default PendingReturnStatement