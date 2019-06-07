// src/functions/index.js

// Here's firebase dependency for handling HTTP requests
const onRequest = require('firebase-functions').https.onRequest

// These relative paths will exist after compiling everything
const index = require('./next/serverless/pages/index')
const about = require('./next/serverless/pages/about')

// These named exports will map to Firebase Function names
exports.index = onRequest((req, res) => index.render(req, res))
exports.about = onRequest((req, res) => about.render(req, res))
