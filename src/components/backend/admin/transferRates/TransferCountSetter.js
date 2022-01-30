import React, {useEffect, useState} from 'react';
// import Accordion from 'react-bootstrap/Accordion';
import {Row,Col,Form,Button} from 'react-bootstrap';
import Select from "react-select";
import {useDispatch, useSelector} from "react-redux";
import MUIDataTable from "mui-datatables";
import {BiEdit} from "react-icons/bi";
import {BranchListForInput} from './../../../../redux/actions/MainAdmin'
import axios from "axios";
import {AdminBranches} from "../../../../redux/actions/AdminBranches";
import setAuthorizationToken from "../../../../utils/setAuthorizationToken";
import notification from "../../includes/notification";
import {interTransferCountList} from './../../../../redux/actions/MainAdmin';

const TransferCountSetter=()=>{
     const dispatch=useDispatch();
     const AdminBranchesList= useSelector((state) => state.adminBranches);
     const mainAdmin= useSelector((state) => state.mainAdmin);
    const branchListForInput = mainAdmin.branchListForInput;
    const interTransferCountLists=mainAdmin.interTransferCountList;
    // const BranchList=AdminBranchesList.BranchList;
     let selectCustomerRef = null;
      let formRef = null;
      let selectFromRef =null;
        let selectToRef =null;
       const [formField, setFormField] = useState({
        from:'',
           from_branch:'',
        to:'',
           to_branch:'',
        count:'',

    });
       useEffect(()=>{
           let mainAdmin= JSON.parse(localStorage.getItem('main_admin'));
            if(mainAdmin){
              setAuthorizationToken(mainAdmin.token);
            }
           getBranchListInput();
            getAllTransferList();
       },[0])

    const selectChange1=(event)=>{
      console.log(event)
        if(event){
            const field = {...formField};
            // field.transfer_to=event.value;
            field.from_branch=event.label;
             field.from=event.value;

            // field[event.name] = event.value;
            setFormField(field);
        }
    }
    const getBranchListInput=()=>{
        axios.get('/mainadmin/branch/drop/list')
            .then((res) => {
                console.log(res);
                dispatch(BranchListForInput(res.data));
            })
            .catch((err) => {
                console.log(err.response);
            })

    }
    const editTransfer=(id)=>{
           console.log(id);
    }
    const selectChange2=(event)=>{
      console.log(event)
        if(event){
            const field = {...formField};
            field.to=event.value;
             field.to_branch=event.label;
             // field.transfer_from=event.value;
            // field[event.name] = event.value;
            setFormField(field);
        }
    }
    const handleForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);

    }
    const options = {
        searchOpen:false,
        filterType:'textField',
        fixedHeader:false,
        rowsPerPage:[100],
        rowsPerPageOptions:[10,20,50,100,500],
        selectableRows: 'none',
  }
  const getAllTransferList=()=>{
           axios.get('/mainadmin/transfer/count/list')
            .then((res) => {
                console.log(res);
                dispatch(interTransferCountList(res.data));
            })
            .catch((err) => {
                console.log(err.response);
            })
  }
     const columns = [
        {
         name: "from_branch",
         label: "Transfer From",
         options: {
          filter: true,
          sort: true,
         }
        },
         {
         name: "to_branch",
         label: "Transfer To",
         options: {
          filter: true,
          sort: true,
         }
        },
         {
         name: "count",
         label: "Transfer Count",
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
                                <button className="editBtn" onClick={(event)=>editTransfer(value)} ><BiEdit /></button>
                          </div>
                      </div>
                  </>
              )
            }
        }

       ];
     const clearValue = () => {
            selectCustomerRef.select.clearValue();
            formRef.reset();
          };
    const branches=[
        {value:'1', label:'itahari'},
        {value:'2',label:'Kathmandu'},
    ]
    const clearform = () => {
    console.log('clear form');
    selectFromRef.select.clearValue();
     selectToRef.select.clearValue();
    // selectPartnerRef.select.clearValue();
    formRef.reset();
 }
     const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formField);
         axios.post('/mainadmin/store/transfer/count', formField)
            .then((res) => {
                console.log(res)
                if(res.data.status === true){
                    getAllTransferList();
                    notification('success', res.data.message);

                    console.log(formField);
                    clearform();
                    // setLoading(false);
                    // history.push('/staff/admin/pickups');
                }else {
                    notification('danger', res.data.message);
                }


            })
            .catch((err) => {
                console.log(err.response)
            })

     }

    return(
        <>
          {/*<h6>Transfer Count Setter</h6>*/}
           <Form onSubmit={(event) => handleSubmit(event)} ref={form => formRef = form}>
            <Row>
                <Col lg={3}>
                     <h6>From:</h6>
                    <Select
                         ref={ref => {
                        selectFromRef = ref;
                      }}
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue=""
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="transfer_from"
                      placeholder="== Select Customer =="
                      options={branchListForInput}
                      onChange={(event) => selectChange1(event)}
                    />
                    {/*<Form.Select aria-label="Default select example">*/}
                    {/*  <option>Open this select menu</option>*/}
                    {/*  <option value="1">One</option>*/}
                    {/*  <option value="2">Two</option>*/}
                    {/*  <option value="3">Three</option>*/}
                    {/*</Form.Select>*/}

                </Col>
                 <Col lg={3}>
                     <h6>To:</h6>
                     <Select
                         ref={ref => {
                        selectToRef = ref;
                      }}
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue=""
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="transfer_to"
                      placeholder="== Select Customer =="
                      options={branchListForInput}
                      onChange={(event) => selectChange2(event)}
                    />

                </Col>
                 <Col lg={3}>
                      <h6>Transfer Count:</h6>
                     <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="number" name="count" placeholder=" " onChange={(event) => handleForm(event)} />
                     </Form.Group>

                </Col>
                <Col lg={3}>
                    <h6 style={{color:'transparent'}}>push here</h6>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>

            </Row>
           </Form>
            <Row>
                <Col lg={12}>
                    <MUIDataTable
                         title={<><div style={{fontSize:'16px', fontWeight:'500',}}>At WareHouse</div></>}
                        data={interTransferCountLists}
                        columns={columns}
                        options={options}
                       />

                </Col>
            </Row>


        </>
    )
}
export default TransferCountSetter