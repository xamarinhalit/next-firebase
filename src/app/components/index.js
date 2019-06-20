
// src/app/pages/Index.js
import React, {Component} from 'react';
import DataList from './DataList';
import Data_Add from './crud/add';
import Navs from './Navs';
import { Jumbotron,Row } from 'react-bootstrap';
import 'firebase/database';


class index extends Component {
  

  render(){
    return(<div>
       <Navs></Navs>
      <Jumbotron>
        <h1>Realtime Database</h1>
        <Row>
          <Data_Add />
          </Row>
        <DataList ></DataList>
        <h3 style={{display:'none'}}>yapım aşaması</h3>
        <h2 style={{display:'none'}}>yapılacaklar</h2>
        </Jumbotron>
        </div>)
  }
}

export default index;