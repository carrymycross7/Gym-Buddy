var Workout       = require('../models/workouts');
var Comment       = require('../models/comment');
var middlewareObj = {};

middlewareObj.checkWorkoutOwnership = function(req, res, next){
	
	if(req.isAuthenticated()){
			//check if user owns workout
	Workout.findById(req.params.id, (err, foundWorkout)=>{
		if(err){
			req.flash('error', 'Workout Not Found');
			res.redirect('back');
		}
		else {
			if(foundWorkout.user.id.equals(req.user._id)){
				next();
			}
			else {
				req.flash('error', 'You need to be logged in to do that');
				res.redirect('back');
			}
		}
	});
		
	} else {
		req.flash('error', 'You need to be logged in to do that');
		res.redirect('back');
	}

	

};


middlewareObj.findObj = function(oldObj,newObj, array){
	    var i;
		if(oldObj === newObj.id ){
			array[i] = {newObj};
			console.log('changed');
		}
			
};



// let obj = arr.find((o, i) => {
//     if (o.name === 'string 1') {
//         arr[i] = { name: 'new string', value: 'this', other: 'that' };
//         return true; // stop searching
//     }
// });

// console.log(arr);




middlewareObj.isLoggedIn = function(req, res, next){
	//middle ware
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('error', 'You need to be logged in first');
	res.redirect('/login');

	
};


module.exports = middlewareObj;