module.exports = (app) => {
    const todoList = require('../Controller/Controller');
     const isAuth=require('../Middleware/isAuth')

     app.route('/Signup')
    .post(todoList.signup);

    app.route('/Signin')
    .post(todoList.userSignin,isAuth);

    app.route('/Singup/:SingupId')
    .get(todoList.getAllUsers)
    .put(todoList.updateUser)
    .delete(todoList.deleteUser);
    };