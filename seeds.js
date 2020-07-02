var mongoose 	= require("mongoose"),
	Campground  = require("./models/campground"),
	Comment		= require("./models/comment");

var seeds = [
	{
		name: "Clouds rest",
		image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Gods hall",
		image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Valhalla",
		image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
]

async function seedDB(){
	try{
		await Campground.remove({});
		console.log('removed campgrounds');
		await Comment.remove({});
		console.log('removed comments');
	
		for(const seed of seeds){
			let campground = await Campground.create(seed);
			console.log('campgrounds created');
			let comment = await Comment.create(
				{
					text: 'This is an amazing place',
					author: 'Thor'
				}
			)
		console.log('comments created')
		campground.comments.push(comment);
		campground.save();
		console.log('comments added to campground');
		}
	}catch(err){
		console.log(err);
	}
}
	

//old syntax
// function seedDB(){
// 	//remove all campgrounds
// 	Campground.remove({}, function(err){
// 		if(err){
// 			console.log(err);
// 		}
// 			console.log("Removed all campgrounds");
		
// 			//Create campgrounds
// 		data.forEach(function(seed){
// 			Campground.create(seed, function(err, campground){				
// 				if(err){
// 		console.log(err)
// 		} else {
// 		console.log("added a campground");
					
// 					//remove Comment
// 					Comment.remove({}, function(err){
// 		if(err){
// 		console.log(err);
// 		}
// 		console.log("removed comments!");
				
// 						//Create comments
// 						Comment.create(
// 							{
// 								text: "This is very nice place.",
// 								author: "Anshul"
// 							}, function(err, comment){
// 									if(err){
// 										console.log(err);
// 										} else{
// 											campground.comments.push(comment);
// 											campground.save();
// 											console.log("Comment created");
// 										}
// 								}		
// 						)
// 					});
// 				}
// 			});
// 		});
// 	 });
// }

module.exports = seedDB;