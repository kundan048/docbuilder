var express = require('express');
var router = express.Router();

// Load Models
var User = require('../../models/user');
var Resume = require('../../models/resume');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

// Load Transformer
var {filterData} = require('../../transformer/resume/resume_transformer');

router.get("/resumeFormats", isLoggedIn, function(req, res){
	res.render("resume_formats");
});

router.get("/resume", isLoggedIn, function(req, res) {
	Resume.findOne().sort({_id: -1}).exec(function(err, resume) {
		if(err){
			//console.log(err);
			res.redirect("/otherFormats/resumeFormats");
		} else {
			if(resume != null) {
				res.render("resume", {resume: resume});
			} else {
				res.redirect("/otherFormats/resumeFormats");
			}
		}
	}); 
	
})

router.post("/resumeFormats", isLoggedIn, function(req, res){
	var finalData = filterData(req.body);
	User.findById(req.user._id, function(err, user){
		if(err) {
			res.redirect("/resumeFormats");
		} else {
			Resume.create(finalData, function(err, data) {
				if(err) {
					console.log(err);
					res.redirect("/otherFormats/resumeFormats");
				} else {
					data.save();
					res.redirect("/otherFormats/resume");
				}
			})
		}
	});
});
module.exports = router;