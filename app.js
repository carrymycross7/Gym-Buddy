var express    = require('express'),
	app        = express(),
 bodyParser    = require('body-parser'),
 mongoose      = require('mongoose'),
 Workout       = require('./models/workouts'),
 Comment       = require('./models/comment'),
 methodOverride= require('method-override'),	
 seedDB        = require('./seeds'),
 flash         = require('connect-flash'),
 passport      = require('passport'),
 User          = require('./models/user'),	
 LocalStrategy = require('passport-local')	

var commentRoutes = require('./routes/comments'),
	workoutRoutes = require('./routes/workouts'),
	indexRoutes   = require('./routes/index');




mongoose.connect("mongodb://localhost:27017/gym_buddy_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
//seedDB();

app.use(require('express-session')({
	secret : 'I love funions',
	resave : false,
	saveUninitialized : false
	
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next){
	res.locals.currentUser = req.user;
	res.locals.error       = req.flash('error');
	res.locals.success     = req.flash('success');
	next();
});

app.use(indexRoutes);
app.use('/workouts/:id/comments', commentRoutes);
app.use('/workouts', workoutRoutes);




app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Server Running")
})