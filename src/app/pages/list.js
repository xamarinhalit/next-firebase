
// src/app/pages/Index.js
import React, {Component} from 'react'
import DataList from '../components/DataList';
import Layout from '../components/Layout';
import {GetFirestore,GetDatabase,GetDbAtOn} from '../lib/service';

import 'firebase/firestore';
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
  componentDidMount(){
    let that=this;
    GetDbAtOn(cb=>{
      that.GetChangeState(cb);
    })
  }
  render(){
    return(
       <Layout>
        <DataList data={this.state.data}></DataList>
      </Layout>
    )
  }
}
export default index;