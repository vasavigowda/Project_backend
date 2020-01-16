const mongoose = require('mongoose');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
var isAuth=require('../Middleware/isAuth')
const Answerpost= require('../Model/answerModel')

exports.getdata = function(req, res) {
    console.log("get")
    Answerpost.find({}, function(err, data) {
    if (err)
    res.send(err);
    res.json(data);
    });
    };
    
    exports.postanswer = function(req, res) {
        console.log(req.body);
        var User = new Answerpost(req.body);
        User.save({},function(err, data) {
            if (err)
                res.send(err);
                res.json(data);
        });
        };
        exports.updatetask=(req, res)=>{
            Answerpost.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (error, data) => {
                if (error) { res.send(error); }
                res.json(data)
            })
          }