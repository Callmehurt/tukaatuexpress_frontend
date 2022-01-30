import React, {useEffect, useState} from "react"
import {Button, Col, Container, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {MainAdminLogout} from "../../../redux/actions/MainAdminAuthenticate";
import {RiDashboard2Fill} from "react-icons/ri";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useForm} from "react-hook-form";
import axios from "axios";
import notification from "../includes/notification";


const AdminHeader=()=>{
     const history = useHistory();
      const location = useLocation();
     const dispatch = useDispatch();
    const adminStaff = useSelector((state) => state.mainAdminAuth);
    const adminStaffUser=adminStaff.user;
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
            axios.post('/mainadmin/change/password', formField)
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
        let mainAdmin = JSON.parse(localStorage.getItem('main_admin'));
        console.log(mainAdmin.token);
        if(mainAdmin){
          setAuthorizationToken(mainAdmin.token);
        }

    },[]);
    const locationDashboard='/main_admin/dashboard';
    const headerData=[
        {url:'/mainadmin/dashboard',name:'Dashboard'},
        {url:'/mainadmin/branches',name:'Branch'},
        {url:'/mainadmin/branch/transfer_rates',name:'Transfer Rates'},
        {url:'/mainadmin/branch/pickups',name:'Pickups'},
        {url:'/mainadmin/branch/assigns',name:'Assign'},
        {url:'/mainadmin/branch/ontheways',name:'On the way'},
        {url:'/mainadmin/branch/Delivered',name:'Delivered'},
        {url:'/mainadmin/branch/Warehouse',name:'At Warehouse'},
        // {url:'/mainadmin/branch/transfer_table',name:'Transfer'},
        {url:'/mainadmin/branch/transfer_table',name:'Transfer'},
        {url:'/mainadmin/monthly_statement',name:'Monthly Statement'},

    ];
    const logoutAdmin=()=>{
        console.log('logoutAdmin');
         let mainAdmin = JSON.parse(localStorage.getItem('main_admin'));
        if(mainAdmin){
             localStorage.removeItem('main_admin');
             dispatch(MainAdminLogout(''));
             history.push('/main_admin');

          }
    }

    return(
        <>
              <section className="staffheader">
                <Container fluid>
                    <Row>
                        <Col md={10}>
                            <div style={{color:'#fff',}}>Tukaatu Services Private Limited.</div>
                        </Col>
                        <Col md={2}>
                            <div className="d-flex justify-content-end">
                                <Dropdown>
                                      <Dropdown.Toggle  id="dropdown-basic" style={{backgroundColor:'transparent',boxShadow:'none',borderColor:'transparent'}}>
                                          { adminStaffUser.name.length>13 ? <> Admin:<span>{adminStaffUser.name.substring(0,13)}...</span></>: <> Admin:<span>{adminStaffUser.name}</span></> }
                                        {/*Admin:<span>{adminStaffName.name.substring(0,13)}</span>*/}
                                          {/*Admin: <span style={{display:''}}>Dhurba Chaudhary</span>*/}
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item style={{fontSize:'14px',letterSpacing:'0px'}}>Profile</Dropdown.Item>
                                        <Dropdown.Item style={{fontSize:'14px',letterSpacing:'0px'}}>Setting</Dropdown.Item>
                                          <Dropdown.Item style={{fontSize:'14px',letterSpacing:'0px'}} onClick={handleShowPassword}>Change Password</Dropdown.Item>
                                        <Dropdown.Item onClick={(event)=>{ logoutAdmin();}} style={{fontSize:'14px',letterSpacing:'0px'}}>Log Out</Dropdown.Item>
                                      </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
    <section className="control_area">
        <Container fluid>
            <Row>
                <Col md={12}>
                     <nav>
                      <ul>
                          {headerData.map((headerData) => (
                              <>
                                   {(location.pathname===headerData.url)?
                              <li style={{backgroundColor:'#ffd125'}}>
                              <Link to={headerData.url}>
                              <div >
                              <div className="d-flex justify-content-center" style={{color:'#377298'}}>
                              <RiDashboard2Fill className="icon_style" size={25} />
                              </div>

                              <div style={{color:'#377298',fontSize:'14px'}}>{headerData.name}</div>
                              </div>

                              </Link>
                              </li>:<li>
                              <Link to={headerData.url}>
                              <div>
                              <div className="d-flex justify-content-center">
                              <RiDashboard2Fill className="icon_style" size={25} />
                              </div>

                              <div className="title_style">{headerData.name}</div>
                              </div>

                              </Link>
                              </li>

                          }
                              </>
                          ))
                          }
                      </ul>
                    </nav>
                </Col>
            </Row>
        </Container>
    </section>

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

        </>
    )
}

export default AdminHeader