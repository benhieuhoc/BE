const express = require ('express');
const router = express.Router();
const notificationcontroller = require('../../app/controllers/notificationcontroller');

router.get("/get_all", notificationcontroller.getall);
router.post("/send_invite", notificationcontroller.sendInvite);
router.post("/respond_invite", notificationcontroller.respondInvite);
router.put("/chance_status", notificationcontroller.chanceStatus);
router.put("/chance_read", notificationcontroller.chanceRead);

module.exports = router;
