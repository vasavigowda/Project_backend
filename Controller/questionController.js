const mongoose = require('mongoose');
const UserData =require('../Model/questionModel');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
var isAuth=require('../Middleware/isAuth')


exports.get_a_data = function(req, res) {
UserData.find({}, function(err, task1) {
if (err)
res.send(err);
res.json(task1);
});
};



exports.update_a_task = function(req, res)
{
var User = new UserData(req.body);
User.save({},function(err, data) {
if (err)
res.send(err);
res.json(data);
});
};

exports.delete_a_task = function(req, res) {
UserData.remove({_id: req.params.taskId}, function(err, task) {
if (err)
res.send(err);
res.json({ message: 'Task successfully deleted' });
});
};

exports.read_a_task = function(req, res) 
{
UserData.findById(req.params.taskId, function(err, task) {
if (err)
res.send(err);
res.json(task);
});
};






