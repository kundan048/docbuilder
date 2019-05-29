var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Application_4 = require('../../models/application/application_4');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');


router.delete("/:id/delete_4", isLoggedIn, function (req, res) {

    Application_4.findByIdAndRemove(req.params.id, async function (err, deletedApplication) {
        if (err) {
            req.flash("error", "Something went wrong! Please try again.");
            console.log(err);
            res.redirect("/application/recentdoc_4");
        }
        res.redirect("/application/recentdoc_4");
    })
})

module.exports = router;