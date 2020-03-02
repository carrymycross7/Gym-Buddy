var express    = require('express');
var router     = express.Router({mergeParams: true});
var Workout    = require('../models/workouts');
var Comment    = require('../models/comment');
var middleWare = require('../middleware');









//====================
//comments routes
//====================

var commentArry = [];
//comments new
router.get('/new',middleWare.isLoggedIn, (req, res)=>{
	// find workout by id
	Workout.findById(req.params.id, function(err, workout){
			if(err){
				console.log(err)
			}
			else {
				res.render('comments/new', {workout: workout});
			}
	});
	
});

// comments create
router.post('/',middleWare.isLoggedIn, (req, res)=>{
		//look up campground with ID
		Workout.findById(req.params.id, function(err, workout){
				if(err){
					console.log(err);
					res.redirect('/workouts');
				}
				else {
					
					Comment.create(req.body.comment, function(err, comment){
								if(err){
									console.log(err)
								}
								else {
									
									workout.comments.push(comment);
									commentArry.push(comment);
									
									workout.save();
									res.redirect('/workouts/' + workout._id);
								}
					})
				}
		});
	
		//push new comment into 
		// commentArry here
		// then replace as needed in 
});

//Comments edit route
router.get('/:comment_id/edit', (req, res)=>{
	Comment.findById(req.params.comment_id,(err, foundComment)=>{
		console.log('in edit')
		if(err){
			res.redirect('back');
		}
		else{
			
			res.render('comments/edit', {workout_id: req.params.id, comment: foundComment});
		
		} 
		console.log(commentArry);
		
	});
	console.log('finished edit')
	
});

//comments update
router.put('/:comment_id', (req, res)=>{
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=>{
		
		if(err){
			res.redirect('back');
		}
		else {
			
			//associate comment in array 
			//with its comment_id
			//check if the comment_id matches and update, or delete
			
			
			var commentObj = {id: req.params.comment_id, text: req.body.comment.text};
			
			
			res.redirect('/workouts/' + req.params.id);
			
		}
			//middleWare.printObj(commentObj);
			middleWare.findObj(req.params.comment_id, commentObj, commentArry);
			console.log('finished edit')
			
	});
	
	
	
});

//Destroy Route
router.delete('/:comment_id',(req, res)=>{
	//find by id and remove
	Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
		if(err){
			res.redirect('back');
		}
		else {
			res.redirect('/workouts/' + req.params.id);
		}
	})
});

//email send
// router.post('/send', (req, res)=>{
// 	console.log('sent');
// });




module.exports = router;
module.exports.commentArry = commentArry;
