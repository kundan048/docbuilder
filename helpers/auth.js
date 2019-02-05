module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    },    
    isLoggedInForLoginPage: function(req, res, next){
        if(req.isAuthenticated()) {
            return next();
        }
        res.render("login", {title: "Login"});
    },    
    isLoggedInForRegisterPage: function(req, res, next){
        if(req.isAuthenticated()) {
            return next();
        }
        res.render("register", {title: "Register"});
    },    
    isLoggedInForLandingPage: function(req, res, next){
        if(req.isAuthenticated()) {
            return next();
        }
        res.render("index",{title: "DocBuilder"});
    }
}