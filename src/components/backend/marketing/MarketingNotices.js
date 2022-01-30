import React, {useState,useEffect} from 'react';
import {Button, Row, Col, Form} from "react-bootstrap";
import axios from "axios";
import showNotification from "../includes/notification";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import {useHistory} from "react-router-dom";
import {getPartnerListMarketing} from "../../../redux/actions/Marketing";
import {ImLocation2} from "react-icons/im";
import {MdDelete} from 'react-icons/md';
import {FiEdit} from 'react-icons/fi'
import MUIDataTable from "mui-datatables";

const MarketingNotices=()=>{
    const history = useHistory();
    const[showNoticeField,setShowNoticeField]=useState(false);
    const [noticeList,setNoticeList]=useState([]);
    const[formField,setFormField]=useState({
        title:'',
        notice:'',
        notice_id:null,
        front:false,
        vendor:true,
        front_vendor:false,
    });
    // const[formUpdateField,setFormUpdateField]=useState({
    //     title:'',
    //     notice:'',
    //     notice_id:'',
    // });
    useEffect(()=>{
        let marketingAdmin = JSON.parse(localStorage.getItem('marketingAdmin'));
        console.log(marketingAdmin);
        if(marketingAdmin?.token){
          setAuthorizationToken(marketingAdmin.token);
        }else{
            history.push('/marketing/login');
        }
        getNoticeList();
    },[]);
    const getNoticeList=()=>{
       axios.get('/marketing/notice/list')
            .then((res) => {
                console.log(res);
                setNoticeList(res.data);
                // setPartnerList(res.data);
                // dispatch(getPartnerListMarketing(res.data));
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
    const handleForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
    }
    const submitNotice=(event)=>{
         event.preventDefault();
         console.log(formField);
         axios.post('/marketing/publish/notice', formField)
             .then((res) => {
                 console.log(res);
                 if(res.data.status === false){
                     showNotification('danger', res.data.message);
                 }else{
                     setShowNoticeField(false);
                      const newField = {...formField}
                        newField.title = '';
                        newField.notice = '';
                        newField.notice_id = null;
                      setFormField(newField);
                      getNoticeList();

                     // getPartnerList();
                     // localStorage.removeItem('vendor_location');
                     // toggle(false);
                     // refreshTable();
                     showNotification('success', res.data.message);
                 }
             })
             .catch((err) => {
                 console.log(err.response.data);
             });

    }
    const submitNoticeUpdate=(event)=>{
         event.preventDefault();
         console.log("formField");
         console.log(formField);
         axios.post('/marketing/update/notice', formField)
             .then((res) => {
                 console.log(res);
                 if(res.data.status === false){
                     showNotification('danger', res.data.message);
                 }else{
                     setShowNoticeField(false);
                      const newField = {...formField}
                        newField.title = '';
                        newField.notice = '';
                        newField.notice_id = null;
                      setFormField(newField);
                      getNoticeList();

                     showNotification('success', res.data.message);
                 }
             })
             .catch((err) => {
                 console.log(err.response.data);
             });

    }
    const editNotice=(notice_id)=>{
        setShowNoticeField(true);
        noticeList.map((data)=>{
            if(data.id==notice_id){
                 const newField = {...formField}
                  newField.notice_id =notice_id;
                  newField.title=data.title;
                  newField.notice=data.notice;
                 setFormField(newField);
            }
        })

    }
    const deleteNotice=(notice_id)=>{
        axios.delete(`/marketing/delete/notice/${notice_id}`)
            .then((res) => {
                console.log(res);
                if(res.data.status === false){
                     showNotification('danger', res.data.message);
                 }else{
                     showNotification('success', res.data.message);
                }
                getNoticeList();
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    }
    const columns = [
        {
         name: "id",
         label: "S.No.",
         options: {
          filter: true,
          sort: true,
         }
        },
         {
         name: "title",
         label: "Title",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}}>{value}</div>
                  </>
              )
         }
        },
        {
         name: "notice",
         label: "Notice",
         options: {
          filter: true,
          sort: true,
             customBodyRender: (value, tableMeta, updateValue) => (
                  <>
                      <div style={{width:'100%',display:'flex',placeContent:'start'}}>{value}</div>
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
                      <div style={{width:'100%',display:'flex'}}>

                          <div style={{width:'50%',}}>
                                <button className="editBtn" onClick={(event)=>editNotice(value)}><FiEdit /></button>
                          </div>
                           <div style={{width:'50%',}}>
                                <button className="deleteBtn" onClick={(event)=>deleteNotice(value)} ><MdDelete /></button>
                          </div>
                      </div>
                  </>
              )
            }
        },

       ];
    const options = {
        searchOpen: false,
        filterType: 'textField',
        rowsPerPage: 50,
        rowsPerPageOptions: [10, 20, 50, 100, 500],
        fixedHeader: false,
        selectableRows: 'none',
        responsive: 'standard',
  };
    const handleRadioButtonOutside=(event)=>{
        console.log(event.target.value,"outside");
        if(event.target.value=="on"){

             const newField = {...formField}
             newField.front= true;
             console.log(newField.front);
              newField.vendor=false;
              newField.front_vendor=false;
             setFormField(newField);
        }
        console.log(formField);
        //  const newField = {...formField}
        // newField[event.target.name] = event.target.value;
        // setFormField(newField);
    }
    const handleRadioButtonInside=(event)=>{
         console.log(event.target.value,"inside");
         if(event.target.value=="on"){

             const newField = {...formField}
             newField.front= false;
              newField.vendor=true;
              newField.front_vendor=false;
             setFormField(newField);
        }
          console.log(formField);
    }
    const handleRadioButtonBoth=(event)=>{
         console.log(event.target.value,"Both");
          if(event.target.value=="on"){

             const newField = {...formField}
             newField.front= false;
              newField.vendor=false;
              newField.front_vendor=true;
             setFormField(newField);
        }
          console.log(formField);
    }

    return(
        <>
            <Row>
                <Col lg={12} className="pb-4">
                        {showNoticeField?<> <Button className="customBtn" onClick={() => setShowNoticeField(false)} style={{marginTop: '1rem'}}>Close Notice Field</Button>
                         </>:<> <Button className="customBtn" onClick={() => setShowNoticeField(true)} style={{marginTop: '1rem'}}>Create Notice</Button>
                         </>
                        }
                </Col>
                {showNoticeField?
                    <>
                        <Col lg={12}>
                            <div className="pt-3 pb-3" style={{display:'flex',justifyContent:'center',backgroundColor:'#f7fafb'}}>
                              <Form style={{width:'500px'}} onSubmit={(event) => submitNotice(event)}>
                                  <h5 className="text-center pb-4">Write your Notice For Partners.</h5>
                                <Form.Group>
                                    <Form.Control type="text" defaultValue={formField?.title} name="title" onChange={(event) => handleForm(event)} placeholder="Title" required />
                                </Form.Group>
                                <Form.Group className="mt-4">
                                    <Form.Control  as="textarea" defaultValue={formField?.notice} type="text" name="notice" style={{minHeight:'120px'}} onChange={(event) => handleForm(event)} placeholder=" Write your Notice" required />
                                </Form.Group>
                                  <Form.Group style={{paddingTop:'15px'}}>
                                       <Form.Check
                                            inline
                                            label="Outside Partner Only"
                                            // name="out_part_only"
                                            name="common"
                                            onChange={(event)=>handleRadioButtonOutside(event)}
                                            type="radio"
                                            id="outside_Partner"
                                            style={{fontSize:'14px'}}
                                          />
                                      <Form.Check
                                            inline
                                            label="Inside Partner Only"
                                            // name="in_part_only"
                                            name="common"
                                            type="radio"
                                            defaultValue={formField?.vendor}
                                            onChange={(event)=>handleRadioButtonInside(event)}
                                            id="outside_Partner"
                                            style={{fontSize:'14px'}}
                                          />
                                      <Form.Check
                                            inline
                                            label="Both (Inside & Outside)"
                                            // name="both_in_out"
                                            name="common"
                                            onChange={(event)=>handleRadioButtonBoth(event)}
                                            type="radio"
                                            id="both_inside_outside"
                                            style={{fontSize:'14px'}}
                                          />
                                  </Form.Group>
                                  {formField?.notice_id?
                                      <>
                                          <div style={{display:'flex',justifyContent:'center'}}>
                                                <Form.Group className="mt-4">
                                                     <Button onClick={(event)=>submitNoticeUpdate(event)} className="customBtn" style={{float: 'right'}}>Update</Button>
                                               </Form.Group>
                                          </div>
                                      </>:
                                      <>
                                          <div style={{display:'flex',justifyContent:'center'}}>
                                                <Form.Group className="mt-4">
                                                     <Button type="submit" className="customBtn" style={{float: 'right'}}>Create</Button>
                                               </Form.Group>
                                          </div>
                                      </>
                                  }


                            </Form>
                            </div>
                        </Col>
                    </> :
                    <>
                    </>
                }
                <Col lg={12}>
                    <MUIDataTable
                    // title={"Partner List"}
                    data={noticeList}
                    columns={columns}
                    options={options}
                    />
                </Col>



            </Row>



        </>
    )
}
export default MarketingNotices