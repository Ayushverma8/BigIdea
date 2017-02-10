var bodyParser = require('body-parser');
var credentials = require('./credentials.js');
var express = require('express');
var handlebars = require('express-handlebars');
var http = require('http');
var session = require('express-session');
var uuid = require('uuid');

var app = express();

app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.set('port', process.env.PORT || 80);

var mongoose = require('mongoose');
var opts = {
	server: {
		socketOptions: { keepAlive: 1 }
	}
};
mongoose.connect(credentials.mongo.development.connectionString, opts);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    genid: uuid.v4,
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}));

require('./routes.js')(app);

app.use(function(req, res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    res.status(500);
    res.render('500');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + ';');
});
