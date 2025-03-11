// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/AuthMiddleware');
const OrderController = require('../controllers/OrderController');

// Apply authMiddleware to all routes in this router
router.use(authMiddleware);

// Define routes
router.post('/', OrderController.createOrder);
router.get('/', OrderController.getAllOrders); // Admin access
router.get('/myorders', OrderController.getUserOrders);
router.put('/:id', OrderController.updateOrderStatus); // Admin access
router.delete('/:id', OrderController.deleteOrder); // Admin access

module.exports = router;
