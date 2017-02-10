var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var schema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true,
	},
	idea: {
		type: String,
		required: true,
	},
	ideaDesc: {
		type: String,
		required: true,
	}
});

var userinfo = mongoose.model('userinfo', schema);
module.exports = userinfo;
