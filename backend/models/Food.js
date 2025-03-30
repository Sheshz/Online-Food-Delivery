const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false }, // URL or image path
  discount: { type: Number, default: 0 }, // Optional discount percentage
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Food', FoodSchema);
