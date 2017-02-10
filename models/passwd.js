var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var schema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		unique: true
	},
	salt: {
		type: String,
		required: true
	},
	verified: {
		type: Boolean,
		required: true
	}
});

var passwd = mongoose.model('passwd', schema);
module.exports = passwd;
