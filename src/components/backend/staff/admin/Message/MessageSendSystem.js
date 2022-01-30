import React, {useState,useEffect} from "react";
import {useLocation} from "react-router-dom";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import axios from "axios";
import {Row,Col,Form,Button,InputGroup,FormControl} from 'react-bootstrap';
// import {getMessageDetail} from './../../../redux/actions/vendor';
import {useDispatch, useSelector} from "react-redux";
import {IoMdSend} from 'react-icons/io';
import {MdAddCircle} from 'react-icons/md';
import {GrAdd} from 'react-icons/gr'
import {useForm} from "react-hook-form";
import notification from "./../../../includes/notification";
import {getMessageDetail} from "../../../../../redux/actions/BranchOperation";
const MessageSendSystem=()=>{
    const dispatch = useDispatch();
    const location=useLocation();
    const branchOperation = useSelector((state) => state.branchOperation);
     const MessageDisplay = branchOperation.MessageDisplay;

        const { register,setValue, handleSubmit, errors } = useForm();
        let formRef = null;
        const [formerrors, setFormerrors ] = useState({});

        const [formField, setFormField] = useState({
            message: '',
            pickup_id:'',

    });
        useEffect(()=>{
        let staffAdmin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staffAdmin){
          setAuthorizationToken(staffAdmin.token);
        }
        // getMessage(MessageDisplay[0]?.pickup_id);

    },[0]);
        const FindFormErrors = () =>{
     console.log(formerrors);
     // let pattern = /^(\d*)([,.]\d{0,2})?$/;
     const {message} = formField
     const newErrors = {}
     // packet name validate
     if ( !message || message === '' ) newErrors.message = '  '
     return newErrors
    }
    const clearform = () => {
        console.log('clear form');
        // selectCustomerRef.select.clearValue();
        // selectPartnerRef.select.clearValue();
        formRef.reset();
   }
     const getMessage=(pickupID)=>{
             axios.get(`/admin/get/pickup/comment/${pickupID}`)
                    .then((res)=>{
                        console.log(res.data);
                        dispatch(getMessageDetail(res.data));
                    })
            .catch((err)=>{
               console.log(err.response.data);
            })

    }
     const onSubmit =(event) => {
            console.log('message');

            console.log(formField);
            axios.post('/admin/store/comment', formField)
            .then((res) => {
                console.log(res);
                // console.log('message sent');
                clearform();
                getMessage(MessageDisplay[0]?.pickup_id);
                const newField = {...formField}
                 newField.message='';
                 setFormField(newField);


                if(res.data.status === true){
                    notification('success', res.data.message);
                    console.log(formField);
                    // clearform();

                }else {
                    // notification('danger', res.data.message);
                }
            })
            .catch((err) => {
                console.log(err.response)
            })

     }
     const handleForm=(event)=>{
         const newField = {...formField}
         newField.pickup_id=MessageDisplay[0]?.pickup_id;
            newField[event.target.name] = event.target.value;
            setFormField(newField);
            //  if ( !!formerrors[event.target.name] ) setFormerrors({
            //   ...formerrors,
            //   [event.target.name]: null
            // })
     }



    return(
        <>
            <div style={{position:'absolute',bottom:'0px',width:'100%',padding:'0px 0px'}}>
                <Form onSubmit={handleSubmit(onSubmit)} ref={form => formRef = form}>
                    <Row>
                        <Col xs={1}>
                             {/*<Button  style={{backgroundColor:'transparent',color:'#000',border:'none'}}>*/}
                                 <GrAdd size={25} style={{ marginTop: "8px",paddingLeft:'3px' }} />
                             {/*</Button>*/}
                        </Col>
                       <Col xs={9} style={{paddingRight:'3px'}}>
                           <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{width:'100%'}}>

                                <Form.Control autocomplete="off" type="text" name="message"  placeholder="Type your message ......" onChange={(event) => handleForm(event)} rows={1} />
                           </Form.Group>
                       </Col>
                        <Col xs={2} className="pl-0" style={{padding:'0px'}}>
                              <InputGroup.Append>
                                <Button type="submit" style={{backgroundColor:'transparent',color:'#000',border:'none'}}>
                                  <IoMdSend size={30} style={{ marginTop: "-2px" }} />
                                </Button>
                              </InputGroup.Append>

                       </Col>

                    </Row>
                </Form>
            </div>
        </>
    )
}
export default MessageSendSystem