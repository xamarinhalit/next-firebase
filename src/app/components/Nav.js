// src/app/components/Nav.js
import { Navbar,Nav,Form,FormControl } from 'react-bootstrap';

import Link from 'next/link';

// Next.js has a nice router we'll use

// The links are based on the URLs that will serve those pages
export default () =>
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="/">Next Js & Firebase</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Anasayfa</Nav.Link>
      <Nav.Link href="/list">Liste</Nav.Link>
      <Nav.Link href="/about"> Hakkında</Nav.Link>
      <Form inline>
          <FormControl type="text" placeholder="Arama" className="mr-sm-2 ml-sm-2" />
              <a href="/search" variant="outline-success">Arama</a>
      </Form>
      
     
    </Nav>
    
    <Navbar.Text>
      Signed in as: <a href="#login">Mark Otto</a>
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
