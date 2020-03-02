var mongoose = require('mongoose');
//change schemd from text to exercise
var commentSchema = mongoose.Schema({
		text: String,
});


module.exports = mongoose.model('Comment', commentSchema);