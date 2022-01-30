import React, {useState} from 'react';
import {Row,Col,Form,Button} from 'react-bootstrap';
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import notification from "../includes/notification";

const PasswordChangeVendor=()=>{
      const dispatch = useDispatch();
      const history = useHistory();
       const location=useLocation();
       const {register, handleSubmit, errors} = useForm();
       const [formField,setFormField]=useState({
           new_password:'',
           old_password:'',
           confirm_password:'',

    });
       const selectChangeOld=(event)=>{
            console.log(event.target.value);
            const newField={...formField}
            newField.old_password=event.target.value;
             setFormField(newField);

       }
       const selectChange=(event)=>{
            console.log(event.target.value);
            const newField={...formField}
            newField[event.target.name]=event.target.value;
             setFormField(newField);

       }
       const selectChangeNew=(event)=>{
            console.log(event.target.value);
            const newField={...formField}
            formField.new_password=event.target.value;
             setFormField(newField);

       }
       const selectChangeConfirm=(event)=>{
            console.log(event.target.value);
            const newField={...formField}
            formField.confirm_password=event.target.value;
             setFormField(newField);

       }
        const onSubmit =(event) => {
           console.log(formField);
           axios.post('/partner/change-password', formField)
            .then((res) => {
                console.log(res)
                if(res.data.status === true){
                    notification('success', res.data.message);

                    history.push('/vendor/profile');
                }else {
                    notification('danger', res.data.message);
                }
            })
            .catch((err) => {
                console.log(err.response)
            })

        }

    return(
        <>
            <Row>
                <Col xs={12} className="pt-4 p-4">

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" >
                        <Form.Label className="mb-0">Old Password</Form.Label>
                        <Form.Control type="password" name="old_password" onChange={(event)=>selectChange(event)} placeholder="Old Password" />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label className="mb-0">New Password</Form.Label>
                        <Form.Control type="password" name="new_password" onChange={(event)=>selectChange(event)} placeholder="Password" />
                      </Form.Group>
                     <Form.Group className="mb-3" >
                         <Form.Label className="mb-0">Confirm Password</Form.Label>
                         <Form.Control type="password" name="confirm_password" onChange={(event)=>selectChange(event)} placeholder="Confirm Password" />
                     </Form.Group>
                        <div className="pt-3" style={{display:'flex',placeContent:'center'}}>
                            <Button variant="primary" type="submit" style={{width:'200px'}}>
                               Submit
                            </Button>
                        </div>
                  </Form>
                </Col>
            </Row>
        </>
    )
}
export default PasswordChangeVendor