var express = require('express');
var router = express.Router();

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get("/otherFormats", isLoggedIn, function(req, res){
	res.render("other_formats");
});

module.exports = router;