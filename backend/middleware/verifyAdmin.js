const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and check admin role
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Verify the token
    req.adminId = decoded.adminId; // Attach adminId to request object
    req.role = decoded.role; // Attach role to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyAdmin;
