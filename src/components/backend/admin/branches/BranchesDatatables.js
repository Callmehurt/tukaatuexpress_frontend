import React,{useState,useEffect} from 'react'
import MUIDataTable from "mui-datatables"
import setAuthorizationToken from "../../../../utils/setAuthorizationToken"
import {ImBoxRemove} from "react-icons/im";
import {BiEdit} from "react-icons/bi";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import wareHouseLists from "../../../../redux/actions/wareHouseList";
import {AdminBranches} from "../../../../redux/actions/AdminBranches"
import BranchesEditModal from "./BranchesEditModal";
import {updateBranchDetail} from "../../../../redux/actions/MainAdmin";

const BranchesDatatables=()=>{
    const dispatch=useDispatch();
    const [updateShow, setUpdateShow] = React.useState(false);
    const AdminBranchesList= useSelector((state) => state.adminBranches);
    const BranchList = AdminBranchesList.branchesList;
    const[branchId,setBranchId]=useState('');


    useEffect(()=>{
        let mainAdmin= JSON.parse(localStorage.getItem('main_admin'));
        if(mainAdmin){
          setAuthorizationToken(mainAdmin.token);
        }
        axios.get('/mainadmin/branch/list')
            .then((res) => {
                console.log(res);
                dispatch(AdminBranches(res.data));
            })
            .catch((err) => {
                console.log(err.response.data);
            })

    },[0]);




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
         name: "lat",
         label: "Latitude",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "lng",
         label: "Longitude",
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
            name: 'id',
            label: 'Action',
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex'}}>
                          <div style={{width:'50%',}}>
                                <button className="editBtn" onClick={(event)=>editBranches(value)} ><BiEdit /></button>
                          </div>
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
   const editBranches=(id)=>{
        setBranchId(id);
        axios.get(`/mainadmin/branch/${id}`)
             .then((res) => {
                 console.log(res);
                  dispatch(updateBranchDetail(res.data));
             })
             .catch((err) => {
                 console.log(err.response);
             });
        setUpdateShow(true);

    }
     const onHideUpdate=()=>{
          setUpdateShow(false);
        }

    return(
        <>
            <BranchesEditModal branchId={branchId} show={updateShow} toggle={onHideUpdate} />
            <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>At WareHouse</div></>}
            data={BranchList}
            columns={columns}
            options={options}
           />
        </>
    )
}

export default BranchesDatatables