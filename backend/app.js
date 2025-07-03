require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const connectDB = require('./connectDB/connectdb');
require('./config/passport'); // Google strategy

// Route imports
const authRoutes = require('./routes/userRoutes');
const oauthRoutes = require('./routes/googleOAuthRoutes');
const uploadImage = require('./routes/imageUploadRoutes');
const donationRoutes = require('./routes/donationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const volunteerRoutes = require('./routes/volunteer'); // ✅ FIXED: Import and register earlier

// Connect to DB
connectDB();

const app = express();

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

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/', oauthRoutes);
app.use('/api', uploadImage);
app.use('/donation', donationRoutes);
app.use('/admin', adminRoutes);
app.use('/api/volunteer', volunteerRoutes); // ✅ FIXED: Moved to correct place

// Default route
app.get('/', (req, res) => {
  res.send('ZeroWasteHub Auth API running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log('Loaded Passport strategies:', Object.keys(passport._strategies));

module.exports = app;
