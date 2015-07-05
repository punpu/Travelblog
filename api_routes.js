module.exports = function () {

	var db = require('./db.js');
	var app = require('./server.js');

	// POST: api/blogpost
	// Creates new blogpost
	app.post('/api/blogpost', function(req, res){
		console.log(Date()+' - POST: /api/blogpost');
		
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
		console.log(Date()+' - GET: /api/blogpost');

		db.select().table('blogpost').whereRaw('deleted IS NOT NULL').then(function(blogposts) {
			res.status(200).send(blogposts);

		}).catch(function (error) {
			console.log(error);
		});
	});


	// GET: api/blogpost/:id/comments
	// returns all comments from a blogpost by its id
	app.get('/api/blogpost/:id/comments', function (req, res) {
		console.log(Date()+' - GET: /api/blogpost/'+req.params.id+'/comments');

		db.raw(
			'select id, author, text, created_at '+
			'from comment '+
			'where blogpostid = ?', [req.params.id])

		.then(function (result) {
			res.status(200).send(result.rows);
		})
		.catch(function (error) {
			console.log(error);
		});
	});

	// POST: /api/blogpost/:id/comments
	// inserts new comment to blogpost by its id
	app.post('/api/blogpost/:id/comments', function (req, res) {
		console.log(Date()+' - POST: /api/blogpost/'+req.params.id+'/comments');
		
		if( !req.body.author || !req.body.text ){
			console.log(Date()+' - ERROR: malformed request');
			res.status(400).send();
			return;		
		}

		var date = new Date();

		db.insert(
			{ author: req.body.author, 
				text: req.body.text, 
				blogpostid: req.params.id }).into('comment')

		.then(function (result) {
			console.log(Date()+' - New blogpost created');
			res.status(201).send();		
		})
		.catch(function (error) {
			console.log(error);
		});

	});

	

};