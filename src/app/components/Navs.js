// src/app/components/Nav.js
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import React, { Component } from 'react';

import { Nav_Expanded,Auth_User_Login} from './../lib/redux/actions';
import { connect} from 'react-redux';

import { AuthLogin } from './../lib/firestore';
// Next.js has a nice router we'll use
import 'firebase/auth';

// The links are based on the URLs that will serve those pages
class Navs extends Component {
  constructor(props) {
    super(props);
    this.onClick=this.onClick.bind(this);
    this.setIsNavExpanded=this.setIsNavExpanded.bind(this);
  }
  onClick() {
    let that = this;
    AuthLogin().then(user => {
      that.props.Auth_User_Login(
        { ...user.additionalUserInfo.profile }
      )
    })
  
  }
  setIsNavExpanded (isNavExpanded){
    this.props.Nav_Expanded(isNavExpanded);
  }

  render() {
    return (<div ref={node => this.node = node}><Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Next Js & Firebase</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" collapseonselect="true" onToggle={this.setIsNavExpanded} expanded={this.props.isNavExpanded ? "true" : "false"} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Anasayfa</Nav.Link>
          <Nav.Link href="/about"> Hakkında</Nav.Link>
          <Form inline>
            <FormControl type="text" placeholder="Arama" className="mr-sm-2 ml-sm-2" >
            </FormControl>
            <Nav.Link variant="outline-success">
              Arama
        </Nav.Link>
          </Form>
        </Nav>
        <Navbar.Text>
          {(this.props.User.id) ? (
            <Nav.Link onClick={this.onClick}>
              <img src={this.props.User.picture} height="32" width="32"></img> Merhaba Kullanıcı : <b >{this.props.User.given_name}</b>
            </Nav.Link>) :
            (<Nav.Link onClick={this.onClick}>
              Merhaba <b >Misafir  </b>
            </Nav.Link>)
          }
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar></div>);
  }
}
const mapDispatchToProps = { Nav_Expanded,Auth_User_Login }
function mapStateToProps (state) {
  const { isNavExpanded,User} = state
  return { isNavExpanded,User }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navs)
