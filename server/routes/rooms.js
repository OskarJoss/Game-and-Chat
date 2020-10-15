const express = require("express");

const roomsController = require("../controllers/rooms");

const router = express.Router();

router.get("/join-room", roomsController.joinRoom);

module.exports = router;
