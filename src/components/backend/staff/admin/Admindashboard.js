import React, {useEffect} from 'react'
import {Container,Row,Col,Card} from 'react-bootstrap'
import CountCard from "./dashboardcomponents/CountCard";
import BarChartDashboard from "./dashboardcomponents/BarChartDashboard";
import PieChartDashboard from "./dashboardcomponents/PieChartDashboard";
import AreaChartDashboard from "./dashboardcomponents/AreaChartDashboard";
import {useDispatch} from "react-redux";
import setAuthorizationToken from "./../../../../utils/setAuthorizationToken";
import {useHistory} from "react-router-dom";



const Admindashboard = () => {
      const dispatch = useDispatch();
       const history = useHistory();
      useEffect(()=>{
        let staff_admin = JSON.parse(localStorage.getItem('staff_admin'));
        // console.log(staff_admin);
        if(staff_admin?.token){
          setAuthorizationToken(staff_admin.token);
        }else{
             history.push('/admin/login');
        }

    },[]);


    return (
        <>
            <section className="Dashboard" >
                 <Container fluid>
                    <Row>
                        <Col md={6}>
                            <div className="countSection">
                                 <Row>
                                     <Col md={4}>
                                         <div className="cardHolder">
                                             <CountCard title="Total Delivered" count="5000"/>
                                         </div>
                                     </Col>
                                     <Col md={4}>
                                         <div className="cardHolder">
                                             <CountCard title="Total Returns" count="00"/>
                                         </div>
                                     </Col>
                                     <Col md={4}>
                                         <div className="cardHolder">
                                              <CountCard title="Total customers" count="100000"/>
                                         </div>
                                     </Col>
                                     <Col md={4}>
                                          <div className="cardHolder">
                                              <CountCard title="Total Members" count="100"/>
                                          </div>
                                     </Col>
                                     <Col md={4}>
                                          <div className="cardHolder">
                                               <CountCard title="Total Returns" count="00"/>
                                          </div>
                                     </Col>
                                     <Col md={4}>
                                          <div className="cardHolder">
                                             <CountCard title="Total Vendors" count="200"/>
                                          </div>
                                     </Col>
                                 </Row>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div>
                               <BarChartDashboard />
                            </div>
                        </Col>
                        <Col md={4}>
                            <PieChartDashboard />
                        </Col>
                        <Col md={4}>
                            <AreaChartDashboard />
                        </Col>
                        <Col md={4}>
                            <PieChartDashboard />
                        </Col>
                        <Col md={6}>

                        </Col>
                        <Col md={6}>

                        </Col>
                    </Row>
                 </Container>
            </section>

        </>
    )
}

export default Admindashboard
