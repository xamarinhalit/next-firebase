// src/app/next.config.js
const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const fs = require('fs');
const dotenv = require('dotenv');
const envConfig = dotenv.parse(fs.readFileSync('.env'));

for (let k in envConfig) {
  process.env[k] = envConfig[k];
}
const withBabelMinify = require('next-babel-minify')();
const withMDX = require('@next/mdx')()



module.exports =withBabelMinify(withSass(withMDX({
   // target: "serverless",
    distDir: "../../dist/functions/next",
    cssModules: true,
    cache_manifest: false,
    webpack: config =>{
      const env = Object.keys(process.env).reduce((acc, curr) => {
        acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
        return acc;
      }, {});
  
      config.plugins.push(new webpack.DefinePlugin(env));
  
      return config;
    }
  })));