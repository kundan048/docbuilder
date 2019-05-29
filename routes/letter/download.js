var express = require('express');
var router = express.Router();
var moment = require('moment');
var officeClippy = require('office-clippy');
var docx = officeClippy.docx;
var exporter = officeClippy.exporter;

// Load Model
var User = require('../../models/user');
var Letter_type1_template1 = require('../../models/letter_type1_template1');
var Letter_2 = require('../../models/letter_2');
var Letter_3 = require('../../models/letter_3');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get('/download/:id', isLoggedIn, function (req, res) {

    var myid = req.params.id;
    // console.log(myid);
    Letter_type1_template1.findById(myid, function (err, foundLetter) {
        if (err) {
            console.log(err);
            res.redirect("/letter");
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

            var para1 = docx.createParagraph().addText(name).left().addText(address).left().addText(date).left().addText(supervisor).left().addText(company_name).left().addText(company_address).left().addText(salutation).left().addText(content1).left().addText(content2).left().addText(regard).left().addText(signature).left();
            doc.addParagraph(para1);
            var docname = downUser.name + "_letter";
            exporter.express(res, doc, docname);
        }
    });


});

router.get('/download_2/:id', isLoggedIn, function (req, res) {

    var myid = req.params.id;
    // console.log(myid);
    Letter_2.findById(myid, function (err, foundLetter) {
        if (err) {
            console.log(err);
            res.redirect("/letter");
        } else {
            var downUser = foundLetter;
            var dateFormat = moment(downUser.date).format("Do MMM YYYY");
            var doc = docx.create();

            var college_name = docx.createText(downUser.college_name).break().break();
            var name = docx.createText(downUser.name).break().break();
            var designation = docx.createText(downUser.designation).break().break();
            var date = docx.createText(downUser.date).break().break();
            var concern = docx.createText("To Whom It May Concern:").break().break();
            var para = docx.createText(`I am writing this reference at the request of ${downUser.student_name}, who is applying for admission at ${downUser.applied_college_name}. I have known him for ${downUser.duration} in my capacity as a professor at ${downUser.college_name}. ${downUser.student_name} took course from me and earned superior grades in those classes. Based on his grades, attendance, and class participation, I’d rate his academic performance in my class as exceptional.`).break().break();
            var para1 = docx.createText(`${downUser.student_name} has a number of strengths. He is always interested in helping others. He is also a very fast learner.`).break().break();
            var para2 = docx.createText(`In conclusion, I would highly recommend ${downUser.student_name}. If his performance in my class is any indication of how he’d perform in future, he will be an extremely positive addition to your institute. If you need any additional information, feel free to contact me. You can email me at ${downUser.email}.`).break().break();
            var sincerely = docx.createText('Sincerely').break().break();

            var paragraph = docx.createParagraph().addText(college_name).left().addText(name).left().addText(designation).left().addText(date).left().addText(concern).left().addText(para).left().addText(para1).left().addText(para2).left().addText(sincerely).left().addText(name).left().addText(designation).left();

            doc.addParagraph(paragraph);
            var docname = downUser.name + "_letter";
            exporter.express(res, doc, docname);
        }
    });


});

router.get('/download_3/:id', isLoggedIn, function (req, res) {

    var myid = req.params.id;
    // console.log(myid);
    Letter_3.findById(myid, function (err, foundLetter) {
        if (err) {
            console.log(err);
            res.redirect("/letter");
        } else {
            var downUser = foundLetter;
            var dateFormat = moment(downUser.date).format("Do MMM YYYY");
            var doc = docx.create();

            var name = docx.createText(downUser.name).break().break();
            var designation = docx.createText(downUser.designation).break().break();
            var date = docx.createText(downUser.date).break().break();
            var dear = docx.createText(`Dear ${downUser.candidate_name}`).break().break();
            var para = docx.createText(`${downUser.company_name} is excited to bring you on board as ${downUser.job_title}.`).break().break();

            var para1 = docx.createText(`We’re just a few formalities away from getting down to work. Please take the time to review our offer. It includes important details about your compensation, benefits and the terms and conditions of your anticipated employment with .`).break().break();
            var para2 = docx.createText(`${downUser.company_name} is offering a full time position for you as ${downUser.job_title}, reporting to immediate ${downUser.supervisor} starting on ${downUser.joining_date} at ${downUser.job_location}.`).break().break();
            var para3 = docx.createText(`In this position, is offering to start you at a pay rate of Rs. ${downUser.package} per annum. You will be paid on a monthly basis, starting ${downUser.first_pay_date}.`).break().break();
            var para4 = docx.createText(`As an employee of you will be eligible for health insurance, stock plans and dental insurance.`).break().break();
            var para5 = docx.createText(`Please indicate your agreement with these terms and accept this offer by signing and dating this agreement on or before ${downUser.end_date}.`).break().break();
            var regard = docx.createText("Regards,").break().break();

            var paragraph = docx.createParagraph().addText(name).left().addText(designation).left().addText(date).left().addText(dear).left().left().addText(para).left().addText(para1).left().addText(para2).left().addText(para3).addText(para4).left().addText(para5).left().left().addText(regard).left().addText(name).left().addText(designation).left();

            doc.addParagraph(paragraph);
            var docname = downUser.name + "_letter";
            exporter.express(res, doc, docname);
        }
    });


});

module.exports = router;
