// Alustaa yhteyden tietokantaan

var cfg = require('./config');

var db = require('knex')({
  client: 'pg',
  connection: {
    host     : cfg.dbhost,
    user     : cfg.dbuser,
    password : cfg.dbpassword,
    database : cfg.db
  }
});


module.exports = db;