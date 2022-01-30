import React, {useState,useEffect} from 'react'
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import Transfer from './Transfer'
import {set, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import showNotification from "../../../../includes/notification";
import wareHouseLists from "../../../../../../redux/actions/wareHouseList";
import {wareHouseListCount} from "../../../../../../redux/actions/wareHouseListCount";
import Select from "react-select";
import setAuthorizationToken from "../../../../../../utils/setAuthorizationToken";

const TransferModal=(props)=>{
      const toggle = props.toggle;
       const dispatch = useDispatch();
       let formRef = null;
        const thisState = useSelector((state) => state.transfer);
       const transferAllBranch = thisState.transferAllBranch;
       const { register, handleSubmit, errors } = useForm();
       const [transferpacket, setTransferpacket] = useState({
        transfer_from:'',
        transfer_to:'',
        pickup_id:'',
     });
    const [packetIdModal,setPacketIdModal]=useState('');
    const packetIDModal=(data)=>{
        setPacketIdModal(data);
    }

    useEffect(()=>{
        packetIDModal(props.packetId);
        transferPacketFunc(props.packetId);


    },[props.packetId]);

    const transferPacketFunc=(pickupId)=>{
           console.log('transferpacketfunc');
            let staffadmin = JSON.parse(localStorage.getItem('staff_admin'));
             if(staffadmin){
              setAuthorizationToken(staffadmin.token);
             }
             const fromBranch = staffadmin.user.branch_id;
            const forBranchId ={...transferpacket};
             forBranchId.transfer_from = fromBranch;
             forBranchId.pickup_id = pickupId;
             setTransferpacket(forBranchId);

       }

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
                 dispatch(wareHouseListCount(res.data.length));
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
                  className="modal_size_assign"
                  // style={{maxWidth:'500px',}}


                >
                 <Modal.Header>
                        <Modal.Title>
                           Transfer To
                        </Modal.Title>
                 </Modal.Header>
                 <Modal.Body  style={{width:'400px'}}>
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
                                              isLoading={false}
                                              isClearable={false}
                                              isRtl={false}
                                              isSearchable={true}
                                              name="transfer_to"
                                              placeholder="== Select Branches =="
                                              options={transferAllBranch}
                                              onChange={(event) => selectChange(event)}
                                              style={{width:'100%'}}

                                            />

                                    </Col>
                                </Row>

                        </Form.Group>
                           <Row>
                             <Col lg={6}>
                                <Form.Group className="mt-4">
                                   <Button type="submit" variant="primary" style={{marginTop:'35px',width:'100%'}}>Transfer</Button>
                                </Form.Group>
                             </Col>
                             <Col lg={6}>
                                 <Form.Group className="mt-4">
                                      <Button variant="danger" style={{marginTop:'35px',width:'100%'}} onClick={(event)=>toggle(false)}>Cancel</Button>
                                </Form.Group>
                             </Col>
                           </Row>


                    </Form>

                        {/*<h1>{props.updata.data.id}</h1>*/}
                    {/*<Transfer packetIdModal={packetIdModal}  toggle={props.onHide} />*/}

                 </Modal.Body>
             </Modal>


        </>
    )

}

export default TransferModal