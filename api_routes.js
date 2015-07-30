module.exports = function () {

	var db = require('./db.js');
	var app = require('./server.js');
	var Busboy = require('busboy');
	var inspect = require('util').inspect;

	// POST: api/blogpost
	// Creates new blogpost
	app.post('/api/blogposts', function(req, res){
		console.log(Date()+' - POST: /api/blogposts');
		console.log(req.body);
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
	app.get('/api/blogposts', function  (req, res) {
		console.log(Date()+' - GET: /api/blogposts');

		db.select().table('blogpost').whereRaw('deleted IS NOT NULL').then(function(blogposts) {
			res.status(200).send(blogposts);

		}).catch(function (error) {
			console.log(error);
		});
	});

	// GET: api/blogpost/:id
	// returns one blogpost
	app.get('/api/blogposts/:id', function  (req, res) {
		console.log(Date()+' - GET: /api/blogposts/'+req.params.id);

		db.select().from('blogpost').where({id: req.params.id}).andWhereRaw('deleted IS NOT NULL').then(function(blogpost) {
			if(blogpost){
				res.status(200).send(blogpost[0]);	
			}
			else{
				res.status(404).send();
			}
		}).catch(function (error) {
			console.log(error);
		});
	});

	// GET: api/blogpost/:id/comments
	// returns all comments from a blogpost by its id
	app.get('/api/blogposts/:id/comments', function (req, res) {
		console.log(Date()+' - GET: /api/blogposts/'+req.params.id+'/comments');

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

	// POST: /api/blogposts/:id/comments
	// inserts new comment to blogpost by its id
	app.post('/api/blogposts/:id/comments', function (req, res) {
		console.log(Date()+' - POST: /api/blogposts/'+req.params.id+'/comments');
		
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
			console.log(Date()+' - New Comment created');
			res.status(201).send();		
		})
		.catch(function (error) {
			console.log(error);
		});

	});

	
	app.post('/api/images', function (req, res) {
		console.log(Date()+' - POST: /api/images/');
		var busboy = new Busboy({ headers: req.headers });

		busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
      });
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
      });
    });

    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });

    busboy.on('finish', function() {
      console.log('Done parsing form!');
      res.writeHead(201, { Connection: 'close' });
      res.end();
    });


    return req.pipe(busboy);
	});


};