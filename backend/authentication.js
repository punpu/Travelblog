
var auth = {};
var appRouter = require('../app.js');
var cfg = require('../config.js');
var db = require('./db');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


function initialize () {

	passport.use(new LocalStrategy(
	  function(username, password, done) {

	  	db.raw('select * from admin ' +
	  				 'where username = ?', [username])
	  	.then(function (result) {

	  		if(result.rows.length === 0){
	  			return done(null, false, {message: 'Incorrect username.'});
	  		}

	  		var admin = result.rows[0];

	  		if (username !== admin.username) {
        return done(null, false, { message: 'Incorrect username.' });
	      }
	      if (password !== admin.password) {
	        return done(null, false, { message: 'Incorrect password.' });
	      }

	      var user = {username: admin.username, id: admin.id};
	      return done(null, user);

			})
			.catch(function (error) {
				console.log('Database error, authentication failed.');
				console.log(error);
			});

	  }
	));

	passport.serializeUser(function(user, done) {
  	done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		db.raw('select username from admin where id = ?', [id])
		.then(function (result) {
    	done(null, {username: result.rows[0].username});
		})
		.catch(function (error) {
			console.log('Database error, authentication failed.');
		});

	});

	appRouter.post('/api/login', passport.authenticate('local'), function (req, res) {
		console.log(Date()+'Admin logged in');
		res.status(200).send(req.user);
	});

	appRouter.get('/api/logout', function (req, res) {
		req.logout();
		console.log(Date()+'Admin logged out');
		res.status(200).send();
	});

	appRouter.get('/api/checksession', requireAuthentication, function (req, res) {
		res.status(200).send(req.user);
	});

};


var requireAuthentication = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log(Date()+'User tried to access secured API without authentication.');
  res.sendStatus(401);
};


module.exports = {
	passport: passport,
	initialize: initialize,
	requireAuthentication: requireAuthentication
};