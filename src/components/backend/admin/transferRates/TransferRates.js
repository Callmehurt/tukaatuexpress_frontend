import React, {useState} from 'react';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TransferRateList from "./TransferRateList";
import {Button} from "react-bootstrap";
import CreateTransferRate from "./CreateTransferRate";
import TransferRateEdit from "./TransferRateEdit";

const TransferRates=()=>{
    const[createTransferRateShow,setCreateTransferRateShow]=useState(false);
    const createTransferRate = () =>{
        console.log('hi');
        setCreateTransferRateShow(true);

    }
    const onHideCreateTransferRate=()=>{
        setCreateTransferRateShow(false);
    }
    return(
        <>
             <Button variant="primary" style={{marginTop:'10px'}} onClick={()=>createTransferRate()}>Create Transfer Rate</Button>
            {/*<h6>Transfer Rates</h6>*/}
            <CreateTransferRate show={createTransferRateShow} toggle={onHideCreateTransferRate} />
            <Tabs
            defaultActiveKey="transferList"
            transition={false}
            className="mb-0 mt-3"
              >
              <Tab eventKey="transferList" title="Transfer Rate List">
                <div style={{minHeight:'150vh'}}>
                   <TransferRateList />
                </div>
              </Tab>
              <Tab eventKey="pickup_process" title={<><div style={{fontSize:'13px'}}> <span></span></div></>}>
                  <div style={{minHeight:'150vh'}}>

                  </div>
              </Tab>
            </Tabs>
        </>
    );
}
export default TransferRates