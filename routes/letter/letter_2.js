var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var letter_2 = require('../../models/letter_2');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get("/letter_2", isLoggedIn, function (req, res) {
    res.render("letters/letter_2");
});

router.post("/letter_2", isLoggedIn, function (req, res) {
    var reference_details = req.body.reference;
    //console.log(reference_details);
    User.findById(req.user._id, function (err, user) {
        if (err) {
            //console.log("Something went wrong");
            //console.log(err);
            res.redirect("/letter_2");
        } else {
            letter_2.create(reference_details, function (err, doc) {
                if (err) {
                    //console.log("Something went wrong 2");
                    //console.log(err);
                    res.redirect("/letter_2");
                } else {
                    doc.save();

                    user.letter_2.push(doc);
                    user.save();
                    //console.log(user);
                    res.redirect("/letter/recentletter_2");
                }
            });
        }
    });
});

router.get("/letterTypes", isLoggedIn, function (req, res) {
    res.render("letter_types");
});

module.exports = router;
