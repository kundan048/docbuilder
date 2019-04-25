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
    var confirmPassword = req.body.confirmPassword;

    if(password === confirmPassword) {
        var newUser = new User({
        username: req.body.username,
        email: req.body.mail_id,
        name: req.body.name
        });

        User.register(newUser, password, function (err, user) {
            if (err) {
                req.flash("error", err.message);
                console.log("Something went wrong!");
                res.redirect("/register");
            }
            passport.authenticate('local')(req, res, function () {
                req.flash("success", "Welcome to Doc Builder! " + user.username);
                res.redirect("/homepage");
            });
        });
    }

    else {
        req.flash("error", "Passwords don't match!");
        res.redirect("/register");
    }
});

module.exports = router;
