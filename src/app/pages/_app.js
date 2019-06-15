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
  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Head>
          <title>Next Js Merhaba</title>
          <link rel="preload" href="/static/css/bootstrap.css" as="style" onLoad="this.onload=null;this.rel='stylesheet'" />
          <noscript><link rel="stylesheet" href="/static/css/bootstrap.css"/></noscript>
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
