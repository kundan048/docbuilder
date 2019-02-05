var express                 = require('express'),
    crypto 					= require("crypto"),
    async				    = require("async"),
    nodemailer				= require("nodemailer");
var router = express.Router();

var User = require('../../models/user');

router.get('/forgot', function(req, res) {
    res.render('forgot');
});

router.post('/forgot', function(req, res, next) {
    async.waterfall([
        function(done) {
        crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
        });
        },
        function(token, done) {
        User.findOne({ username: req.body.email }, function(err, user) {
            if (!user) {
            req.flash('error', 'No account with that email address exists.');
            return res.redirect('/forgot');
            }

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {
            done(err, token, user);
            });
        });
        },
        function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
            user: 'anupamk1109@gmail.com',
            pass: process.env.mailPass
            }
        });
        var mailOptions = {
            to: user.username,
            from: 'anupamk1109@gmail.com',
            subject: 'Node.js Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
            console.log('mail sent');
            req.flash('success', 'An e-mail has been sent to ' + user.username + ' with further instructions.');
            done(err, 'done');
        });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
});

module.exports = router;