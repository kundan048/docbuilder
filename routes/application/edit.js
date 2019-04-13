var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Application_t1_t1 = require('../../models/application_t1_t1');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');


router.get("/:id/edit", isLoggedIn, function (req, res) {

    Application_t1_t1.findById(req.params.id, async function (err, foundApplicaiton) {
        if (err) {
            console.log(err);
            res.redirect("/application");
        }
        let application = await new Promise(resolve => {
            User.findById(req.user._id).populate('application_t1_t1').populate('letter_t1_t1').exec(function (err, applications) {
                if (err) {
                    resolve();
                } else {
                    resolve(applications);
                }
            })
        });
        res.render("applications/edit", {data: application, application: foundApplicaiton});
    })
})

router.put("/:id", isLoggedIn, function (req, res) {
    console.log("hello");
    Application_t1_t1.findByIdAndUpdate(req.params.id, req.body.application, function (err, updatedApplication) {
        if (err) {
            console.log(err);
            res.redirect("/application");
        } else {
            res.redirect("/application/recentdoc/" + req.params.id);
        }
    });
});

module.exports = router;
