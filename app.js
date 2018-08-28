var
    express = require('express'),
    bodyParser = require('body-parser');
var app = express();


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));



app.get("/", function(req, res){
	res.render("index",{
		title: "DocBuilder"
	});
   
});

app.get("/login", function(req, res){
	res.render("login",{
		title: "Login"
	});
});

app.get("/register", function(req, res){
	res.render("register",{
		title: "Register"
	});
});



app.listen(process.env.PORT || 3000, function(){
    console.log(`Server is listening on 3000`);
});
