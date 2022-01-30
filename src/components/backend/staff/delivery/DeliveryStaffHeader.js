import React from 'react'
import {Container, Row, Col, Dropdown} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const DeliveryStaffHeader = () => {
    // const DeliveryName='john Doe2';
     const dispatch = useDispatch();
    const deliveryStaff = useSelector((state) => state.deliveryStaffAuth);
    const deliveryStaffUser=deliveryStaff.user;


    return(
        <>
            <section className="deliverystaffheader">
                <Container fluid>
                    <Row>
                        <Col md={10}>
                            <div>Tukaatu Services Private Limited.</div>
                        </Col>
                        <Col md={2}>
                            <div>Name:{deliveryStaffUser.name}</div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="control_area" style={{backgroundColor:'#ffd125'}}>
             <Container fluid>
                <Row>
                    <Col md={12}>
                         <nav>
                          <ul>
                            <li>
                              <Link to="/staff/delivery/dashboard">Dashboard</Link>
                            </li>
                            <li>
                              <Link to="/staff/delivery/assigned">Assigned</Link>
                            </li>
                            <li>
                             <Link to="/staff/delivery/received">Delivery On The Way</Link>
                            </li>
                              <li>
                             <Link to="/staff/delivery/delivered">Delivered Packages</Link>
                            </li>
                              <li>
                                <Link to="/staff/delivery/cancelled">Cancelled Packages</Link>
                            </li>
                               <li>
                             <Link to="/staff/delivery/hold">Hold Packages</Link>
                            </li>
                          </ul>
                        </nav>
                    </Col>
                </Row>
             </Container>
           </section>

        </>

    )

}

export default DeliveryStaffHeader


