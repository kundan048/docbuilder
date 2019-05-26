var mongoose = require('mongoose');

var application_3Schema = mongoose.Schema({
	name			: String,
	company_name	: String,
	manager_name 	: String,
	subject 		: String,
	no_of_weeks 	: String,
	date 			: String,
	colleague_name  : String,
	start_date		: String,
	end_date		: String,
	email			: String,
	committed 		: {
	    type: Date,
	    default: Date.now
	}
});

module.exports = mongoose.model("Application_3", application_3Schema);