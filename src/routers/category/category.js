const express = require ('express');
const router = express.Router();
const categorycontroller = require('../../app/controllers/categorycontroller');

router.get("/get_all", categorycontroller.getall);

module.exports = router;