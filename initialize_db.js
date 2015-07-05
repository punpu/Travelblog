// Alustetaan tietokanta
// Poistaa kaikki taulut ja luo ne uudelleen

var db = require('./db');

console.log('Initializing database..');


db.raw('DROP TABLE IF EXISTS blogpost CASCADE').then(function () {
	console.log('Creating table blogpost');

	db.raw(
		'CREATE TABLE blogpost( '+
			'id serial PRIMARY KEY, '+
			'author varchar(30) NOT NULL, '+
			'text text NOT NULL, '+
			'deleted boolean DEFAULT FALSE, '+
			'created_at timestamptz DEFAULT current_timestamp, '+
			'updated_at timestamptz );'
	).then(function () {
		console.log('Table blogpost created.');

		db.raw('DROP TABLE IF EXISTS comment').then(function () {
			console.log('Creating table comment');	
			db.raw(
				'CREATE TABLE comment ( '+
					'id serial PRIMARY KEY, '+
					'blogpostid integer REFERENCES blogpost(id) ON DELETE CASCADE, '+
					'author varchar(30) NOT NULL, '+
					'text text NOT NULL, '+
					'deleted boolean DEFAULT FALSE, '+
					'created_at timestamptz DEFAULT current_timestamp ); '
			).then(function () {
				console.log('Table comment created.');
				
				process.exit();
			})
		});
	});
});