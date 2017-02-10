var Userinfo = require('../models/userinfo.js');

exports.get = function(req, res) {
	if (req.session.loggedIn == true) {
			Userinfo.findOne({'email': req.session.emailID})
				.exec(function(err, user){
					if (err){
						console.log("Database Error");
						res.redirect(303, '/');
					} else{
						if(!user) {
							res.render('details');	
						}
						else {
							res.status(404);
							res.render('404');
						}
					}
				});
	} else {
			res.status(404);
			res.render('404');
	}
};
exports.post = function(req, res) {
	if (req.session.loggedIn == true) {
		Userinfo.findOne({'email': req.session.emailID})
		.exec(function(err, user){
			if (err){
				console.log("Database Error");
				res.redirect(303, '/');
			} else{
				if(!user) {
					new Userinfo({
						email: req.session.emailID,
						name: req.body.fName + ' ' + req.body.sName,
						idea: req.body.iName,
						ideaDesc: req.body.desc,
					}).save();
				}
				res.redirect(303, '/dashboard');
			}
		});
		console.log(req.body);
			
	} else {
			res.status(404);
			res.render('404');
	}
};
