const express = require ('express');
const router = express.Router();
const taskcontroller = require('../../app/controllers/taskcontroller');

router.get("/show_task_by_project", taskcontroller.showbypj);
router.get("/show_by_pjandmem", taskcontroller.showbypjandmem);
router.get("/show_your_task", taskcontroller.yourtask);
router.post("/create", taskcontroller.create);
router.delete('/delete/:id', taskcontroller.delete);
router.put("/update", taskcontroller.update);

module.exports = router;
