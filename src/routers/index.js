const userController = require ('./user/user');
const projectController = require ('./project/project');

function router(app){
 app.use('/user', userController);
 app.use('/project', projectController);
}

module.exports = router;
