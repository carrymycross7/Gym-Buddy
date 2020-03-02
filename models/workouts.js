var mongoose = require('mongoose');



//Workout Schema
var workoutSchema = new mongoose.Schema({
	name       : String,
	image      : String,
	description: String,
	user     : {
		   id:{
			   type: mongoose.Schema.Types.ObjectId,
			   ref: 'User'
		   },
     username: String
	},
	comments   : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref : 'Comment'
		}
	]
});

module.exports = mongoose.model('Workout', workoutSchema);