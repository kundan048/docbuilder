var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Application_3 = require('../../models/application/application_3');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');


router.get("/:id/edit_3", isLoggedIn, function (req, res) {

    Application_3.findById(req.params.id, async function (err, foundApplication) {
        if (err) {
            console.log(err);
            res.redirect("/application_3");
        }
        let application_3 = await new Promise(resolve => {
            User.findById(req.user._id).populate('application_3').exec(function (err, applications) {
                if (err) {
                    resolve();
                } else {
                    resolve(applications);
                }
            })
        });
        res.render("applications/edit_3", {data: application_3, application: foundApplication});
    })
})

router.put("/:id", isLoggedIn, function (req, res) {
    console.log("hello");
    Application_3.findByIdAndUpdate(req.params.id, req.body.application, function (err, updatedApplication) {
        if (err) {
            console.log(err);
            res.redirect("/application_3");
        } else {
            res.redirect("/application/recentdoc_3/" + req.params.id);
        }
    });
});

module.exports = router;