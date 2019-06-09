
// src/app/pages/Index.js
import React, {Component} from 'react';
import DataList from '../components/DataList';
import Navs from '../components/Navs';
import {GetDatabase,GetDbAtOn} from '../lib/service';
import { Jumbotron } from 'react-bootstrap';
import 'firebase/database';

class index extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[]
    }
  }
  static async getInitialProps() {
    let result =await GetDatabase();
    this.state={
      data:[...result]
    }
    return { data :result}; 
  }

  GetChangeState(data){
    this.setState({
      data:data
    })
  }
  async componentDidMount(){
    let that=this;
    await GetDbAtOn(cb=>{
      that.GetChangeState(cb);
    })
  }

  render(){
    return(<div>
       <Navs></Navs>
      <Jumbotron>
        <DataList data={this.state.data.length>0?this.state.data:this.props.data}></DataList>
        </Jumbotron>
        </div>)
  }
}
export default index;