var express  = require("express"),
	router 	 = express.Router(),
	passport = require("passport"),
	User 	 = require("../models/user"),
	middleware = require("../middleware");

router.get("/", function(req,res){
	res.render("landing");
});

//================
// 	Auth Routes
//================

//show register form

router.get("/register", function(req, res){
	res.render("register");
})

router.post("/register", function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to BlissCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

//Login route

router.get("/login", function(req,res){
	res.render("login");
});

//middleware
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}) ,function(req,res){
});

//Logout Route
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
});

module.exports = router;