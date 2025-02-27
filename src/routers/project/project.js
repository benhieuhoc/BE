const express = require ('express');
const router = express.Router();
const projectcontroller = require('../../app/controllers/projectcontroller');

router.get("/get_my_project", projectcontroller.getmy);
router.get("/get_by_author", projectcontroller.getbyauthor);
router.post("/create", projectcontroller.create);
router.put("/update", projectcontroller.update);
router.delete('/delete/:id', projectcontroller.delete);

module.exports = router;
