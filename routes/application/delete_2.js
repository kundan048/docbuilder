var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Application_2 = require('../../models/application/application_2');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');


router.delete("/:id/delete_2", isLoggedIn, function (req, res) {

    Application_2.findByIdAndRemove(req.params.id, async function (err, deletedApplication) {
        if (err) {
            req.flash("error", "Something went wrong! Please try again.");
            console.log(err);
            res.redirect("/application/recentdoc_2");
        }
        res.redirect("/application/recentdoc_2");
    })
})

module.exports = router;