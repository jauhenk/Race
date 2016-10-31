'use strict';

// Load third-party modules
var express = require('express');
const http = require('http');

// Start the HTTP server using express
const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = http.createServer(app);
httpServer.listen(PORT);
console.log('Started HTTP Server on ' + PORT + ' port');

// Start WS server for desktop
const WS_PORT = 8081;
const wsServer = http.createServer(function (req, res) {
    console.log('http reques to WS server');
    res.writeHead(404);
    res.end();
});
wsServer.listen(WS_PORT);
console.log('Started WS HTTP Server on ' + WS_PORT + ' port');

// Setup routes
var router = require('./server/router');
router(app, __dirname);