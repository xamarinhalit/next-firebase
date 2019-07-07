import App, { Container } from 'next/app'
import Head from 'next/head';
import React from 'react'
import withReduxStore from '../lib/redux'
import { Provider } from 'react-redux'
import {bindActionCreators} from 'redux'

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faTrash, faKey } from '@fortawesome/free-solid-svg-icons';

// library.add(faTrash, faKey);


// import  "./../static/css/bootstrap.css";

class MyApp extends App {
  constructor(props){
    super(props);
    this.persistor = persistStore(props.reduxStore)
  }
  async componentDidMount(){
  
    // insert it at the end of the head in a legacy-friendly manner
    await new Promise((resolve,reject)=>{
      var myCSS = document.createElement( "link" );
      myCSS.rel = "stylesheet";
      myCSS.href = "/static/css/bootstrap.css";
      document.head.insertBefore( myCSS, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling ); 
     var myMani =document.createElement("link");
     myMani.rel="manifest";
     myMani.href="/static/favicon/manifest.json";
     document.head.insertBefore( myMani, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling );
      resolve();
    })

    
  }
  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container {...this.boundActionCreators}>
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
