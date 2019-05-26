var express = require('express');
var router = express.Router();

// Load Models
var User = require('../../models/user');
var Resume = require('../../models/resume');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

// Load Transformer
var {filterData} = require('../../transformer/resume/resume_transformer');

router.get("/resumeFormats", isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate("resume").exec(function (err, user) {
        if (err) {
            res.redirect("/otherFormats");
        } else {
            res.render("resume_formats", {user: user});
        }
    });
});

router.get("/resume", isLoggedIn, function (req, res) {
    console.log(req.query.rank);
    User.findById(req.user._id).populate("resume").exec(function (err, user) {
        console.log(user.resume);
        if (err) {
            //console.log(err);
            res.redirect("/otherFormats/resumeFormats");
        } else {
            if (user.resume.length > 0) {
                var item = user.resume[user.resume.length - 1];
                // console.log(item);
                var resumeName = "resume_first";
                var rank = 1;
                if (req.query.rank == 2) {
                    resumeName = "resume_second";
                } else if (req.query.rank == 3 ) {
                    resumeName = "resume_third";
                }
                res.render(resumeName, {resume: item});
            } else {
                res.redirect("/otherFormats/resumeFormats");
            }
        }
    });
});

router.post("/resumeFormats", isLoggedIn, function (req, res) {
    var finalData = filterData(req.body);
    User.findById(req.user._id, function (err, user) {
        if (err) {
            console.log("user not found");
            res.redirect("/resumeFormats");
        } else {
            Resume.create(finalData, function (err, data) {
                if (err) {
                    console.log(err);
                    res.redirect("/otherFormats/resumeFormats");
                } else {
                    data.save();
                    user.resume.push(data);
                    user.save();
                    res.redirect("/otherFormats/resume");
                }
            })
        }
    });
});

router.put("/resumeFormats/:id", isLoggedIn, function (req, res) {

    Resume.findByIdAndUpdate(req.params.id, req.body, function (err, updatedResume) {
        if (err) {
            console.log(err);
            res.redirect("/otherFormats");
        } else {
            res.redirect("/otherFormats/resumeFormats");
        }
    });
});

module.exports = router;
