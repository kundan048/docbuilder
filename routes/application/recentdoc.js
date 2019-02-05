var express = require('express');
var router = express.Router();
var moment	= require('moment');

// Load Model
var User = require('../../models/user');
var Application_t1_t1 = require('../../models/application_t1_t1');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get("/recentdoc", isLoggedIn, function(req, res){
	User.findById(req.user._id).populate("application_t1_t1").exec(function(err, foundUser){
		if(err){
			//console.log(err);
			res.redirect("/application");
		} else {
			//console.log(foundUser);
			if(foundUser.application_t1_t1.length == 0){
				res.redirect("/application");
			}else {
				res.render("recentdoc", {user : foundUser, moment : moment, myid: 0});
			}
		}
	}); 
});

router.get("/recentdoc/:id", isLoggedIn, function(req, res){
	User.findById(req.user._id).populate("application_t1_t1").exec(function(err, foundUser){
		if(err){
			res.redirect("/application");
		}else{
			var item = foundUser.application_t1_t1.find(item => item.id === req.params.id);
		//console.log(item);
			//console.log(foundUser);
			res.render("recentdoc", {user : foundUser, moment : moment, myid: item});
		}
	});
});

module.exports = router;