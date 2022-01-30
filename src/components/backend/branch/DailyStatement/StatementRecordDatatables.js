import React,{useEffect} from 'react'
import MUIDataTable from "mui-datatables";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import axios from "axios";
import showNotification from "../../includes/notification";
import {DailyStatementRecords} from './../../../../redux/actions/MainBranches'
import {useDispatch, useSelector} from "react-redux";

const StatementRecordDatatables=()=>{
     const dispatch = useDispatch();
     const mainBranches = useSelector((state) => state.mainBranches);
     const DailyStatementRecordLists=mainBranches.DailyStatementRecords;
    useEffect(()=>{
        let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
        if(branch_detail){
          setAuthorizationToken(branch_detail.token);
        }
        getStatementRecords();

    },[]);
    const getStatementRecords=()=>{
       axios.get('/branch/get/daily/statement-list')
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    dispatch(DailyStatementRecords(res.data));
                    // if(res.data.status===true){
                    //       showNotification('success', res.data.message);
                    // }
                    // else{
                    //     showNotification('danger', res.data.message);
                    // }

                    })
                .catch((err) => {
                    console.log(err.response)
                })
    }
    const columns = [
        {
         name: "statement_num",
         label: "Statement Number",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
            name: 'id',
            label: 'Statement',
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex'}}>
                          <div style={{width:'50%',}}>
                                <button className="deleteBtn" onClick={(event)=>{}}> Download </button>
                          </div>
                           <div style={{width:'50%',}}>
                                <button className="editBtn" >Statement</button>
                          </div>
                      </div>
                  </>
              )
            }
        },
        {
         name: "statement_date",
         label: "Creation Date",
         options: {
          filter: true,
          sort: true,
         }
        },

       ];
     const options = {
        searchOpen:false,
        filterType:'textField',
        fixedHeader:false,
        selectableRows: 'none',
  }
    return(
        <>
            {/*<h6>statement Record</h6>*/}
             <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>........</div></>}
            data={DailyStatementRecordLists}
            columns={columns}
            options={options}
           />
        </>
    )
}

export default StatementRecordDatatables