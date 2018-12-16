var mongoose = require('mongoose');

var application_t1_t1Schema = mongoose.Schema({
	name		: String,
	school 		: String,
	address 	: String,
	date 		: String,
	reason 		: String,
	no_of_days  : String,
	committed 		: {
	    type: Date,
	    default: Date.now
	}
});

module.exports = mongoose.model("Application_t1_t1", application_t1_t1Schema);