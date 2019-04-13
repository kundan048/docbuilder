var express = require('express');
var router = express.Router();
var request = require('request');
let jQuery = require('jquery');

// Load Model
var User = require('../models/user');
var Application_t1_t1 = require('../models/application_t1_t1');

// Load Helpers
var {isLoggedIn} = require('../helpers/auth');

router.get("/homepage", isLoggedIn, async function (req, res) {

    let application = await new Promise(resolve => {
        User.findById(req.user._id).populate('application_t1_t1').populate('letter_t1_t1').exec(function (err, applications) {
            if (err) {
                resolve();
            } else {
                resolve(applications);
            }
        })
    });
    res.render("homepage", {userApplication: application.application_t1_t1, userLetter: application.letter_t1_t1});
});

module.exports = router;
