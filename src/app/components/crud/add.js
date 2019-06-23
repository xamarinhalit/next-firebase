import posed, { PoseGroup } from 'react-pose';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {DataList_Add} from '../../lib/redux/actions';
import {Form,Button,Col,Row,Alert } from 'react-bootstrap';

const ChildStyle = {
  cursor:'pointer'
};

class Data_Add extends Component {
  constructor(props){
    super(props);
    this.state={
      name:"",
      detail:"",
      yurl:""
    }
    this.onClick=this.onClick.bind(this);
  }
 
  onClick(){
    let { name,detail,yurl}=this.state;
    

    this.props.DataList_Add({
      name:name,detail:detail,yurl:yurl
    });
 
  }
  
  render() {
   
      return (
            this.props.IsAuth?( <Col sm="12">
                <Form >
                 <Row>
                  <Col sm="4">
                  <Form.Group>
                    <Form.Label>Başlık</Form.Label>
                    <Form.Control type="text" placeholder="Başlık Giriniz" onChange={({currentTarget})=>this.setState({name:currentTarget.value})}/>
                  </Form.Group>
                    </Col>
                  
                    <Col sm="4">
                  <Form.Group >
                    <Form.Label>Youtube Url</Form.Label>
                    <Form.Control type="text" placeholder="Youtube frame url Giriniz" onChange={({currentTarget})=>this.setState({yurl:currentTarget.value})}/>
                  </Form.Group>
                  </Col>
                  <Col sm="4">
                  <Form.Group >
                    <Form.Label>Hakkında</Form.Label>
                    <Form.Control type="text" placeholder="Hakkında bilgi giriniz" onChange={({currentTarget})=>this.setState({detail:currentTarget.value})}/>
                  </Form.Group>
                  </Col>
                  </Row>
                  {/* <Row>
                   <Col sm={{ span: 4, offset: 2 }}>
                    {IsAddSuccess!=true?(<Alert variant={"danger"} setTimeout={100}>
                    "Yetkiniz Bulunmamaktadır.."</Alert>):null}
                    </Col>
                    </Row> */}
                  <Button variant="primary" type="button" onClick={this.onClick}>
                  Ekle
                  </Button>
                 
                </Form>
                </Col>):null
      );
  }
}
const mapDispatchToProps = { DataList_Add }
function mapStateToProps (state) {
  const { IsAuth } = state
  return { IsAuth }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Data_Add)
