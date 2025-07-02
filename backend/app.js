require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const connectDB = require('./connectDB/connectdb');
require('./config/passport'); // Passport config (Google Strategy)
const authRoutes = require('./routes/userRoutes');
const oauthRoutes = require('./routes/googleOAuthRoutes'); // Your Google OAuth routes


const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/', oauthRoutes);// All /auth/google routes handled here

// Default route
app.get('/', (req, res) => {
  res.send('🌍 ZeroWasteHub Auth API running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
console.log('✅ Loaded Passport strategies:', Object.keys(passport._strategies));
module.exports = app;

//vol dashboard
const volunteerRoutes = require('./routes/volunteer');
app.use('/api/volunteer', volunteerRoutes);


