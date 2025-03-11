const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import route modules
const authRoutes = require('./routes/AuthRoutes');
const foodRoutes = require('./routes/FoodRoutes');
const orderRoutes = require('./routes/OrderRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);  // Use '/api/auth' prefix for auth routes
app.use('/api/foods', foodRoutes); // Example of other routes
app.use('/api/orders', orderRoutes); // Example of other routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export app for testing
module.exports = app;
