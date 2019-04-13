var express = require('express');
var router = express.Router();


// Load Helpers
var {isLoggedIn} = require('../../../helpers/auth');

router.get("/college", isLoggedIn, function(req, res){

    res.render("applications/CollegeSpecific/college_specific");
});

router.post("/college", isLoggedIn, function(req, res) {
   console.log(req.body);

   res.redirect("/application")
});

module.exports = router;
