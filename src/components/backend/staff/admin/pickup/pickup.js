import React, {useState, useRef, useEffect} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {Col, Row, Button} from "react-bootstrap";
import {RiFileAddFill} from 'react-icons/ri';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ReactToPrint from "react-to-print";
// import PropTypes from "prop-types";
// import Datatables from "../../../includes/datatable";
import{ComponentToPrint} from "../ActionArea/ComponentToPrint";
import {ComponentToPrintSelected} from "../ActionArea/ComponentToPrintSelected";
import PickupDatatables from "./pickupDatatables";
import {useDispatch, useSelector} from "react-redux";
import {IoMdPrint} from 'react-icons/io';
// import WarehouseDatatables from "./warehouseDatatables";
import PickupSameDayDatatables from "./PickupSameDayDatatables";
import setAuthorizationToken from "../../../../../utils/setAuthorizationToken";
import {getPrintData, newPickupSameDay,getPrintALlOrderData,getPrintSelectedData} from './../../../../../redux/actions/BranchOperation'
import axios from "axios";
import {NewPickupList} from "../../../../../redux/actions/newPickupList";
import NewPickupListCount from "../../../../../redux/actions/newPickupListCount";


 const Pickup = () =>{
      const history = useHistory();
     const location=useLocation();
    const dispatch = useDispatch();
    const thisState = useSelector((state) => state.newpickuplist);
    const newPickupListOperation = thisState.NewPickupList;
    // const NewPickupsSameDayOperation = thisState.newPickupsSameDay;
    const WareHouse = useSelector((state) => state.warehouseList);
    const Newpickup = useSelector((state)=>state.newpickuplist);
    const branchOperation = useSelector((state) => state.branchOperation);
    const wareHousecount = WareHouse.WareHouseListCount;
    const newPickupsSameDay = branchOperation.newPickupsSameDay;
    const newPickupList = Newpickup.NewPickupListCount;
    const[printData,setPrintData]=useState([]);
    const[printSelectCheck,setPrintSelectCheck]=useState(false);
    const[printSelectStandard,setPrintSelectStandard]=useState(true);
    useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        console.log(staff_admin);
        if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
        }else{
             history.push('/admin/login');
        }
        // getPrintDataFunction();
        newpickupsdata();
        newpickupssamedaydata();
        console.log(printSelectStandard);
         console.log("printSelectStandard");

    },[]);
    const newpickupssamedaydata = () => {
         axios.get('/admin/pickup/sameday/list')
            .then((res) => {
                console.log(res);
                console.log('res data pickup')
                dispatch(newPickupSameDay(res.data));
                if(!printSelectStandard){
                     dispatch(getPrintALlOrderData(res.data));
                }
                // dispatch(NewPickupListCount(res.data.length));
            })
            .catch((err) => {
                console.log(err.response);
            })
   }
    const newpickupsdata = () => {
         axios.get('/admin/pickup/list')
            .then((res) => {
                console.log(res);
                console.log('res data pickup')
                dispatch(NewPickupList(res.data));
                dispatch(NewPickupListCount(res.data.length));
                if(printSelectStandard){
                     dispatch(getPrintALlOrderData(res.data));
                }
            })
            .catch((err) => {
                console.log(err.response);
            })
   }
    const handleClickPrint=()=> {
        let printDataStorageCheck = JSON.parse(localStorage.getItem('printDataSelect'));
        dispatch(getPrintSelectedData(printDataStorageCheck));
    }
        //
        // if(printSelectCheck){
        //      localStorage.removeItem("printData");
        //      setPrintData('');
        // }
        // else{
        //
        //     let printDataStorage = JSON.parse(localStorage.getItem('printData'));
        //     setPrintData(printDataStorage);
        //     // setPrintSelectCheck(true);
        // }

    // const getPrintDataFunction=()=>{
    //     let printDataStorage = JSON.parse(localStorage.getItem('printData'));
    //     setPrintData(printDataStorage);
    // }
     const componentRef = useRef();
     const componentRefSelected = useRef();
     const sameDayPrintActivate=()=>{
          setPrintSelectStandard(false);
          dispatch(getPrintALlOrderData(newPickupsSameDay));
     }
     const PrintActivate =()=>{
         setPrintSelectStandard(true);
         dispatch(getPrintALlOrderData(newPickupListOperation));
     }
    const warehousecount_div = <div style={{fontSize:'13px'}}>New Pickup List of Standard <span>{newPickupList}</span></div>;
    // const count_div = <div>New Pickup Request <span>{wareHousecount.size()}</span></div>;
    return(
        <>


            <Row>
                <Col lg={2}>
                    <Link to="/staff/admin/create-pickups"> <Button  className="mt-3" style={{border:'1px solid #147298',borderRadius:'10px',backgroundColor:'#147298',color:'#fff',top:'70px',left:'20px'}}><RiFileAddFill size={20}/><span style={{fontSize:'13px',paddingLeft:'8px',marginTop:'5px',zIndex:'99',}}>Add New pickups</span></Button> </Link>
                </Col>

                <Col lg={2}>
                     <div>
                        <ReactToPrint
                          trigger={() => (<a href="#"><Button variant="success" className="mt-3"><IoMdPrint size={20} /> <span className="pt-2" style={{fontSize:'13px'}}>
                              {printSelectStandard?
                                  <>
                                       Print All
                                  </>:
                                  <>
                                       Print All For Same Day
                                  </>
                              }

                          </span></Button></a>)}
                          content={() =>componentRef.current}
                        />

                        <div style={{display:'none',}}>
                        {/*<div>*/}
                          <ComponentToPrint ref={componentRef} />
                        </div>
                     </div>
                </Col>
                 <Col lg={2} >
                     <div>
                         <ReactToPrint
                          // trigger={() => (<a href="#"><Button variant="success" className="mt-3" onClick={()=>handleClickPrint()}><IoMdPrint size={20} /> <span className="pt-2" style={{fontSize:'13px'}}>Print selected</span></Button></a>)}
                             trigger={() => (<a href="#"><Button variant="success" className="mt-3" onClick={()=>handleClickPrint()}><IoMdPrint size={20} /> <span className="pt-2" style={{fontSize:'13px'}}>Print selected</span></Button></a>)}

                          content={() =>componentRefSelected.current}
                        />
                         <div style={{display:'none',}}>
                        {/*<div>*/}
                          <ComponentToPrintSelected ref={componentRefSelected} />
                        </div>
                    </div>
                </Col>
            </Row>
           <Tabs
            defaultActiveKey="new_pickups"
            transition={false}
            className="mb-0 mt-3"
              >
               <Tab eventKey="new_pickups" title={<><div onClick={(event)=>PrintActivate()}>New Pickup List <span>{newPickupListOperation.length}</span></div></>}>
                <div style={{minHeight:'150vh'}}>
                    <PickupDatatables  style={{zIndex:'0',}}/>
                </div>
              </Tab>
              <Tab eventKey="pickup_process" title={<><div style={{fontSize:'13px'}} onClick={(event)=>sameDayPrintActivate()}>New Pickup List of Same Day <span>{newPickupsSameDay.length}</span></div></>}>
                  <div style={{minHeight:'150vh'}}>
                     <PickupSameDayDatatables  style={{zIndex:'0',}}/>
                  </div>
              </Tab>
            </Tabs>
        </>
    );
}

export default Pickup
