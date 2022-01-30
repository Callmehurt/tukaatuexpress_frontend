import React from 'react'
import icon from '../../../assets/faviconwhite.png';
import ProfileBox from "./profileBox";
import MessageBox from "./messageBox";
import NotificationBox from "./notificationBox";
import SearchBar from "./searchBar";
import {Container} from "react-bootstrap";

const Navbar = (props) => {
    return (
        <section className="Admin_header">
            <Container fluid>
                 <div className="row">
                     <div className="col-2">
                         <div className="logo_holder">
                             <img src={icon} className="img-fluid customLogo"  alt="tukatulogo"/>
                         </div>
                     </div>
                     <div className="col-6">
                         <SearchBar/>
                     </div>
                     <div className="col-1">
                         <MessageBox/>
                     </div>
                     <div className="col-1">
                        <NotificationBox/>
                     </div>
                     <div className="col-2 ">
                         <ProfileBox user={props.user}/>
                     </div>

                 </div>
            </Container>

        </section>
    )
}

export default Navbar;
