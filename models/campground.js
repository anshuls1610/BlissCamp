var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	cost: String,
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

// A WAY TO PRE HOOK A FUNCTION TO DELETE ALL COMMENTS OF A CAMPGROUND IF THE CAMPGROUND IS DELETED

// const Comment = require('./comment');
// campgroundSchema.pre('remove', async function() {
// 	await Comment.deleteMany({
// 		_id: {
// 			$in: this.comments
// 		}
// 	});
// });

module.exports = mongoose.model("Campground", campgroundSchema);