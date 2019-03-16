var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var StudentIdSchema = new mongoose.Schema({
    collegename         : String,
    collegeaddress      : String,
    collegenumber       : String,
    logoimage           : String,
    studentname         : String,
    rollnumber          : String,
    branch              : String,
    studentmobile       : String,
    yrofjoining         : String,
    validupto           : String,
    image               : String,
    address             : String,
    createdby           : {
        type            : mongoose.Schema.Types.ObjectId,
        ref             : 'User'
    }
});
 
StudentIdSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("StudentId", StudentIdSchema);
