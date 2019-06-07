import posed, { PoseGroup } from 'react-pose';
import React, { Component } from 'react';
class DataList extends Component {
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
    return (
      <PoseGroup>
        {IsVisible?
        (<Parent pose={IsVisible ? 'open' : 'closed'} className={'list-group'} key={IsVisible}>
          {IsVisible ? this.props.data.map((item, i) => (
            <Child key={i} className="list-group-item" >
              {item.name}
            </Child>
          )) : null}
        </Parent>):null
        }
      </PoseGroup>
    )
  }
};
export default DataList;