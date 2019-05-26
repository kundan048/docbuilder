var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Application_3 = require('../../models/application/application_3');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');


router.delete("/:id/delete_3", isLoggedIn, function (req, res) {

    Application_3.findByIdAndRemove(req.params.id, async function (err, deletedApplication) {
        if (err) {
            req.flash("error", "Something went wrong! Please try again.");
            console.log(err);
            res.redirect("/application/recentdoc_3");
        }
        res.redirect("/application/recentdoc_3");
    })
})

module.exports = router;