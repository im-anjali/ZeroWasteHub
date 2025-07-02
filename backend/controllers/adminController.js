const PendingDonation = require("../models/pendingDonationModel");

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

    const updated = await PendingDonation.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json({ message: 'Donation approved', donation: updated });
  } catch (error) {
    res.status(500).json({ message: 'Approval failed' });
  }
};

const rejectDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const updated = await PendingDonation.findByIdAndUpdate(
      id,
      { status: 'rejected', reason },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json({ message: 'Donation rejected', donation: updated });
  } catch (error) {
    console.error('Rejection error:', error);
    res.status(500).json({ message: 'Rejection failed' });
  }
};

module.exports = {
  getPendingDonations,
  approveDonation,
  rejectDonation,
};
