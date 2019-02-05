var express = require('express');
var router = express.Router();

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get("/resumeFormats", isLoggedIn, function(req, res){
	res.render("resume_formats");
});

module.exports = router;