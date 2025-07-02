const PendingDonation = require("../models/pendingDonationModel");
const Donation = require("../models/postDonationModel")

const getPendingDonations = async(req, res) =>{
    try {
        const pending = await PendingDonation.find({});
        res.json(pending);
    } catch (error) {
        res.status(500).json({message:'fail to fetch donations'})
    }
}
const approveDonation = async(req, res) =>{
    try {
        const {id} = req.params;
    const pending = await PendingDonation.findById(id);
    if(!pending){
        return res.status(404).json({message:'donation not found'});
    }
        const donation = new Donation({...pending._doc})
        await donation.save();
        await PendingDonation.findByIdAndDelete(id);
        res.json({ message: 'donation approved and saved' });
    
}
     catch (error) {
            res.status(500).json({ message: 'Approval failed' });
    }
}

const rejectDonation = async(req, res) =>{
    try {
        const {id} = req.params;
        await PendingDonation.findByIdAndDelete(id);
            res.json({ message: 'donation request rejected and deleted' });
    } catch (error) {
            res.status(500).json({ message: 'Rejection failed' });
    }
}
module.exports = {getPendingDonations, approveDonation, rejectDonation}