var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../../models/user');
var Gbpant = require('../../../models/application/collegeSpecific/gbpant');

// Load Helpers
var {isLoggedIn} = require('../../../helpers/auth');

router.get("/college", isLoggedIn, function (req, res) {

    res.render("applications/CollegeSpecific/college_specific");
});

router.get("/collegerecent", isLoggedIn, function (req, res) {
    Gbpant.findOne({"createdby": req.user._id}).sort({_id: -1}).exec(function (err, data) {
        if (err) {
            console.log(err);
            res.redirect("/otherFormats");
        } else {
            if (data) {
                res.render("applications/CollegeSpecific/college_specific_view", {data: data});
            } else {
                res.redirect("/otherFormats");
            }
        }
    });
})

router.post("/college", isLoggedIn, function (req, res) {
    let application = req.body.application;
    application['createdby'] = req.user._id;
    // console.log(application);

    Gbpant.create(application, function (err, doc) {
        if (err) {
            //console.log("goes wrong");
            console.log(err);
            res.redirect("/application");
        } else {
            doc.save();
            res.redirect("/application/collegerecent");
        }
    });
});

module.exports = router;
