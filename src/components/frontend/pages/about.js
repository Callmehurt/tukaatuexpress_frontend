import React from 'react'
import {Container, Row, Col} from "react-bootstrap";
import bgImage from '../../../assets/backgroundPartner.svg'

const About = () => {
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
                    <div className="services_area" style={{display: 'grid', placeItems: 'center'}}>
                        <h3>Page Not Available</h3>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default About
