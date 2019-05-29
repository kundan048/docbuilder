var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Application_4 = require('../../models/application/application_4');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get("/application_4", isLoggedIn, async function (req, res) {
    let application_4 = await new Promise(resolve => {
        User.findById(req.user._id).populate('application_4').exec(function (err, application_4s) {
            if (err) {
                resolve();
            } else {
                resolve(application_4s);
            }
        })
    });

    res.render("applications/application_4", {data: application_4});
});

router.post("/application_4", isLoggedIn, function (req, res) {
    var application_4 = req.body.application;
    //console.log(application_4);
    User.findById(req.user._id, function (err, user) {
        if (err) {
            console.log("Something went wrong");
            //console.log(err);
            res.redirect("/application_4");

        } else {
            //console.log("ready to go");
            Application_4.create(application_4, function (err, doc) {
                if (err) {
                    //console.log("goes wrong");
                    //console.log(err);
                    res.redirect("/application_4");
                } else {
                    doc.save();
                    user.application_4.push(doc);
                    user.save();
                    res.redirect("/application/recentdoc_4");
                }
            });
        }
    });
});

router.get("/applicationTypes", isLoggedIn, function (req, res) {
    res.render("application_types");
});

module.exports = router;
