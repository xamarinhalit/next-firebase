import posed, { PoseGroup } from 'react-pose';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DataList_Selected, DataList_Remove } from '../lib/redux/actions';
import { Image, Col, Row, Jumbotron, Container } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { fas } from '@fortawesome/free-solid-svg-icons';
 import { far } from '@fortawesome/free-regular-svg-icons';

//  import * as aa from '@fortawesome/fontawesome-svg-core';

const ChildStyle = {
  cursor: 'pointer'
};

class DataList extends Component {
  constructor(props) {
    super(props);
    this.onClickItem = this.onClickItem.bind(this);
    this.onDeleteClick=this.onDeleteClick.bind(this);
  }
    onDeleteClick(e) {
    let id = e.currentTarget.dataset.id;
    let item = null;
    this.props.Result.map((_item, index) => {
      if (_item.id == id)
        item = _item;
    });
      if (item != null)
        this.props.DataList_Remove(id);
  }
    onClickItem(e) {
    let id = e.currentTarget.dataset.id;
    let item = null;
    this.props.Result.map((_item, index) => {
      if (_item.id == id)
        item = _item;
    });
      if (item!=null && item.yurl != undefined && item.yurl != null) {
      if (this.props.Selected != null && this.props.Selected.name == item.name && this.props.Selected.yurl == item.yurl) {
        this.props.DataList_Selected(null);
      } else {
        this.props.DataList_Selected(item);
      }

    }
    else
      this.props.DataList_Selected(null);
  }
    render() {
   let { Result, Selected } = this.props;
    const Parent = posed.ul({
      open: {
        x: '0%',
        delayChildren: 300,
        staggerChildren: 50
      },
      closed: { x: '-100%', delay: 300 },
      initialPose: 'closed'
    });
    const Child = posed.li({
      open: { y: 0, opacity: 1, delay: 300 },
      closed: { y: 20, opacity: 0 }
    });
    let IsVisible =Result != undefined ? Object.keys(Result).length > 0 ? true : false : false;
    return (<PoseGroup>
      {IsVisible ?
        (<Parent pose={IsVisible ? 'open' : 'closed'} className={'list-group'} key={IsVisible}>
          {IsVisible ? Result.map((item, i) => (
              <Child key={item.id} className="list-group-item" style={ChildStyle}>
                  <Row>
                  <Col sm="1">
                    <Image src={item.picture} width="32" height="32"></Image>
                  </Col>
                  <Col sm="3" onClick={this.onClickItem} data-id={item.id} >
                    {item.name}
                      </Col>
                      <Col sm="7" onClick={this.onClickItem} data-id={item.id} >
                          {item.detail}
                      </Col>
                  <Col sm="1" onClick={this.onDeleteClick}  data-id={item.id}>
                  <FontAwesomeIcon icon={fas.faTrash} style={{float:"right",marginTop:0.5+"em"}}/>

                  </Col>
                </Row>
            </Child>
          )) : null}
                {Selected != null ? (<Child key={this.props.Result.length ? 0 : Result.length} className="list-group-item">
                    <iframe style={{ width: 87 + "vw", height: 87 + "vh" }} src={Selected.yurl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                </Child>)
                    :
                    null   
                    }
            </Parent>) : null}
       
    </PoseGroup>)
  }
};
const mapDispatchToProps = { DataList_Selected ,DataList_Remove}
function mapStateToProps(state) {
  const { Result, Selected } = state.blog
  return { Result, Selected }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataList)
