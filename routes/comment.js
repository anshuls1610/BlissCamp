var express = require("express"),
	router 	= express.Router({mergeParams: true}),
	Campground = require("../models/campground"),
	Comment = require("../models/comment"),
	middleware = require("../middleware");
	
//====================
//   COMMENT ROUTES
//====================

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
	//find campground by id
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "That campground does not exist!");
			res.redirect("back");
		} else{
			res.render("comments/new", {campground: foundCampground});
		}
	});
});

//POST Route
router.post("/", middleware.isLoggedIn, function(req,res){
	///find camp by id
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			res.redirect("/campgrounds");
		} else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong.");
					console.log(err);
				} else{
					//print username
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					//create new comment
					foundCampground.comments.push(comment);
					foundCampground.save();
					req.flash("success", "Successfully added your comment!");
					res.redirect("/campgrounds/" + foundCampground._id);
				}
			});
		}
	});
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.CheckCommentOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground not found!");
			return res.redirect("back");
		} 
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err || !foundComment){
				req.flash("error", "Comment not found!");
				res.redirect("back");
			} else{
				res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
			}
		});
	});
});

//UPDATE ROUTE
router.put("/:comment_id", middleware.CheckCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DELETE ROUTE
router.delete("/:comment_id", middleware.CheckCommentOwnership,function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
	if(err){
		res.redirect("back");
	} else{
		req.flash("success", "Comment Deleted!");
		res.redirect("/campgrounds/" + req.params.id);
	}
	});
});

module.exports = router;
