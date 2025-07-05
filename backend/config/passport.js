const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  const role = req.session.selectedRole;
  const mode = req.session.authMode;

  try {
    let user = await User.findOne({ email: profile.emails[0].value });

    if (mode === 'signup') {
      if (user) {
        if (user.role !== role) {
          user.role = role;
          await user.save();
          console.log("User saved:", user);
        }
        return done(null, user);
      }

      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        role: role || 'donor'
      });

      await user.save();
      return done(null, user);
    }

    return done(null, false);
  } catch (err) {
    return done(err, null);
  }
}));
