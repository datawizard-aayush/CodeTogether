const express = require("express");
const { handleChat, getAiStatus } = require("../controllers/aiController");

const router = express.Router();

// AI Chat and coding assistant endpoint
router.post("/chat", handleChat);

// AI Health / configuration status check
router.get("/status", getAiStatus);

module.exports = router;
