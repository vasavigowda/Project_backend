module.exports = (app) => {
const userController = require('../Controller/userController');
const isAuth=require('../Middleware/isAuth')

 app.route('/Signup')
 .post(userController.signup);

  app.route('/Signin')
  .post(userController.userSignin,isAuth);

    // app.route('/Signup')
    // .get(todoList.getAllUsers)
    // .put(todoList.updateUser)
    // .delete(todoList.deleteUser);
    };