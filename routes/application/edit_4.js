var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Application_4 = require('../../models/application/application_4');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');


router.get("/:id/edit_4", isLoggedIn, function (req, res) {

    Application_4.findById(req.params.id, async function (err, foundApplication) {
        if (err) {
            console.log(err);
            res.redirect("/application_4");
        }
        let application_4 = await new Promise(resolve => {
            User.findById(req.user._id).populate('application_4').exec(function (err, applications) {
                if (err) {
                    resolve();
                } else {
                    resolve(applications);
                }
            })
        });
        res.render("applications/edit_4", {data: application_4, application: foundApplication});
    })
})

router.put("/:id", isLoggedIn, function (req, res) {
    console.log("hello");
    Application_4.findByIdAndUpdate(req.params.id, req.body.application, function (err, updatedApplication) {
        if (err) {
            console.log(err);
            res.redirect("/application_4");
        } else {
            res.redirect("/application/recentdoc_4/" + req.params.id);
        }
    });
});

module.exports = router;