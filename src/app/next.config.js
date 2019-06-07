// src/app/next.config.js
const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const fs = require('fs');
const dotenv = require('dotenv');
const envConfig = dotenv.parse(fs.readFileSync('.env'));

for (let k in envConfig) {
  process.env[k] = envConfig[k];
}
module.exports =withSass({
    target: "serverless",
    distDir: "../../dist/functions/next",
    cssModules: true,
    env:{
      FIREBASE_API_KEY:"AIzaSyBbcF98rbqeRkzuJISYM3rZVZY2oLjPqAo",
      FIREBASE_AUTH_DOMAIN:"react-next-a3eb9.firebaseapp.com",
      FIREBASE_DATABASE_URL:"https://react-next-a3eb9.firebaseio.com",
      FIREBASE_PROJECT_ID:"react-next-a3eb9",
      FIREBASE_STORAGE_BUCKET:"react-angular-84263.appspot.com",
      FIREBASE_SENDER_ID:"990132766110",
      FIREBASE_APP_ID:"1:990132766110:web:f5255d78393d9d1c",
    },
    webpack: config =>{
      const env = Object.keys(process.env).reduce((acc, curr) => {
        acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
        return acc;
      }, {});
  
      config.plugins.push(new webpack.DefinePlugin(env));
  
      return config;
    }
  })