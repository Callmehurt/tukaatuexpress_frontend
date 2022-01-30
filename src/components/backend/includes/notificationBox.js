import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { FaBell } from "react-icons/fa";
import Count from "./count";

const NotificationBox = () => {
    return (
        <div className = "d-flex justify-content-end Header_notification" >
            <Dropdown >
                <Dropdown.Toggle id = "dropdown-basic" >
                    <div style = {{ color: '#fff', Position: 'relative', display: 'inline-block' } } >
                        <FaBell size = "22" />
                        {/*<div style = {{ position: 'absolute', top: '5px', backgroundColor: '#fed229', width: '30px', height: '30px', right: '15px', borderRadius: '20px', border: '2px solid #147298',display:'grid',placeContent:'center', } } >*/}
                        {/*    <Count count={50} />*/}
                        {/*</div>*/}
                    </div>
                </Dropdown.Toggle>
                {/*<Dropdown.Menu>*/}
                {/*    <Dropdown.Item href = "#/action-1" >Action </Dropdown.Item>*/}
                {/*    <Dropdown.Item href = "#/action-2" > Another action</Dropdown.Item>*/}
                {/*    <Dropdown.Item href = "#/action-3" > Something else </Dropdown.Item>*/}
                {/*    <Dropdown.Item href = "#/action-1" > Action </Dropdown.Item>*/}
                {/*    <Dropdown.Item href = "#/action-2" > Another action </Dropdown.Item>*/}
                {/*    <Dropdown.Item href = "#/action-3" > Something else </Dropdown.Item>*/}
                {/*    <Dropdown.Item href = "#/action-1" > Action </Dropdown.Item>*/}
                {/*    <Dropdown.Item href = "#/action-2" > Another action </Dropdown.Item>*/}
                {/*    <Dropdown.Item href = "#/action-3" > Something else </Dropdown.Item>*/}
                {/*</Dropdown.Menu>*/}
            </Dropdown>
        </div>
    )
}

export default NotificationBox;