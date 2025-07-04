const Delivery = require('../models/delivery');
const Donation = require('../models/donation');
const createVolAssignment = async(req, res) =>{
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
module.exports = {createVolAssignment};