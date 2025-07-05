const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
require('dotenv').config();
const Donation = require('../models/donation');

let bucket; 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((conn) => {
    const db = conn.connection.db;
    bucket = new GridFSBucket(db, { bucketName: 'uploads' });
    console.log('MongoDB connected and GridFS bucket initialized.');
  })
  .catch((err) => console.error('MongoDB connection error:', err));


const getImage = async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    const filesCollection = mongoose.connection.db.collection('uploads.files');
    const file = await filesCollection.findOne({ _id: fileId });

    if (!file) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', file.contentType || 'image/png'); 

    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res);
  } catch (error) {
    console.error('Error streaming image:', error);
    res.status(500).send('Server error');
  }
};

const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ status: 'approved' })
      .populate('donor', 'name email');

    const donationsWithImageUrls = donations.map((donation) => ({
      ...donation._doc,
      imageUrl: `${process.env.BACKEND_BASE_URL || 'http://localhost:5000'}/api/requestor/image/${donation.imageFileId}`
    }));
    res.status(200).json(donationsWithImageUrls);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const completeDonation = async (req, res) => {
  try {
    const { donationId } = req.body;
    if (!donationId) {
      return res.status(400).json({ message: "Donation ID is required" });
    }

    
    const donation = await Donation.findByIdAndUpdate(
      donationId,
      { status: "completed" },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json({ message: "Donation marked as completed", donation });
   } catch (error) {
    console.error("Error completing donation:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { getDonations, getImage, completeDonation};
