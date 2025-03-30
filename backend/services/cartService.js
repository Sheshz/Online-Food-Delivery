const User = require("../models/User");

const addItemToCart = async (userId, foodId, quantity, price) => {
  // Find the user by userId
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Check if the food item already exists in the cart
  const existingItemIndex = user.cart.findIndex(item => item.foodId.toString() === foodId);

  if (existingItemIndex !== -1) {
    // If item already exists, update the quantity
    user.cart[existingItemIndex].quantity += quantity;
  } else {
    // If it's a new item, add it to the cart
    user.cart.push({ foodId, quantity, price });
  }

  // Save the updated user
  await user.save();
  return user.cart; // Return updated cart
};

const removeItemFromCart = async (userId, foodId) => {
  // Find the user by userId
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Filter out the food item from the cart
  user.cart = user.cart.filter(item => item.foodId.toString() !== foodId);

  // Save the updated user
  await user.save();
  return user.cart; // Return updated cart
};

const updateCartItemQuantity = async (userId, foodId, quantity) => {
  // Find the user by userId
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Find the food item in the cart
  const item = user.cart.find(item => item.foodId.toString() === foodId);

  if (!item) {
    throw new Error("Food item not found in cart");
  }

  // Update the quantity of the food item
  item.quantity = quantity;

  // Save the updated user
  await user.save();
  return user.cart; // Return updated cart
};

const getCartItems = async (userId) => {
  // Find the user by userId
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user.cart; // Return the user's cart
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  getCartItems,
};
