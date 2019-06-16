// const next= require('next');
// const express= require('express');
// const compression= require('compression');
// const helmet= require('helmet');
// const cors= require('cors');
// const bodyParser= require('body-parser');
// const { functions } =require('./../lib/firebase');

// const nextApp = next({ dev: false, conf: { distDir: 'next' } });
// const handle = nextApp.getRequestHandler();

// const server = express();
// server.disable('x-powered-by');
// server.use(cors());
// server.use(bodyParser.json());
// server.set('trust proxy', 1);
// server.use(compression());
// server.use(helmet());

// server.get('*', (req, res) => handle(req, res));

// const index = functions.https.onRequest(async (req, res) => {
//   await nextApp.prepare();
//   return server(req, res);
// });

// exports.index= index ;
const functions = require("firebase-functions")
const next = require("next")
// These relative paths will exist after compiling everything
//const index = require('./next/serverless/pages/index');
//const about = require('./next/serverless/pages/about');

var dev = process.env.NODE_ENV !== "production"
var app = next({ dev, conf: { distDir: "next" } })

// var express = require('express')
// var appex = express();

var handle = app.getRequestHandler()
var sm = require('sitemap');
_sitemap = sm.createSitemap ({
  hostname: 'https://next-f0.firebaseapp.com',
  cacheTime: 7200,        // 600 sec - cache purge period
  urls: [
    { url: '/index',  changefreq: 'hourly', priority: 0.3 },
    { url: '/about',  changefreq: 'hourly',  priority: 0.7 },
  ]
});
exports.sitemap=functions.https.onRequest((req, res) => {
  res.header('Content-Type', 'text/xml');
  res.send(_sitemap.toString());
  return app.prepare().then(() => handle(req, res))
});

exports.index = functions.https.onRequest((req, res) => {
 // console.log("File: " + req.originalUrl) // log the page.js file that is being requested
 res.set( "Cache-Control", "public,max-age=43200, s-maxage=43200");
 return app.prepare().then(() => handle(req, res))
});
exports.robots = functions.https.onRequest((req, res) => {
     res.type('text/plain');
    res.send('User-agent: *\nDisallow: /');
  return app.prepare().then(() => handle(req, res))
 });
