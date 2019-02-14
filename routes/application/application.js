var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Application_t1_t1 = require('../../models/application_t1_t1');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get("/application", isLoggedIn, function(req, res){
	res.render("application");
});

router.post("/application", isLoggedIn, function(req, res){
	var application = req.body.application;
	//console.log(application);
	User.findById(req.user._id, function(err, user){
		if(err) {
			console.log("Something went wrong");
			//console.log(err);
			res.redirect("/application");

		}else {
			//console.log("ready to go");
			Application_t1_t1.create(application, function(err, doc){
				if(err){
					//console.log("goes wrong");
					//console.log(err);
					res.redirect("/application");
				}else{
					doc.save();
					user.application_t1_t1.push(doc);
					user.save();
					res.redirect("/application/recentdoc");
				}
			});
		}
	}); 
});

router.get("/applicationTypes", isLoggedIn, function(req, res){
	res.render("application_types");
});

module.exports = router;