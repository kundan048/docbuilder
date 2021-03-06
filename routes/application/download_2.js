var express = require('express');
var router = express.Router();
var moment = require('moment');
var officeClippy = require('office-clippy');
var docx = officeClippy.docx;
var exporter = officeClippy.exporter;

// Load Model
var User = require('../../models/user');
var Application_2 = require('../../models/application/application_2');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get('/download_2/:id', isLoggedIn, function (req, res) {

    var myid = req.params.id;
    // console.log(myid);
    Application_2.findById(myid, function (err, foundApplication) {
        if (err) {
            console.log(err);
            res.redirect("/application_2");
        } else {
            var downUser = foundApplication;
            var dateformat = moment(downUser.date).format("Do MMM YYYY");

            var doc = docx.create();
            var to = docx.createText("To");
            var manager_name = docx.createText(downUser.manager_name + ",").break().break();
            var manager = docx.createText("Regional Manager,").break();
            var company_name = docx.createText(downUser.company_name).break();
            var subject = docx.createText("Subject : " + downUser.subject + ".").break().break();
            var date = docx.createText(downUser.date).break().break();
            var content1 = docx.createText("My purpose of writing this email is to apply for maternity leave as mentioned in our organization’s policy for female employees. I want to avail the leaves for a period of " + downUser.no_of_weeks + " weeks, with effect from " + downUser.start_date + " to " + downUser.end_date + ". I hope that this request will be sanctioned.").break().break();
            var content2 = docx.createText("As I will be away for a considerably long period, I have entrusted " + downUser.colleague_name + " with my responsibilities and duties. In the case of an unmanageable emergency, please contact me at " + downUser.email +  ".").break().break();
            var regards = docx.createText("sincerely,").break().break();
            var name = docx.createText(downUser.name).break();

            var para1 = docx.createParagraph().addText(to).left().addText(manager_name).left().addText(manager).left().addText(company_name).left().addText(date).left().addText(subject).left().addText(content1).left().addText(content2).left().addText(regards).left().addText(name).left();
            doc.addParagraph(para1);
            var docname = downUser.name + "_application";
            exporter.express(res, doc, docname);
        }
    });

    // User.findById(req.user._id).populate("application_t1_t1").exec(function(err, foundUser){
    // 	if(err){
    // 		console.log(err);
    // 		res.redirect("/application");
    // 	} else {
    // 		var downUser = foundUser.application_t1_t1[foundUser.application_t1_t1.length -1];
    // 		var doc = docx.create();
    // 		var to = docx.createText("To,").break().break();
    // 		var thePrincipal = docx.createText("The Principal,").break().break();
    // 		var schoolName = docx.createText(downUser.school + ",").break().break();
    // 		var Address = docx.createText(downUser.address + ",").break().break();
    // 		var date = docx.createText(downUser.date + ",").break().break();
    // 		var greeting = docx.createText("Sir/Ma'am',").break().break();
    // 		var paragraph = docx.createText("With due respect I beg to state that I am not in a position to attend the school as I am down with "+ downUser.reason +". Since it is a communicable disease, I have been advised quarantine and a few days complete rest. Therefore kindly grant me leave for ten days").break().break();
    // 		var thanku = docx.createText("Thanking you,").break().break();
    // 		var yoursobe = docx.createText("Yours obediently,").break().break();
    // 		var name = docx.createText(downUser.name).break().break();
    // 		var para2 = docx.createParagraph().addText(to).left().addText(thePrincipal).left().addText(schoolName).left().addText(Address).left().addText(date).left().addText(greeting).left().addText(paragraph).left().addText(thanku).left().addText(yoursobe).left().addText(name).left();
    // 		doc.addParagraph(para2);
    // 		var docname = downUser.name + "_application";
    // 		exporter.express(res, doc, docname);
    // 	}
    // });


});

module.exports = router;
