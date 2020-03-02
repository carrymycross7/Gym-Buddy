var mongoose = require('mongoose');
var Workout  = require('./models/workouts');
var Comment  = require('./models/comment');

var data = [
	
	{
		name       : 'Upper Day A',
		image      :'https://cdn.pixabay.com/photo/2016/03/27/23/00/weight-lifting-1284616_960_720.jpg',
		description: 'This is a Upper Workout only, with a focus on strength'
		
	},
	{
		name       : 'LowerDay A',
		image      :'https://cdn.pixabay.com/photo/2014/11/17/13/17/crossfit-534615_960_720.jpg',
		description: 'This is a Lower Workout only, with a focus on strength'
		
	},
	
	
]


function seedDB(){
	// remove all workouts
	Workout.remove({}, (err)=>{
		if(err){
			console.log(err)
		}
		else{
		console.log('removed');
			// add workouts
	data.forEach(function(seed){
		Workout.create(seed, (err, workout)=>{
			if(err){
				console.log(err)
			}
			else {
				console.log('added a workout')
				//create comment
				Comment.create({
					text: 'Squats 3x4 @ 80% RPE 8-9'
				
				},(err, comment)=>{
					if(err){
						console.log(err)
					}
					else {
					workout.comments.push(comment);
					workout.save();
					console.log('created comment');
					}
				});
			}
		})
	});
		}
	});
	
	
};

module.exports = seedDB;