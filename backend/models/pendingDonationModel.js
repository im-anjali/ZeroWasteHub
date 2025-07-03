const mongoose = require('mongoose');

const pendingDonationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  item: String,
  quantity: Number,
  condition: String,
  pickupLocation: String,
  dropLocation: String,
  pickupDate: Date,
  imageFileId: String,

  
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed'],
    default: 'pending',
  },
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  completionDate: Date
}, { timestamps: true });

module.exports = mongoose.model('PendingDonation', pendingDonationSchema);
