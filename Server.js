var express = require('express');
var app = express();
 var port = process.env.PORT || 4090;
 var mongoose = require('mongoose');
 var Task = require('./Model/userModel');
 var bodyParser = require('body-parser');
 var cors = require('cors')
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Signup' , { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

var routes = require('./Router/userRouter');
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

