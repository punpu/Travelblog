

// http://www.w3schools.com/js/js_strict.asp
'use strict';

//Initialize modules
var express = require('express');
var app = express();
var cfg = require('./config');
var db = require('./db');
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(express.static(__dirname + '/public'));

// POST: api/blogpost
// Creates new blogpost
app.post('/api/blogpost', function(req, res){
	console.log(Date()+' - POST: /blogpost');
	if(!req.body.author || !req.body.text){
		console.log(Date()+' - ERROR: malformed request');
		res.status(400).send();
		return;
	}
	var date = new Date();

	db.insert({author: req.body.author, 
						 text: req.body.text,
						 created_at: date.toISOString(),
						 updated_at: date.toISOString()}).into('blogpost')
	.then(function(result){
			console.log(Date()+' - New blogpost created');
			res.status(201).send();
	})
	.catch(function(error) {
		console.log(error);
		res.status(500).send();
	}); 

});


// GET: api/blogpost
// returns all blogposts
app.get('/api/blogpost', function  (req, res) {
	console.log('GET: /blogpost');

	db.select().table('blogpost').then(function(blogposts) {
		res.status(200).send(blogposts);

	}).catch(function (error) {
		console.log(error);
	});
});

// GET: index.html
app.get('*', function(req, res) {
	console.log("GET: index.html");
	res.sendFile('public/index.html', { root: path.join(__dirname) });
});


app.set('port', process.env.PORT || cfg.port);

// Start server
var server = app.listen(app.get('port'), function () {
	console.log('Server started. Listening to port ' + server.address().port + '.');
});