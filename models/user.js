var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	name 				 : String,
	username 			 : {type : String, unique : true, required : true},
	resetPasswordToken	 : String,
    resetPasswordExpires : Date,
	password 			 : String,
	application_t1_t1	 : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : "Application_t1_t1"
		}
	],
	application_2 		: [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : "Application_2"
		}
	],
	letter_t1_t1		 : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : "Letter_type1_template1"
		}
	],
	resume 				 : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : "Resume"
		}
	],
	letter_2 			: [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : "Letter_2"
		}
	],
	letter_3 			: [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : "Letter_3"
		}
	]
}); 
 
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
