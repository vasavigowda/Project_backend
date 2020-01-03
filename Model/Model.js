var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
Firstname: {
type: String,
required: true
},
Lastname:{
type: String,
required:true
},
password:{
type: String,
required: true
},
Confirmpassword:{
type: String,
required: true
},
email:{
type: String,
required: true
},

Mobnum:{
type: Number,
required: true
}


});

module.exports = mongoose.model('Tasks', TaskSchema);