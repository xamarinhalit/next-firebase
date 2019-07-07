import React from 'react'
import { connect } from 'react-redux'
import { About } from '../components';

class Index extends React.Component {
  render () {
      return <About />
  }
}
export default connect(
  null,
  null,
)(Index)
