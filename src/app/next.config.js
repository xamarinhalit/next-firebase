// src/app/next.config.js
const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
// const fs = require('fs');
// const dotenv = require('dotenv');
// const envConfig = dotenv.parse(fs.readFileSync('.env'));

// for (let k in envConfig) {
//   process.env[k] = envConfig[k];
// }
//module.exports =withSass({
module.exports ={
    target: "serverless",
    distDir: "../../dist/functions/next",
    cssModules: true,
    optimization: {
      concatenateModules: false,
      occurrenceOrder: true,
      minimizer: [ (compiler) => {
        const TerserPlugin = require('terser-webpack-plugin');
        new TerserPlugin().apply(compiler);
      }],
    },

    webpack: config =>{
      const env = Object.keys(process.env).reduce((acc, curr) => {
        acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
        return acc;
      }, {});
  
      config.plugins.push(new webpack.DefinePlugin(env));
  
      return config;
    }
  };