var express = require('express');
var router = express.Router();
var moment = require('moment');
var officeClippy = require('office-clippy');
var docx = officeClippy.docx;
var exporter = officeClippy.exporter;

// Load Model
var User = require('../../models/user');
var Application_4 = require('../../models/application/application_4');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get('/download_4/:id', isLoggedIn, function (req, res) {

    var myid = req.params.id;
    // console.log(myid);
    Application_4.findById(myid, function (err, foundApplication) {
        if (err) {
            console.log(err);
            res.redirect("/application_4");
        } else {
            var downUser = foundApplication;
            var dateformat = moment(downUser.date).format("Do MMM YYYY");

            var doc = docx.create();
            var to = docx.createText("To");
            var supervisor_name = docx.createText(downUser.supervisor_name).break();
            var supervisor_designation = docx.createText(downUser.supervisor_designation).break();
            var company_name = docx.createText(downUser.company_name).break();
            var date = docx.createText(downUser.date).break().break();
            var subject = docx.createText("Subject: Transfer Application.").break().break();
            var salutation = docx.createText("Sir/Ma'am',").break().break();
            var content1 = docx.createText("I," + downUser.name + " , am working for your company, " + downUser.company_name + ", as a " + downUser.designation + ". With this letter, I wish to convey my request to you for a transfer at our " + downUser.branch +  "branch. This is because " + downUser.reason + ".").break();
            var content2 = docx.createText("I have made quite a few good memories and befriended all of my colleges the current office branch. I will miss them dearly. I can’t help the circumstance. I have no other option but to work at the " + downUser.branch + ". I solemnly swear to show the same performance as I have demonstrated here. I wish you will consider my request for this transfer and do the needful. In anticipation of a favorable reply.").break().break();
            
            var regards = docx.createText("Sincerely,").break().break();
            var name = docx.createText(downUser.name).break();

            var para1 = docx.createParagraph().addText(to).left().addText(supervisor_name).left().addText(supervisor_designation).left().addText(company_name).left().addText(date).left().addText(subject).left().addText(salutation).left().addText(content1).left().addText(content2).left().addText(regards).left().addText(name).left();
            doc.addParagraph(para1);
            var docname = downUser.name + "_application";
            exporter.express(res, doc, docname);
        }
    });

    // User.findById(req.user._id).populate("application_t1_t1").exec(function(err, foundUser){
    //  if(err){
    //      console.log(err);
    //      res.redirect("/application");
    //  } else {
    //      var downUser = foundUser.application_t1_t1[foundUser.application_t1_t1.length -1];
    //      var doc = docx.create();
    //      var to = docx.createText("To,").break().break();
    //      var thePrincipal = docx.createText("The Principal,").break().break();
    //      var schoolName = docx.createText(downUser.school + ",").break().break();
    //      var Address = docx.createText(downUser.address + ",").break().break();
    //      var date = docx.createText(downUser.date + ",").break().break();
    //      var greeting = docx.createText("Sir/Ma'am',").break().break();
    //      var paragraph = docx.createText("With due respect I beg to state that I am not in a position to attend the school as I am down with "+ downUser.reason +". Since it is a communicable disease, I have been advised quarantine and a few days complete rest. Therefore kindly grant me leave for ten days").break().break();
    //      var thanku = docx.createText("Thanking you,").break().break();
    //      var yoursobe = docx.createText("Yours obediently,").break().break();
    //      var name = docx.createText(downUser.name).break().break();
    //      var para2 = docx.createParagraph().addText(to).left().addText(thePrincipal).left().addText(schoolName).left().addText(Address).left().addText(date).left().addText(greeting).left().addText(paragraph).left().addText(thanku).left().addText(yoursobe).left().addText(name).left();
    //      doc.addParagraph(para2);
    //      var docname = downUser.name + "_application";
    //      exporter.express(res, doc, docname);
    //  }
    // });


});

module.exports = router;
