const express = require('express');
const passport = require('passport');
const router = express.Router();

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
    const routeMap = {
      admin: 'admin-dashboard',
      ngo: 'ngo-dashboard',
      donor: 'donor-dashboard',
      volunteer: 'volunteer-dashboard',
      requestor: 'requestor-dashboard'
    };
    const redirectPath = routeMap[req.user.role] || 'dashboard';
    res.redirect(`http://localhost:5173/${redirectPath}`);
  }
);

module.exports = router; 
