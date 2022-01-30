import React, {useState} from "react"
import {Row,Col,Form,Button,Card} from 'react-bootstrap';
import {useForm} from "react-hook-form";
import BranchesLocationMap from "./BranchesLocationMap";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import showNotification from "../../includes/notification";
import axios from "axios"
import {useHistory} from 'react-router-dom';

 const BranchesCreate = ()=>{
     const history=useHistory();
     const { register, handleSubmit, errors } = useForm();
     const[formField,setFormField]=useState({
         name:'',
         phone:'',
         email:'',
         password:'',
         lat:'',
         lng:'',
     });
      const handleForm = event => {
        const newField = {...formField}
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
             await createBranch(newField);
          }else {
              showNotification('warning', 'Please mark the location')
          }
      }
      const createBranch = async (field) => {
         console.log(field);

         await axios.post('/mainadmin/branch/register', field)
             .then((res) => {
                 console.log(res);
                 if(res.data.status === false){
                     showNotification('danger', res.data.message);
                 }else{
                     localStorage.removeItem('Branch_location');
                     showNotification('success', res.data.message)
                     history.push('/main_admin/branches')
                 }
             })
             .catch((err) => {
                 console.log(err.response.data);
             });
    }


    return(
        <>
           <Row>
               <Col md={12}>
                   {/*<div>Branches Create</div>*/}
                   <div className="d-flex justify-content-center">
                       <Card style={{width:'800px'}}>
                          <Card.Body>
                              <Form onSubmit={handleSubmit(onSubmit)}>
                                  <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Branch Name</Form.Label>
                                    <Form.Control type="text" name="name" placeholder="Enter Name" onChange={(event) => handleForm(event)} />
                                    <Form.Text className="text-muted">
                                      We'll never share your email with anyone else.
                                    </Form.Text>
                                  </Form.Group>
                                   <Form.Group className="mb-3" controlId="formBasicPhone">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control type="text" name="phone" placeholder="Phone Number" onChange={(event) => handleForm(event)} />
                                    <Form.Text className="text-muted">
                                      We'll never share your email with anyone else.
                                    </Form.Text>
                                  </Form.Group>
                                  <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={(event) => handleForm(event)} />
                                    <Form.Text className="text-muted">
                                      We'll never share your email with anyone else.
                                    </Form.Text>
                                  </Form.Group>

                                  <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Password" onChange={(event) => handleForm(event)} />
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
                                  <div className="d-flex justify-content-center">
                                      <Button variant="primary" type="submit" style={{width:'500px',}}>
                                        Submit
                                      </Button>
                                  </div>
                              </Form>
                          </Card.Body>
                        </Card>
                       </div>


               </Col>
           </Row>
        </>
    )
 }

 export default BranchesCreate