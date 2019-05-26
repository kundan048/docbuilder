var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Application_2 = require('../../models/application/application_2');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');


router.get("/:id/edit_2", isLoggedIn, function (req, res) {

    Application_2.findById(req.params.id, async function (err, foundApplication) {
        if (err) {
            console.log(err);
            res.redirect("/application_2");
        }
        let application_2 = await new Promise(resolve => {
            User.findById(req.user._id).populate('application_2').exec(function (err, applications) {
                if (err) {
                    resolve();
                } else {
                    resolve(applications);
                }
            })
        });
        res.render("applications/edit_2", {data: application_2, application: foundApplication});
    })
})

router.put("/:id", isLoggedIn, function (req, res) {
    console.log("hello");
    Application_2.findByIdAndUpdate(req.params.id, req.body.application, function (err, updatedApplication) {
        if (err) {
            console.log(err);
            res.redirect("/application_2");
        } else {
            res.redirect("/application/recentdoc_2/" + req.params.id);
        }
    });
});

module.exports = router;