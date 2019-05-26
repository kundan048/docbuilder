var express = require('express');
var router = express.Router();
var moment = require('moment');
var officeClippy = require('office-clippy');
var docx = officeClippy.docx;
var exporter = officeClippy.exporter;

// Load Model
var User = require('../../models/user');
var Letter_2 = require('../../models/letter_2');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get('/download_2/:id', isLoggedIn, function (req, res) {

    var myid = req.params.id;
    // console.log(myid);
    Letter_2.findById(myid, function (err, foundLetter) {
        if (err) {
            console.log(err);
            res.redirect("/letter_2");
        } else {
            var downUser = foundLetter;
            var dateFormat = moment(downUser.date).format("Do MMM YYYY");
            var doc = docx.create();
            var name = docx.createText(downUser.name + ", " + downUser.designation);
            // var designation = docx.createText(downUser.designation).break();
            var address = docx.createText(downUser.address + ",").break().break();
            var date = docx.createText(dateFormat + ",").break().break();
            var supervisor = docx.createText(downUser.supervisor_first_name + " " + downUser.supervisor_last_name + ", " + downUser.supervisor_designation).break().break();
            var company_name = docx.createText(downUser.company_name + ",").break().break();
            var company_address = docx.createText(downUser.company_address).break().break();
            var salutation = docx.createText("Mr. or Ms. " + downUser.supervisor_last_name).break().break();
            var content1 = docx.createText("I am writing to request your approval for vacation leave from " + downUser.start_date + " through " + downUser.end_date + ". I know how important it is to ensure that my work is handled during the time I am away. I will be happy to provide training assistance and support in advance of my vacation to the team members who will be helping in my absence, and will ensure that all projects are organized in a manner that will make it easy for progress to continue as needed during the time I am away.").break().break();
            var content2 = docx.createText("Thank you for your consideration and support with this request. Please let me know of your decision at your earliest convenience so I can make travel arrangements.").break().break();
            var regard = docx.createText("Regards,").break().break();
            var signature = docx.createText(downUser.name);

            // var to = docx.createText("To,").break().break();
            // var thePrincipal = docx.createText("The Principal,").break().break();
            // var schoolName = docx.createText(downUser.school + ",").break().break();
            // var Address = docx.createText(downUser.address + ",").break().break();
            
            // var greeting = docx.createText("Sir/Ma'am',").break().break();
            // var paragraph = docx.createText("With due respect I beg to state that I am not in a position to attend the school as I am down with " + downUser.reason + ". Since it is a communicable disease, I have been advised quarantine and a few days complete rest. Therefore kindly grant me leave for " + downUser.no_of_days + " days.").break().break();
            // var thanku = docx.createText("Thanking you,").break().break();
            // var yoursobe = docx.createText("Yours obediently,").break().break();
            // var name = docx.createText(downUser.name).break().break();
            // var para2 = docx.createParagraph().addText(to).left().addText(thePrincipal).left().addText(schoolName).left().addText(Address).left().addText(date).left().addText(greeting).left().addText(paragraph).left().addText(thanku).left().addText(yoursobe).left().addText(name).left();
            var para1 = docx.createParagraph().addText(name).left().addText(address).left().addText(date).left().addText(supervisor).left().addText(company_name).left().addText(company_address).left().addText(salutation).left().addText(content1).left().addText(content2).left().addText(regard).left().addText(signature).left();
            doc.addParagraph(para1);
            var docname = downUser.name + "_letter";
            exporter.express(res, doc, docname);
        }
    });


});

module.exports = router;
