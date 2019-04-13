var express = require('express'),
    passport = require('passport');

var router = express.Router();

// Load Helpers
var {isLoggedIn, isLoggedInForLoginPage, isLoggedInForRegisterPage, isLoggedInForLandingPage} = require('../helpers/auth');

router.get("/login", isLoggedInForLoginPage, function (req, res) {
    res.redirect("/homepage");
});

// app.get("/login", function(req, res){
// 	res.render("login",{title: "Login"});
// });

router.post("/login", passport.authenticate('local', {
    successRedirect: "/homepage",
    failureRedirect: "/login"
}), function (req, res) {
});

module.exports = router;
