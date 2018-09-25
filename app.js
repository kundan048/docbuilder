var express			 		= require('express'),
	mongoose		 		= require('mongoose'),
	bodyParser		 		= require('body-parser'),
	passport		 		= require('passport'),
	LocalStrategy	 		= require('passport-local'),
	passportLocalMongoose	= require('passport-local-mongoose'),
	expressSession 			= require('express-session'),
	Application_t1_t1		= require('./models/application_t1_t1'),
	User					= require('./models/user');

	// require("dotenv/config");
	

// mongoose.connect(process.env.CODE);
mongoose.connect("mongodb://localhost/Document_help", { useNewUrlParser: true });

var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.use(expressSession({
	secret : "Anything",
	resave : false,
	saveUninitialized : false
}));

// Passing user to every single route
app.use(function(req, res, next){
	res.locals.currentUser  = req.user;
	// res.locals.error 		= req.flash("error");
	// res.locals.success	    = req.flash("success");
	next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

function isLoggedInForLoginPage(req, res, next){
	if(req.isAuthenticated()) {
		return next();
	}
	res.render("login", {title: "Login"});
}

function isLoggedInForRegisterPage(req, res, next){
	if(req.isAuthenticated()) {
		return next();
	}
	res.render("register", {title: "Register"});
}

function isLoggedInForLandingPage(req, res, next){
	if(req.isAuthenticated()) {
		return next();
	}
	res.render("index",{title: "DocBuilder"});
}

app.use(function(req, res, next){
	res.locals.DocsUser = req.user;
	next();
});

// Routes

app.get("/", isLoggedInForLandingPage, function(req, res){
	res.redirect("/homepage");
});

app.get("/register", isLoggedInForRegisterPage, function(req, res){
	res.redirect("/homepage");
});

app.post("/register", function(req, res){
	var password = req.body.password;

	var newUser = new User({
		username : req.body.username, 
		email	 : req.body.mail_id,
		name 	 : req.body.name
	});

	User.register(newUser, password, function(err, user){
		if(err) {
			console.log("Something went wrong!");
			console.log(err);
			return res.redirect("/register",{title: "Register"});
		}
		passport.authenticate('local')(req, res, function(){
			res.redirect("/homepage");
		});
	});	 
});

app.get("/login", isLoggedInForLoginPage,  function(req, res){
	res.redirect("/homepage");
});

// app.get("/login", function(req, res){
// 	res.render("login",{title: "Login"});
// });

app.post("/login", passport.authenticate('local', {
	successRedirect : "/homepage",
	failureRedirect : "/login"
}), function(req, res){});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

app.get("/homepage", isLoggedIn, function(req, res){
	res.render("homepage.ejs")
});

app.get("/private", isLoggedIn, function(req,res){
	res.render("private");
});

app.post("/private", isLoggedIn, function(req, res){
	var application = req.body.application;
	User.findById(req.user._id, function(err, user){
		if(err) {
			console.log(err);
			res.redirect("/private");
		} else {
			Application_t1_t1.create(application, function(err, doc){
				if(err){
					console.log(err);
					res.redirect("/private");
				} else {
					doc.save();

					user.application_t1_t1.push(doc);
					user.save();
					// console.log(user);
					res.redirect("/private1");
				}
			});
		}
	});
});

app.get("/private1", isLoggedIn, function(req,res){
	User.findById(req.user._id).populate("application_t1_t1").exec(function(err, foundUser){
		if(err) {
			console.log(err);
			// req.flash("error", "Something went wrong! Please try again!");
			res.redirect("/private");
		} else {
			// console.log(foundUser.application_t1_t1);
			res.render("private1", {user : foundUser});
		}
	});
});

// Listening to the server

app.listen(process.env.PORT || 3000, function(){
    console.log(`Server is listening on 3000`);
});
