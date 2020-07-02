var	Campground = require("../models/campground"),
	Comment = require("../models/comment");

var middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else{
	req.flash("error", "You need to Login first!");
	res.redirect("/login");
	}
}

middlewareObj.CheckCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err || !foundCampground){
				req.flash("error", "Campground not found!");
				res.redirect("back");
			} else{
				//check if user owns the campground
				if(foundCampground.author.id.equals(req.user._id)){
					next();	
					//otherwise redirect
				} else{
					req.flash("error", "Permission Denied!");
					res.redirect("back");
					}	
				}
			});
			//else redirect
		} else {
			req.flash("error", "You need to Login first!");
			res.redirect("back");
		}
	}

middlewareObj.CheckCommentOwnership = function(req, res, next){
	//check if user is logged login
	if(req.isAuthenticated()){
	   //check if user owns the comment_id
		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err || !foundComment){
				req.flash("error", "Comment not found!");
				res.redirect("back");
		} else{
			//checking is done here
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else{
					//redirect somewhere
					req.flash("error", "Permission denied!");
					res.redirect("back");
				}
			}
		});
		//redirect somewhere
	} else{
		res.redirect("back");
		}
}
 
module.exports = middlewareObj;