import React from 'react'
import {Container, Row, Col} from "react-bootstrap";
import deliveryImg from '../../../assets/deliveryback.png';


const Services = () => {
    const service_style={
        dipslay:'flex',
        width:'100%',
        placeContent:'center',
        paddingTop:'60px',
        flexWrap:'wrap',
    };
    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <div className="services_area">
                        <p>Fast and Reliable Delivery in Nepal</p>
                        <Row>
                            <Col lg={8}>
                                <p>With the professional management team having an experience of more than 5 years in the industry, Tukaatu Express has been in the next day
                                and up to max 3 days courier business since early 2020. We are a courier network capable of even the same day deliveries throughout Nepal.</p>
                            </Col>
                            <Col lg={12}>
                                <div className="img_sec">
                                    <img src={deliveryImg} alt=""/>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Services
