var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Application_3 = require('../../models/application/application_3');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get("/application_3", isLoggedIn, async function (req, res) {
    let application_3 = await new Promise(resolve => {
        User.findById(req.user._id).populate('application_3').exec(function (err, application_3s) {
            if (err) {
                resolve();
            } else {
                resolve(application_3s);
            }
        })
    });

    res.render("applications/application_3", {data: application_3});
});

router.post("/application_3", isLoggedIn, function (req, res) {
    var application_3 = req.body.application;
    //console.log(application_3);
    User.findById(req.user._id, function (err, user) {
        if (err) {
            console.log("Something went wrong");
            //console.log(err);
            res.redirect("/application_3");

        } else {
            //console.log("ready to go");
            Application_3.create(application_3, function (err, doc) {
                if (err) {
                    //console.log("goes wrong");
                    //console.log(err);
                    res.redirect("/application_3");
                } else {
                    doc.save();
                    user.application_3.push(doc);
                    user.save();
                    res.redirect("/application/recentdoc_3");
                }
            });
        }
    });
});

router.get("/applicationTypes", isLoggedIn, function (req, res) {
    res.render("application_types");
});

module.exports = router;
