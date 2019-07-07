import React,{Component} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Select from 'react-select';
import {Container} from 'react-bootstrap';
 class IconList extends Component {
     constructor(props){
         super(props);
         this.state = {
            options: [
             
            ],
            options2: [
             
            ],
            selected:null
          };
     }
 componentDidMount(){
    //  console.log(far);
     var options=[];
     for (const key in far) {
        if (far.hasOwnProperty(key)) {
            const element = far[key];
                    options.push({
                        checked: false,
                        disabled: false,
                        icon: element.icon,
                        value: element,
                        label: element.iconName
            });
            
        }
    }
    if(options.length>0) 
    this.setState({
        options:options
    });
    var options2=[];
    for (const key in fas) {
       if (fas.hasOwnProperty(key)) {
           const element = fas[key];
                   options2.push({
                       checked: false,
                       disabled: false,
                       icon: element.icon,
                       value: element,
                       label: element.iconName
           });
           
       }
   }
   if(options2.length>0) 
   this.setState({
        options2:options2
   });
 }
  render() {
    let that=this;
    return (<Container>
      <Select  placeholder="far" options={this.state.options} onChange={(e)=>{
          console.log(e);
          that.setState({selected:e.value})}}>
      </Select>
      <Select placeholder="fas" options={this.state.options2} onChange={(e)=>{
          console.log(e);
          that.setState({selected:e.value})}}>
      </Select>
        <FontAwesomeIcon icon={this.state.selected} style={{height:100+"px",width:100+"px"}}></FontAwesomeIcon>
      </Container>
    );
  }
}

export default IconList;