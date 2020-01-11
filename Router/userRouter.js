module.exports = (app) => {
const userController = require('../Controller/userController');
const desktop = require('../Controller/questionController');
const isAuth=require('../Middleware/isAuth')

 app.route('/Signup')
 .post(userController.signup);

  app.route('/Signin')
  .post(userController.userSignin,isAuth);


  app.route('/Desktop')
.get(desktop.get_a_data)
.post(desktop.update_a_task)
  
    // app.route('/Signup')
    // .get(todoList.getAllUsers)
    // .put(todoList.updateUser)
    // .delete(todoList.deleteUser);
    };