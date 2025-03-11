const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware
const FoodController = require('../controllers/FoodController');

// Apply authMiddleware to protect routes
router.use(authMiddleware);  // This ensures routes below are protected

// Your routes for CRUD operations on food items
router.get('/', FoodController.getAllFoods);
router.post('/', FoodController.createFood);
router.put('/:id', FoodController.updateFood);
router.delete('/:id', FoodController.deleteFood);

module.exports = router;
