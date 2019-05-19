var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Application_t1_t1 = require('../../models/application_t1_t1');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');


router.delete("/:id/delete", isLoggedIn, function (req, res) {

    Application_t1_t1.findByIdAndRemove(req.params.id, async function (err, deletedApplication) {
        if (err) {
            req.flash("error", "Something went wrong! Please try again.");
            console.log(err);
            res.redirect("/application/recentdoc");
        }
        res.redirect("/application/recentdoc");
    })
})

module.exports = router;