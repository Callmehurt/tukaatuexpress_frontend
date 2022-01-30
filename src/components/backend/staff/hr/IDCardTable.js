import React, {useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import axios from "axios";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import AssignCard from "./AssignCardModal";
import {fetchIDCardRecords} from "../../../../redux/actions/IDCardAction";
import showNotification from "../../includes/notification";
import {useDispatch} from "react-redux";

const IDCardTable = (props) => {

    const id_list = props.list;
    const dispatch = useDispatch();
    const [cardInfo, setCardInfo] = useState({
        staff_id: '',
        staff_type: '',
        card_id: ''
    });
    const [show, setShow] = useState(false);

    const handleStaffSelect = (staff_id)  => {
        const field = {...cardInfo};
        field.staff_id=staff_id;
        setCardInfo(field);
    }

    const removeStaffFromCard = async (card_id) => {
        setIsRemoving(true);
        await axios.put(`/hr/remove/staff/from/id-card/${card_id}`).then((res) => {
            console.log(res)
            if(res.data.status === true){
                 dispatch(fetchIDCardRecords());
                 showNotification('success', res.data.message);
            }else {
                 showNotification('danger', res.data.message);
            }
            setIsRemoving(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    const [staffList, setStaffList] = useState([]);
    const [isRemoving, setIsRemoving] = useState(false);
    const handleClose = () => {
        setShow(false);
        setStaffList([]);
    };
    const handleShow = () => setShow(true);

    const openStaffModal = async (card_id, staff_type) => {
        setCardInfo({card_id: card_id, staff_type: staff_type});
        if(staff_type === 'other'){
            handleShow();
         const res = await axios.get('hr/staff/list')
            .catch((err) => {
                console.log(err);
            })
            setStaffList(res.data);
        }else if (staff_type === 'entry'){
            handleShow();
            const res = await axios.get('hr/list/entry/operator')
            .catch((err) => {
                console.log(err);
            })
            setStaffList(res.data);
        }
        else if (staff_type === 'marketing'){
            handleShow();
            const res = await axios.get('hr/list/marketing/staff')
            .catch((err) => {
                console.log(err);
            })
            setStaffList(res.data);
        }
    }

     useEffect(()=>{
        let hrAdmin = JSON.parse(localStorage.getItem('staff_hrAdmin'));
        if(hrAdmin){
          setAuthorizationToken(hrAdmin.token);
        }

    },[]);

    const columns = [
        {
         name: "card_num",
         label: "Card Number",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
            name: 'assigned_status',
            label: 'Status',
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex'}}>
                          {value === 1 ? (
                              <button className="btn btn-sm btn-success">Assigned</button>
                          ): (
                              <button className="btn btn-sm btn-danger">Vacant</button>
                          ) }
                      </div>
                  </>
              )
            }
        },
        {
            name: 'delivery_staff',
            label: 'Delivery Staff',
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex'}}>
                          {value !== null &&  id_list[tableMeta.rowIndex].entry_staff === null &&  id_list[tableMeta.rowIndex].marketing_staff === null ? (
                              <span>{value}</span>
                          ): value === null &&  id_list[tableMeta.rowIndex].entry_staff === null &&  id_list[tableMeta.rowIndex].marketing_staff === null ?
                              (
                                  <>
                                  <button className="btn btn-sm" style={{backgroundColor: '#067396',color: 'white'}} onClick={() => openStaffModal(id_list[tableMeta.rowIndex].id, 'other')}>Assign</button>
                                  </>
                              ): value === null &&  id_list[tableMeta.rowIndex].entry_staff !== null ||  id_list[tableMeta.rowIndex].marketing_staff !== null ?
                                  (
                                      <>
                                      <span> - </span>
                                      </>
                                  ):
                              (
                              <>
                                  <button className="btn btn-sm" style={{backgroundColor: '#067396',color: 'white'}} onClick={() => openStaffModal(id_list[tableMeta.rowIndex].id, 'other')}>Assign</button>
                              </>
                          ) }
                      </div>
                  </>
              )
            }
        },
        {
        name: 'entry_operator',
        label: 'Entry Operator',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  <div style={{width:'100%',display:'flex'}}>
                      {value !== null &&  id_list[tableMeta.rowIndex].dp_staff === null &&  id_list[tableMeta.rowIndex].marketing_staff === null ? (
                          <span>{value}</span>
                      ): value === null &&  id_list[tableMeta.rowIndex].dp_staff === null &&  id_list[tableMeta.rowIndex].marketing_staff === null ?
                          (
                              <>
                                  <button className="btn btn-sm" style={{backgroundColor: '#067396',color: 'white'}} onClick={() => openStaffModal(id_list[tableMeta.rowIndex].id, 'entry')}>Assign</button>
                              </>
                          ): value === null &&  id_list[tableMeta.rowIndex].dp_staff !== null ||  id_list[tableMeta.rowIndex].marketing_staff !== null ?
                              (
                                  <>
                                      <span className="text-center"> - </span>
                                  </>
                              ):
                          (
                          <>
                              <h5>
                                  <button className="btn btn-sm" style={{backgroundColor: '#067396',color: 'white'}} onClick={() => openStaffModal(id_list[tableMeta.rowIndex].id, 'entry')}>Assign</button>
                              </h5>
                          </>
                      ) }
                  </div>
              </>
          )
        }
        },
       {
        name: 'marketer',
        label: 'Marketing_staff',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => (
              <>
                  <div style={{width:'100%',display:'flex'}}>
                      {value !== null &&  id_list[tableMeta.rowIndex].dp_staff === null &&  id_list[tableMeta.rowIndex].entry_staff === null ? (
                          <span>{value}</span>
                      ): value === null &&  id_list[tableMeta.rowIndex].dp_staff === null &&  id_list[tableMeta.rowIndex].entry_staff === null ?
                          (
                              <>
                                  <button className="btn btn-sm" style={{backgroundColor: '#067396',color: 'white'}} onClick={() => openStaffModal(id_list[tableMeta.rowIndex].id, 'marketing')}>Assign</button>
                              </>
                          ): value === null &&  id_list[tableMeta.rowIndex].dp_staff !== null ||  id_list[tableMeta.rowIndex].entry_staff !== null ?
                              (
                                  <>
                                      <span> - </span>
                                  </>
                              ):
                          (
                          <>
                              <h5>
                                  <button className="btn btn-sm" style={{backgroundColor: '#067396',color: 'white'}} onClick={() => openStaffModal(id_list[tableMeta.rowIndex].id, 'marketing')}>Assign</button>
                              </h5>
                          </>
                      ) }
                  </div>
              </>
          )
        }
        },
        {
            name: 'id',
            label: 'Action',
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      {id_list[tableMeta.rowIndex].marketing_staff === null &&  id_list[tableMeta.rowIndex].dp_staff === null &&  id_list[tableMeta.rowIndex].entry_staff === null ? (
                          <>
                              <span> - </span>
                          </>
                      ): (
                          <>
                           <div style={{width:'100%',display:'flex'}}>
                               {isRemoving ? (
                                   <button className="btn btn-sm btn-danger">Removing</button>
                               ): (
                                   <button className="btn btn-sm btn-danger" onClick={() => removeStaffFromCard(value)}>Remove</button>
                               )}
                            </div>
                          </>
                      )
                      }
                  </>
              )
            }
        }

       ];

     const options = {
        searchOpen:false,
        filterType:'textField',
        fixedHeader:false,
        rowsPerPage:[100],
        rowsPerPageOptions:[10,20,50,100,500],
        selectableRows: 'none',
  }

  return (
      <>
          <AssignCard staffs={staffList} cardInfo={cardInfo} toggle={show} handleClose={handleClose} handleStaffSelect={handleStaffSelect}/>
        <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>Delivery Person List</div></>}
            data={id_list}
            columns={columns}
            options={options}
           />
      </>
  );
}

export default IDCardTable;