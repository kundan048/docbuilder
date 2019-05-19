var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Letter_t1_t1 = require('../../models/letter_type1_template1');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');


router.delete("/:id/delete", isLoggedIn, function (req, res) {

    Letter_t1_t1.findByIdAndRemove(req.params.id, async function (err, deletedletter) {
        if (err) {
            req.flash("error", "Something went wrong! Please try again.");
            console.log(err);
            res.redirect("/letter/recentletter");
        }
        res.redirect("/letter/recentletter");
    })
})

module.exports = router;