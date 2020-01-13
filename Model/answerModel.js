var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema1 = new Schema({
post: {
type: String
},
post1:{
    type:String,
    // default:""
}
});

module.exports = mongoose.model('answerpost', TaskSchema1);