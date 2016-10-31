'use strict';

var path = require('path');
var utils = require('./utils');

module.exports = function (app, dirname) {
    console.log('Setup application routes')
    
    // Setup html engine
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    // Setup default views path
    app.set('views', path.join(dirname, 'client'));
    
    // Main route
    app.route('/')
        .get(function (req, res) {
            var browserInfo = utils.getBrowserInfo(req.header('user-agent'));
            console.log('Main route request from ' + (browserInfo.mobile ? 'mobile' : 'desktop') + ' client' );
            
            if (browserInfo.mobile) {
                res.render('mobile.html');
            } else {
                res.render('desktop.html');
            }
        });
    
    // Default route
    app.route('*')
        .get(function (req, res) {
            console.log('Wrong route. Redirect to /');
            res.redirect('/');
        });
};