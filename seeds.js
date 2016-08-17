var mongoose = require("mongoose"),
Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
	{
		name: "Cloud's Rest", 
		image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?format=auto&auto=compress&dpr=1&crop=entropy&fit=crop&w=821&h=547&q=80",
		description: "Across the sea of space, the stars are other suns. We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard, because that goal will serve to organize and measure the best of our energies and skills, because that challenge is one that we are willing to accept, one we are unwilling to postpone, and one which we intend to win."
	},
	{
		name: "Amazing something", 
		image: "https://images.unsplash.com/photo-1458571037713-913d8b481dc6?format=auto&auto=compress&dpr=1&crop=entropy&fit=crop&w=821&h=544&q=80",
		description: "Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before. It suddenly struck me that that tiny pea, pretty and blue, was the Earth. I put up my thumb and shut one eye, and my thumb blotted out the planet Earth. I didn't feel like a giant. I felt very, very small."
	},
	{
		name: "Great camping spot", 
		image: "https://images.unsplash.com/photo-1464054313797-e27fb58e90a9?format=auto&auto=compress&dpr=1&crop=entropy&fit=crop&w=821&h=545&q=80",
		description: "As we got further and further away, it [the Earth] diminished in size. Finally it shrank to the size of a marble, the most beautiful you can imagine. That beautiful, warm, living object looked so fragile, so delicate, that if you touched it with a finger it would crumble and fall apart. Seeing this has to change a man."
	}
]
function seedDB(){
	//Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("Removed campgrounds!");
			//Add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				}
				else {
					console.log("added");
					Comment.create(
						{
							text: "Great place",
							author: "User47"
						}, function(err, comment){
							if(err){
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment.");
							}
					});
				}
			});
		});
	});
}

module.exports = seedDB;
