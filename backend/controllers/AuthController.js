//assigning roles when creating an admin manually:
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;  // Accept 'role' in request
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      user = new User({
        name,
        email,
        password,
        role: role || 'user' // Default role is 'user'
      });
  
      await user.save();
      res.json({ msg: 'User registered successfully' });
    } catch (err) {
      res.status(500).send('Server error');
    }
  };
  