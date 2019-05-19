var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Letter_2 = require('../../models/letter_2');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');


router.delete("/:id/delete_2", isLoggedIn, function (req, res) {

    Letter_2.findByIdAndRemove(req.params.id, async function (err, deletedletter) {
        if (err) {
            req.flash("error", "Something went wrong! Please try again.");
            console.log(err);
            res.redirect("/letter/recentletter_2");
        }
        res.redirect("/letter/recentletter_2");
    })
})

module.exports = router;