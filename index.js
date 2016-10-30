'use strict';

// Load third-party modules
var express = require('express');
var http = require('http');

// Start the HTTP server using express
var app = express();
var httpServer = http.createServer(app);
httpServer.listen(process.env.PORT);
console.log('Started HTTP Server on ' + process.env.PORT + ' port');