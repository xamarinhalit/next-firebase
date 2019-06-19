import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { serverRenderOnce,clientRenderOn } from '../lib/redux/actions'
import App from '../components';
class Index extends React.Component {
  static getInitialProps ({ reduxStore, req ,dispatch}) {
    this.boundActionCreators = bindActionCreators({ serverRenderOnce,clientRenderOn }, dispatch)
    const isServer = !!req
    reduxStore.dispatch(serverRenderOnce(isServer))
    return {}
  }

   componentDidMount () {
     let { dispatch ,mongoose} = this.props
     clientRenderOn(cb=>{
       dispatch(cb);
     });
  }
  render () {
    return <App {...this.props.boundActionCreators}/>
  }
}

export default connect(
  null
)(Index)
