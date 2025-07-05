const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  role: { type: String, default: 'donor' }
});

module.exports = mongoose.model('User', userSchema);
