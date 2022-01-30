import React from 'react'
import { Dropdown } from 'react-bootstrap'

import { FaEnvelope } from "react-icons/fa";
import Count from "./count";

const MessageBox = () => {
    return (
        <div className="d-flex justify-content-end Header_message">
           <Dropdown>
                <Dropdown.Toggle  id="dropdown-basic">
                  <div style={{color:'#fff',Position:'relative',display:'inline-block'}}>
                       <FaEnvelope size="22"  className="icon_color"/>
                       {/*<div style={{ position:'absolute',top:'5px',backgroundColor:'#fed229',width:'30px',height:'30px',right:'10px',borderRadius:'20px',border:'2px solid #147298',display:'grid',placeContent:'center',}}>*/}
                       {/*   <Count count={10} />*/}
                       {/*</div>*/}
                  </div>

                </Dropdown.Toggle>
                {/*<Dropdown.Menu  className="scrollbar-display-none">*/}
                {/*    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>*/}
                {/*    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                {/*</Dropdown.Menu>*/}
            </Dropdown>
        </div>
    )
}

export default MessageBox;
