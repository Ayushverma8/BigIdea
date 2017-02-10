var Userinfo = require('../models/userinfo.js');

exports.get = function(req, res){
	if (req.session.loggedIn) {
		console.log("HERE");
		Userinfo.findOne({'email': req.session.emailID})
		.exec(function(err, user){
			if (err){
				console.log("Database Error");
				res.redirect(303, '/');
			} else{
				if(user) {
					res.render('dashboard', {
						NAME: user.name,
						DEPT: '#TODO',
						IDEAS: user.idea,
						name: user.name,
						ID: '#TODO',
						IDEADESC: user.ideaDesc,
						Name: user.name,
						Year: '#TODO',
					});
				} else {
					res.redirect(303, '/details');
				}
			}
		});
	} else {
	    res.status(404);
	    res.render('404');
	}
};
