module.exports = (app) => {
const userController = require('../Controller/userController');
const Question = require('../Controller/questionController');
const isAuth=require('../Middleware/isAuth')

 app.route('/Signup')
 .post(userController.signup);

  app.route('/Signin')
  .post(userController.userSignin,isAuth);


  app.route('/question')
.get(Question.get_a_data)
.post(Question.update_a_task)
  
    // app.route('/Signup')
    // .get(todoList.getAllUsers)
    // .put(todoList.updateUser)
    // .delete(todoList.deleteUser);
    };