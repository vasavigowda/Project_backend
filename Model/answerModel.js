var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema1 = new Schema({
post: {
type: String
},
question_id:{
    type:String
}


});

module.exports = mongoose.model('postanswers',TaskSchema1);