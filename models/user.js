var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	name 				 : String,
	username 			 : String,
	password 			 : String,
	application_t1_t1	 : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : "Application_t1_t1"
		}
	]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);