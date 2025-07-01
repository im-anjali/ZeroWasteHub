require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/oauth-roles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// User Schema
const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  role: String
});
const User = mongoose.model('User', UserSchema);

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Serialize and Deserialize User
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

// Debug Logging
console.log("OAuth Setup:");
console.log("Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Secret:", process.env.GOOGLE_CLIENT_SECRET);
console.log("Callback URL:", process.env.GOOGLE_CALLBACK_URL);

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  const role = req.session.selectedRole;
  const mode = req.session.authMode;

  console.log("🔁 Google callback triggered");
  console.log("🎯 Role from session:", role);
  console.log("⚙️  Mode from session:", mode);
  console.log("👤 Google Profile:", profile.displayName);

  try {
    let user = await User.findOne({ googleId: profile.id });

    if (mode === 'login') {
      if (!user) {
        console.log("❌ User not found");
        return done(null, false);
      }
      if (user.role !== role) {
        console.log("❌ Role mismatch");
        return done(null, false);
      }
      console.log("✅ Login success");
      return done(null, user);
    }

    if (mode === 'signup') {
      if (user) {
        if (user.role !== role) {
          console.log(`📝 Updating user role from ${user.role} to ${role}`);
          user.role = role;
          await user.save();
        } else {
          console.log(`ℹ️ User already has role ${role}`);
        }
        return done(null, user);
      }

      console.log("🆕 Creating new user");
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        role: role || 'donor'
      });
      await user.save();
      return done(null, user);
    }

    return done(null, false); // fallback
  } catch (err) {
    console.error("🔥 Error in Google Strategy:", err);
    return done(err, null);
  }
})); // ✅ FIXED: properly closed the GoogleStrategy
