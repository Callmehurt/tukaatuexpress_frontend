import React, {useEffect} from 'react'
import MUIDataTable from "mui-datatables";
import {ImBoxRemove} from "react-icons/im";
import {Button} from 'react-bootstrap';
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux"
import {HrAdminDeliveryPerson} from './../../../../redux/actions/HrAdmin'
import wareHouseLists from "../../../../redux/actions/wareHouseList";
import {wareHouseListCount} from "../../../../redux/actions/wareHouseListCount";
import {RiDeleteBin2Line} from "react-icons/ri";
import {BiEdit} from "react-icons/bi";
import showNotification from "../../includes/notification";

const StaffListDatatable=()=>{
    const dispatch = useDispatch();
    const hrAdminState = useSelector((state) => state.hrAdmin);
    const deliveryPersonList = hrAdminState.DeliveryList;
    useEffect(()=>{
        let hrAdmin = JSON.parse(localStorage.getItem('staff_hrAdmin'));
        console.log(hrAdmin);
        if(hrAdmin){
          setAuthorizationToken(hrAdmin.token);
        }
        DeliveryPersonsFunc();
    },[]);
    const makeActiveAndInactive=(staff_id)=>{
         axios.put(`hr/staff/ban/unban/${staff_id}`)
            .then((res) => {
                console.log(res);
                DeliveryPersonsFunc();
                // dispatch(HrAdminDeliveryPerson(res.data));
                // dispatch(wareHouseListCount(res.data.length));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
    const DeliveryPersonsFunc =()=>{
         axios.get('hr/staff/list')
            .then((res) => {
                console.log(res);
                dispatch(HrAdminDeliveryPerson(res.data));
                // dispatch(wareHouseListCount(res.data.length));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
    const columns = [
        {
         name: "name",
         label: "Name",
         options: {
          filter: true,
          sort: true,
         }
        },
         {
         name: "phone",
         label: "Phone",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "email",
         label: "Email",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "address",
         label: "Address",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "join_date",
         label: "Join Date",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "salary",
         label: "Salary",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "bank_account",
         label: "Bank Account",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "account_holder",
         label: "Account Holder",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "citizenship",
         label: "CitizenShip",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "isBan",
         label: "isBan",
         options: {
          filter: true,
          sort: true,
             display:false
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
                      <div style={{width:'100%',display:'flex'}}>
                          <div style={{width:'50%',}}>
                                <button className="deleteBtn" onClick={(event)=>employeeRemove(value)}> <RiDeleteBin2Line/> </button>
                          </div>
                           <div style={{width:'50%',}}>
                                <button className="editBtn" ><BiEdit /></button>
                          </div>
                          {tableMeta.rowData[9]==1?
                              <>
                                   <div style={{width:'50%',}}>
                                      <Button variant="danger" style={{padding:'4px 13px',fontSize:'14px'}} onClick={(event)=>makeActiveAndInactive(value)}>InActive</Button>
                                 </div>

                              </>:
                              <>
                                  <div style={{width:'50%',}}>
                                   <Button variant="success" style={{padding:'4px 13px',fontSize:'14px'}} onClick={(event)=>makeActiveAndInactive(value)}>Active</Button>
                                 </div>
                              </>
                          }
                      </div>
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
  const employeeRemove=async (id)=>{
      await axios.delete(`hr/delivery/person/${id}`)
            .then((res) => {
                console.log(res);
                // dispatch(NewPickupList(res.data))
                showNotification('success', res.data.message);
                DeliveryPersonsFunc();

            })
            .catch((err) => {
                console.log(err.response.data);
            })

  }
    return(
        <>
            <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>Delivery Person List</div></>}
            data={deliveryPersonList}
            columns={columns}
            options={options}
           />
        </>
    )
}
export default StaffListDatatable