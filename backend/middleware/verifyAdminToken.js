const jwt = require('jsonwebtoken');

const verifyAdminToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.adminId = decoded.adminId; // Store the admin ID in the request
    next();
  });
};

module.exports = verifyAdminToken;
