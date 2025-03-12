const AuthRole = (role) => {              //Create a middleware to restrict actions based on roles.
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ msg: 'Access denied. Not authorized' });
      }
      next();
    };
  };
  
  module.exports = AuthRole;
  