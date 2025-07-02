const express = require('express')
const router = express.Router();
const postDonation = require('../controllers/postDonationController');
const getDonation = require('../controllers/getDonationController');
router.post("/postDonation", postDonation);
router.get("/getDonations", getDonation);
  
module.exports = router;