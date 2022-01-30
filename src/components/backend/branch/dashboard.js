import React, {useState} from "react";
import axios from "axios";
// import {useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
// import VendorCreate from "./vendor/create";
import {Row, Col} from "react-bootstrap";
import ForPdfViewer from './ForPdfViewer';
import ReactModal from 'react-modal-resizable-draggable';



const BranchDashboard = () => {

    const history = useHistory();
    const [modalOpen,setModalOpen]=useState(false);
    // const logout = async () => {
    //     let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
    //     if(branch_detail){
    //       setAuthorizationToken(branch_detail.token);
    //     }
    //     await axios.get('/branch/logout')
    //         .then(res => {
    //             localStorage.removeItem('branch_detail');
    //             history.push('/branch/login');
    //         }).catch(err => {
    //             console.log(err.response.data);
    //         })
    // }
    const openModal=()=>{
        setModalOpen(true);

    }
    const closeModal=()=>{
         setModalOpen(false);
    }
    return (
        <>
           <Row>
               <Col lg={6}>
                    {/*<h1>Hello user </h1>*/}
                   <button onClick={openModal}>
                      Open modal
                  </button>
                   <ReactModal
                       initWidth={800}
                       initHeight={500}
                       style={{overflow:'hidden',height:'500px',}}
                       isOpen={modalOpen} onRequestClose={closeModal}><ForPdfViewer /> </ReactModal>
                   {/*<ForPdfViewer />*/}
               </Col>

           </Row>
        </>
    )
}

export default BranchDashboard;