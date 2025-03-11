const Food = require("../models/Food");
const mongoose = require('mongoose'); // Add this line

// Get all food items
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error, failed to fetch foods" });
  }
};

// Create a new food item
exports.createFood = async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ error: "Name, price, and category are required" });
  }

  try {
    const newFood = new Food({ name, description, price, category, imageUrl });
    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create food item" });
  }
};

// Update a food item
exports.updateFood = async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;
  const foodId = req.params.id;  // Extract the food id from URL params

  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(foodId)) {
      return res.status(400).json({ msg: 'Invalid food ID' });
    }

    let food = await Food.findById(foodId);  // Use valid ObjectId
    if (!food) return res.status(404).json({ msg: 'Food item not found' });

    food.name = name || food.name;
    food.description = description || food.description;
    food.price = price || food.price;
    food.category = category || food.category;
    food.imageUrl = imageUrl || food.imageUrl;

    food = await food.save();
    res.json(food);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Delete a food item
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ error: "Food item not found" });

    await food.deleteOne();
    res.status(200).json({ message: "Food item removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete food item" });
  }
};
