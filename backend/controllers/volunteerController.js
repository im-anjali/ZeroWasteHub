const Delivery = require('../models/delivery');
const Donation = require('../models/donation');

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

exports.createVolAssignment = async(req, res) =>{
    try{
        const {donationId, requestorAddr, donorAddr, donorId} = req.body;
        if(!donationId || !requestorAddr || !donorAddr || !donorId){
            return res.status(400).json({message:"Missing fields"});
        }
        const donation = await Donation.findById(donationId);
        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }
        const newDelivery = new Delivery({
        item: donation.itemName,          
        donorId: donorId,        
        receiverId: req.user._id,  
        pickupLocation: donorAddr,
        dropLocation: requestorAddr,
        status: 'pending'         
        });
        await newDelivery.save();
        res.status(201).json({ message: "Volunteer assignment created successfully" });
    }catch(error){
        console.error("Error creating volunteer assignment:", error);
        res.status(500).json({ message: "Server error" });
    }
}
