import React, {useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
// import {ImBoxRemove} from "react-icons/im";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import{Button} from 'react-bootstrap';
import {transferRateList} from "../../../../redux/actions/MainAdmin";
import TransferRateEdit from "./TransferRateEdit";
import {BiEdit} from "react-icons/bi";
import{editTransferRate} from "../../../../redux/actions/MainAdmin";
// import AssignDeliveryModal from "../../staff/admin/ActionArea/Warehouseactions/AssignDeliveryModal";

const TransferRateList=()=>{
     const dispatch=useDispatch();
     const mainAdmin= useSelector((state) => state.mainAdmin);
     const transferRatesList=mainAdmin.transferRatesList;
     const[transferRateShow,setTransferRateShow]=useState('');
     const[transferRateID,setTransferRateID]=useState('');

    useEffect(()=>{
        let mainAdmin = JSON.parse(localStorage.getItem('main_admin'));
        console.log(mainAdmin.token);
        if(mainAdmin){
          setAuthorizationToken(mainAdmin.token);
        }
        getTransferRateList();


    },[]);
    const createTransferRate = () =>{
        console.log('hi');

    }

    const getTransferRateList=()=>{
        axios.get('/mainadmin/transfer/rates')
            .then((res) => {
                console.log(res.data);
                dispatch(transferRateList(res.data));
                // dispatch(AdminBranches(res.data));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }

    const editTransferRates=(id)=>{
        console.log('edit transfer rate');
        setTransferRateID(id);
         getTransferRate(id);
        setTransferRateShow(true);
    }
    const getTransferRate=(rate_id)=>{
           axios.get(`/mainadmin/get/transfer/rate/${rate_id}`)
            .then((res) => {
                console.log(res.data);
                dispatch(editTransferRate(res.data));
                // dispatch(AdminBranches(res.data));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }


const options = {
    searchOpen:true,
    filterType:'textField',
    fixedHeader:false,
    selectableRows: 'none',
  }
  const columns = [
        {
         name: "id",
         label: "S.N.",
         options: {
          filter: true,
          sort: true,
         }
        },
         {
         name: "transfer_count",
         label: "Transfer Count",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "rate",
         label: "Rates",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "updated_at",
         label: "Last Updated",
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
                          <button className="editBtn" onClick={(event)=>editTransferRates(value)} ><BiEdit /></button>

                      </div>
                  </>
              )
            }
        }

       ];
    const onHideTransferRate=()=>{
          setTransferRateShow(false);
        }

    return(
        <>
            {/*<Button variant="primary" onClick={()=>createTransferRate()}>Create Transfer Rate</Button>*/}

           <TransferRateEdit transferRateID={transferRateID} show={transferRateShow} toggle={onHideTransferRate} />
            <h6>Transfer Rate List</h6>
            <MUIDataTable
                // title={<><div></div></>}
            data={transferRatesList}
            columns={columns}
            options={options}
           />
        </>
    );
}

export default TransferRateList