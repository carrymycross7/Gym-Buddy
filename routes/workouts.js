var express    = require('express');
var router     = express.Router();
var middleWare = require('../middleware');
var Workout    = require('../models/workouts');
var Comment    = require('./comments');
var nodemailer = require('nodemailer');

var commentsArray = [];
// ==========================
// 	Email API Setup 
// // ==========================	
 var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'node.todo.application@gmail.com',
    pass: 'Galatians2:20'
  }
});

// var mailOptions = {
//   from: 'node.todo.application@gmail.com',
//   to: 'threet.dustin@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {s
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
//




router.get('/', (req, res) =>{
	
//get all workouts
	Workout.find({}, (err, workouts)=>{
		if(err){
			console.log(err)
		}
		else {
			res.render('workouts/index', {workouts: workouts, currentUser: req.user});
		}
		
	})


});
// create workout
router.post('/', middleWare.isLoggedIn, (req,res)=>{
	var name        = req.body.name;
	var image       = req.body.image;
	var description = req.body.description;
	var user        = {
				id: req.user._id,
				username: req.user.username
	};
	var newWorkout  = {name: name, image: image, description: description, user: user};
	//create new workout and save to DB
	Workout.create(newWorkout,(err, newlyCreate)=>{
			if(err){
				console.log(err)
			}
			else {
				//redirect to list of workouts
				
				res.redirect('/workouts');
			}
	});

});


//show form to create new workout
router.get('/new', middleWare.isLoggedIn, (req, res)=>{
	
	res.render('workouts/new');
});


// Show - info over the workouts
router.get('/:id', (req,res)=>{
	
	Workout.findById(req.params.id).populate('comments').exec ((err, foundWorkout)=>{
			if(err){
				console.log(err)
			}
			else {
				//render show page
				res.render('workouts/show', {workout: foundWorkout});
				// maybe add comments to an array
				//then update the array as the comments come in
				console.log('in workouts');
				
				
			}
	});
	
	
});

// Edit Workouts
router.get('/:id/edit', middleWare.checkWorkoutOwnership, (req, res)=>{

	Workout.findById(req.params.id, (err, foundWorkout)=>{
	
				res.render('workouts/edit', {workout: foundWorkout});
			});
	

	
});


//Update Workout 
router.put('/:id', middleWare.checkWorkoutOwnership, (req,res)=>{
	//find and update
	Workout.findByIdAndUpdate(req.params.id, req.body.workout, function(err, updatedWorkout){
		if(err){
			res.redirect('/');
		}else {
			res.redirect('/workout/' + req.params.id);
			
		}
	});
});


//Destroy Route
router.delete('/:id', middleWare.checkWorkoutOwnership, (req, res)=>{
	Workout.findByIdAndRemove(req.params.id, (err)=>{
		if(err){
			res.redirect('/workouts')
		}
		else{
			res.redirect('/workouts')
		} 
		
	})
});

router.post('/:id', (req, res)=>{
		commentsArray.length = 0; 
	Workout.findById(req.params.id).populate('comments').exec ((err, foundWorkout)=>{
			if(err){
				console.log(err)
			}
			else {
				//render show page
				res.redirect('/workouts/' + req.params.id);
				// maybe add comments to an array
				//then update the array as the comments come in
				console.log('in sent')
				var userEmail =req.user.email
				for(var i=0; i < foundWorkout.comments.length; i++){
						commentsArray.push(foundWorkout.comments[i].text);
				}
				console.log(userEmail);
				
				
				//=====================
				//    Email API Call
				//=====================
				var mailOptions = {
						  from: 'node.todo.application@gmail.com',
						  to: `${userEmail}`,
						  subject: `${foundWorkout.description}`,
						  text: `${foundWorkout.description}
								 ${commentsArray}`
						};

					transporter.sendMail(mailOptions, function(error, info){
						  if (error) {
							console.log(error);
						  } else {
							console.log('Email sent: ' + info.response);
						  }
					});

				
			 }
});
});






module.exports = router;