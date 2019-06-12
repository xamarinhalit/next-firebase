import React from 'react'
import { connect } from 'react-redux'
import { serverRenderOnce,clientRenderOn } from '../lib/redux/actions'
import App from '../components';
import { GetDbAtOn} from '../lib/service'

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req
    reduxStore.dispatch(serverRenderOnce(isServer))
    return {}
  }

  async componentDidMount () {
    let that =this;
     await GetDbAtOn(cb=>{
        that.props.clientRenderOn(cb);
      });
  }
  render () {
    return <App />
  }
}
const mapDispatchToProps = { serverRenderOnce,clientRenderOn }
export default connect(
  null,
  mapDispatchToProps
)(Index)
