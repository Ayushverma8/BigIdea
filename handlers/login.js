var crypto = require('crypto');
var Passwd = require('../models/passwd.js');

exports.get = function(req, res){
	res.render('login');
};

exports.post = function(req, res){
	console.log('id: ' + req.body.username + '\npassword: ' + req.body.pass);
	var password;
	Passwd.findOne({'username': req.body.username})
		.exec(function(err, user){
			if (err){
				console.log("Database Error");
				res.redirect(303, '/login');
			} else{
				console.log(user);
				if(user){
					if (user.verified === true){
						password = crypto.createHmac('sha256', user.salt).update(req.body.pass).digest('hex');
						console.log("sPass:"+user.password);
						console.log("ePass:"+password);
						if (user.password === password){
							console.log("Successfully Logged In");
							/*res.send('successfull login');*/
							req.session.loggedIn = true;
							req.session.emailID = user.email;
							res.redirect(303, '/dashboard');
						} else{
							console.log("Username and Password do not match!");//Actually password is wrong!
							res.render('login-failed', {
									error: 'Username and Password do not match!'
								}
							);
						}
					} else{
						console.log("Verification Pending!");
						res.render('login-failed', {
								error: 'Email Verification Pending! Check your inbox to verify mail.'
							}
						);
					}
				} else{
					console.log("User not found");
					res.render('login-failed', {
							error: 'Username and Password do not match!'
						}
					);
				}
		}
	});
};
