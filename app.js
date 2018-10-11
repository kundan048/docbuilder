var express			 		= require('express'),
	mongoose		 		= require('mongoose'),
	bodyParser		 		= require('body-parser'),
	passport		 		= require('passport'),
	LocalStrategy	 		= require('passport-local'),
	passportLocalMongoose	= require('passport-local-mongoose'),
	expressSession 			= require('express-session'),
	User					= require('./models/user'),
	officeClippy 			= require('office-clippy'),
	docx 					= officeClippy.docx,
	exporter 				= officeClippy.exporter,
	moment					= require('moment'),
	fs 						= require('fs');
	require("dotenv/config");

	Application_t1_t1		= require('./models/application_t1_t1'),
	Letter_t1_t1			= require('./models/letter_type1_template1'),
	User					= require('./models/user');

	// require("dotenv/config");
	

 mongoose.connect(process.env.CODE);
//mongoose.connect("mongodb://localhost/Document_help", { useNewUrlParser: true });

var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.use(expressSession({
	secret : "Anything",
	resave : false,
	saveUninitialized : false
}));

// // Passing user to every single route
// app.use(function(req, res, next){
// 	res.locals.currentUser  = req.user;
// 	// res.locals.error 		= req.flash("error");
// 	// res.locals.success	    = req.flash("success");
// 	next();
// });

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
	res.render("homepage")
});

app.get("/application", isLoggedIn, function(req, res){
	res.render("application");
});

app.post("/application", isLoggedIn, function(req, res){
	var application = req.body.application;
	//console.log(application);
	User.findById(req.user._id, function(err, user){
		if(err) {
			console.log("Something went wrong");
			console.log(err);
			res.redirect("/application");

		}else {
			console.log("ready to go");
			Application_t1_t1.create(application, function(err, doc){
				if(err){
					console.log("goes wrong");
					console.log(err);
					res.redirect("/application");
				}else{
					doc.save();
					user.application_t1_t1.push(doc);
					user.save();
					res.redirect("/recentdoc");
				}
			});
		}
	}); 
});

app.get('/download', isLoggedIn, function(req, res){
	User.findById(req.user._id).populate("application_t1_t1").exec(function(err, foundUser){
		if(err){
			console.log(err);
			res.redirect("/application");
		} else {
			var downUser = foundUser.application_t1_t1[foundUser.application_t1_t1.length -1];
			var doc = docx.create();
			var to = docx.createText("To,").break().break();
			var thePrincipal = docx.createText("The Principal,").break().break();
			var schoolName = docx.createText(downUser.school + ",").break().break();
			var Address = docx.createText(downUser.address + ",").break().break();
			var date = docx.createText(downUser.date + ",").break().break();
			var greeting = docx.createText("Sir/Ma'am',").break().break();
			var paragraph = docx.createText("With due respect I beg to state that I am not in a position to attend the school as I am down with "+ downUser.reason +". Since it is a communicable disease, I have been advised quarantine and a few days complete rest. Therefore kindly grant me leave for ten days").break().break();
			var thanku = docx.createText("Thanking you,").break().break();
			var yoursobe = docx.createText("Yours obediently,").break().break();
			var name = docx.createText(downUser.name).break().break();
			var para2 = docx.createParagraph().addText(to).left().addText(thePrincipal).left().addText(schoolName).left().addText(Address).left().addText(date).left().addText(greeting).left().addText(paragraph).left().addText(thanku).left().addText(yoursobe).left().addText(name).left();
			doc.addParagraph(para2);
			var docname = downUser.name + "_application";
			exporter.express(res, doc, docname);
		}
	});
	

});

// app.get("/private", isLoggedIn, function(req,res){
// 	res.render("private");
// });

// app.post("/private", isLoggedIn, function(req, res){
// 	var application = req.body.application;
// 	User.findById(req.user._id, function(err, user){
// 		if(err) {
// 			console.log(err);
// 			res.redirect("/private");
// 		} else {
// 			Application_t1_t1.create(application, function(err, doc){
// 				if(err){
// 					console.log(err);
// 					res.redirect("/private");
// 				} else {
// 					doc.save();

// 					user.application_t1_t1.push(doc);
// 					user.save();
// 					// console.log(user);
// 					res.redirect("/private1");
// 				}
// 			});
// 		}
// 	});
// });

app.get("/recentdoc", isLoggedIn, function(req, res){
	User.findById(req.user._id).populate("application_t1_t1").exec(function(err, foundUser){
		if(err){
			console.log(err);
			res.redirect("/application");
		} else {
			//console.log(foundUser);
			if(foundUser.application_t1_t1.length == 0){
				res.redirect("/application");
			}else {
				res.render("recentdoc", {user : foundUser, moment : moment});
			}
		}
	}); 
});
 
// app.get("/private1", isLoggedIn, function(req,res){
// 	User.findById(req.user._id).populate("application_t1_t1").exec(function(err, foundUser){
// 		if(err) {
// 			console.log(err);
// 			// req.flash("error", "Something went wrong! Please try again!");
// 			res.redirect("/private");
// 		} else {
// 			// console.log(foundUser.application_t1_t1);
// 			res.render("private1", {user : foundUser});
// 		}
// 	});
// });



app.get("/letter", isLoggedIn, function(req,res){
	res.render("letter");
});

app.post("/letter", isLoggedIn, function(req, res){
	var leave_details = req.body.leave;
	console.log(leave_details);
	User.findById(req.user._id, function(err, user){
		if(err) {
			console.log("Something went wrong");
			console.log(err);
			res.redirect("/letter");
		} else {
			Letter_t1_t1.create(leave_details, function(err, doc){
				if(err){
					console.log("Something went wrong 2");
					console.log(err);
					res.redirect("/letter");
				} else {
					doc.save();

					user.letter_t1_t1.push(doc);
					user.save();
					console.log(user);
					res.redirect("/recentletter");
				}
			});
		}
	});
});

app.get("/recentletter", isLoggedIn, function(req,res){
	User.findById(req.user._id).populate("letter_t1_t1").exec(function(err, foundUser){
		if(err) {
			console.log(err);
			// req.flash("error", "Something went wrong! Please try again!");
			res.redirect("/letter");
		} else {
			// console.log(foundUser.application_t1_t1);
			res.render("recentletter", {user : foundUser});
		}
	}); 
});

app.get("/applicationTypes", isLoggedIn, function(req, res){
	res.render("application_types");
});

// Listening to the server
app.listen(process.env.PORT || 3000, function(){
    console.log(`Server is listening on 3000`);
});
