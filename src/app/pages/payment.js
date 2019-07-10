import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { serverRenderOnce, clientRenderOn, On_Auth_State_Changed } from '../lib/redux/actions'
import { Payment } from '../components';
class Index extends React.Component {
    static getInitialProps({ reduxStore, req, dispatch }) {
        this.boundActionCreators = bindActionCreators({ serverRenderOnce, clientRenderOn, On_Auth_State_Changed }, dispatch)
        const isServer = !!req
        reduxStore.dispatch(serverRenderOnce(isServer))

        return {}
    }

    async componentDidMount() {
        let { dispatch } = this.props;
        On_Auth_State_Changed(u => {
            dispatch(u);
        });
        clientRenderOn(cb => {
            dispatch(cb);
        });
    }
    render() {
        return <Payment {...this.props.boundActionCreators} />
    }
}

export default connect(
    null
)(Index)
