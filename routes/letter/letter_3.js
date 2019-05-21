var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var letter_3 = require('../../models/letter_3');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');

router.get("/letter_3", isLoggedIn, function (req, res) {
    res.render("letters/letter_3");
});

router.post("/letter_3", isLoggedIn, function (req, res) {
    var offer_details = req.body.offer;
    //console.log(reference_details);
    User.findById(req.user._id, function (err, user) {
        if (err) {
            //console.log("Something went wrong");
            //console.log(err);
            res.redirect("/letter_3");
        } else {
            letter_3.create(offer_details, function (err, doc) {
                if (err) {
                    //console.log("Something went wrong 2");
                    //console.log(err);
                    res.redirect("/letter_3");
                } else {
                    doc.save();

                    user.letter_3.push(doc);
                    user.save();
                    //console.log(user);
                    res.redirect("/letter/recentletter_3");
                }
            });
        }
    });
});

module.exports = router;
