const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.status(201).json({ token, user: { name, email, role } });
  } catch (err) {
    res.status(500).json({ message: 'Signup error', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  console.log(" Login input:", { email, password, role });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(" User not found for email:", email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log("Found user:", user);

   const sanitizedRole = role.toLowerCase().trim();
if (user.role !== sanitizedRole) {
  console.log(` Role mismatch: expected ${user.role}, got ${sanitizedRole}`);
  return res.status(400).json({ message: 'Invalid credentials' });
}

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log(" Password mismatch");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    console.log(" Login success:", { name: user.name, email: user.email, role: user.role });

    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(" Login error:", err); 
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};




exports.getUser = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: 'Protected data', user: decoded });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
