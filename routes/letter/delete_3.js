var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Letter_3 = require('../../models/letter_3');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');


router.delete("/:id/delete_3", isLoggedIn, function (req, res) {

    Letter_3.findByIdAndRemove(req.params.id, async function (err, deletedletter) {
        if (err) {
            req.flash("error", "Something went wrong! Please try again.");
            console.log(err);
            res.redirect("/letter/recentletter_3");
        }
        res.redirect("/letter/recentletter_3");
    })
})

module.exports = router;