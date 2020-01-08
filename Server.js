var express = require('express');
// import express from 'express';
var app = express();
 var port = process.env.PORT || 4000;
 var mongoose = require('mongoose');
//  import mongoose from "mongoose";
 var Task = require('./Model/Model');
//  import bodyParser from "body-parser";
 var bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Signup'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./Router/Router');
routes(app); 

app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message:message
    });
});

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);