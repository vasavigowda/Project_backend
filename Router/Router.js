module.exports = function(app) {
    var todoList = require('../Controller/Controller');
   
     app.route('/Singup')
    .get(todoList.get_a_data)
    .post(todoList.create_a_data);

    app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
    };