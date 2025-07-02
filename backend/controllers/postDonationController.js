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
module.exports = postDonation;