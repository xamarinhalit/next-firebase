import posed, { PoseGroup } from 'react-pose';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {DataList_Add} from '../../lib/redux/actions'

const ChildStyle = {
  cursor:'pointer'
};

class Data_Add extends Component {
  constructor(props){
    super(props);
    this.onClick=this.onClick.bind(this);
  }
  onClick(){
    this.props.DataList_Add();
  }
  render() {
      return (
            this.props.IsAuth?( <div>
                <button onClick={this.onClick}>
                    Ekle
                </button>
            </div>):null
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
