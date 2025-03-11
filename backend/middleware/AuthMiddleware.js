// backend/middleware/authMiddleware.js
//Create middleware to verify JWTs, protecting routes that require authentication.
//const jwt = require("jsonwebtoken");

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', ''); // remove "Bearer " part

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the correct secret from environment variable
    req.user = decoded.userId;  // Attach user info to request object
    next(); // Continue to next middleware or route
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


/*
const AuthMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extracts token from Bearer
  if (!token) return res.status(401).json({ msg: "No token, Authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = AuthMiddleware;
*/