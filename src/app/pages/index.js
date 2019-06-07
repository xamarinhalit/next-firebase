
// src/app/pages/Index.js
import React, {Component} from 'react';
import DataList from '../components/DataList';
import {GetDatabase,GetDbAtOn} from '../lib/service';
import { Jumbotron} from 'react-bootstrap';

import 'firebase/database';

class index extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[
      ]
    }
  }
  static async getInitialProps() {
    let data=await GetDatabase();
    return {
      data:data==undefined?[]:data
    }
    
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
    return(
      <Jumbotron>
          <DataList data={this.state.data?this.props.data:this.state.data}></DataList>
      </Jumbotron>
    )
  }
}
export default index;