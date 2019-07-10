import React, { Component } from 'react';
import { connect } from 'react-redux';
import {DataList_Add} from '../../lib/redux/actions';
import {Form,Button,Col,Row,Alert } from 'react-bootstrap';

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
      this.setState({
          name: "",
          detail: "",
          yurl: ""
      });
 
  }
  
    render() {
        let { IsAuth } = this.props;
        let { name, detail, yurl } =this. state;
      return (
            IsAuth?( <Col sm="12">
                <Form >
                 <Row>
                  <Col sm="4">
                  <Form.Group>
                              <Form.Label>Başlık</Form.Label>
                              <Form.Control type="text" placeholder="Başlık Giriniz" onChange={({ currentTarget }) => this.setState({ name: currentTarget.value })} value={name} />
                  </Form.Group>
                    </Col>
                  
                    <Col sm="4">
                  <Form.Group >
                              <Form.Label>Youtube Url</Form.Label>
                              <Form.Control type="text" placeholder="Youtube frame url Giriniz" onChange={({ currentTarget }) => this.setState({ yurl: currentTarget.value })} value={yurl} />
                  </Form.Group>
                  </Col>
                  <Col sm="4">
                  <Form.Group >
                    <Form.Label>Hakkında</Form.Label>
                              <Form.Control type="text" placeholder="Hakkında bilgi giriniz" onChange={({ currentTarget }) => this.setState({ detail: currentTarget.value })} value={detail}/>
                  </Form.Group>
                  </Col>
                  </Row>
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
    const { IsAuth } = state.blog
  return { IsAuth }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Data_Add)
