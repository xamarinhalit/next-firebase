
// src/app/pages/Index.js
import React, { Component } from 'react';
import { Navs } from './index';
import { Jumbotron, Row, Col, Container } from 'react-bootstrap';


class index extends Component {
  constructor(props){
    super(props);
    this.drag=this.drag.bind(this);
    this.drop=this.drop.bind(this);
    this.DragOver=this.DragOver.bind(this);
    this.DragEnd=this.DragEnd.bind(this);
    this.state={
      Drag:{},
      X:null,
      Y:null
    };
  }
  componentDidMount(){
    // $(".ui-widget-content").draggable();
  
  }
  DragEnd(ev){
    console.log(ev);
  }
  DragOver(ev) {
    console.clear();
    console.log(ev.clientX);
    console.log(ev.clientY);
    this.setState({
      X:ev.clientX,
      Y:ev.clientY
    });
    // ev.dataTransfer.setData("textx", ev.clientX);
    // ev.dataTransfer.setData("texty", ev.clientY);
    ev.preventDefault();
    return false;
  }
  
  drag(ev) {
    this.setState({
      Drag:ev.target
    });
    // debugger;
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  drop(ev) {
    ev.preventDefault();
    var $tod=$(ev.currentTarget);
    
    var $tod2=$tod.last();
    var data = ev.dataTransfer.getData("text");
    // var x = ev.dataTransfer.getData("textx");
    // var y = ev.dataTransfer.getData("texty");
    //ev.target.appendChild(document.getElementById(data));
    var ne=document.getElementById(data);
    if(ne!=null && ne.cloneNode!=undefined){
    var cl=ne.cloneNode();
    $(cl).attr("id","dragx"+$tod.children().length);
    // const newelement=document.getElementById("x1");
    // newelement.appendChild(cl);
    
    cl.style.position="relative";
    if($tod2!=undefined){
           $(cl).css("margin","10px");
          $(cl).width($tod.width()/4);
          $tod.append(cl);
    }
  }
  }
  render(){
    return(<div>
       <Navs></Navs>
       <Col sm="12">
        <Jumbotron style={{ height: 91 + "vh", marginBottom: 0 }}>
        <h1>Drag Show</h1>
        <Row>

          <Col sm="9"> </Col>
          <Col sm="9" > 
          <Col sm="9"  >
          <Col sm="12" className="ui-widget-content" id="x1"   style={{backgroundColor:"red",display:"block",height:"20em",     overflow: "scroll"}} onDrop={this.drop} onDragOver={this.DragOver}>
          </Col>

          
          </Col>
          <h2>bURASI</h2></Col>
          <Col sm="3" style={{
  width: 350+"px",
  height: 70+"px",
  padding: 10+"px",
  border: 1+"px solid #aaaaaa"
}}>
<img id="drag1" src="https://picsum.photos/536/354" draggable="true" onDragStart={this.drag} onDragEnd={this.DragEnd} width="336" height="69" />
          </Col>
        </Row>
        </Jumbotron>
        </Col>
        </div>)
  }
}

export default index;