var mongoose = require('mongoose');
// import mongoose from 'mongoose';
// import Schema from 'mongoose.Schema'
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
Name: {
    type: String,
    required: true
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
}




});

module.exports = mongoose.model('Tasks', TaskSchema);