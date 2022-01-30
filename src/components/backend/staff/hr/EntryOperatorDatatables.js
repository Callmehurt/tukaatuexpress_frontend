import React, {useEffect} from 'react';
import {RiDeleteBin2Line} from "react-icons/ri";
import {BiEdit} from "react-icons/bi";
import MUIDataTable from "mui-datatables";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {HrAdminDeliveryPerson,getEntryOperatorList} from "../../../../redux/actions/HrAdmin";

const EntryOperatorDatatables=()=>{
     const dispatch = useDispatch();
    const hrAdminState = useSelector((state) => state.hrAdmin);
    const allEntryOperatorList=hrAdminState.allEntryOperatorList;
    useEffect(()=>{
        let hrAdmin = JSON.parse(localStorage.getItem('staff_hrAdmin'));
        console.log(hrAdmin);
        if(hrAdmin){
          setAuthorizationToken(hrAdmin.token);
        }
        getEntryOperatorStaffList();

    },[]);
    const getEntryOperatorStaffList =()=>{
         axios.get('hr/list/entry/operator')
            .then((res) => {
                console.log(res);
                dispatch(getEntryOperatorList(res.data));
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
            name: 'id',
            label: 'Action',
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex'}}>
                          {/*<div style={{width:'50%',}}>*/}
                          {/*      <button className="deleteBtn" onClick={(event)=>employeeRemove(value)}> <RiDeleteBin2Line/> </button>*/}
                          {/*</div>*/}
                          {/* <div style={{width:'50%',}}>*/}
                          {/*      <button className="editBtn" ><BiEdit /></button>*/}
                          {/*</div>*/}
                          {/* <div style={{width:'50%',}}>*/}
                          {/*      <button className="editBtn" >Active</button>*/}
                          {/*</div>*/}


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
    return(
        <>
            {/*<h5>EntryOperatorDatatables</h5>*/}
             <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>Delivery Person List</div></>}
            data={allEntryOperatorList}
            columns={columns}
            options={options}
           />
        </>
    )
}
export default EntryOperatorDatatables