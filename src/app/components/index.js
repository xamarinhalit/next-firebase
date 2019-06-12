
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
        <DataList ></DataList>
        </Jumbotron>
        </div>)
  }
}

export default index;