var mongoose = require('mongoose');

var letter_2Schema = mongoose.Schema({
	name					: String,
	designation 			: String,
	address 				: String,
	date 					: String,
	college_name            : String,
	course_name				: String,
	student_name			: String,
	applied_college_name    : String,
	duration				: String,
	email					: String,
	committed 				: {
	    type: Date,
	    default: Date.now
	}
});

module.exports = mongoose.model("Letter_2", letter_2Schema);
