// FoodRoutes.js

const express = require('express');
const router = express.Router();
const { createFood } = require('../controllers/FoodController');  // Ensure this is properly imported

// Post route for creating food item
router.post('/create', createFood);  // Ensure this is the correct function

module.exports = router;
