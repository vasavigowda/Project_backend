module.exports = (app) => {
const userController = require('../Controller/userController');
const Question = require('../Controller/questionController');
const postAnswer = require('../Controller/answerController');
const isAuth=require('../Middleware/isAuth')

 app.route('/Signup')
 .post(userController.signup);

  app.route('/Signin')
  .post(userController.userSignin,isAuth);


  app.route('/question')
.get(Question.get_a_data)
.post(Question.postquestion)

app.route('/question/:id')
.delete(Question.delete_a_task)
.put(Question.update_a_task)


app.route('/answer')
.get(postAnswer.getdata)
.post(postAnswer.postanswer)

app.route('/answer/:id')

.put(postAnswer.updatetask)

    };