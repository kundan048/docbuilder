var express                 = require('express'),
    crypto 					= require("crypto"),
    async				    = require("async"),
    nodemailer				= require("nodemailer");
var router = express.Router();

var User = require('../../models/user');

router.get('/reset/:token', function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/forgot');
        }
        res.render('reset', {token: req.params.token});
    });
});
  
router.post('/reset/:token', function(req, res) {
    async.waterfall([
        function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
            }
            if(req.body.password === req.body.confirm) {
            user.setPassword(req.body.password, function(err) {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function(err) {
                req.logIn(user, function(err) {
                    done(err, user);
                });
                });
            })
            } else {
                req.flash("error", "Passwords do not match.");
                return res.redirect('back');
            }
        });
        },
        function(user, done) {
        var smtpTransport = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
            user: 'anupamk1109@gmail.com',
            pass: process.env.mailPass
            }
        });
        var mailOptions = {
            to: user.username,
            from: 'anupamk1109@mail.com',
            subject: 'Your password has been changed',
            text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.username + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
            req.flash('success', 'Success! Your password has been changed.');
            done(err);
        });
        }
    ], function(err) {
        res.redirect('/homepage');
    });
});

module.exports = router;