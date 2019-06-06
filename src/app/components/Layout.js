import RenderHead from './head';
import Nav from './Nav.js';
import {Container } from 'react-bootstrap';


export default (props)=>(
      <div>
       <RenderHead></RenderHead>
        <Nav></Nav>
        <Container>
              {props.children}
        </Container>
      </div>
)