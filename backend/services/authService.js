const User = require("../models/User");

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Create a new user with the provided plain text password
  const newUser = new User({
    name,
    email,
    password, // Store password as plain text (Not recommended for production)
  });

  await newUser.save();
  return newUser; // Return the newly created user
};

const loginUser = async (email, password) => {
  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // Check if the provided password matches the stored plain text password
  if (user.password !== password) {
    throw new Error("Invalid password");
  }

  return user; // Return logged-in user
};

module.exports = { registerUser, loginUser };