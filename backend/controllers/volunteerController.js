const Delivery = require('../models/delivery');

exports.getPendingDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ status: 'pending' });
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
};



exports.getActiveDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ status: 'active', volunteerId: req.user.id });
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching active deliveries', error: err.message });
  }
};


exports.getCompletedDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ status: 'completed', volunteerId: req.user.id });
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching completed deliveries', error: err.message });
  }
};


exports.acceptDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { status: 'active', volunteerId: req.user.id },
      { new: true }
    );
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ message: 'Error accepting delivery', error: err.message });
  }
};


exports.completeDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    );
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ message: 'Error completing delivery', error: err.message });
  }
};
