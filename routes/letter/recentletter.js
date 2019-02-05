var express = require('express');
var router = express.Router();
var moment	= require('moment');

// Load Model
var User = require('../../models/user');
var Letter_t1_t1 = require('../../models/letter_type1_template1');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get("/recentletter", isLoggedIn, function(req,res){
	User.findById(req.user._id).populate("letter_t1_t1").exec(function(err, foundUser){
		if(err) {
			console.log(err);
			// req.flash("error", "Something went wrong! Please try again!");
			res.redirect("/letter");
		} else {
			//console.log(foundUser);
			if(foundUser.letter_t1_t1.length == 0){
				
				res.redirect("/letter");
			}else {
				res.render("recentletter", {user : foundUser, moment : moment, myid: 0});
			}
		}
	}); 
});

module.exports = router;