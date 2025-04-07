const categoryController = require ('./category/category');
const projectController = require ('./project/project');
const taskController = require ('./task/task');
const userController = require ('./user/user');
const notificationController = require ('./notification/notification');

function router(app){
    app.use('/category', categoryController);
    app.use('/notification', notificationController);
    app.use('/project', projectController);
    app.use('/task', taskController);
    app.use('/user', userController);
}

module.exports = router;
