import posed, { PoseGroup } from 'react-pose';
import React, { Component } from 'react';

const ChildStyle = {
  cursor:'pointer'
};


class DataList extends Component {
  constructor(props){
    super(props);
    this.state={
      selected:null
    }
    this.onClickItem=this.onClickItem.bind(this);
  }
  onClickItem(e){
    let item=JSON.parse(e.currentTarget.dataset.item);
    if(item.yurl!=undefined && item.yurl!=null)
    this.setState({
      selected:{
        ...item
      }
    })
    else
    this.setState({
      selected:null
    })
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
    let IsVisible = this.props.data != undefined ? Object.keys(this.props.data).length > 0 ? true : false : false;
    return (<PoseGroup>
        {IsVisible?
        (<Parent pose={IsVisible ? 'open' : 'closed'} className={'list-group'} key={IsVisible}>
          {IsVisible ? this.props.data.map((item, i) => (
            <Child key={i} className="list-group-item" onClick={this.onClickItem} data-item={JSON.stringify(item)} style={ChildStyle}>
              {item.name}
            </Child>
          )) : null}
          {this.state.selected!=null?(<Child key={this.props.data.length?1:this.props.data.length} className="list-group-item" >
         <iframe width="1280" height="720" src={this.state.selected.yurl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
        </Child>):<div><h5 align="center" >Url Yok</h5></div>}
        </Parent>):null}
      </PoseGroup>)
  }
};
export default DataList;