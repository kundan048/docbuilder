var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Application_2 = require('../../models/application/application_2');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get("/application_2", isLoggedIn, async function (req, res) {
    let application_2 = await new Promise(resolve => {
        User.findById(req.user._id).populate('application_2').exec(function (err, application_2s) {
            if (err) {
                resolve();
            } else {
                resolve(application_2s);
            }
        })
    });

    res.render("applications/application_2", {data: application_2});
});

router.post("/application_2", isLoggedIn, function (req, res) {
    var application_2 = req.body.application;
    //console.log(application_2);
    User.findById(req.user._id, function (err, user) {
        if (err) {
            console.log("Something went wrong");
            //console.log(err);
            res.redirect("/application_2");

        } else {
            //console.log("ready to go");
            Application_2.create(application_2, function (err, doc) {
                if (err) {
                    //console.log("goes wrong");
                    //console.log(err);
                    res.redirect("/application_2");
                } else {
                    doc.save();
                    user.application_2.push(doc);
                    user.save();
                    res.redirect("/application/recentdoc_2");
                }
            });
        }
    });
});

router.get("/applicationTypes", isLoggedIn, function (req, res) {
    res.render("application_types");
});

module.exports = router;
