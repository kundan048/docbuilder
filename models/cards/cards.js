var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var VisitingCardSchema = new mongoose.Schema({
	name 				: String,
	organization 		: String,
	designation 		: String,
	contact_number		: String,
	address				: String
});

module.exports = mongoose.model("Visiting_card", VisitingCardSchema);