const express = require ('express');
const router = express.Router();
const projectcontroller = require('../../app/controllers/projectcontroller');

router.get("/get_all", projectcontroller.getall);
router.get("/get_by_id", projectcontroller.getbyid);
router.get("/get_by_author", projectcontroller.getbyauthor);
router.get("/get_by_category", projectcontroller.getbycategory);
router.post("/create", projectcontroller.create);
router.post("/add_member", projectcontroller.addUser);
router.post("/add_task", projectcontroller.addTask);
router.put("/update", projectcontroller.update);
router.delete('/delete/:id', projectcontroller.delete);
router.delete('/remove_member/:Project_id/:user_id', projectcontroller.removeUser);

module.exports = router;
