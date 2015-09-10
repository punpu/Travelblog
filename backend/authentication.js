
var auth = {};
var appRouter = require('../app.js');
var cfg = require('../config.js');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


function initialize () {

	passport.use(new LocalStrategy(
	  function(username, password, done) {

      if (username !== cfg.adminUser) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password !== cfg.adminPass) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      var user = {id: 567}
      return done(null, user);
	  }
	));

	passport.serializeUser(function(user, done) {
  	done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  if(id = 567){
	    done(null, {id: 567});
	  }
	});

	appRouter.post('/api/login', passport.authenticate('local'), function (req, res) {
		console.log(Date()+'Admin logged in');
		res.status(200).send({asd: 'jee'});
	});

	appRouter.get('/api/logout', function (req, res) {
		req.logout();
		console.log(Date()+'Admin logged out');
		res.status(200).send();
	})

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