const express = require("express");

const chatController = require("../controllers/chat");

const router = express.Router();

router.post("/chat", chatController.createMessage);

module.exports = router;
