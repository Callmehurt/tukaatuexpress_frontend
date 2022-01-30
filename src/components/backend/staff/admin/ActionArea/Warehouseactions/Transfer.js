import React, {useState,useEffect} from 'react'
import Select from "react-select";
import {Container, Col, Form, Row,Button} from "react-bootstrap";
import {useForm} from "react-hook-form";
import setAuthorizationToken from "../../../../../../utils/setAuthorizationToken";
import axios from "axios";
import showNotification from "../../../../includes/notification";
import wareHouseLists from "../../../../../../redux/actions/wareHouseList";
import {useDispatch, useSelector} from "react-redux";

const Transfer = (props) =>{
       const toggle = props.toggle;
       const dispatch = useDispatch();
       const thisState = useSelector((state) => state.transfer);
       const transferAllBranch = thisState.transferAllBranch;

       let formRef = null;
       const { register, handleSubmit, errors } = useForm();
       const [transferpacket, setTransferpacket] = useState({
        transfer_from:'',
        transfer_to:'',
        pickup_id:'',
     });


       const transferPacketFunc=(data,pickupId)=>{
           console.log('transferpacketfunc');
            const forBranchId ={...transferpacket};
             forBranchId.transfer_from = data;
             forBranchId.pickup_id = pickupId;
             console.log(forBranchId);
             setTransferpacket(forBranchId);

       }
       useEffect(()=>{
           console.log('transfer effect');
             console.log(props.packetIdModal);
             console.log('packetid');
             let staffadmin = JSON.parse(localStorage.getItem('staff_admin'));
             if(staffadmin){
              setAuthorizationToken(staffadmin.token);
             }
             console.log(staffadmin.user.branch_id);
             transferPacketFunc(staffadmin.user.branch_id,props.packetIdModal);
             console.log(transferAllBranch);

       },[0]);

       const selectChange = event => {
            console.log(event);
           console.log('transfer to');
            let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
            if(event){
                const field = {...transferpacket};
                field.transfer_to = event.value;
                setTransferpacket(field);

            }
       }
  const onSubmit = async (event) => {
         console.log('event');
         // event.preventdefault();
         console.log(transferpacket);
         axios.post('admin/pickup/transfer', transferpacket)
             .then((res) => {
                 console.log(res);
                 if(res.data.status === false){
                     showNotification('danger', res.data.message);
                 }else{
                     toggle(false);
                     refreshWareHouseList();
                     showNotification('success', res.data.message);
                 }
             })
             .catch((err) => {
                 console.log(err.response.data);
             });

     }
      const refreshWareHouseList=()=>{
         axios.get('admin/pickup/warehouse/list')
             .then((res) => {
                 console.log(res);
                 dispatch(wareHouseLists(res.data));
             })
             .catch((err) => {
                 console.log(err.response.data);
             });

     }
     const TransferBranch=[
         // {value:'1',label:'Itahari Branch'},
          {value:'2',label:'Kathmandu Branch'},
         {value:'3',label:'Damak Branch'}
     ];
    return(
        <>
           <div style={{width:'400px',}}>
                    <Form onSubmit={handleSubmit(onSubmit)} ref={form => formRef = form}>
                        <Form.Group>
                            <Form.Label>Transfer to:</Form.Label>

                                <Row>
                                    <Col md={12}>

                                        <Select
                                              className="basic-single"
                                              classNamePrefix="select"
                                              defaultValue=""
                                              isDisabled={false}
                                              isLoading={true}
                                              isClearable={false}
                                              isRtl={false}
                                              isSearchable={true}
                                              name="transfer_to"
                                              placeholder="== Select Branches =="
                                              options={TransferBranch}
                                              onChange={(event) => selectChange(event)}
                                              style={{width:'100%'}}

                                            />

                                    </Col>
                                </Row>


                        </Form.Group>
                        <Button type="submit" variant="primary" style={{marginTop:'35px',width:'100%'}}>Transfer</Button>

                    </Form>
               </div>



        </>
    )
}

export default Transfer