var mongoose = require('mongoose');

var application_t1_t1Schema = mongoose.Schema({
	name		: String,
	school 		: String,
	address 	: String,
	date 		: String,
	reason 		: String
});

module.exports = mongoose.model("Application_t1_t1", application_t1_t1Schema);