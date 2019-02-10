var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var degreeSchema = new mongoose.Schema({
    degree               : String,
    institution          : String,
    passingyear          : String,
    details              : String
});

var projectSchema = new mongoose.Schema({
    title                : String,
    organization         : String,
    details              : String
});

var experienceSchema = new mongoose.Schema({
    title                : String,
    organization         : String,
    details              : String
});

var skillSchema = new mongoose.Schema({
    skill                : String
});

var resumeSchema = new mongoose.Schema({
    fullname 			 : String,
    designation          : String,
    aboutyou             : String,
    careeroverview       : String,
    mobile               : String,
    email                : String,
    linkedin             : String,
    address              : String,
    degree               : [degreeSchema],
    project              : [projectSchema],
    experience           : [experienceSchema],
    skill                : []
});
 
resumeSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Resume", resumeSchema);
