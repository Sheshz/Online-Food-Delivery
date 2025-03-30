const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  date: { type: Date, default: Date.now },
  cart: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
