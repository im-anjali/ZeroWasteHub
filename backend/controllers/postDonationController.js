const express = require('express')
const Donation = require('../models/donation');
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

const getMyDonations = async(req, res) =>{
    try {
      const userId = req.user.id;
      const donations = await Donation.find({donor:userId});
      res.status(200).json(donations);
    } catch (error) {
          res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {postDonation, getMyDonations};