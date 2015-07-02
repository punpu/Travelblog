// Alustetaan tietokanta
// Poistaa kaikki taulut ja luo ne uudelleen

var db = require('./db');

console.log('Initializing database..');

console.log('Creating table blogpost');
db.schema.dropTableIfExists('blogpost').then(function(){

	db.schema.createTable('blogpost', function (table){
		table.increments();
		table.string('author');
		table.text('text');
		table.timestamps();
	}).then(function(){	
		console.log('Table blogpost created.');

		console.log('Creating table comment');
		db.schema.dropTableIfExists('comment').then(function(){

			db.schema.createTable('comment', function (table){
				table.increments();
				table.integer('blogpostId').references('id').inTable('blogpost');
				table.string('author');
				table.text('text');
				table.timestamp('created_at');
			}).then(function(){	
				console.log('Table comment created.');
				
				process.exit();
			});
		});


	});
});


