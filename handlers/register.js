var credentials = require('../credentials.js');
var crypto = require('crypto');
var Passwd = require('../models/passwd.js');
var nodemailer = require('nodemailer');
var uuid = require('uuid');
var VerifyMail = require('../models/verify-mail.js');

exports.get = function(req, res){
	res.render('register');
};

exports.post = function(req, res){
	var uid = uuid.v4();
	var verifyid = uuid.v4();
	console.log(req.body);
	if (req.body.email === '') {
		res.render('failure', {
				error: "Email field has been left blank"
			}
		);
	} else {
		Passwd.findOne({ email: req.body.email })
			.exec(function(err, user){
				if (err){
					console.log("Database error.");
			          res.redirect(303, '/');
				} else{
					if (!user){
						if ((req.body.username === '') || (req.body.pass === '')) {
							res.render('failure', {
									error: "Fields are left blank"
								}
							);
						} else {
							if (req.body.pass === req.body.repass){
								new Passwd({
									email: req.body.email,
									username: req.body.username,
									password: crypto.createHmac('sha256', uid)
										.update(req.body.pass)
										.digest('hex'),
									salt: uid,
									verified: false
								}).save();

								new VerifyMail({
									email: req.body.email,
									verificationId: verifyid,
									timestamp: Date.now(),
								}).save();
								sendVerificationMail(verifyid, req.body.email);
								res.status('303');
								res.render('success');
							} else {
								console.log("password does not match");
								res.render('failure', {
										error: "Password fields do not match"
									}
								);
							}
						}
					} else {
						res.render('failure', {
								error: "Email is already registered"
							}
						);
					}
				}
		 	}
		);
	}
};

sendVerificationMail = function(uid, email){
		var mailTransport = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: credentials.gmail.user,
				pass: credentials.gmail.password,
			}
		});
		mailTransport.sendMail({
			from: '"TalentStage" <' + credentials.gmail.user + '>',
			to: email,
			subject: 'Verification Mail',
			text: 'This is a test mail for verification.\nClick on the following link to verify email address: ' + credentials.domain + '/verifymail/' + uid,
		}, function(err){
			if(err) console.error( 'Unable to send email: ' + err );
		});
};
