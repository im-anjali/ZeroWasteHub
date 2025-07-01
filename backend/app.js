require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

mongoose.connect('mongodb://localhost:27017/oauth-roles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  role: String
});
const User = mongoose.model('User', UserSchema);

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});
console.log("OAuth Setup:");
console.log("Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Secret:", process.env.GOOGLE_CLIENT_SECRET);
console.log("Callback URL:", process.env.GOOGLE_CALLBACK_URL);

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  const role = req.session.selectedRole;
  const mode = req.session.authMode;

  try {
    let user = await User.findOne({ googleId: profile.id });

    if (mode === 'login') {
        if (!user) return done(null, false); 
        if (user.role !== role) return done(null, false); 
        return done(null, user); 
        }

    if (mode === 'signup') {
      if (user) return done(null, user);
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

app.get('/', (req, res) => res.send('OAuth Server Running'));

app.get('/auth/google', (req, res, next) => {
  req.session.selectedRole = req.query.role;
  req.session.authMode = req.query.mode;
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login?error=invalid'
  }),
  (req, res) => {
    const role = req.user.role;
    const routeMap = {
      admin: 'admin-dashboard',
      ngo: 'ngo-dashboard',
      donor: 'donor-dashboard',
      volunteer: 'volunteer-dashboard',
      receiver: 'receiver-dashboard'
    };
    const redirectPath = routeMap[role] || 'dashboard';
    res.redirect(`http://localhost:5173${redirectPath}`);
  }
);


app.get('/user', (req, res) => {
  if (req.isAuthenticated()) res.json(req.user);
  else res.status(401).json({ message: 'Not logged in' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
