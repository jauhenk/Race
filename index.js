'use strict';

// Load third-party modules
var express = require('express');
const http = require('http');

// Start the HTTP server using express
const app = express();
const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT);
console.log('Started HTTP Server on ' + process.env.PORT + ' port');

// Setup routes
var router = require('./server/router');
router(app, __dirname);