var express = require('express');
var router = express.Router();

// Load Model
var User = require('../../models/user');
var Letter_t1_t1 = require('../../models/letter_type1_template1');

// Load Helpers
var {isLoggedIn} = require('../../helpers/auth');


router.get("/:id/edit", isLoggedIn, function (req, res) {

    Letter_t1_t1.findById(req.params.id, async function (err, foundletter) {
        if (err) {
            console.log(err);
            res.redirect("/letter");
        }
        let letter = await new Promise(resolve => {
            User.findById(req.user._id).populate('letter_t1_t1').populate('letter_t1_t1').exec(function (err, letters) {
                if (err) {
                    resolve();
                } else {
                    resolve(letters);
                }
            })
        });
        // console.log(letter, + " " + foundLetter) debugger;
        res.render("letters/edit", {data: letter, letter: foundletter});
    })
})

router.put("/:id", isLoggedIn, function (req, res) {
    console.log("hello");
    Letter_t1_t1.findByIdAndUpdate(req.params.id, req.body.letter, function (err, updatedletter) {
        if (err) {
            console.log(err);
            res.redirect("/letter");
        } else {
            res.redirect("/letter/recentdoc/" + req.params.id);
        }
    });
});

module.exports = router;