// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/UserController");

const router = express.Router();

// API endpoint for user signup or update
router.post("/enroll", userController.signup);

module.exports = router;
