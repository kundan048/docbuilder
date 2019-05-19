var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Letter_2 = require('../../models/letter_2');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');


router.get("/:id/edit_2", isLoggedIn, function (req, res) {

    Letter_2.findById(req.params.id, async function (err, foundletter) {
        if (err) {
            console.log(err);
            res.redirect("/letter_2");
        }
        let letter_2 = await new Promise(resolve => {
            User.findById(req.user._id).populate('letter_2').populate('letter_2').exec(function (err, letters) {
                if (err) {
                    resolve();
                } else {
                    resolve(letters);
                }
            })
        });
        // console.log(letter, + " " + foundLetter) debugger;
        res.render("letters/edit_2", {data: letter_2, letter: foundletter});
    })
})

router.put("/:id", isLoggedIn, function (req, res) {
    console.log("hello");
    Letter_2.findByIdAndUpdate(req.params.id, req.body.letter_2, function (err, updatedletter) {
        if (err) {
            console.log(err);
            res.redirect("/letter_2");
        } else {
            res.redirect("/letter/recentletter_2/" + req.params.id);
        }
    });
});

module.exports = router;