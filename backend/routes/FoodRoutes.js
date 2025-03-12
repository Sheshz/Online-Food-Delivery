const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/AuthMiddleware'); // Import authMiddleware
const authRole = require('../middleware/AuthRole');
const FoodController = require('../controllers/FoodController');

// Apply authMiddleware to protect routes
router.use(authMiddleware);  // This ensures routes below are protected

// Your routes for CRUD operations on food items
router.get('/', FoodController.getAllFoods);
router.post('/', FoodController.createFood);
router.put('/:id', FoodController.updateFood);
router.delete('/:id', FoodController.deleteFood);

// Protected Routes (Only Admins can manage food items)
router.post('/', authMiddleware, authRole('admin'), FoodController.createFood);
router.put('/:id', authMiddleware, authRole('admin'), FoodController.updateFood);
router.delete('/:id', authMiddleware, authRole('admin'), FoodController.deleteFood);

module.exports = router;
