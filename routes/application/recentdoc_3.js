var express = require('express');
var router = express.Router();
var moment = require('moment');

// Load Model
var User = require('../../models/user');
var Application_3 = require('../../models/application/application_3');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get("/recentdoc_3", isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate("application_3").exec(function (err, foundUser) {
        if (err) {
            //console.log(err);
            res.redirect("/application_3");
        } else {
            //console.log(foundUser);
            if (foundUser.application_3.length == 0) {
                res.redirect("/application_3");
            } else {
                res.render("applications/recentdoc_3", {user: foundUser, moment: moment, myid: 0});
            }
        }
    });
});

router.get("/recentdoc_3/:id", isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate("application_3").exec(function (err, foundUser) {
        if (err) {
            res.redirect("/application_3");
        } else {
            var item = foundUser.application_3.find(item => item.id === req.params.id);
            //console.log(item);
            //console.log(foundUser);
            res.render("applications/recentdoc_3", {user: foundUser, moment: moment, myid: item});
        }
    });
});

module.exports = router;
