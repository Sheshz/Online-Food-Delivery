const express = require("express");
const router = express.Router();
const cartService = require("../services/cartService");

router.post("/add", async (req, res) => {
  try {
    const { userId, foodId, quantity, price } = req.body;
    const updatedCart = await cartService.addItemToCart(userId, foodId, quantity, price);
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// More routes can be added for other cart actions like remove, update, and view

module.exports = router;
