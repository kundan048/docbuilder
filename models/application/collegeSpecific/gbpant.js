var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var GbpantSchema = new mongoose.Schema({
    name: String,
    designation: String,
    department: String,
    nature_of_leave: String,
    from: String,
    to: String,
    grounds: String,
    reason: String,
    address_during_leave: String,
    no_of_days: String,
    biometric_name: String,
    biometric_id: String,
    biometric_department: String,
    biometric_nature_of_leave: String,
    biometric_from: String,
    biometric_to: String,
    biometric_no_of_days: String,
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

GbpantSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Gbpant", GbpantSchema);
