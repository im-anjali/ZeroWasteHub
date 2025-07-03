const Donation = require('../models/donation');

const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({})
      .populate('donor', 'name email');

    const donationsWithImageUrls = donations.map(donation => ({
      ...donation._doc,
      imageUrl: `${process.env.BACKEND_BASE_URL || 'http://localhost:5000'}/donation/image/${donation.imageFileId}`
    }));

    res.status(200).json(donationsWithImageUrls); 
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = getDonations;
