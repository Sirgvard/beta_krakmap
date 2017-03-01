/* commentaire de commit */


var pmx = require('pmx');
pmx.init();
var express = require('express');
var app = express();
var request = require('request');

app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res){
	res.render('pages/index-directory',{
		tagline: 'HELLO WORLD'
	});
});

app.get('/spot/:id', function(req, res){
	console.log('Spot requested ' + req.params.id);
	var options = {
		uri: "https://api.parse.com/1/functions/getSpotForMap",
		method: "POST",
		form:{
			"id": req.params.id
		},
		headers:{
			"X-Parse-REST-API-Key":"q1wsETyv8qZPSoOBMO6TSkYlrsLl78bDcaA0dX7F",
			"X-Parse-Application-Id":"eAylqtIkKyTeSeCP830jkrGVs1LZEUiH4nTSGLJT",
		}
	};

	request(options,
		function(error, response, body){
			res.render('pages/item-detail', {
				data: JSON.parse(body).result
			});
		}
	);
});

// app.get('*', function(req, res){
// 	res.redirect('/');
// });

app.post('/', function(req, res){

});

var port = 80;
app.listen(port);
console.log(port + ' is the magic port');

app.use(pmx.expressErrorHandler());
