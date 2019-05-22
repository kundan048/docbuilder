var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    expressSession = require('express-session'),
    flash = require('connect-flash'),
    User = require('./models/user'),
    methodOverride = require("method-override");
require("dotenv/config");

// Connect MongoDB
mongoose.connect(process.env.CODE || "mongodb://localhost/Document_help", {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
// mongoose.connect("mongodb://localhost/Document_help", { useNewUrlParser: true });

var app = express();

//Load routes
var landingpage = require('./routes/landingpage');
var login = require('./routes/login');
var register = require('./routes/register');
var homepage = require('./routes/homepage');

//application section
var application = require('./routes/application/application');
var application_recentdoc = require('./routes/application/recentdoc');
var application_download = require('./routes/application/download');
var application_edit = require('./routes/application/edit');
var application_delete = require('./routes/application/delete')
//college specific section
let college_specific = require('./routes/application/CollegeSpecific/collegeSpecific');


//letter section
var letter = require('./routes/letter/letter');
var letter_2 = require('./routes/letter/letter_2');
var letter_3 = require('./routes/letter/letter_3');
var recentletter = require('./routes/letter/recentletter');
var recentletter_2 = require('./routes/letter/recentletter_2');
var recentletter_3 = require('./routes/letter/recentletter_3');
var letter_edit = require('./routes/letter/edit');
var letter_edit_2 = require('./routes/letter/edit_2');
var letter_edit_3 = require('./routes/letter/edit_3');
var letter_delete = require('./routes/letter/delete');
var letter_delete_2 = require('./routes/letter/delete_2');
var letter_delete_3 = require('./routes/letter/delete_3');
var letter_download = require('./routes/letter/download');

//otherFormats section
var otherFormats = require('./routes/otherformats/otherFormats');
var resumeFormats = require('./routes/otherformats/resumeFormats');
var cardsFormats = require('./routes/otherformats/cardsFormats');
var bulkVisitingCards = require('./routes/otherFormats/bulkVisitingCards');

//Auth
var forgot = require('./routes/auth/forgot');
var reset = require('./routes/auth/reset');
var notfound = require('./routes/auth/notfound');

var logout = require('./routes/logout');


//View ejs
app.set("view engine", "ejs");

//Static files middleware
app.use(express.static("public"));

//Update method override
app.use(methodOverride("_method"));

//BodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

//Flash message middleware
app.use(flash());

//Express session middleware
app.use(expressSession({
        secret: "Anything",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 2600000000
        }
    })
);

// Express-fileUpload (For uploading files)
// app.use(fileUpload());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//LocalStrategy middleware
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//User session middleware
app.use(function (req, res, next) {
    res.locals.DocsUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// user session middleware
// app.use(function(req, res, next){
// 	res.locals.DocsUser = req.user;
// 	next();
// });


//Routes
app.use('/', landingpage);
app.use('/', login);
app.use('/', register);
app.use('/', homepage);

// Application section
app.use('/', application);
app.use('/application', application_edit);
app.use('/application', application_recentdoc);
app.use('/application', application_delete)
app.use('/application', application_download);
app.use('/application', college_specific);

// Letter section
app.use('/', letter);
app.use('/letter', recentletter);
app.use('/letter', letter_edit);
app.use('/letter', letter_delete);
app.use('/letter', letter_download);

app.use('/', letter_2);
app.use('/letter', recentletter_2);
app.use('/letter', letter_edit_2);
app.use('/letter', letter_delete_2);

app.use('/', letter_3);
app.use('/letter', recentletter_3);
app.use('/letter', letter_edit_3);
app.use('/letter', letter_delete_3);


// Other Format section
app.use('/', otherFormats);
app.use('/otherFormats', resumeFormats);
app.use('/otherFormats', cardsFormats);
app.use('/otherFormats', bulkVisitingCards);

// Auth
app.use('/', forgot);
app.use('/', reset);

app.use('/', logout);

app.use('/', notfound);

// Listening to the server
app.listen(process.env.PORT || 3030, function () {
    console.log(`Server is listening on 3030`);
});
