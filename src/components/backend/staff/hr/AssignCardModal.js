import React, {useEffect, useState} from "react";
import {Modal, Button, Col} from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import {fetchIDCardRecords} from "../../../../redux/actions/IDCardAction";
import {useDispatch} from "react-redux";
import showNotification from "../../includes/notification";

const AssignCard = (props) => {

  const dispatch = useDispatch();

  const show = props.toggle;
  const staffList = props.staffs;
  const arr = [];
  staffList.map((data) => {
    arr.push({
      label: data.name,
      value: data.id
    })
  });

  const selectChange = event => {
    console.log(event);
    props.handleStaffSelect(event.value);
  }

  const [isSubmit, setIsSubmit] = useState(false);

  const submitAssign = async () => {
    setIsSubmit(true);
    const cardDetail = props.cardInfo;
    const res = await axios.post('hr/assign/id-card', {
      card_id: cardDetail.card_id,
      staff_id: cardDetail.staff_id,
      staff_type: cardDetail.staff_type
    }).catch((err) => {
      console.log(err)
    })

    if (res){
      if (res.data.status === true){
        dispatch(fetchIDCardRecords());
        showNotification('success', res.data.message);
        props.handleClose();
      }else {
        showNotification('danger', res.data.message);
      }
      setIsSubmit(false)
    }
  }

   useEffect(()=>{
        let hrAdmin = JSON.parse(localStorage.getItem('staff_hrAdmin'));
        if(hrAdmin){
          setAuthorizationToken(hrAdmin.token);
        }

    },[]);

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Staff List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue=""
              isDisabled={false}
              isClearable={false}
              isRtl={false}
              isSearchable={true}
              placeholder="== Choose Staff =="
              options={arr}
              onChange={(event) => selectChange(event)}
              style={{width:'100%'}}

            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          {isSubmit ? (
              <Button variant="primary">
              Assigning..
            </Button>
          ): (
              <Button variant="primary" onClick={() => submitAssign()}>
                Submit
              </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AssignCard;