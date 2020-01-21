const mongoose = require('mongoose');
const UserData =require('../Model/userModel');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
var isAuth=require('../Middleware/isAuth')
var nodemailer=require("nodemailer");
    

exports.getAllUsers = (req, res) =>{
  UserData.find({}, function(err, task) {
  if (err)
    res.send(err);
    res.json(task);
  });
};
exports.signup = (req, res) =>{
  console.log(req.body)
  const reg_email= /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
  // const reg_pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/;
  // if(!reg_pwd.test(req.body.password)){
  //   console.log(req.body.password)
  //   res.send('password is invalid');
  // }
  // else{
  //   if(req.body.password === req.body.Confirmpassword) {

  //   }else{
  //     res.send("password missmatch");
  //   }
  // }
  if(reg_email.test(req.body.email)){
    UserData.find({email: req.body.email},function(err, data){
      if(data != null && data != ''){
        res.send('User already exists');
      }
      else
      {
        var userData = new UserData(req.body);
        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(userData.password, salt, function(err, hash) {
            userData.password = hash;
            userData.save(function(err, data){
              if(err)
                res.send(err.message);
              res.json('User Created Succesfully');
            })
          })
        })
      }
    });
  }
  else {
    res.send('Email is invalid');
  }
};
exports.changepassword = (req, res)=> {
  UserData.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
  if (err)
  res.send(err);
  res.json(task);
  });
};
exports.deleteUser = (req, res) => {
  UserData.remove({_id: req.params.taskId}, function(err, task) {
  if (err)
  res.send(err);
  res.json({ message: 'Task successfully deleted' });
  });
};

exports.userSignin = (req,res,next) =>{
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  UserData.findOne({email: email})
  .then(user =>{
    if(!user){
      const error = new Error('User does not exist');
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    return bcrypt.compare(password,user.password);
  })
  .then(isEqual =>{
    if(!isEqual){
      const error = new Error('wrong password.');
      error.statusCode = 401;
      throw error;
    }
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      
      auth: {
      user: 'vbalashankarostb2@gmail.com',
      pass: 'vasavi@1997'
      }
      });
      mailOptions = {
      from: 'vbalashankarostb2@gmail.com',
      to: req.body.email,
      subject: 'requesting to complete project',
      text: `your password is `+password+ `http://localhost:3000/forgetpasswordpage `
      };
      transporter.sendMail(mailOptions, (error, info)=>{
      if (error) {
      return console.log(error.message);
      } else {
      console.log('Email sent: ' + info.response);
      }
      });
    const token = jwt.sign(
    {
      email: loadedUser.email,
      userId:loadedUser._id.toString()
    },'secret')
    return res.status(200).json({token: token, userId: loadedUser._id.toString(), email: loadedUser.email})
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }); 
}

// exports.forgetpassword = (req,res,next) =>{
//   // const email = req.body.email;
//   // const password = req.body.password;
//   // let loadedUser;
//   // UserData.findOne({email: email})
//   // .then(user =>{
//   //   if(!user){
//   //     const error = new Error('User does not exist');
//   //     error.statusCode = 401;
//   //     throw error;
//   //   }
//   //   loadedUser = user;
//   //   return bcrypt.compare(password,user.password);
//   // })
//   // .then(isEqual =>{
//   //   if(!isEqual){
//   //     const error = new Error('wrong password.');
//   //     error.statusCode = 401;
//   //     throw error;
//   //   }
//     var transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       requireTLS: true,
      
//       auth: {
//       user: 'vbalashankarostb2@gmail.com',
//       pass: 'vasavi@1997'
//       }
//       });
//       mailOptions = {
//       from: 'vbalashankarostb2@gmail.com',
//       to: req.body.email,
//       subject: 'requesting to complete project',
//       text: `your password is `+password+ `http://localhost:3000/forgetpasswordpage `
//       };
//       transporter.sendMail(mailOptions, (error, info)=>{
//       if (error) {
//       return console.log(error.message);
//       } else {
//       console.log('Email sent: ' + info.response);
//       }
//       });
//     const token = jwt.sign(
//     {
//       email: loadedUser.email,
//       userId:loadedUser._id.toString()
//     },'secret')
//     return res.status(200).json({token: token, userId: loadedUser._id.toString(), email: loadedUser.email})
//   })
//   .catch(err => {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }); 
// }






