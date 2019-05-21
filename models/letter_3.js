var mongoose = require('mongoose');

var letter_3Schema = mongoose.Schema({
	name					: String,
	designation 			: String,
	company_name			: String,
	date 					: String,
	candidate_name			: String,
	job_title	            : String,
	supervisor			    : String,
	job_location			: String,
	joining_date 			: String,
	package					: String,
	first_pay_date			: String,
	end_date 				: String,

	committed 				: {
	    type: Date,
	    default: Date.now
	}
});

module.exports = mongoose.model("Letter_3", letter_3Schema);