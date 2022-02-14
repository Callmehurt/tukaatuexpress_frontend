import React, {useEffect} from 'react';
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getApprovedReturnStatement} from './../../../redux/actions/vendor';
import {Button, Card, Col, Row} from "react-bootstrap";
import Avatar from "react-avatar";
import ApprovedStatementSingleCard from "./ApprovedStatementSingleCard";

const ApprovedReturnStatement=()=>{
    const history = useHistory();
     const dispatch = useDispatch();
     const vendor = useSelector((state) => state.vendor);
     const allApprovedReturnStatement = vendor.allApprovedReturnStatement;
    useEffect(()=>{
         let vendorDetail = JSON.parse(localStorage.getItem('vendorDetail'));
            // console.log(staff_admin);
            if(vendorDetail){
              setAuthorizationToken(vendorDetail.token);
            }
            getApprovedReturnStatementList();

     },[]);
    const getApprovedReturnStatementList=()=>{
            axios.get('/partner/my/return/statements')
                    .then((res)=>{
                        console.log(res);
                        console.log(res.data.approved);
                        dispatch(getApprovedReturnStatement(res.data.approved));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })

        }
    return(
        <>
    {Object.keys(allApprovedReturnStatement).length === 0 ? (
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
                    {allApprovedReturnStatement.map((data, index) => {
                        return (
                            <>
                                <ApprovedStatementSingleCard item={data}/>
                            </>
                        )
                    })}
                </>
            )}
        </>
    )
}
export default ApprovedReturnStatement