import posed, { PoseGroup } from 'react-pose';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {DataList_Selected} from '../lib/redux/actions';
import {Image,Col,Row} from 'react-bootstrap';

const ChildStyle = {
  cursor:'pointer'
};

class DataList extends Component {
  constructor(props){
    super(props);
    this.onClickItem=this.onClickItem.bind(this);
  }
  onClickItem(e){
    let item=JSON.parse(e.currentTarget.dataset.item);
    if(item.yurl!=undefined && item.yurl!=null){
      if(this.props.Selected!=null && this.props.Selected.name==item.name && this.props.Selected.yurl==item.yurl){
        this.props.DataList_Selected(null);
      }else{
      this.props.DataList_Selected(item);
      }

    }
    else
      this.props.DataList_Selected(null);
  }
  render() {

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
    let IsVisible = this.props.Result != undefined ? Object.keys(this.props.Result).length > 0 ? true : false : false;
    return (<PoseGroup>
        {IsVisible?
        (<Parent pose={IsVisible ? 'open' : 'closed'} className={'list-group'} key={IsVisible}>
          {IsVisible ? this.props.Result.map((item, i) => (
           <Child key={i} className="list-group-item" onClick={this.onClickItem} data-item={JSON.stringify(item)} style={ChildStyle}>
             <Row><Col sm="1"> <Image className="pull-right" src={item.picture} width="32" height="32"></Image></Col><Col sm="11"> {item.name}</Col></Row>
            </Child>
          )) : null}
          {this.props.Selected!=null?(<Child key={this.props.Result.length?1:this.props.Result.length} className="list-group-item" >
         <iframe style={{width:87 +"vw",height:87+"vh"}} src={this.props.Selected.yurl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
        </Child>):<div><h2 align="center" >...</h2></div>}
        </Parent>):null}
      </PoseGroup>)
  }
};
const mapDispatchToProps = { DataList_Selected }
function mapStateToProps (state) {
  const { Result,Selected } = state
  return { Result,Selected }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataList)
