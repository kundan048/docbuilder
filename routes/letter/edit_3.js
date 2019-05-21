var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Letter_3 = require('../../models/letter_3');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');


router.get("/:id/edit_3", isLoggedIn, function (req, res) {

    Letter_3.findById(req.params.id, async function (err, foundletter) {
        if (err) {
            console.log(err);
            res.redirect("/letter_3");
        }
        let letter_3 = await new Promise(resolve => {
            User.findById(req.user._id).populate('letter_3').populate('letter_3').exec(function (err, letters) {
                if (err) {
                    resolve();
                } else {
                    resolve(letters);
                }
            })
        });
        // console.log(letter, + " " + foundLetter) debugger;
        res.render("letters/edit_3", {data: letter_3, letter: foundletter});
    })
})

router.put("/:id", isLoggedIn, function (req, res) {
    console.log("hello");
    Letter_3.findByIdAndUpdate(req.params.id, req.body.letter_3, function (err, updatedletter) {
        if (err) {
            console.log(err);
            res.redirect("/letter_3");
        } else {
            res.redirect("/letter/recentletter_3/" + req.params.id);
        }
    });
});

module.exports = router;