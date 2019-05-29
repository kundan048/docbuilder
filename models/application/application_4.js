var mongoose = require('mongoose');

var application_4Schema = mongoose.Schema({
	name					: String,
	designaiton     		: String,
	supervisor_name			: String,
	company_name			: String,
	date 					: String,
	supervisor_designation	: String,
	reason					: String,
	branch					: String,
	committed 		: {
	    type: Date,
	    default: Date.now
	}
});

module.exports = mongoose.model("Application_4", application_4Schema);