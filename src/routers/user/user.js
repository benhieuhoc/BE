const express = require('express');
const router = express.Router();
const usercontroller = require('../../app/controllers/usercontroller');

router.get('/get_all', usercontroller.getall);
router.post('/login', usercontroller.login);
router.post('/singin', usercontroller.singin)
router.post('/logout', usercontroller.logout);

module.exports = router ;
