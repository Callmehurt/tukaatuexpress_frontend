import React, {useEffect, useState} from 'react'
import {Button, Col, Dropdown, Form, Modal, Row,} from 'react-bootstrap';
import icon from '../../../assets/faviconwhite.png';
// import {adminStaffLogout} from "../../../redux/actions/adminStaffAuthenticate";
import {branchLogout} from "../../../redux/actions/branchAuthenticate";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";

import {loadPartnerList} from "../../../redux/actions/loadPartnerList";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useForm} from "react-hook-form";
import notification from "./notification";

const ProfileBox = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {register, handleSubmit, errors} = useForm();
      const [passwordShow, setPasswordShow] = useState(false);
      const [loadingPasswordChange,setLoadingPasswordChange]=useState(false);
      const [formField,setFormField]=useState({
           new_password:'',
           old_password:'',
           confirm_password:'',
      });
      const [formerrors, setFormerrors ] = useState({});
      const handleClosePassword = () =>{
          setPasswordShow(false);
          setLoadingPasswordChange(false);
          const newField={...formField}
          newField.new_password='';
          newField.old_password='';
          newField.confirm_password='';
          setFormField(newField);
           // const newErrors = FindFormErrors();
           // Object.keys(newErrors).length=0;


      }
       const handleShowPassword = () => setPasswordShow(true);
       const selectChange=(event)=>{
            console.log(event.target.value);
            const newField={...formField}
            newField[event.target.name]=event.target.value;
             setFormField(newField);
             if ( !!formerrors[event.name] ) setFormerrors({
             ...formerrors,
             [event.name]: null
            });

       }
        const FindFormErrors = () =>{
         console.log(formerrors);
          const {new_password,old_password,confirm_password} = formField
            const newErrors = {}
            if ( !old_password || old_password === ''  ) newErrors.old_password = 'Old password is empty'
             if ( !new_password || new_password === ''  ) newErrors.new_password = 'New password is empty'
             if ( !confirm_password || confirm_password === ''  ) newErrors.confirm_password = 'Confirm password is empty'
             if(new_password.localeCompare(confirm_password)===1) newErrors.confirm_password = 'Password and confirm password doesnot match'

     return newErrors
    }
       const submitChangePassword=(event)=>{
             console.log(formField);
              const newErrors = FindFormErrors();
        if ( Object.keys(newErrors).length > 0 ) {
          // We got errors!
           setFormerrors(newErrors);
        } else {
             console.log(formField);
             setLoadingPasswordChange(true);
             // console.log("formField");
            axios.post('/branch/change/password', formField)
            .then((res) => {
                console.log(res)
                if(res.data.status === true){
                    notification('success', res.data.message);
                    handleClosePassword();

                    // history.push('/vendor/profile');
                }else {
                    notification('danger', res.data.message);
                }
            })
            .catch((err) => {
                console.log(err.response)
            })
        }

    }

    useEffect(()=>{
           let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
            if(branch_detail){
              setAuthorizationToken(branch_detail.token);
            }
    },[])
    const logoutBranch=()=>{
        console.log('logout');
        axios.get('/branch/logout')
            .then((res) => {
                console.log(res);
                 let branchDetail = JSON.parse(localStorage.getItem('branch_detail'));
                if(branchDetail){
                     localStorage.removeItem('branch_detail');
                     dispatch(branchLogout(''));
                     history.push('/branch/login');

                  }
                else{
                    console.log("logout else");

                }
                // dispatch(loadPartnerList(res.data))
            })
            .catch((err) => {
                console.log(err.response);
                 let branchDetail = JSON.parse(localStorage.getItem('branch_detail'));
                if(branchDetail){
                     localStorage.removeItem('branch_detail');
                     dispatch(branchLogout(''));
                     history.push('/branch/login');

                  }
            })
    }
    return (
        <div className="d-flex justify-content-end profile_header">
           <Dropdown>
                <Dropdown.Toggle  id="dropdown-basic">
                  <div style={{color:'#fff'}}><span style={{marginRight: '7px'}}>{props.user.name}</span><img src={icon} style={{width:'30px',height:'30px',borderRadius:'50%'}}  alt="tukatulogo"/></div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                    <Dropdown.Item style={{fontSize:'14px',letterSpacing:'0px'}} onClick={handleShowPassword}>Change Password</Dropdown.Item>
                    <Dropdown.Item onClick={(event)=>{ logoutBranch();}}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {/*<Offcanvas show={show} onHide={handleClose} {...props}>*/}
            {/*    <Offcanvas.Header closeButton>*/}
            {/*      <Offcanvas.Title>Offcanvas</Offcanvas.Title>*/}
            {/*    </Offcanvas.Header>*/}
            {/*    <Offcanvas.Body>*/}
            {/*      Some text as placeholder. In real life you can have the elements you*/}
            {/*      have chosen. Like, text, images, lists, etc.*/}
            {/*    </Offcanvas.Body>*/}
            {/*</Offcanvas>*/}


            <Modal show={passwordShow} onHide={handleClosePassword}>
        <Modal.Header>
          <Modal.Title className="pt-3 pl-3 pr-3 pb-1">
              <h6 className="mb-0 pl-4" style={{paddingLeft:'15px',paddingRight:'15px'}}>Change your Password</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(submitChangePassword)}>
                        <Form.Group className="mb-3" >
                        <Form.Label className="mb-0">Old Password</Form.Label>
                        <Form.Control type="password" name="old_password" onChange={(event)=>selectChange(event)} placeholder="" isInvalid={!!formerrors.old_password} />
                        <Form.Control.Feedback type='invalid'>
                                {formerrors.old_password}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label className="mb-0">New Password</Form.Label>
                        <Form.Control type="password" name="new_password" onChange={(event)=>selectChange(event)} placeholder="" isInvalid={!!formerrors.new_password} />
                          <Form.Control.Feedback type='invalid'>
                                {formerrors.new_password}
                        </Form.Control.Feedback>
                      </Form.Group>
                     <Form.Group className="mb-3" >
                         <Form.Label className="mb-0">Confirm Password</Form.Label>
                         <Form.Control type="password" name="confirm_password" onChange={(event)=>selectChange(event)} placeholder="" isInvalid={!!formerrors.confirm_password} />
                         <Form.Control.Feedback type='invalid'>
                                {formerrors.confirm_password}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Row>
                         <Col lg={6}>

                         </Col>
                         <Col lg={6}>
                             <div style={{display:'flex',placeContent:'space-around'}}>
                                 {loadingPasswordChange?
                                     <>
                                          <Button variant="primary" disabled={true} >
                                            Submit
                                          </Button>
                                     </>:
                                     <>
                                         <Button variant="primary" type="submit" >
                                            Submit
                                          </Button>
                                     </>
                                 }

                              <Button className="ml-3" variant="danger" onClick={handleClosePassword}>
                               Cancel
                              </Button>
                             </div>
                         </Col>
                     </Row>

                  </Form>




        </Modal.Body>

      </Modal>

        </div>

    )
}

export default ProfileBox;
