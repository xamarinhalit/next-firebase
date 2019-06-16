import React from 'react'
import { connect } from 'react-redux'
import App from '../components/about';

class Index extends React.Component {
  render () {
    return <App />
  }
}
export default connect(
  null,
  null,
)(Index)
