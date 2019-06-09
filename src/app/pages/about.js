// src/app/pages/About.js
import { Jumbotron} from 'react-bootstrap';
import React, { Component } from 'react'
import Navs from '../components/Navs';
export default class about extends Component {
  render() {
    return (<div>
       <Navs></Navs>
      <Jumbotron>
        <h2>Firestore ve Realtime Database Data Çekme</h2>
        <h3>NextJs </h3>
      </Jumbotron> 
      </div>)
  }
}