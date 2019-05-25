var express = require('express');
var router = express.Router();
var moment = require('moment');

// Load Model
var User = require('../../models/user');
var Application_2 = require('../../models/application/application_2');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get("/recentdoc_2", isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate("application_2").exec(function (err, foundUser) {
        if (err) {
            //console.log(err);
            res.redirect("/application_2");
        } else {
            //console.log(foundUser);
            if (foundUser.application_2.length == 0) {
                res.redirect("/application_2");
            } else {
                res.render("applications/recentdoc_2", {user: foundUser, moment: moment, myid: 0});
            }
        }
    });
});

router.get("/recentdoc_2/:id", isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate("application_2").exec(function (err, foundUser) {
        if (err) {
            res.redirect("/application_2");
        } else {
            var item = foundUser.application_2.find(item => item.id === req.params.id);
            //console.log(item);
            //console.log(foundUser);
            res.render("applications/recentdoc_2", {user: foundUser, moment: moment, myid: item});
        }
    });
});

module.exports = router;
