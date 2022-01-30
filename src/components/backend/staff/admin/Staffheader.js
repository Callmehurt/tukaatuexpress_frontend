import React, {useEffect, useState} from "react";
import {Container, Row, Col, Dropdown, Card, Image, Modal, Button, Form} from 'react-bootstrap';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {adminStaffLogout} from "./../../../../redux/actions/adminStaffAuthenticate";
import{RiDashboard2Fill} from 'react-icons/ri';
import {AiOutlineMessage} from 'react-icons/ai';
import{IoMdGitPullRequest} from 'react-icons/io';
import{IoStorefrontSharp} from 'react-icons/io5';
import {IoStorefrontOutline} from 'react-icons/io5';
import {RiHomeSmile2Line} from 'react-icons/ri';
import {RiHomeSmile2Fill} from 'react-icons/ri';
import {RiCaravanLine} from 'react-icons/ri';
import {RiCaravanFill} from 'react-icons/ri';
import logoImage from "../../../../logo.svg";
import {RiFolderTransferLine,RiFolderTransferFill} from 'react-icons/ri';
import MessageLayout from "./Message/MessageLayout";
import Pusher from 'pusher-js';
import setAuthorizationToken from "./../../../../utils/setAuthorizationToken";
import axios from "axios";
import {allPickupForMessage, getMessageDetail} from './../../../../redux/actions/BranchOperation';
import { useChannel, useEvent } from "@harelpls/use-pusher";
import Avatar from "react-avatar";
import AdminLiveSearch from "./ActionArea/AdminLiveSearch";
import {useForm} from "react-hook-form";
import notification from "../../includes/notification";




const Staffheader = () =>{
    const location = useLocation();
      const thisState = useSelector((state) => state.branchOperation);
      const allPickUpsForMessage = thisState.allPickUpsForMessage;

     const history = useHistory();
     const dispatch = useDispatch();
     const[title,setTitle]=useState([]);
      const [pickupIdArray,setPickupIdArray]=useState([]);
      const[pickupID,setPickupID]=useState('');
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
            axios.post('/admin/change/password', formField)
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

      // const channel = useChannel("channel-name");
       // pickupIdArray.forEach(item => {
       //     let message='messageShow'+'Three';
	   //      const[message,setMessageShow]=useState('');
       //    });
        // pickupIdArray?pickupIdArray.map((Id)=>{
        //
        // }):null
     const[messageShow,setMessageShow]=useState('');
     const arrayCard=['2','3','4','5','6','7','8','9','10','11','12','13'];
     const [cardNumber,setCardNumber]=useState(arrayCard);
    const adminStaff = useSelector((state) => state.adminStaffAuth);
    const adminStaffName=adminStaff.user;
    useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin){
          setAuthorizationToken(staff_admin.token);
        }
         getAllPickup();
         console.log(title);
         console.log('pusher data is coming');
    },[]);
    // const pusher = new Pusher({
    //    appId: "1279054",
    //   key: "c083779ed67708696f1e",
    //   secret: "f6c53e55456beb3ba7e9",
    //   cluster: "ap2",
    //      disableStats: true,
    //  forceTLS: false,
    // });
    //  const channel = useChannel("tukaatuexpress");
    //  useEvent(channel, "notice_to_partner", ({ data }) => setTitle(data));
    const getAllPickup=()=>{
        axios.get('/admin/get/pickup/comment')
            .then((res) => {
                console.log(res);
                console.log(res.data);
                  dispatch(allPickupForMessage(res.data));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
    const logoutAdmin=()=>{
        console.log('logout');

        let staffAdmin = JSON.parse(localStorage.getItem('staff_admin'));
        if(staffAdmin){
             localStorage.removeItem('staff_admin');
             dispatch(adminStaffLogout(''));
             history.push('/admin/login');
          }
         // console.log(location.pathname);
    }

    const iconActive=()=>{
        return(
              <RiDashboard2Fill className="icon_style" size={25} />)
    }
    const headerData=[
        {url:'/staff/admin/dashboard',name:'Dashboard',icons: <RiDashboard2Fill className="icon_style" size={25} />,iconsActive:<RiDashboard2Fill className="icon_style" size={25} />},
        {url:'/staff/admin/pickup_request',name:'Pickup Request',icons:<IoMdGitPullRequest className="icon_style" size={25} />,iconsActive:<IoMdGitPullRequest className="icon_style" size={25} /> },
        {url:'/staff/admin/pickups',name:'New Orders',icons: <RiDashboard2Fill className="icon_style" size={25} />,iconsActive:<RiDashboard2Fill className="icon_style" size={25} />},
        {url:'/staff/admin/warehouse',name:'At Warehouse',icons: <RiHomeSmile2Line className="icon_style" size={25} />,iconsActive:<RiHomeSmile2Fill className="icon_style" size={25} />},
        {url:'/staff/admin/sentfordelivery',name:'Sent For Delivery',icons: <RiCaravanLine className="icon_style" size={25} />,iconsActive:<RiCaravanFill className="icon_style" size={25} />},
        {url:'/staff/admin/alldelivered',name:'All Delivered',icons: <RiDashboard2Fill className="icon_style" size={25} />,iconsActive:<RiDashboard2Fill className="icon_style" size={25} />},
        {url:'/staff/admin/transferin',name:'Transfer Ins',icons: <RiFolderTransferFill className="icon_style" size={25} />,iconsActive:<RiFolderTransferLine className="icon_style" size={25} />},
        {url:'/staff/admin/transferout',name:'Transfer Outs',icons: <RiDashboard2Fill className="icon_style" size={25} />,iconsActive:<RiDashboard2Fill className="icon_style" size={25} />},
        {url:'/staff/admin/allholds',name:'All Hold',icons: <RiDashboard2Fill className="icon_style" size={25} />,iconsActive:<RiDashboard2Fill className="icon_style" size={25} />},
        {url:'/staff/admin/allreturns',name:'All Returns',icons: <RiDashboard2Fill className="icon_style" size={25} />,iconsActive:<RiDashboard2Fill className="icon_style" size={25} />},
        {url:'/staff/admin/partner',name:'Partner',icons: <IoStorefrontOutline className="icon_style" size={25} />,iconsActive:<IoStorefrontSharp className="icon_style" size={25} />}
    ];
    const getPickupID=(pickup_id)=>{
        // setPickupID(pickupID);
        if(pickup_id){
                axios.get(`/admin/get/pickup/comment/${pickup_id}`)
                    .then((res)=>{
                          console.log(res);
                         // showNotification('success', res.data.message);
                          dispatch(getMessageDetail(res.data));
                    })
                .catch((err)=>{
                   console.log(err.response);
                })

            }
       setMessageShow(true);
       // setPickupIdArray(...pickupIdArray, pickupID);
    }
    //  const getMessageDetail=(id)=>{
    //     setMessageShow(true);
    //     console.log(id);
    //     history.push({
    //        pathname: '/vendor/message_detail',
    //        state: {messageID: id }
    //    });
    // }
    const onHideMessage=()=>{
          setMessageShow(false);
        }
    return(
<>
    <section className="staffheader">
        <Container fluid>
            <Row>
                <Col md={3}>
                    <div style={{color:'#fff',paddingTop:'8px'}}>Tukaatu Services Private Limited.</div>
                </Col >
                <Col md={7}>
                    <div style={{display:'flex',placeContent:'center',width:'100%'}}>
                        <Row style={{width:'100%'}}>
                             <AdminLiveSearch />
                        </Row>

                    </div>
                </Col>
                <Col md={2}>
                    <div className="d-flex justify-content-end">
                        <Dropdown>
                              <Dropdown.Toggle  id="dropdown-basic" style={{backgroundColor:'transparent',boxShadow:'none',borderColor:'transparent'}}>
                                  { adminStaffName.name.length>13 ? <> Admin:<span>{adminStaffName.name.substring(0,13)}...</span></>: <> Admin:<span>{adminStaffName.name}</span></> }
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
                      <ul style={{display:'flex'}}>
                          {  headerData.map((headerData) => (
                              <>
                                   {(location.pathname===headerData.url)?
                              <li style={{backgroundColor:'#ffd125'}}>
                              <Link to={headerData.url}>
                              <div >
                              <div className="d-flex justify-content-center" style={{color:'#377298'}}>
                              {/*<RiDashboard2Fill className="icon_style" size={25} />*/}
                                  {headerData.iconsActive}
                              </div>

                              <div style={{color:'#377298',fontSize:'14px'}}>{headerData.name}</div>
                              </div>

                              </Link>
                              </li>:<li>
                              <Link to={headerData.url}>
                              <div>
                              <div className="d-flex justify-content-center">
                                  {headerData.icons}
                              {/*<RiDashboard2Fill className="icon_style" size={25} />*/}
                              </div>

                              <div className="title_style">{headerData.name}</div>
                              </div>

                              </Link>
                              </li>

                          }
                              </>
                             ))
                          }

                          {(location.pathname==='/staff/admin/message')? <li style={{backgroundColor:'#ffd125',float:'right'}} className="mr-auto">
                                    {/*<Link to="/staff/admin/message" >*/}
                                        {/*<div >*/}
                                        {/*  <div className="d-flex justify-content-center" style={{color:'#377298'}}>*/}
                                        {/*      <RiDashboard2Fill className="icon_style" size={25} />*/}
                                        {/*  </div>*/}

                                        {/*   <div style={{color:'#377298',fontSize:'14px'}}>Message</div>*/}
                                        {/*</div>*/}
                                        <Dropdown>
                                      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor:'transparent',boxShadow:'none',borderColor:'transparent'}}>
                                          <div>
                                              <div className="d-flex justify-content-center">
                                                  <AiOutlineMessage className="icon_style" size={25} />
                                              </div>

                                               <div className="title_style">Message</div>
                                          </div>
                                      </Dropdown.Toggle>
                                      {/*<Dropdown.Menu style={{width:'350px'}}>*/}
                                      {/*  /!*<Dropdown.Item href="/staff/admin/pickups">Partner Request</Dropdown.Item>*!/*/}
                                      {/*  <Dropdown.Item >*/}
                                      {/*      <div>*/}
                                      {/*         <Card onClick={(e)=>{e.preventDefault();getPickupID(2)}}>*/}
                                      {/*            <Card.Body className="p-0">*/}
                                      {/*                <Row>*/}
                                      {/*                    <Col xs={3} className="pl-0 pr-0">*/}
                                      {/*                        <Image src={logoImage} roundedCircle />*/}
                                      {/*                    </Col>*/}
                                      {/*                    <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>*/}
                                      {/*                        <div className="pt-2">*/}
                                      {/*                            <h6 className="mb-1">Bala Krishna Syangbo}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>(TEX-00005)</span></h6>*/}
                                      {/*                        </div>*/}
                                      {/*                         <div>*/}
                                      {/*                             <p style={{fontSize:'15px'}}>Recent Message Show</p>*/}

                                      {/*                        </div>*/}
                                      {/*                        /!*<div>*!/*/}
                                      {/*                        /!*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*!/*/}

                                      {/*                        /!*</div>*!/*/}
                                      {/*                        /!*<Image src="holder.js/171x180" roundedCircle />*!/*/}
                                      {/*                    </Col>*/}
                                      {/*                </Row>*/}
                                      {/*            </Card.Body>*/}
                                      {/*         </Card>*/}
                                      {/*     </div>*/}
                                      {/*  </Dropdown.Item>*/}
                                      {/*  <Dropdown.Item ><Link to="/staff/admin/transferin">Transfer Ins</Link></Dropdown.Item>*/}
                                      {/*  <Dropdown.Item ><Link to="/staff/admin/transferout">Transfer Outs</Link></Dropdown.Item>*/}
                                      {/*    <Dropdown.Item ><Link to="/staff/admin/allholds">All Holds</Link></Dropdown.Item>*/}
                                      {/*     <Dropdown.Item ><Link to="/staff/admin/allreturns">All Cancel/Returns</Link></Dropdown.Item>*/}
                                      {/*</Dropdown.Menu>*/}
                                </Dropdown>

                                   {/*</Link>*/}
                             </li>
                              :   <li>
                                 {/*<Link to="/staff/admin/message">*/}

                                 <Dropdown>
                                      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor:'transparent',boxShadow:'none',borderColor:'transparent',}}>
                                          <div>
                                              <div className="d-flex justify-content-center">
                                                  <AiOutlineMessage className="icon_style" size={25} />
                                              </div>

                                               <div className="title_style">Message</div>
                                          </div>
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu style={{width:'385px',height:'78vh',overflowY:'auto'}}>
                                        {/*<Dropdown.Item href="/staff/admin/pickups">Partner Request</Dropdown.Item>*/}
                                        {/*  {*/}
                                        {/*      allPickUpsForMessage*/}
                                        {/*  }*/}
                                          {allPickUpsForMessage.map((num,index)=>(
                                                  <>
                                                       <Dropdown.Item >
                                                           <div>
                                                               <Card onClick={(e)=>{e.preventDefault();getPickupID(num.pickup_id)}}>
                                                                  <Card.Body className="p-0">
                                                                      <Row>
                                                                          <Col xs={3} className="pl-0 pr-0">
                                                                              {/*<Image src={logoImage} roundedCircle />*/}
                                                                              <div style={{
                                                                                   display: 'grid',
                                                                                   placeContent: 'center',
                                                                                   alignItems: 'center',
                                                                                   height: '70px'
                                                                               }}>
                                                                                   <Avatar size="50" name={num.customer_name}
                                                                                           round={true}/>
                                                                               </div>
                                                                          </Col>
                                                                          <Col xs={9} style={{paddingLeft:'0px',paddingRight:'0px'}}>
                                                                              <div className="pt-2">
                                                                                  <h6 className="mb-1">{num.customer_name}<span style={{fontSize:'12px',fontWeight:'400',paddingLeft:'5px'}}>({num.tex_code})</span></h6>
                                                                              </div>
                                                                               <div>
                                                                                   <p style={{fontSize:'15px'}}>{num.message}</p>

                                                                              </div>
                                                                              {/*<div>*/}
                                                                              {/*     <p style={{fontSize:'12px'}}>{chatList.status}</p>*/}

                                                                              {/*</div>*/}
                                                                              {/*<Image src="holder.js/171x180" roundedCircle />*/}
                                                                          </Col>
                                                                      </Row>
                                                                  </Card.Body>
                                                               </Card>
                                                           </div>
                                                        </Dropdown.Item>
                                                  </>
                                              ))
                                          }

                                        </Dropdown.Menu>
                                </Dropdown>

                          {/*</Link>*/}
                          </li>
                          }


                        {/*<li>*/}
                        {/* <Link to="/staff/admin/partners">*/}
                        {/*     <Dropdown>*/}
                        {/*      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor:'transparent',boxShadow:'none',borderColor:'transparent'}}>*/}
                        {/*       Action Area*/}
                        {/*      </Dropdown.Toggle>*/}

                        {/*      <Dropdown.Menu>*/}
                        {/*        /!*<Dropdown.Item href="/staff/admin/pickups">Partner Request</Dropdown.Item>*!/*/}
                        {/*        <Dropdown.Item ><Link to="/staff/admin/warehouse">At WareHouse</Link></Dropdown.Item>*/}
                        {/*        <Dropdown.Item ><Link to="/staff/admin/transferin">Transfer Ins</Link></Dropdown.Item>*/}
                        {/*        <Dropdown.Item ><Link to="/staff/admin/transferout">Transfer Outs</Link></Dropdown.Item>*/}
                        {/*          <Dropdown.Item ><Link to="/staff/admin/allholds">All Holds</Link></Dropdown.Item>*/}
                        {/*           <Dropdown.Item ><Link to="/staff/admin/allreturns">All Cancel/Returns</Link></Dropdown.Item>*/}
                        {/*      </Dropdown.Menu>*/}
                        {/*    </Dropdown>*/}
                        {/* </Link>*/}
                        {/*</li>*/}
                        {/*  <li>*/}
                        {/* <Link to="/staff/admin/partners">Delivery Person</Link>*/}
                        {/*</li>*/}
                        {/*  <li>*/}
                        {/* <Link to="/staff/admin/partners">Daily Statements</Link>*/}
                        {/*</li>*/}
                        {/*   <li>*/}
                        {/* <Link to="/staff/admin/partners">Delivery Statements</Link>*/}
                        {/*</li>*/}
                        {/*  <li>*/}
                        {/* <Link to="/staff/admin/partners">Notice and Updates</Link>*/}
                        {/*</li>*/}
                      </ul>
                    </nav>
                </Col>
            </Row>
        </Container>
    </section>

     <MessageLayout  show={messageShow} toggle={onHideMessage} />


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
        {/*<Modal.Footer>*/}
        {/*  <Button variant="primary" onClick={submitChangePassword}>*/}
        {/*    Submit*/}
        {/*  </Button>*/}
        {/*  <Button variant="danger" onClick={handleClosePassword}>*/}
        {/*   Cancel*/}
        {/*  </Button>*/}
        {/*</Modal.Footer>*/}
      </Modal>



</>

    )

}

export default Staffheader