var express = require('express');
var router = express.Router();
var moment = require('moment');

// Load Model
var User = require('../../models/user');
var Letter_3 = require('../../models/letter_3');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get("/recentletter_3", isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate("letter_3").exec(function (err, foundUser) {
        if (err) {
            console.log(err);
            // req.flash("error", "Something went wrong! Please try again!");
            res.redirect("/letter_3");
        } else {
            //console.log(foundUser);
            if (foundUser.letter_2.length == 0) {

                res.redirect("/letter_3");
            } else {
                res.render("recentletter_3", {user: foundUser, moment: moment, myid: 0});
            }
        }
    });
});

router.get("/recentletter_3/:id", isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate("letter_3").exec(function (err, foundUser) {
        if (err) {
            res.redirect("/letter_3");
        } else {
            var item = foundUser.letter_3.find(item => item.id === req.params.id);
            //console.log(item);
            //console.log(foundUser);
            res.render("recentletter_3", {user: foundUser, moment: moment, myid: item});
        }
    });
});

module.exports = router;
