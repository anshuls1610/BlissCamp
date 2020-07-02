var express = require("express"),
	router 	= express.Router(),
	Campground = require("../models/campground"),
	Comment	= require("../models/comment"),
	request = require("request"),
	middleware = require("../middleware");
	
//Index ROUTE
router.get("/", function(req,res){
	
	Campground.find({}, function(err,allCampgrounds){
		if(err){
			console.log(err);
		} else{
			var url = "https://api.rootnet.in/covid19-in/stats/latest";
			request(url, function(error,response,body){
			if(!error && response.statusCode == 200){
				var parsedData = JSON.parse(body)
				res.render("campgrounds/index", {campgrounds: allCampgrounds, parsedData : parsedData});
				}
			});
		}
	});
});

//Create ROUTE
router.post("/", middleware.isLoggedIn, function(req,res){
	var name =  req.body.name;
	var image =  req.body.image;
	var cost = req.body.cost;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var  newCampgound = {name : name, image : image, cost: cost, description: desc, author: author}; 
	
	Campground.create(newCampgound, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else{
			req.flash("success", "Hurray! Your campground has been created");
			console.log("New Campground Created");
			res.redirect("/campgrounds");
		}
	});
});

//New ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});

//Show ROUTE
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground not found!");
			res.redirect("back");
		} else{
			res.render("campgrounds/show",{campground: foundCampground});
		}
	});
});

//EDIT ROUTE
router.get("/:id/edit", middleware.CheckCampgroundOwnership, function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){
	res.render("campgrounds/edit", {campground: foundCampground});	
	});
});

//UPDATE ROUTE
router.put("/:id", middleware.CheckCampgroundOwnership, function(req,res){
	
	Campground.findByIdAndUpdate(req.params.id, req.body.campground ,function(err, foundCampground){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds/" + req.params.id);	
		}
	});
});

//DESTROY ROUTE + Destroy comments in the campgrounds from their res. databases
router.delete("/:id", middleware.CheckCampgroundOwnership,function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, campgroundRemoved){
		if(err){
			res.redirect("/campgrounds");
		} else{
			Comment.deleteMany({_id: {$in: campgroundRemoved.comments}}, function(err){
				if(err) {
					console.log(err);
				} else{
					req.flash("success", "Campground Deleted!");
					res.redirect("/campgrounds");
				}
			});
		}
	});
});


module.exports = router;

