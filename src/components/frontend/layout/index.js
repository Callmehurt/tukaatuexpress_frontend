import React from 'react'
import {Route} from 'react-router-dom'
import {Col, Container, Row} from "react-bootstrap";
import Navbar from "../nav/Navbar";
import Footer from "../footer/Footer";

const FrontendComponent = ({ component: Component, ...rest }) => {
  return (
        <Route
            {...rest}
            render={props => (
                <>
                    <section className="home_section">
                        <Component {...props} />
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <Footer/>
                                </Col>
                            </Row>
                        </Container>
                    </section>
              </>
              )
          }
        />
  )
}

export default FrontendComponent;