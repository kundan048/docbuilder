var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userDocument = new mongoose.Schema({
	id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "apptype"
    }

	name 	 : String,
	schoolname : String,
	address: String,
	date: {
	    type: Date,
	    default: Date.now
	},
	reason : String
});

userDocument.plugin(passportLocalMongoose);

module.exports = mongoose.model("doc", UserDocument);