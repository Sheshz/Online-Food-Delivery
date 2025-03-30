const express = require("express");
const router = express.Router();
const { signup, login, getUserProfile } = require("../controllers/AuthController");
const authMiddleware = require("../middleware/AuthMiddleware"); // Assuming you have a middleware for authentication

// Route to handle user signup
router.post("/signup", signup);

// Route to handle user login
router.post("/login", login);

// Route to get user profile (authenticated route)
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
