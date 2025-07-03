const Donation = require("../models/donation");

const getPendingDonations = async (req, res) => {
  try {
    const donations = await Donation.find({});
    const pendingDonations = donations.filter(d => d.status === "pending");
    res.json(pendingDonations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch donations' });
  }
};

const approveDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findById(id);
 
    const updated = await Donation.findByIdAndUpdate(
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

    const updated = await Donation.findByIdAndUpdate(
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
