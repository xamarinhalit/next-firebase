// src/app/components/Nav.js
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import React, { Component } from 'react';
import { AuthLogin } from './../lib/firestore';
// Next.js has a nice router we'll use
import 'firebase/auth';

// The links are based on the URLs that will serve those pages
class Navs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User: { given_name: "Misafir" },
      isNavExpanded: false
    }
    this.onClick=this.onClick.bind(this);
    this.setIsNavExpanded=this.setIsNavExpanded.bind(this);
  }
  onClick() {
    let that = this;
    AuthLogin().then(user => {
      that.setState({
        User: { ...user.additionalUserInfo.profile }
      })
    })
  }
  setIsNavExpanded (isNavExpanded){
    this.setState({ isNavExpanded: isNavExpanded });
  }

  render() {
    return (<div ref={node => this.node = node}><Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Next Js & Firebase</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" collapseonselect="true" onToggle={this.setIsNavExpanded} expanded={this.state.isNavExpanded ? "true" : "false"} />
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
          {(this.state.User.id) ? (
            <Nav.Link onClick={this.onClick}>
              <img src={this.state.User.picture} height="32" width="32"></img> Merhaba Kullanıcı : <b >{this.state.User.given_name}</b>
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
export default Navs;