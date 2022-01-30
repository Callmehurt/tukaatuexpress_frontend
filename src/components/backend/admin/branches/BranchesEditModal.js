import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import BranchesEdit from './BranchesEdit'
import BranchesLocationMap from "./BranchesLocationMap";
import {useForm} from "react-hook-form";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import showNotification from "../../includes/notification";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AdminBranchUpdate} from './../../../../redux/actions/AdminBranches'


const BranchesEditModal=(props)=>{
    const toggle=props.toggle;
    const dispatch = useDispatch();
    const history=useHistory();
    const MainAdmin= useSelector((state) => state.mainAdmin);
    const updateBranchDetail = MainAdmin.updateBranchDetail;
     const { register, handleSubmit, errors } = useForm();
     const [branchId,setBranchId]=useState('');
     const[formField,setFormField]=useState({
         branch_id:'',
         name:'',
         phone:'',
         email:'',
         password:'',
         lat:'',
         lng:'',
     });
    useEffect(()=>{
        let mainAdmin= JSON.parse(localStorage.getItem('main_admin'));
        if(mainAdmin){
          setAuthorizationToken(mainAdmin.token);
        }
         getBranchId(props.branchId);
         // console.log(props.branchId);
         getBranchDetails(props.branchId);
         console.log(props.branchId);


    },[props.branchId])

    const getBranchDetails=(branchID)=>{
        console.log(branchID);
        // if(BranchList){
        //     BranchList.forEach((item)=>{
        //            if(item.id===branchID){
        //                  dispatch(updateBranchDetail(item));
        //                  console.log(item);
        //             }
        //     });
        // }

        // BranchList.map((branch)=>{
        //     if(branch.id===branchID){
        //          dispatch(updateBranchDetail(branch));
        //     }
        // });
        // if(branchId){
        //    axios.get(`/mainadmin/branch/${branchId}`)
        //      .then((res) => {
        //          console.log(res);
        //           dispatch(AdminBranchUpdate(res.data));
        //      })
        //      .catch((err) => {
        //          console.log(err.response);
        //      });
        // }
        // else {
        //     console.log('no branch ID');
        //
        // }
    }

    const getBranchId=(id)=>{
       setBranchId(id);
    }
    const handleForm = event => {
        const newField = {...formField}
        newField.branch_id = updateBranchDetail.id;
        newField[event.target.name] = event.target.value;
        setFormField(newField);
        //  if ( !!formerrors[event.target.name] ) setFormerrors({
        //   ...formerrors,
        //   [event.target.name]: null
        // })
    }
    const onSubmit = async (event) => {
          console.log(event)
          console.log(formField);

         let mainAdmin = JSON.parse(localStorage.getItem('main_admin'));
        console.log(mainAdmin.token);
        if(mainAdmin){
          setAuthorizationToken(mainAdmin.token);
        }
          let latLng = JSON.parse(localStorage.getItem('Branch_location'));
          if(latLng){
              const newField= {...formField};
             newField.lat = latLng.lat;
             newField.lng = latLng.lng;
             await updateBranch(newField);
          }else {
              showNotification('warning', 'Please mark the location')
          }
      }
      const updateBranch = async (field) => {
         console.log(field);

         await axios.post('/mainadmin/branch/update', field)
             .then((res) => {
                 console.log(res);
                 if(res.data.status === false){
                     showNotification('danger', res.data.message);
                 }else{
                     localStorage.removeItem('Branch_location');
                     showNotification('success', res.data.message)
                     history.push('/mainadmin/branches')
                 }
             })
             .catch((err) => {
                 console.log(err.response.data);
             });
    }

    return(
        <>
            <Modal
                  {...props}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                    <Modal.Header>
                        <Modal.Title>
                          Update Details Of Branches
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/*{*/}
                        {/*    BranchList.id===''*/}
                        {/*}*/}
                         <Form onSubmit={handleSubmit(onSubmit)}>
                                  <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Branch Name</Form.Label>
                                    <Form.Control type="text" defaultValue={updateBranchDetail?.name} name="name" placeholder="Enter Name"  onChange={(event) => handleForm(event)} />
                                    <Form.Text className="text-muted">
                                      We'll never share your email with anyone else.
                                    </Form.Text>
                                  </Form.Group>
                                   <Form.Group className="mb-3" controlId="formBasicPhone">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control type="text" defaultValue={updateBranchDetail?.phone} name="phone" placeholder="Phone Number" onChange={(event) => handleForm(event)} />
                                    <Form.Text className="text-muted">
                                      We'll never share your email with anyone else.
                                    </Form.Text>
                                  </Form.Group>
                                  <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" defaultValue={updateBranchDetail?.email} name="email" placeholder="Enter email" onChange={(event) => handleForm(event)} />
                                    <Form.Text className="text-muted">
                                      We'll never share your email with anyone else.
                                    </Form.Text>
                                  </Form.Group>

                                  <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" defaultValue="" placeholder="Password" onChange={(event) => handleForm(event)} />
                                  </Form.Group>
                                  <Form.Group className="mt-4">
                                        <Form.Label>Pickup Location</Form.Label>
                                        <div style={{height: "200px", width: "100%"}}>
                                            <BranchesLocationMap state={formField} setFormField={setFormField.bind(this)}  />
                                        </div>
                                    </Form.Group>
                                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="In Active" />
                                  </Form.Group>

                        {/*<h1>{props.updata.data.id}</h1>*/}
                    {/*<BranchesEdit  toggle={props.onHide} />*/}
                        <Row>
                             <Col lg={6}>
                                <Form.Group className="mt-4">
                                      <Button type="submit" variant="primary" style={{marginTop:'35px',width:'100%'}}>Update</Button>
                                </Form.Group>
                             </Col>
                             <Col lg={6}>
                                 <Form.Group className="mt-4">
                                      <Button variant="danger" style={{marginTop:'35px',width:'100%'}} onClick={(event)=>toggle(false)}>Cancel</Button>
                                </Form.Group>
                             </Col>
                         </Row>
                               </Form>

                    </Modal.Body>
              </Modal>
        </>
    )
}

export default BranchesEditModal