
// src/app/pages/Index.js
import React, { Component } from 'react';
import { Navs } from './index';
import { Jumbotron, Row, Col, Container } from 'react-bootstrap';



class index extends Component {
  

  render(){
    return(<div>
       <Navs></Navs>
        <Jumbotron style={{ height: 91 + "vh", marginBottom: 0 }}>
        <h1>Realtime Database</h1>
        </Jumbotron>
        <Row>
        <Col style={{
                    position: "fixed", left: 5 + "vw", bottom: 0, width: 90 + "vw"
                }}>
                    <Container>
                        <p>
                             Next JS, Redux, Firebase,Firebase Auth,React-bootstrap,Firebase Cache
                        </p>
                    </Container>
        </Col>
        </Row>
        </div>)
  }
}

export default index;