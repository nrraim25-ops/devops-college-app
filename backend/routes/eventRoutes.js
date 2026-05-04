const express = require("express");
const router = express.Router();

const { createEvent, getEvents } = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE event (protected)
router.post("/", authMiddleware, createEvent);

// GET all events (public)
router.get("/", getEvents);

module.exports = router;
