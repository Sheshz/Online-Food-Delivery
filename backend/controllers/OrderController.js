// controller to handle the business logic for order-related operations.
const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  const { items, totalPrice } = req.body;
  try {
    const newOrder = new Order({
      user: req.user, // Retrieved from authMiddleware
      items,
      totalPrice
    });
    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get all orders for admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.food', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get orders for a specific user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).populate('items.food', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    let order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    order.status = status || order.status;
    order = await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    await order.remove();
    res.json({ msg: 'Order removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
