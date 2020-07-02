var express    		= require("express"),
 	app        		= express(),
	mongoose  		= require("mongoose"),
 	bodyparser 		= require("body-parser"),
	passport   		= require("passport"),
	localStrategy 	= require("passport-local"),
	Campground 		= require("./models/campground"),
	methodOverride 	= require("method-override"),
	flash			= require("connect-flash"),
	Comment   		= require("./models/comment"),
	User 			= require("./models/user"),
	request			= require("request"),
	seedDB	   		= require("./seeds");

var campgroundRoutes = require("./routes/campground"),
	commentRoutes 	 = require("./routes/comment"),
	indexRoutes	 	 = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost:27017/bliss_camp";
mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
			useCreateIndex: true
        }).then(() => {
				console.log("Connected to DB!");
			}).catch(err => {
				console.log("Error: cd ", err.message);
			});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyparser.urlencoded({extended : true}));
app.use(flash());

//seedDB(); //seed the database

app.locals.moment = require('moment');
//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Anshul will be the best",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
//middleware
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for user login/logout navbar
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error	   = req.flash("error");
	res.locals.success	   = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("The BlissCamp server has Started!");
});