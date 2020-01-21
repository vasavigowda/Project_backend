const mongoose = require('mongoose');
const async =require('../Model/userModel');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
var isAuth=require('../Middleware/isAuth')
var nodemailer=require("nodemailer");

exports.forgotpasswordResponse = function(req, res, next) {  
    var input=req.body;  
    //console.log(input);  
    async.waterfall([  
        function(done) {  
            crypto.randomBytes(20, function(err, buf) {  
                var token = buf.toString('hex');  
                done(err, token);  
            });  
        },  
        function(token, done) {  
            MongoClient.connect(url, function(err, db){   
                var dbo = db.db("Here is your DB Name");  
                //console.log(req.body.Email);  
                var query = { email : req.body.email };  
                dbo.collection('CLC_User').find(query).toArray(function(err,result){  
                    if(result.length == 0){  
                        req.flash('error', 'No account with that email address exists.');  
                    }  
                    var myquery = { email: result[0].email };  
                    var newvalues = { $set: {resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 }};  
                    dbo.collection("CLC_User").updateOne(myquery, newvalues, function(err, res) {  
                        if (err) throw err;  
                        console.log("1 document updated");  
                    });  
                      
  
                   // console.log(result[0].Email);  
                    done(err, token, result);  
                });  
            });  
        },  
        function(token, result, done,Username,password) {  
            var emailVal = result[0].Email;  
            console.log(emailVal);  
            var firstname="";  
            var password="";  
            MongoClient.connect(url, function(err, db){   
            var dbo = db.db("Here willbe your db name");  
            dbo.collection('Accountsettings').find().toArray(function(err,result){  
                if (err) throw err;  
                firstname=result[0].firstname;  
                password=result[0].Password;  
               // console.log(Username);  
               // console.log(password);  
                   // res.json({status : 'success', message : 'Records found', result : result});  
              
  
            // console.log(Username);  
            var smtpTransport = nodemailer.createTransport({  
                service: 'SendGrid',  
                auth: {  
                  user: firstname,  
                  pass: password  
                }  
              });  
  
            const mailOptions = {  
                to: emailVal,  
                from: 'vbalashankarostb2@gmail.com',  
                subject: 'Node.js Password Reset',  
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +  
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +  
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +  
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'  
            };  
            smtpTransport.sendMail(mailOptions, function(err) {                 
                console.log("HI:"+emailVal);  
                res.json({status : 'success', message : 'An e-mail has been sent to ' + emailVal + ' with further instructions.'});              
                done(err, 'done');  
            });  
        })  
        });  
        }  
          
    ], function(err) {  
        if (err) return next(err);  
          
    });  
}  