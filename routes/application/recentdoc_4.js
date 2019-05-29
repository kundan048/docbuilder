var express = require('express');
var router = express.Router();
var moment = require('moment');

// Load Model
var User = require('../../models/user');
var Application_4 = require('../../models/application/application_4');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get("/recentdoc_4", isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate("application_4").exec(function (err, foundUser) {
        if (err) {
            //console.log(err);
            res.redirect("/application_4");
        } else {
            //console.log(foundUser);
            if (foundUser.application_4.length == 0) {
                res.redirect("/application_4");
            } else {
                res.render("applications/recentdoc_4", {user: foundUser, moment: moment, myid: 0});
            }
        }
    });
});

router.get("/recentdoc_4/:id", isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate("application_4").exec(function (err, foundUser) {
        if (err) {
            res.redirect("/application_4");
        } else {
            var item = foundUser.application_4.find(item => item.id === req.params.id);
            //console.log(item);
            //console.log(foundUser);
            res.render("applications/recentdoc_4", {user: foundUser, moment: moment, myid: item});
        }
    });
});

module.exports = router;
