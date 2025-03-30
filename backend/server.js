const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

//const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with secret key

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import routes
const foodRoutes = require('./routes/FoodRoutes');
app.use('/api/food', foodRoutes);
const adminRoutes = require('./routes/AdminRoutes');
app.use('/api/admin', adminRoutes);


/*
// Debugging - Check if .env variables are loading
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY ? "Loaded" : "Not Loaded");
console.log("Mongo URI:", process.env.MONGO_URI ? "Loaded" : "Not Loaded");
*/

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${PORT} is already in use. Trying a different port...`);
      app.listen(PORT + 1, () => console.log(`Server running on port ${PORT + 1}`));
    } else {
      console.error("Server error:", err);
    }
  });

  