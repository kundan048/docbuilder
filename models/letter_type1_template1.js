var mongoose = require('mongoose');

var letter_type1_template1Schema = mongoose.Schema({
	name					: String,
	designation 			: String,
	address 				: String,
	date 					: String,
	supervisor_first_name 	: String,
	supervisor_last_name	: String,
	supervisor_designation	: String,
	company_name			: String,
	company_address			: String,
	start_date				: String,
	end_date				: String,
	committed 				: {
	    type: Date,
	    default: Date.now
	}
});

module.exports = mongoose.model("Letter_type1_template1", letter_type1_template1Schema);