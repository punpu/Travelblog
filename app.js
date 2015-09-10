

// http://www.w3schools.com/js/js_strict.asp
'use strict';

//Initialize modules
var express = require('express');
var app = express();
var appRouter = express.Router();
module.exports = appRouter;

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');


// My own modules
var auth = require('./backend/authentication');
var cfg = require('./config');
var db = require('./backend/db');


app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(express.static(__dirname + '/public'));
app.use(busboy({
	limits: {
		fileSize: 5 * 1024 * 1024 //10MB
	}
}));

app.use(cookieParser());
app.use(require('express-session')({
    secret: cfg.sessionSecret,
    resave: false,
    saveUninitialized: false
}));
app.use(auth.passport.initialize());
app.use(auth.passport.session());

// Initialize authentication with passport
auth.initialize();

// Initialize routes
require('./backend/api_routes.js')();

app.use(cfg.baseURL, appRouter);

// GET: index.html
appRouter.get('*', function(req, res) {
	console.log("GET: index.html");
	console.log(req.url);
	res.sendFile('public/index.html', { root: path.join(__dirname) });
});


app.set('port', process.env.PORT || cfg.port);

// Start server
var server = app.listen(app.get('port'), function () {
	console.log('Server started. Listening to port ' + server.address().port + '.');
});

