var express = require('express');
var router = express.Router();

// Load Helpers
var {isLoggedIn, isLoggedInForLoginPage, isLoggedInForRegisterPage, isLoggedInForLandingPage} = require('../helpers/auth');

router.get("/", isLoggedInForLandingPage, function(req, res){
	res.redirect("/homepage");
});

module.exports = router;