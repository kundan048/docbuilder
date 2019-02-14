var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Letter_t1_t1 = require('../../models/letter_type1_template1');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get("/letter", isLoggedIn, function(req,res){
	res.render("letter");
});

router.post("/letter", isLoggedIn, function(req, res){
	var leave_details = req.body.leave;
	//console.log(leave_details);
	User.findById(req.user._id, function(err, user){
		if(err) {
			//console.log("Something went wrong");
			//console.log(err);
			res.redirect("/letter");
		} else {
			Letter_t1_t1.create(leave_details, function(err, doc){
				if(err){
					//console.log("Something went wrong 2");
					//console.log(err);
					res.redirect("/letter");
				} else {
					doc.save();

					user.letter_t1_t1.push(doc);
					user.save();
					//console.log(user);
					res.redirect("/letter/recentletter");
				}
			});
		}
	});
});

router.get("/letterTypes", isLoggedIn, function(req, res){
	res.render("letter_types");
});

module.exports = router;