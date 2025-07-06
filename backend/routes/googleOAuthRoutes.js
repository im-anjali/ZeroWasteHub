const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authmiddleware'); 
const User = require('../models/userModel');

router.get('/auth/google', (req, res, next) => {
  req.session.selectedRole = req.query.role;
  req.session.authMode = req.query.mode;
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/signup?error=oauth'
  }),
  (req, res) => {
    const token = jwt.sign(
      { _id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    const routeMap = {
      admin: 'admin-dashboard',
      ngo: 'ngo-dashboard',
      donor: 'donor-dashboard',
      volunteer: 'volunteer-dashboard',
      requestor: 'requestor-dashboard'
    };
    const redirectPath = routeMap[req.user.role] || 'dashboard';
    res.redirect(`http://localhost:5173/oauth-success?token=${token}&redirect=${redirectPath}`);
  }
);
router.get('/auth/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('name email role');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    console.error('Error in /auth/me:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router; 
