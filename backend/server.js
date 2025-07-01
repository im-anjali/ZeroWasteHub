require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/oauth-roles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB error:', err));

// Mongoose Schema
const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  role: String
});
const User = mongoose.model('User', UserSchema);

// Express Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false
}));

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log("🔐 Serializing user:", user.id);
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  console.log("🧠 Deserializing user:", id);
  User.findById(id).then(user => done(null, user));
});

// Debugging .env values
console.log("\n🔧 OAuth Setup:");
console.log("Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Secret:", process.env.GOOGLE_CLIENT_SECRET);
console.log("Callback URL:", process.env.GOOGLE_CALLBACK_URL, '\n');

// Google Strategy
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
      console.log("🔐 Login mode");
      if (!user) return done(null, false);
      if (user.role !== role) return done(null, false);
      return done(null, user);
    }

    if (mode === 'signup') {
  console.log("🆕 Signup mode");
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

  console.log("✨ Creating new user");
  user = new User({
    googleId: profile.id,
    name: profile.displayName,
    email: profile.emails[0].value,
    role: role || 'donor'
  });
  await user.save();
  console.log("✅ New user saved:", user.name);
  return done(null, user);
}
 } catch (err) {
    console.error("❌ Error in Google Strategy:", err);
    return done(err, null);
  }
}));

// Root Test Route
app.get('/', (req, res) => res.send('🌍 OAuth Server Running'));

// OAuth Initiation
app.get('/auth/google', (req, res, next) => {
  console.log("🚀 /auth/google called");
  console.log("📦 Query Params:", req.query);
  req.session.selectedRole = req.query.role;
  req.session.authMode = req.query.mode;
  console.log("💾 Session role set to:", req.session.selectedRole);
  console.log("💾 Session mode set to:", req.session.authMode);
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback Route
app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login?error=invalid'
  }),
  (req, res) => {
    const role = req.user.role;
    console.log("✅ Auth success, redirecting based on role:", role);

    const routeMap = {
      admin: 'admin-dashboard',
      ngo: 'ngo-dashboard',
      donor: 'donor-dashboard',
      volunteer: 'volunteer-dashboard',
      requestor: 'requestor-dashboard'
    };

    const redirectPath = routeMap[role] || 'dashboard';
    console.log("➡️  Redirect path:", redirectPath);
    res.redirect(`http://localhost:5173/${redirectPath}`);
  }
);

// Check Current User
app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    console.log("🔓 User authenticated:", req.user.name);
    res.json(req.user);
  } else {
    console.log("❌ Not logged in");
    res.status(401).json({ message: 'Not logged in' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
