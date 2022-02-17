import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
       <>
        <div className="navbar_area">
                <ul>
                    <li>
                        <Link to='/' >Home</Link>
                    </li>
                    <li>
                        <Link to='/about' >About Us</Link>
                    </li>
                    <li>
                        <Link to='/shipping' >Shipping Cost</Link>
                    </li>
                    <li>
                        <Link to='/services' >Our Services</Link>
                    </li>
                    <li>
                        <Link to='/coverage-areas' >Coverage Areas</Link>
                    </li>
                    <li>
                        <Link to='/terms-conditions' >Terms & Conditions</Link>
                    </li>
                    <li>
                        <Link to='/privacy-policy' >Privacy Policy</Link>
                    </li>
                </ul>
            </div>
           <div className="footer_section">
            <h3>Copyright © {new Date().getFullYear()} | Tukaatu Services Private Limited | All rights reserved</h3>
        </div>
       </>
    )
}

export default Footer;