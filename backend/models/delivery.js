
const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  item: String,
  donorId: mongoose.Schema.Types.ObjectId,
  receiverId: mongoose.Schema.Types.ObjectId,
  volunteerId: mongoose.Schema.Types.ObjectId,
  status: { type: String, enum: ['pending', 'active', 'completed'], default: 'pending' },
  pickupLocation: String,
  dropLocation: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Delivery', deliverySchema);
