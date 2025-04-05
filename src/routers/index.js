const categoryController = require ('./category/category');
const userController = require ('./user/user');
const projectController = require ('./project/project');
const taskController = require ('./task/task');

function router(app){
    app.use('/category', categoryController);
    app.use('/project', projectController);
    app.use('/task', taskController);
    app.use('/user', userController);
}

module.exports = router;
