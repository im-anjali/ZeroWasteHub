const mongoose = require('mongoose')

const pendingDonationSchema = new mongoose.Schema({
  donor: { type: String, required: true }, 
  itemName: { type: String, required: true },
  quantity: { type: String, required: true },
  condition: { type: String, enum: ['New', 'Good', 'Used'], required: true },
  pickupAddress: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  imageFileId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  reason:{type:String},
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

module.exports = mongoose.model('PendingDonation', pendingDonationSchema);
