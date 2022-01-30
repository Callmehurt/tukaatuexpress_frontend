import React from 'react'
import {Container, Row, Col} from "react-bootstrap";

const About = () => {
    const about_style={
        dipslay:'flex',
        width:'100%',
        placeContent:'center',
        paddingTop:'60px',
        flexWrap:'wrap',
    };
    return (
        <section className="home_section">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div style={about_style}>
                             <h1 style={{color:'#fff',fontSize:'25px'}}>About</h1>
                             <div className="description_about">
                                 <div className="first_par"> With the professional management team having an experience of more than 10 years in the industry, Tukaatu Express has been in the next day and up to max 3 days courier business since early 2020. We are a courier network capable of even the same day deliveries throughout Nepal.</div>
                                 <br />
                                 <div className="first_par"> With the professional management team having an experience of more than 10 years in the industry, Tukaatu Express has been in the next day and up to max 3 days courier business since early 2020. We are a courier network capable of even the same day deliveries throughout Nepal.
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default About
