
// src/app/pages/Index.js
import React, {Component} from 'react'
import Nav from '../components/Nav.js'
import LoadDb from "../lib/firestore";
import uuid from 'uuid';
import DataList from '../components/DataList';

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
    let result =await this.GetDatabase();
    this.state={
      data:[...result]
    }
    return { data :result}; 
  }
  static async GetFirestore (){
    let firebase =await LoadDb();
    return await new Promise(async (resolve,reject)=>{
      try {
            firebase.firestore().collection("next-db")
            .get()
            .then((snapshot)=>{
                let data= [];
                  snapshot.forEach(doc=>{
                    data.push(
                      Object.assign({
                        id:uuid()
                      },doc.data())
                    );
                  });
                  console.log("firebase bağlandım");
                  console.log(data);

                  resolve(data);
              }
              )
        } catch (e) {
          console.log(e);
          reject({ data:undefined});
        }
    });
  }
  static async GetDatabase (){
    let firebase =await LoadDb();
    return await new Promise(async (resolve,reject)=>{
      try {
        firebase.database().ref("/next-db").once('value', function(snapshot) {
              let data= [];
              let _key=0;
              snapshot.forEach(snap=>{
                _key++;
                data.push({
                  ...snap.val(),
                  //id:uuid()
                  id:_key
                })
              });
              console.log("database bağlandım");
              console.log(data);
              resolve(data);
            });
        } catch (e) {
          console.log(e);
          reject({ data:null});
        }
    });
  }
  GetChangeState(data){
    this.setState({
      data:data
    })
  }
  async componentDidMount(){
    let that=this;
    let firebase =await LoadDb();
      try {
        firebase.database().ref("/next-db").on('value', function(snapshot) {
              let data= [];
              let _key=0;
              snapshot.forEach(snap=>{
                _key++;
                data.push({
                  ...snap.val(),
                  //id:uuid()
                  id:_key
                })
              });
              console.log("database Değişti.");
              console.log(data);
              that.GetChangeState(data);
            });
        } catch (e) {
          console.log(e);
        }
  }
  SendClick(){
//
  }
  render(){
    return(
      <div>
      <Nav />
      <div>
        <DataList data={this.state.data}></DataList>
      </div>
      </div>
    )
  }
}
export default index;