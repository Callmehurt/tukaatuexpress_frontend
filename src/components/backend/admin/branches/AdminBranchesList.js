import React from 'react'
import{Row,Col,Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import BranchesDatatables from "./BranchesDatatables";
import {useHistory} from 'react-router-dom';

const AdminBranchesList =()=>{
    const history=useHistory();
    const createNew =()=>{
         history.push('/mainadmin/branch/create');
    }

    return(
        <>
            <Row style={{paddingBottom:'15px',paddingTop:'15px'}}>
                <Col md={2}>
                    <h3>Branch List</h3>
                </Col>
                <Col md={2}>
                    <Button variant="outline-warning" onClick={(event)=>createNew()}>Create New</Button>
                </Col>
            </Row>
            <BranchesDatatables />
        </>
    )
}
export default AdminBranchesList