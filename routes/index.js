var express = require('express');
var router  = express.Router();
var passport= require('passport');

var User    = require('../models/user');



router.get('/', (req,res)=>{
	res.render('landing')
});


//===========================
//Authentication Routes
//===========================

//show register form
router.get('/register', (req,res)=>{
	res.render('register')
});


//sign up login
router.post('/register',(req, res)=>{
	var newUser = new User({username: req.body.username, email: req.body.email});
	
	User.register(newUser, req.body.password, (err, user)=>{
		if(err){
			req.flash('error', err.message);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, function(){
				req.flash('success', 'Welcome to Gym Buddy ' + user.username);
				res.redirect('/workouts');
							
		});
	})
});



//show login form
router.get('/login', (req, res)=>{
	res.render('login');
});

//handling login logic
router.post('/login',passport.authenticate('local',{
	
	
	successRedirect:'/workouts',
	failureRedirect:'/login'
												
												
					}),(req, res)=>{
	
});

//logic route 
router.get('/logout',(req, res)=>{
	req.logout();
	req.flash('success', 'You\'re LoggedOut');
	res.redirect('/workouts');
})


function isLoggedIn(req,res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
};

module.exports = router;

