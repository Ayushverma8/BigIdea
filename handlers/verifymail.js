var Passwd = require('../models/passwd.js');
var VerifyMail = require('../models/verify-mail.js');

exports.get = function(req, res){
	req.params.id;
	VerifyMail.findOne({'verificationId': req.params.id})
		.exec(function(err, user){
			if (err){
				console.log('Database Error');
			} else{
				if (user){
					console.log('Id exists');
					if ((Date.now() - user.timestamp) < 86400000){
						//86400000 milliseconds exist in 1 day
						Passwd.findOneAndUpdate({'email': user.email},
							{ $set: { verified: 'true' }},
							function(err, newPasswd){
								if(err){
									console.log("Database Error: Could not set 'verified' to true");
								} else{
									console.log("Database successfully updated");
									VerifyMail.findOneAndRemove({'verificationId': req.params.id},
										function(err, user){
											if (err){
												console.log("Database Error: Could not remove the entry after verification");
											}
										}
									);
									res.send("Verification successfull!");
								}
							}
						);
					} else{
						console.log("Verification link expired.");
					}
				} else{
					console.log('Non-existant Id');
					res.status(404);
					res.render('404');
				}
			}
		}
	);
};
