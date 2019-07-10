// src/app/pages/About.js
import { Jumbotron, Row, Tab, Col, Nav } from 'react-bootstrap';
import { Navs } from './index';
import React, { Component } from 'react'

import { connect } from 'react-redux';

 class about extends Component {
     render() {
         let { MapList } = this.props;
    return (<div>
       <Navs></Navs>
        <Jumbotron style={{ height: 91 + "vh", marginBottom: 0 }}>
        <h2>Firestore ve Realtime Database Data Çekme</h2>
        <Tab.Container id="left-tabs-example" defaultActiveKey="1" >
          <Row >
            <Col sm={3}>
            <Nav  variant="pills" className="flex-column">
            {MapList.map((item,index)=>(
            <Nav.Item key={index}>
              <Nav.Link eventKey={item.key}  >{item.name}</Nav.Link>
            </Nav.Item>
            ))
            }
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
              {MapList.map((item,index)=>(
                 <Tab.Pane eventKey={item.key} key={index}>
                 {item.name}
                 </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Jumbotron> 
      </div>)
  }
}
function mapStateToProps (state) {
  const { MapList } = state.blog
  return { MapList }
}
export default connect(
  mapStateToProps
)(about)
