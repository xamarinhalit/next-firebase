// src/app/components/Nav.js
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import React, { Component } from 'react';

import { Nav_Expanded,Auth_User_Login,Data_Filter,Auth_User_Signout} from './../lib/redux/actions';
import { connect} from 'react-redux';

import { AuthLogin,AuthLogout } from './../lib/firestore';
// Next.js has a nice router we'll use
import 'firebase/auth';

// The links are based on the URLs that will serve those pages
class Navs extends Component {
  constructor(props) {
    super(props);
    this.onLogin=this.onLogin.bind(this);
    this.onLogout=this.onLogout.bind(this);
    this.setIsNavExpanded=this.setIsNavExpanded.bind(this);
    this.SearchData=this.SearchData.bind(this);
    this.state={
      search:""
    }
  }
  onLogin() {
    let that = this;
    AuthLogin().then(user =>   that.props.Auth_User_Login({ ...user.additionalUserInfo.profile }));
  }
  onLogout() {
    let that = this;
    AuthLogout().then(() => that.props.Auth_User_Signout());
  }
  setIsNavExpanded (isNavExpanded){
    this.props.Nav_Expanded(isNavExpanded);
  }
  SearchData(e){
    this.setState({
      search:e.currentTarget.value
    });
      this.props.Data_Filter({data:e.currentTarget.value,path:location.pathname});
  }
    render() {
        let { User } = this.props;
    return (<div ref={node => this.node = node}><Navbar bg="light" expand="lg">
      <Navbar.Brand href="/" rel="nofollow">Next Js & Firebase</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" collapseonselect="true" onToggle={this.setIsNavExpanded} expanded={this.props.isNavExpanded ? "true" : "false"} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/" rel="nofollow">Anasayfa</Nav.Link>
          <Nav.Link href="/about"  rel="nofollow"> Hakkında</Nav.Link>
          <Form inline>
            <FormControl type="text" placeholder="Arama" className="mr-sm-2 ml-sm-2" onChange={this.SearchData} value={this.state.search}>
            </FormControl>
          
          </Form>
        </Nav>
        <Navbar.Text>
          {(User.id) ? (
            <Nav.Link onClick={this.onLogout} rel="nofollow">
              <img src={User.picture} height="32" width="32"></img> Merhaba Kullanıcı : <b >{this.props.User.given_name}</b>
            </Nav.Link>) :
            (<Nav.Link onClick={this.onLogin} rel="nofollow">
              Merhaba <b >Misafir  </b>
            </Nav.Link>)
          }
        </Navbar.Text>
        <Navbar.Text>
          {(User.id) ? (
            <Nav.Link onClick={this.onLogout} rel="nofollow">
              Çıkış
            </Nav.Link>) :
            (<Nav.Link onClick={this.onLogin} rel="nofollow">
              Giriş yap
            </Nav.Link>)
          }
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar></div>);
  }
}
const mapDispatchToProps = { Nav_Expanded,Auth_User_Login,Data_Filter,Auth_User_Signout }
function mapStateToProps(state) {
    const { isNavExpanded, User } = state.blog
  return { isNavExpanded,User }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navs)
