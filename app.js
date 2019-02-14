var express			 		= require('express'),
	mongoose		 		= require('mongoose'),
	bodyParser		 		= require('body-parser'),
	passport		 		= require('passport'),
	LocalStrategy	 		= require('passport-local'),
	expressSession 			= require('express-session'),
	flash					= require('connect-flash'),
	User					= require('./models/user');
	require("dotenv/config");

// Connect MongoDB
mongoose.connect(process.env.CODE, { useNewUrlParser: true });
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

//letter section
var letter = require('./routes/letter/letter');
var recentletter = require('./routes/letter/recentletter');

//otherFormats section
var otherFormats = require('./routes/otherformats/otherFormats');
var resumeFormats = require('./routes/otherformats/resumeFormats');

//Auth
var forgot = require('./routes/auth/forgot');
var reset = require('./routes/auth/reset');
var notfound = require('./routes/auth/notfound');

var logout = require('./routes/logout');


//View ejs
app.set("view engine", "ejs");

//Static files middleware
app.use(express.static("public"));

//BodyParser middleware
app.use(bodyParser.urlencoded({extended : true}));

//Flash message middleware
app.use(flash());

//Express session middleware
app.use(expressSession({
		secret : "Anything",
		resave : false,
		saveUninitialized : false,
		cookie : {
			maxAge : 2600000000
		}
	})
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//LocalStrategy middleware
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//User session middleware
app.use(function(req, res, next){
	res.locals.DocsUser 	= req.user;
	res.locals.error 		= req.flash("error");
	res.locals.success	    = req.flash("success");
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
app.use('/application', application_recentdoc);
app.use('/application', application_download);

// Letter section
app.use('/', letter);
app.use('/letter', recentletter);

// Other Format section
app.use('/', otherFormats);
app.use('/otherFormats', resumeFormats);

// Auth
app.use('/', forgot);
app.use('/', reset);

app.use('/', logout);

app.use('/', notfound);

// Listening to the server
app.listen(process.env.PORT || 3000, function(){
    console.log(`Server is listening on 3000`);
});
