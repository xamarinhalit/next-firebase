// src/app/pages/About.js
import { Jumbotron,Row,Tab,Col,Nav} from 'react-bootstrap';

import React, { Component } from 'react'
import Navs from './Navs';

import { connect } from 'react-redux';

 class about extends Component {
  render() {
    return (<div>
       <Navs></Navs>
      <Jumbotron >
        <h2>Firestore ve Realtime Database Data Çekme</h2>
        <Tab.Container id="left-tabs-example" defaultActiveKey="1" >
          <Row >
            <Col sm={3}>
            <Nav  variant="pills" className="flex-column">
            {this.props.MapList.map((item,index)=>(
            <Nav.Item key={index}>
              <Nav.Link eventKey={item.key}  >{item.name}</Nav.Link>
            </Nav.Item>
            ))
            }
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
              {this.props.MapList.map((item,index)=>(
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
  const { MapList } = state
  return { MapList, }
}
export default connect(
  mapStateToProps
)(about)
