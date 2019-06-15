
// src/app/pages/Index.js
import React, {Component} from 'react';
import DataList from './DataList';
import Navs from './Navs';
import { Jumbotron } from 'react-bootstrap';
import 'firebase/database';


class index extends Component {
  render(){
    return(<div>
       <Navs></Navs>
      <Jumbotron>
        <h1>Realtime Database</h1>
        <DataList ></DataList>
        <h3 style={{display:'none'}}>yapım aşaması</h3>
        <h2 style={{display:'none'}}>yapılacaklar</h2>
        </Jumbotron>
        </div>)
  }
}

export default index;