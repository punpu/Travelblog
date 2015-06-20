// Alustetaan tietokanta
// Poistaa kaikki taulut ja luo ne uudelleen

var db = require('./db');

console.log('Initializing database..');

console.log('Creating table events');
db.schema.dropTableIfExists('events').then(function(){

    db.schema.createTable('events', function (table){
        table.increments();
        table.string('name');
        table.string('description', 1500);
        table.timestamps();
    }).then(function(){

        console.log('Initialization complete');
        process.exit();
    });

});
