import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import ReactDOM from 'react-dom';
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import axios from "axios";
import {Button, Form} from 'react-bootstrap';
import {loadPartnerList} from "../../../redux/actions/loadPartnerList";
import {useDispatch} from "react-redux";
import showNotification from "../includes/notification";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const MarketingEvent=()=>{
      const location=useLocation();
      const dispatch = useDispatch();
      const history = useHistory();
       let formRef = null;
      const[loading,setLoading]=useState(false);
      const [editorState, setEditorState] = React.useState(
                EditorState.createEmpty()
      );
      const[formField,setFormField]=useState({
          event_description:'',
          lead_id:location.state.leadID,
      });
      useEffect(() => {
        let marketingAdmin = JSON.parse(localStorage.getItem('marketingAdmin'));
        console.log(marketingAdmin);
        if(marketingAdmin?.token){
          setAuthorizationToken(marketingAdmin.token);
        }else{
            history.push('/marketing/login');
        }

    },[]);
      const clearform = () => {
        console.log('clear form');
        // selectCustomerRef.select.clearValue();
        // selectPartnerRef.select.clearValue();
        formRef.reset();
     }
      const[leadEvents,setLeadEvents]=useState([]);
      useEffect(()=>{
        let marketingAdmin = JSON.parse(localStorage.getItem('marketingAdmin'));
        console.log(marketingAdmin);
        if(marketingAdmin?.token){
          setAuthorizationToken(marketingAdmin.token);
        }else{
            history.push('/marketing/login');
        }
        console.log(location.state.leadID);
        getEventsListPartner();
    },[]);
      const handleForm=(event)=>{
          console.log(event.target.value);
           const newField = {...formField}
           newField[event.target.name] = event.target.value;
          setFormField(newField);

      }
      const getEventsListPartner=()=>{
          let lead_id=location.state.leadID;
          axios.get(`/marketing/lead/event/list/${lead_id}`)
            .then((res) => {
                console.log(res);
                setLeadEvents(res.data);
                // dispatch(loadPartnerList(res.data))
            })
            .catch((err) => {
                console.log(err.response.data);
            })
      }
      const submitForm=(event)=>{
           setLoading(true);
          event.preventDefault();
          axios.post('marketing/register/lead/event', formField)
             .then((res) => {
                 console.log(res);
                 if(res.data.status === false){
                     showNotification('danger', res.data.message);
                       setLoading(false);
                 }else{
                     showNotification('success', res.data.message);
                      const newField = {...formField}
                       newField.event_description = '';
                       setFormField(newField);
                       setLoading(false);
                       getEventsListPartner();
                       formRef.reset();
                 }
             })
             .catch((err) => {
                 console.log(err.response);
             });

      }

    return(
        <>
            {/*<h5>Lead Event</h5>*/}
             <Editor style={{height:'300px'}} editorState={editorState} onChange={setEditorState} />
            <div style={{display:'flex',justifyContent:'center'}}>
                <Form style={{width:'600px',paddingTop:'1rem'}} ref={form => formRef = form} onSubmit={(event) => submitForm(event)}>
                     <h5 className="text-center mb-0">Write Your Events !!!</h5>
                     <p className="text-center" style={{fontSize:'12px'}}>write your event as your wish.</p>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control name="event_description"  onChange={(event) => handleForm(event)} as="textarea" rows={3} />
                      </Form.Group>
                       <Form.Group className="mt-4">
                           {loading?
                               <>
                                    <div style={{display:'flex',justifyContent:'center'}}>
                                         <Button  className="customBtn" style={{float:'right',width:'200px'}}>Creating...</Button>
                                   </div>
                               </>:
                               <>
                                    <div style={{display:'flex',justifyContent:'center'}}>
                                      <Button type="submit" className="customBtn" style={{float:'right',width:'200px'}}>Create</Button>
                                    </div>
                               </>
                           }

                       </Form.Group>
                </Form>
            </div>

            {leadEvents.length?
                <>

                    <div  className="pt-5">
                         {leadEvents.map((data)=>(
                             <>
                                 <div  style={{display:'flex',justifyContent:'center'}}>
                                   {data.event_description}
                                </div>
                             </>
                         ))}
                    </div>

                </>:
                <>
                    <div className="pt-5" style={{display:'flex',justifyContent:'center'}}>
                       No Any Event
                    </div>
                </>
            }

        </>
    )
}
export default MarketingEvent