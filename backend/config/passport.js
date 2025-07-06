const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
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
          console.log("User updated:", user);
        }
      } else {
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          role: role
        });
        await user.save();
        console.log("New user created:", user);
      }

      const freshUser = await User.findById(user._id);
      return done(null, freshUser);
    }

    if (user) {
      return done(null, user);
    } else {
      console.log("User not found during login.");
      return done(null, false, { message: "No user found." });
    }
  } catch (err) {
    console.error("Error in Google OAuth:", err);
    return done(err, null);
  }
}));
