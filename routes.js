var dashboard = require('./handlers/dashboard.js');
var details = require('./handlers/details.js');
var login = require('./handlers/login.js');
var register = require('./handlers/register.js');
var verifymail = require('./handlers/verifymail.js');


module.exports = function(app){

    app.get('/', function(req, res){
        res.render('home');
    });
		app.get('/dashboard', dashboard.get);
		app.get('/details', details.get);
		app.post('/details', details.post);
    app.get('/login', login.get);
		app.post('/login', login.post);
    app.get('/register', register.get);
    app.post('/register', register.post);
    app.get('/verifymail/:id', verifymail.get);
};

