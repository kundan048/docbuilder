var express = require('express'),
    passport = require('passport');

var router = express.Router();
var User = require('../models/user');

// Load Helpers
var {isLoggedIn, isLoggedInForLoginPage, isLoggedInForRegisterPage, isLoggedInForLandingPage} = require('../helpers/auth');

router.get("/register", isLoggedInForRegisterPage, function (req, res) {
    res.redirect("/homepage");
});

router.post("/register", function (req, res) {
    var password = req.body.password;

    var newUser = new User({
        username: req.body.username,
        email: req.body.mail_id,
        name: req.body.name
    });

    User.register(newUser, password, function (err, user) {
        if (err) {
            console.log("Something went wrong!");
            console.log(err);
            return res.redirect("/register", {title: "Register"});
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect("/homepage");
        });
    });
});

module.exports = router;
