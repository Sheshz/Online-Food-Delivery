const Food = require('../models/Food');

// Add food (Admin functionality)
exports.addFood = async (req, res) => {
  const { name, description, price, image, discount, category } = req.body;

  try {
    const newFood = new Food({
      name,
      description,
      price,
      image,
      discount,
      category,
    });

    await newFood.save();
    res.status(201).json({ message: 'Food added successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add food', error: err });
  }
};

// Get all food items (User/HomePage)
exports.getFood = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch food items', error: err });
  }
};

const createFood = (req, res) => {
  // Logic for creating a food item
};

module.exports = {
  createFood,
};