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
	fs 						= require('fs');
	require("dotenv/config");

	

//mongoose.connect(process.env.CODE);
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
	
})

app.get('/download', isLoggedIn, function(req, res){
	var doc = docx.create();
	var to = docx.createText("To,").break();
	var thePrincipal = docx.createText("The Principal,").break();
	var schoolName = docx.createText(req.query.school_name + ",").break();
	var Address = docx.createText(req.query.address + ",").break();
	var date = docx.createText(req.query.date + ",").break();
	var greeting = docx.createText("Sir/Ma'am',").break();
	var paragraph = docx.createText("With due respect I beg to state that I am not in a position to attend the school as I am down with "+ req.query.reason +". Since it is a communicable disease, I have been advised quarantine and a few days complete rest. Therefore kindly grant me leave for ten days").break();
	var thanku = docx.createText("Thanking you,").break();
	var yoursobe = docx.createText("Yours obediently,").break();
	var name = docx.createText(req.query.name).break();
	var para2 = docx.createParagraph().addText(to).left().addText(thePrincipal).left().addText(schoolName).left().addText(Address).left().addText(date).left().addText(greeting).left().addText(paragraph).left().addText(thanku).left().addText(yoursobe).left().addText(name).left();
	doc.addParagraph(para2);
	exporter.express(res, doc, 'example');

});

// Listening to the server

app.listen(process.env.PORT || 3000, function(){
    console.log(`Server is listening on 3000`);
});
