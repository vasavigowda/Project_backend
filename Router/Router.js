module.exports = (app) => {
    const todoList = require('../Controller/Controller');
     const isAuth=require('../Middleware/isAuth')

     app.route('/Signup')
    .post(todoList.signup);

    app.route('/Signin')
    .post(todoList.userSignin,isAuth);

    app.route('/Signup')
    .get(todoList.getAllUsers,isAuth)
    .put(todoList.updateUser)
    .delete(todoList.deleteUser);
    };