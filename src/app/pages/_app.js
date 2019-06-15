import App, { Container } from 'next/app'
import Head from 'next/head';
import React from 'react'
import withReduxStore from '../lib/redux'
import { Provider } from 'react-redux'

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
// import  "./../static/css/bootstrap.css";

class MyApp extends App {
  constructor(props){
    super(props);
    this.persistor = persistStore(props.reduxStore)
  }
  componentDidMount(){
    // make a stylesheet link
    var myCSS = document.createElement( "link" );
    myCSS.rel = "stylesheet";
    myCSS.href = "/static/css/bootstrap.css";
    // insert it at the end of the head in a legacy-friendly manner
    document.head.insertBefore( myCSS, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling );
  }
  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Head>
          <title>Next Js Merhaba</title>
        </Head>
        <Provider store={reduxStore}>
        <PersistGate
            loading={<Component {...pageProps} />}
            persistor={this.persistor}>
            <Component {...pageProps} />

          </PersistGate>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
