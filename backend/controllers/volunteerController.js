const PendingDonation = require('../models/pendingDonationModel');

// GET /api/volunteer/requests
const getUnassigned = async (req, res) => {
  console.log("HIT: /api/volunteer/requests");
  try {
    const donations = await PendingDonation.find({ status: 'pending' });
    res.status(200).json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};


// GET /api/volunteer/active
const getActive = async (req, res) => {
  try {
    const donations = await PendingDonation.find({
      volunteer: req.user.id,
      status: 'accepted'
    });
    res.status(200).json(donations);
  } catch (err) {
    console.error('Error fetching active:', err);
    res.status(500).json({ error: 'Failed to fetch active tasks' });
  }
};

// GET /api/volunteer/history
const getCompleted = async (req, res) => {
  try {
    const donations = await PendingDonation.find({
      volunteer: req.user.id,
      status: 'completed'
    });
    res.status(200).json(donations);
  } catch (err) {
    console.error('Error fetching completed:', err);
    res.status(500).json({ error: 'Failed to fetch completed tasks' });
  }
};

// PUT /api/volunteer/accept/:id
const acceptDonation = async (req, res) => {
  try {
    const updated = await PendingDonation.findOneAndUpdate(
      {
        _id: req.params.id,
        status: 'pending',
        $or: [{ volunteer: { $exists: false } }, { volunteer: null }]
      },
      {
        status: 'accepted',
        volunteer: req.user.id
      },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ error: 'Already accepted or not found' });

    res.status(200).json({ message: 'Accepted', donation: updated });
  } catch (err) {
    console.error('Error accepting donation:', err);
    res.status(500).json({ error: 'Failed to accept donation' });
  }
};

// PUT /api/volunteer/complete/:id
const completeDonation = async (req, res) => {
  try {
    const updated = await PendingDonation.findOneAndUpdate(
      {
        _id: req.params.id,
        status: 'accepted',
        volunteer: req.user.id
      },
      {
        status: 'completed',
        completionDate: new Date()
      },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ error: 'Not found or unauthorized' });

    res.status(200).json({ message: 'Marked completed', donation: updated });
  } catch (err) {
    console.error('Error completing donation:', err);
    res.status(500).json({ error: 'Failed to complete donation' });
  }
};



module.exports = {
  getUnassigned,
  getActive,
  getCompleted,
  acceptDonation,
  completeDonation
};
