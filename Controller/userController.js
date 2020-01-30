const mongoose = require('mongoose');
const UserData = require('../Model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var isAuth = require('../Middleware/isAuth')
var nodemailer = require("nodemailer");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

exports.getAllUsers = (req, res) => {
  UserData.find({}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.signup = function (req, res) {
  console.log(req.body, "connect")
  const reg_email = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
  const reg_pwd = /^[a-zA-Z0-9@*#]{8,15}$/;
  if (!reg_pwd.test(req.body.password)) {
    console.log(req.body.password)
    res.send('password is invalid');
  }
  if (reg_email.test(req.body.email)) {
    UserData.find({ email: req.body.email }, function (err, data) {
      if (data != null && data != '') {
        res.send('User already exists');
      }
      else {
        var userData = new UserData(req.body);
        const pword = cryptr.encrypt(req.body.password);
        userData.password = pword;
        userData.save(function (err, data) {
          if (err)
            res.send(err.message);
          res.json('User Created Succesfully');
        })

      }
    });
  }
  else {
    res.send('Email is invalid');
  }
};

exports.changepassword = (req, res) => {
  console.log(req.body, "hai")
  const pword = cryptr.encrypt(req.body.password);
  req.body.password = pword;
  UserData.findOneAndUpdate({ email: req.body.email }, req.body, { new: true }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.userSignin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  UserData.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      const pword = cryptr.decrypt(user.password);
      return (password === pword);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('wrong password.');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          role: loadedUser.role,
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        }, 'secret')
      return res.status(200).json({ token: token, userId: loadedUser._id.toString(), email: loadedUser.email, role: loadedUser.role })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.deleteUser = (req, res) => {
  UserData.remove({ _id: req.params.taskId }, function (err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};








