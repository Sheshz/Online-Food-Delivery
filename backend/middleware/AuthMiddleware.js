const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Access the 'Authorization' header directly from req.headers
  const token = req.headers['authorization']?.replace('Bearer ', '');  // Use req.headers['authorization']

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token using JWT_SECRET
    req.user = decoded.userId;  // Attach user info to the request object
    next();  // Proceed to the next middleware or route
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = (role) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.userId; 
      req.role = decoded.role; // Check the role
      if (role && req.role !== role) {
        return res.status(403).json({ msg: 'Forbidden, admin access required' });
      }
      next(); 
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
};