const PendingDonation = require("../models/pendingDonationModel");
const Donation = require("../models/postDonationModel")
const RejectedDonation = require("../models/rejectedDonationModel");
const getPendingDonations = async(req, res) =>{
    try {
        const pending = await PendingDonation.find({});
        // const withUrls = pending.map(d=>({
        //     ...d._doc, 
        //     imageUrl: `${process.env.BACKEND_BASE_URL || 'http://localhost:5000'}/donation/image/${d.imageFileId}`
        // }));
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

const rejectDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    const rejected = await PendingDonation.findByIdAndDelete(id);
    
    if (!rejected) {
      return res.status(404).json({ message: 'pending donation not found' });
    }

    const rejectedDonation = new RejectedDonation({
      ...rejected._doc,
      reason
    });

    await rejectedDonation.save();

    res.status(200).json({
      message: 'donation request rejected and saved to rejected collection',
      rejectedDonation
    });
  } catch (error) {
    console.error('rejection error:', error);
    res.status(500).json({ message: 'rejection failed' });
  }
};


module.exports = {getPendingDonations, approveDonation, rejectDonation}