module.exports = (app) => {
const userController = require('../Controller/userController');
const Question = require('../Controller/questionController');
const postAnswer = require('../Controller/answerController');
const userCtrl =require('../Controller/userController');
const isAuth=require('../Middleware/isAuth')

 app.route('/Signup')
 .post(userController.signup)


  app.route('/Signin')
  .post(userController.userSignin,isAuth)
  .get(userController.getAllUsers)

  app.route('/confirm')
  .post(userController.confirmmail,isAuth)


  app.route('/reset')
  .put(userController.changepassword)

  app.route('/question')
.get(Question.get_a_data)
.post(Question.postquestion)

app.route('/question/:id')
.delete(Question.delete_a_task)
.put(Question.update_a_task)

app.route('/postanswer')
.post(postAnswer.postanswer)

app.route('/getanswer')
.get(postAnswer.getdata);
    };