var express = require('express');
var router = express.Router();

// Load Helpers
var {isLoggedIn} = require('../helpers/auth');

router.get("/homepage", isLoggedIn, function(req, res){
	res.render("homepage")
});

module.exports = router;