var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
text: {
type: String,
required: true
}



});

module.exports = mongoose.model('Tasks1', TaskSchema);