require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/userRoutes');
const connectDb = require("./connectDB/connectdb")
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Auth API');
});
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
module.exports = app;
