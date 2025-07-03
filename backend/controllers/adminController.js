const PendingDonation = require("../models/pendingDonationModel");
const Donation = require("../models/postDonationModel")
const getPendingDonations = async (req, res) => {
  try {
    const donations = await PendingDonation.find({});
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch donations' });
  }
};

const approveDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await PendingDonation.findById(id);
    const approvedDonation = new Donation(donation._doc);
    await approvedDonation.save();
    const updated = await PendingDonation.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'donation not found' });
    }

    res.json({ message: 'donation approved', donation: updated });
  } catch (error) {
    res.status(500).json({ message: 'approval failed' });
  }
};

const rejectDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body || {};

    const updated = await PendingDonation.findByIdAndUpdate(
      id,
      { status: 'rejected', reason },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'donation not found' });
    }

    res.json({ message: 'donation rejected', donation: updated });
  } catch (error) {
    console.error('rejection error:', error);
    res.status(500).json({ message: 'rejection failed' });
  }
};

module.exports = {
  getPendingDonations,
  approveDonation,
  rejectDonation,
};
