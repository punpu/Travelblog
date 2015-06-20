


// http://www.w3schools.com/js/js_strict.asp
// Kielletään epämääräisen syntaksin käyttö:
'use strict';

//Alustetaan moduulit
var express = require('express');
var app = express();
var cfg = require('./config');
var db = require('./db');
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(express.static(__dirname + '/public'));

app.post('/events', function(req, res){
    console.log("POST: /events");
    if(!req.body.name){
        console.log('ERROR: name is missing');
    }
    if(!req.body.description){
        console.log('ERROR: description is missing');
    }

    db.insert({name: req.body.name, description: req.body.description}).into('events').then(function(success, error){
        if(error){ 
            console.log(error);
            res.status(500).send();
            return;
        }
        
        console.log('New event created');
        res.status(201).send();
        
    }); 

});


// Juurihauilla perussivu
app.get('/', function(req, res) {
    console.log("GET: index.html");
    res.sendFile('public/index.html', { root: path.join(__dirname) });
});

app.get('/', function (req, res) {
    
});

app.set('port', process.env.PORT || cfg.port);

// Käynnistetään palvelin
var server = app.listen(app.get('port'), function () {
    console.log('Palvelin käynnissä. Kuunnellaan porttia ' + server.address().port + '.');
});