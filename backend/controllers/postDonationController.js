const express = require('express')
const Donation = require('../models/postDonationModel');
const postDonation = async(req, res) =>{

    try {
        const {
      donor,
      itemName,
      quantity,
      condition,
      pickupAddress,
      pickupDate,
      imageFileId 
    } = req.body;
    const donation = new Donation({
        donor,
        itemName, 
        quantity, 
        condition,
        pickupAddress,
        pickupDate,
        imageFileId
    })
     const savedDonation = await donation.save();
    res.status(201).json({
      message: 'Donation saved successfully',
      donation: savedDonation
    });
    } catch (error) {
         console.error('Donation save error:', error); 
  res.status(500).json({ error: 'Failed to save donation' });
    }
}
const PendingDonation = require('../models/pendingDonationModel');
const pendingDonationModel = require('../models/pendingDonationModel');

const requestDonation = async (req, res) => {
  try {
    const {
      donor,
      itemName,
      quantity,
      condition,
      pickupAddress,
      pickupDate,
      imageFileId
    } = req.body;

    const pendingDonation = new PendingDonation({
      donor,
      itemName,
      quantity,
      condition,
      pickupAddress,
      pickupDate,
      imageFileId
    });

    const savedPending = await pendingDonation.save();
    res.status(201).json({ message: 'Donation request sent to admin for approval.', pendingDonation: savedPending });
  } catch (error) {
    console.error('Error saving pending donation:', error);
    res.status(500).json({ error: 'Failed to submit donation request' });
  }
};

const getMyDonations = async(req, res) =>{
    try {
      const userId = req.user.id;
      const donations = await Donation.find({donor:userId});
      res.status(200).json(donations);
    } catch (error) {
          res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {postDonation, requestDonation, getMyDonations};