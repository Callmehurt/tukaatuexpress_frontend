import React, {useEffect} from 'react'
import {Link} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import {useDispatch, useSelector} from "react-redux";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import axios from "axios";
import {ApprovedStatements} from './../../../../redux/actions/MainBranches'
const ApprovedStatementDatatables=()=>{
    const dispatch = useDispatch();
        const BranchDeliveryStatement = useSelector((state) => state.mainBranches);
        const ApprovedDeliveryStatements = BranchDeliveryStatement.ApprovedStatements;
        useEffect(()=>{
            let branch_detail = JSON.parse(localStorage.getItem('branch_detail'));
            if(branch_detail){
              setAuthorizationToken(branch_detail.token);
            }
            axios.get('/branch/approved/delivery/statements')
                .then((res) => {
                    console.log(res.data);
                    console.log('BRANCH Approved STATEMENT');
                     dispatch(ApprovedStatements(res.data));
                })
                .catch((err) => {
                    console.log(err.response);
                })
        },[])
     const columns = [
        {
        name: 'statement_num',
        label: 'S. No.',
        options: {
          filter: true,
          sort: true,
         }
      },
         {
         name: "delivered",
         label: "T. Delivered",
         options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                   if(value) {
                       const newValue = value.split(",")
                       return newValue?.length;
                   }
                   else{
                      value=0;
                      return value;
                  }
              }
            }
        },
        {
         name: "returns",
         label: "T. Returns",
         options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                  // console.log(value+'o');
                  if(value) {
                      const newValue = value.split(",")
                      return newValue?.length;
                  }
                  else{
                      value=0;
                      return value;
                  }
              }
            }
        },
        {
         name: "holds",
         label: "T. Holds",
         options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                  // console.log(value+'o');
                  if(value) {
                      const newValue = value.split(",")
                      return newValue?.length;
                  }
                  else{
                      value=0;
                      return value;
                  }
              }
            }
        },
        {
         name: "submit_date",
         label: "Applied Date",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "total_cod_received",
         label: "T. COD Rec.",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "total_delivery_charge",
         label: "T. DC",
         options: {
          filter: true,
          sort: true,
         }
        },
         {
         name: "dc_from_customer",
         label: "D.C From C.",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
        name: 'commission',
        label: 'T. Com.',
        options: {
          filter: true,
          sort: true,
         },
      },
       {
         name: "to_deposit",
         label: "A. To Dep.",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "id",
         label: "Statement",
         options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex'}}>
                         <button style={{width:'130px',borderRadius:'5px',border:'none',backgroundColor:'#ffc107',padding:'5px 10px'}} onClick={() => viewPdf(value)}> View Statement </button>
                      </div>
                  </>
              )
            }
        },
       {
         name: "invoice",
         label: "Invoice",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "submitted_by",
         label: "Sub. By",
         options: {
          filter: true,
          sort: true,
         }
        },
       {
         name: "remarks",
         label: "Remarks",
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
  const viewPdf =(statement_id)=>{
        console.log(statement_id);
        axios.get(`/branch/get/delivery/statement/${statement_id}`,{
              responseType: 'blob',
             Accept: 'application/pdf',
        })
        .then(response => {
            console.log(response.data);
            const file = new Blob(
              [response.data],
              {type: 'application/pdf'});
            console.log(file);
            const fileURL = URL.createObjectURL(file);
            // const link = document.createElement('a');
            // link.href = fileURL;
            // link.setAttribute('staffs.pdf');
            // document.body.appendChild(link);
            // link.click();
        //Open the URL on new Window
            window.open(fileURL);
        })
       .catch(error => {
        console.log(error);
    });
  }
    return(
        <>
            <MUIDataTable
             // title={<><div style={{fontSize:'16px', fontWeight:'500',}}>Approved Statement</div></>}
             data={ApprovedDeliveryStatements}
             columns={columns}
             options={options}
           />
        </>
    )
}
export default ApprovedStatementDatatables